/**
 * Duplica um evento no Sanity e adiciona registrationUrl (validação da ficha).
 *
 * Uso:
 *   npm run sanity:duplicate-event
 *   npm run sanity:duplicate-event -- seminario-recomposicao seminario-recomposicao-inscricao https://example.com/inscricao
 */
import { createClient } from "@sanity/client"
import { apiVersion, dataset, projectId } from "../src/sanity/config.ts"

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error("Defina SANITY_API_TOKEN em .env.local (token de Editor).")
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

const [sourceSlugArg, targetSlugArg, registrationUrlArg] = process.argv.slice(2)
const sourceSlug = sourceSlugArg ?? "seminario-recomposicao"
const targetSlug = targetSlugArg ?? "seminario-recomposicao-inscricao"
const registrationUrl = registrationUrlArg ?? "https://example.com/inscricao-seminario-recomposicao"

type SanityEventDoc = Record<string, unknown> & {
  _id: string
  title?: string
  slug?: { current?: string }
}

const source = await client.fetch<SanityEventDoc | null>(
  `*[_type == "evento" && slug.current == $slug][0]`,
  { slug: sourceSlug },
)

if (!source) {
  console.error(`Evento "${sourceSlug}" não encontrado no dataset ${dataset}.`)
  process.exit(1)
}

const targetId = `evento-${targetSlug}`
const { _id: _omitId, _rev: _omitRev, _createdAt, _updatedAt, _type, ...fields } = source

const title =
  typeof source.title === "string" && !source.title.includes("inscrições abertas")
    ? `${source.title} — inscrições abertas`
    : (source.title ?? targetSlug)

const doc = {
  ...fields,
  _id: targetId,
  _type: "evento",
  title,
  slug: { _type: "slug", current: targetSlug },
  registrationUrl,
  recordingUrl: undefined,
}

await client.createOrReplace(doc)

console.log(`Evento criado/atualizado: ${targetId}`)
console.log(`Slug: /vozes/eventos/${targetSlug}`)
console.log(`registrationUrl: ${registrationUrl}`)

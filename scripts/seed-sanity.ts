import { createReadStream } from "node:fs"
import path from "node:path"
import { createClient } from "@sanity/client"
import { apiVersion, dataset, projectId } from "../src/sanity/config.ts"
import {
  chapters,
  faq,
  historyIntro,
  partners,
  segments,
  services,
  servicesIntro,
  stats,
  team,
  testimonials,
  values,
} from "../src/content/institutional.ts"
import { eventos, midia, noticias, publicacoes } from "../src/content/posts.ts"
import type { Block } from "../src/content/types.ts"

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error(
    [
      "Falta SANITY_API_TOKEN.",
      "Crie um token de Editor em https://www.sanity.io/manage/project/n5x78djy/api#tokens",
      "e coloque em .env.local: SANITY_API_TOKEN=seu_token",
      "Depois rode: npm run seed:sanity",
      "Também libere o navegador em API → CORS:",
      "http://localhost:5173 e https://anananaterra.github.io",
    ].join("\n"),
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

const valueIcons = ["antecipacao", "traducao", "humanidade", "fundamentacao", "colaboracao"] as const
const assetIds = new Map<string, Promise<string>>()

async function upload(filePath: string) {
  const cached = assetIds.get(filePath)
  if (cached) return cached
  const pending = uploadFresh(filePath)
  assetIds.set(filePath, pending)
  return pending
}

async function uploadFresh(filePath: string) {
  const filename = path.basename(filePath)
  const existing = await client.fetch<string | null>(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id`,
    { filename },
  )
  if (existing) return existing
  const asset = await client.assets.upload("image", createReadStream(filePath), { filename })
  return asset._id
}

function image(ref: string) {
  return { _type: "image", asset: { _type: "reference", _ref: ref } }
}

function slug(current: string) {
  return { _type: "slug", current }
}

async function toPortable(blocks: Block[]) {
  const output: Record<string, unknown>[] = []
  let index = 0
  for (const block of blocks) {
    if (block.type === "list") {
      for (const item of block.items) {
        const key = `b${index++}`
        output.push({
          _type: "block",
          _key: key,
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: `${key}s`, text: item, marks: [] }],
        })
      }
      continue
    }
    const key = `b${index++}`
    if (block.type === "p" || block.type === "h2" || block.type === "h3" || block.type === "quote") {
      output.push({
        _type: "block",
        _key: key,
        style: block.type === "p" ? "normal" : block.type === "quote" ? "blockquote" : block.type,
        markDefs: [],
        children: [{ _type: "span", _key: `${key}s`, text: block.text, marks: [] }],
      })
    } else if (block.type === "image") {
      output.push({
        _type: "image",
        _key: key,
        ...image(await upload(block.src)),
        alt: block.alt,
        caption: block.caption,
      })
    } else {
      output.push({ _type: "stat", _key: key, value: block.value, text: block.text })
    }
  }
  return output
}

async function main() {
  const docs: { _id: string; _type: string }[] = []

  for (const item of noticias) {
    docs.push({
      _id: `noticia-${item.slug}`,
      _type: "noticia",
      title: item.title,
      slug: slug(item.slug),
      excerpt: item.excerpt,
      date: item.date,
      themes: [...item.themes],
      image: image(await upload(item.image)),
      ...(item.imagePosition ? { imagePosition: item.imagePosition } : {}),
      caption: item.caption,
      featured: item.featured === true,
      body: await toPortable(item.body),
    })
  }

  for (const item of eventos) {
    docs.push({
      _id: `evento-${item.slug}`,
      _type: "evento",
      title: item.title,
      slug: slug(item.slug),
      excerpt: item.excerpt,
      date: item.date,
      themes: [...item.themes],
      image: image(await upload(item.image)),
      ...(item.imagePosition ? { imagePosition: item.imagePosition } : {}),
      caption: item.caption,
      place: item.place,
      format: item.format,
      ficha: item.ficha.map((row, index) => ({ _type: "fichaItem", _key: `f${index}`, ...row })),
      ...(item.registrationUrl ? { registrationUrl: item.registrationUrl } : {}),
      ...(item.recordingUrl ? { recordingUrl: item.recordingUrl } : {}),
      body: await toPortable(item.body),
    })
  }

  for (const item of midia) {
    docs.push({
      _id: `midia-${item.slug}`,
      _type: "midia",
      title: item.title,
      slug: slug(item.slug),
      excerpt: item.excerpt,
      date: item.date,
      themes: [...item.themes],
      image: image(await upload(item.image)),
      outlet: item.outlet,
      url: item.url,
    })
  }

  for (const item of publicacoes) {
    docs.push({
      _id: `publicacao-${item.slug}`,
      _type: "publicacao",
      title: item.title,
      slug: slug(item.slug),
      excerpt: item.excerpt,
      date: item.date,
      themes: [...item.themes],
      image: image(await upload(item.image)),
      ...(item.imagePosition ? { imagePosition: item.imagePosition } : {}),
      type: item.type,
      year: item.year,
      ...(item.authorship ? { authorship: item.authorship } : {}),
      ...(item.pageCount != null ? { pageCount: item.pageCount } : {}),
      ...(item.pdfUrl ? { pdfUrl: item.pdfUrl } : {}),
      ...(item.pdfSizeLabel ? { pdfSizeLabel: item.pdfSizeLabel } : {}),
      body: await toPortable(item.body),
    })
  }

  for (const [index, member] of team.entries()) {
    docs.push({
      _id: `team-${index + 1}`,
      _type: "teamMember",
      name: member.name,
      role: member.role,
      photo: image(await upload(member.photo)),
      color: member.color,
      faceX: member.face.x,
      faceY: member.face.y,
      ...("bio" in member ? { bio: member.bio } : {}),
      ...("childhoodPhoto" in member && member.childhoodPhoto
        ? { childhoodPhoto: image(await upload(member.childhoodPhoto)) }
        : {}),
      ...("dreamJobText" in member && member.dreamJobText ? { dreamJobText: member.dreamJobText } : {}),
      order: index,
    })
  }

  for (const [index, partner] of partners.entries()) {
    docs.push({
      _id: `partner-${index + 1}`,
      _type: "partner",
      name: partner.name,
      logo: image(await upload(partner.src)),
      invertOnDark: "invertOnDark" in partner ? partner.invertOnDark : false,
      order: index,
    })
  }

  services.forEach((service, index) => {
    docs.push({
      _id: `service-${service.id}`,
      _type: "service",
      id: service.id,
      title: service.title,
      face: service.face,
      accent: service.accent,
      text: service.text,
      body: service.body,
      audience: service.audience,
      delivery: service.delivery,
      order: index,
    })
  })

  testimonials.forEach((item, index) => {
    docs.push({
      _id: `testimonial-${index + 1}`,
      _type: "testimonial",
      quote: item.quote,
      name: item.name,
      role: item.role,
      order: index,
    })
  })

  chapters.forEach((chapter, index) => {
    docs.push({
      _id: `chapter-${index + 1}`,
      _type: "chapter",
      year: chapter.year,
      title: chapter.title,
      text: chapter.text,
      ...("kicker" in chapter ? { kicker: chapter.kicker } : {}),
      background: chapter.background,
      color: chapter.color,
      order: index,
    })
  })

  values.forEach((item, index) => {
    docs.push({
      _id: `value-${index + 1}`,
      _type: "value",
      icon: valueIcons[index] ?? "antecipacao",
      title: item.title,
      text: item.text,
      order: index,
    })
  })

  faq.forEach((item, index) => {
    docs.push({
      _id: `faq-${index + 1}`,
      _type: "faq",
      question: item.q,
      answer: item.a,
      order: index,
    })
  })

  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    servicesIntro: [...servicesIntro],
    stats: stats.map((item, index) => ({ _type: "homeStat", _key: `s${index}`, ...item })),
    segments: segments.map((item, index) => ({ _type: "segment", _key: `g${index}`, ...item })),
    historyIntro,
  })

  let transaction = client.transaction()
  for (const doc of docs) transaction = transaction.createOrReplace(doc)
  await transaction.commit()
  console.log(`Publicados ${docs.length} documentos em ${projectId}/${dataset}.`)
}

void main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})

import { useEffect, useMemo, useState } from "react"
import { Navigate, useParams, useSearchParams } from "react-router"
import photo from "@/assets/photo-impacto.png"
import { BrandButton } from "@/components/brand/BrandButton"
import { PublicationCard } from "@/components/content/Cards"
import { ListingFilterSelect } from "@/components/content/ListingFilterSelect"
import { ListingState } from "@/components/content/ListingState"
import { ThemeTag } from "@/components/content/ThemeTag"
import { PageHero } from "@/components/layout/PageHero"
import { useSiteContent } from "@/content/provider"
import { themes } from "@/content/themes"
import {
  filterPublications,
  publicationBySlug,
  publicationTypes,
  relatedPublications,
} from "@/content/posts"
import type { Block, Publication } from "@/content/types"
import { cn } from "cn"
import { roundFilterInput, roundFilterPill } from "@/lib/round-control"
import { Input } from "@/components/ui/input"

const pageSize = 4

const sortOptions = [
  { value: "recentes", label: "Mais recentes" },
  { value: "antigas", label: "Mais antigas" },
] as const

const ALL_YEARS = "all"
const ALL_THEMES = "all"

export function PublicacoesPage() {
  const content = useSiteContent()
  const [params, setParams] = useSearchParams()
  const tipo = params.get("tipo") ?? ""
  const ano = params.get("ano") ?? ""
  const tema = params.get("tema") ?? ""
  const q = params.get("q") ?? ""
  const ordem = params.get("ordem") ?? "recentes"
  const [visible, setVisible] = useState(pageSize)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setVisible(pageSize)
    const timer = window.setTimeout(() => setLoading(false), 300)
    return () => window.clearTimeout(timer)
  }, [tipo, ano, tema, q, ordem])

  const items = useMemo(
    () => filterPublications(content.publicacoes, { tipo, ano, tema, q, ordem }),
    [content.publicacoes, tipo, ano, tema, q, ordem],
  )
  const years = useMemo(
    () => [...new Set(content.publicacoes.map((item) => item.year))].sort((a, b) => b - a),
    [content.publicacoes],
  )
  const shown = items.slice(0, visible)
  const sortValue = ordem === "antigas" ? "antigas" : "recentes"
  const yearOptions = useMemo(
    () => [
      { value: ALL_YEARS, label: "Todos os anos" },
      ...years.map((year) => ({ value: String(year), label: String(year) })),
    ],
    [years],
  )
  const themeOptions = useMemo(
    () => [
      { value: ALL_THEMES, label: "Todos os temas" },
      ...themes.map((item) => ({ value: item.id, label: item.label })),
    ],
    [],
  )

  function update(next: Record<string, string>) {
    const draft = new URLSearchParams(params)
    for (const [key, value] of Object.entries(next)) {
      if (value) draft.set(key, value)
      else draft.delete(key)
    }
    setParams(draft, { preventScrollReset: true })
  }

  return (
    <div className="bg-surface">
      <PageHero
        background="#493975"
        title="Publicações"
        titleColor="#d0e770"
        statement="Pesquisas, levantamentos e artigos do Vozes — para quem decide com informação de qualidade."
        image={photo}
        imageAlt="Leitura, imagem provisória"
      />
      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-5xl leading-[54px]">Todas as publicações</h2>
          <button
            type="button"
            className="text-[15px] font-medium"
            onClick={() => setParams(new URLSearchParams(), { preventScrollReset: true })}
          >
            {items.length} resultados · Limpar filtros
          </button>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Input
            value={q}
            onChange={(event) => update({ q: event.target.value })}
            placeholder="Buscar publicação"
            aria-label="Buscar publicação"
            className={roundFilterInput}
          />
          {publicationTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => update({ tipo: tipo === type ? "" : type })}
              className={cn(
                roundFilterPill(),
                tipo === type ? "border-indigo bg-indigo font-extrabold text-white" : "",
              )}
            >
              {type}
            </button>
          ))}
          <ListingFilterSelect
            ariaLabel="Filtrar por ano"
            prefix="Ano:"
            placeholder="Todos"
            value={ano || ALL_YEARS}
            options={yearOptions}
            onValueChange={(value) => update({ ano: value === ALL_YEARS ? "" : value })}
          />
          <ListingFilterSelect
            ariaLabel="Filtrar por tema"
            prefix="Tema:"
            placeholder="Todos"
            value={tema || ALL_THEMES}
            options={themeOptions}
            onValueChange={(value) => update({ tema: value === ALL_THEMES ? "" : value })}
            triggerClassName="min-w-[14rem]"
          />
          <ListingFilterSelect
            ariaLabel="Ordenar publicações"
            prefix="Ordenar:"
            value={sortValue}
            options={[...sortOptions]}
            onValueChange={(value) => update({ ordem: value === "recentes" ? "" : "antigas" })}
          />
        </div>
        <div className="mt-8">
          {loading ? (
            <ListingState kind="loading" />
          ) : shown.length === 0 ? (
            <ListingState kind="empty" onClear={() => setParams(new URLSearchParams(), { preventScrollReset: true })} />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {shown.map((item) => (
                <PublicationCard key={item.slug} item={item} />
              ))}
            </div>
          )}
        </div>
        {!loading && visible < items.length ? (
          <div className="mt-10 text-center">
            <p className="text-[15px] text-violet">
              Mostrando {shown.length} de {items.length}
            </p>
            <BrandButton
              type="button"
              tone="outline"
              pillSize="md"
              className="mt-3"
              onClick={() => setVisible((value) => value + pageSize)}
            >
              Carregar mais
            </BrandButton>
          </div>
        ) : null}
      </section>
    </div>
  )
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex max-w-[640px] flex-col gap-6">
      {blocks.map((block, index) => {
        if (block.type === "h2") return <h2 key={index} className="font-display text-[32px] leading-[38px] font-medium">{block.text}</h2>
        if (block.type === "h3") return <h3 key={index} className="font-display text-2xl font-medium">{block.text}</h3>
        if (block.type === "list") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }
        if (block.type === "quote") return <blockquote key={index} className="border-l-4 border-orange pl-6 text-[22px] leading-[34px]">“{block.text}”</blockquote>
        if (block.type === "image") {
          return (
            <figure key={index}>
              <img src={block.src} alt={block.alt} className="w-full rounded-[20px] object-cover" />
              <figcaption className="mt-2 text-[15px] text-violet">{block.caption}</figcaption>
            </figure>
          )
        }
        if (block.type === "stat") {
          return (
            <div key={index} className="flex items-center gap-6 rounded-[20px] bg-paper p-6">
              <p className="font-display text-6xl">{block.value}</p>
              <p>{block.text}</p>
            </div>
          )
        }
        return <p key={index} className="text-lg leading-[29px]">{block.text}</p>
      })}
    </div>
  )
}

function PublicationShareLink() {
  const [copied, setCopied] = useState(false)

  async function share() {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
  }

  return (
    <button
      type="button"
      onClick={share}
      className="text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase"
    >
      {copied ? "Link copiado" : "Compartilhar"}
    </button>
  )
}

function PublicationPdfDownload({ item }: { item: Publication }) {
  if (!item.pdfUrl) return null

  const label = item.pdfSizeLabel ? `Baixar PDF (${item.pdfSizeLabel})` : "Baixar PDF"

  return (
    <BrandButton tone="orange" pillSize="md" asChild>
      <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    </BrandButton>
  )
}

export function PostPublicacaoPage() {
  const { slug = "" } = useParams()
  const { ready, publicacoes } = useSiteContent()
  const item = publicationBySlug(publicacoes, slug)
  if (!ready) return <div className="bg-surface px-6 py-16"><ListingState kind="loading" /></div>
  if (!item) return <Navigate to="/nao-encontrada" replace />
  const related = relatedPublications(publicacoes, item.slug)
  const yearLine = item.pageCount ? `${item.year} · ${item.pageCount} páginas` : String(item.year)
  return (
    <article className="bg-surface">
      <header className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-16 md:grid-cols-[400px_1fr] md:px-20">
        <img
          src={item.image}
          alt={item.title}
          className="aspect-[3/4] w-full rounded-[20px] object-cover"
          style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
        />
        <div className="self-center">
          <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">
            Publicação · {item.year}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[56px] font-medium text-ink">{item.title}</h1>
          <p className="mt-6 max-w-xl text-[22px] leading-[34px] text-ink">{item.excerpt}</p>
          <dl className="mt-6 space-y-1 text-[15px] leading-[22px] text-violet">
            {item.authorship ? (
              <div>
                <dt className="inline font-medium">Autoria: </dt>
                <dd className="inline">{item.authorship}</dd>
              </div>
            ) : null}
            <div>
              <dt className="inline font-medium">Ano: </dt>
              <dd className="inline">{yearLine}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-2">
            {item.themes.map((theme) => (
              <ThemeTag key={theme} id={theme} />
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <PublicationPdfDownload item={item} />
            <PublicationShareLink />
          </div>
        </div>
      </header>
      <div className="mx-auto w-full max-w-[1440px] px-6 pb-16 md:px-20 md:pl-[496px]">
        <Blocks blocks={item.body} />
      </div>
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-20">
        <h2 className="font-display text-[32px] leading-[38px]">Relacionadas</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {related.map((publication) => (
            <PublicationCard key={publication.slug} item={publication} />
          ))}
        </div>
      </section>
    </article>
  )
}

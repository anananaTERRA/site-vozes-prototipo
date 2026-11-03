import { useEffect, useMemo, useState } from "react"
import { Link, Navigate, useParams, useSearchParams } from "react-router"
import photo from "@/assets/photo-impacto.png"
import { BrandButton } from "@/components/brand/BrandButton"
import { PublicationCard } from "@/components/content/Cards"
import { ListingState } from "@/components/content/ListingState"
import { ThemeTag } from "@/components/content/ThemeTag"
import { PageHero } from "@/components/layout/PageHero"
import { themes } from "@/content/themes"
import {
  filterPublications,
  publicationBySlug,
  publicationTypes,
  publicationYears,
  relatedPublications,
} from "@/content/posts"
import type { Block } from "@/content/types"
import { formatDate } from "@/lib/format"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

const pageSize = 4

export function PublicacoesPage() {
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

  const items = useMemo(() => filterPublications({ tipo, ano, tema, q, ordem }), [tipo, ano, tema, q, ordem])
  const shown = items.slice(0, visible)
  const activeTheme = themes.find((item) => item.id === tema)

  function update(next: Record<string, string>) {
    const draft = new URLSearchParams(params)
    for (const [key, value] of Object.entries(next)) {
      if (value) draft.set(key, value)
      else draft.delete(key)
    }
    setParams(draft)
  }

  return (
    <div className="bg-white">
      <PageHero
        background="#493975"
        title="Publicações"
        titleColor="#ff8327"
        statement="Pesquisas, levantamentos e artigos do Vozes — para quem decide com informação de qualidade."
        image={photo}
        imageAlt="Leitura, imagem provisória"
      />
      <section className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-5xl leading-[54px]">Todas as publicações</h2>
          <button type="button" className="text-[15px] font-medium" onClick={() => setParams(new URLSearchParams())}>
            {items.length} resultados · Limpar filtros
          </button>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Input
            value={q}
            onChange={(event) => update({ q: event.target.value })}
            placeholder="Buscar publicação"
            aria-label="Buscar publicação"
            className="h-12 max-w-sm rounded-full border-2 border-line"
          />
          {publicationTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => update({ tipo: tipo === type ? "" : type })}
              className={`h-12 rounded-full border-2 px-5 text-[15px] font-extrabold ${tipo === type ? "border-indigo bg-indigo text-white" : "border-line"}`}
            >
              {type}
            </button>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="h-12 rounded-full border-2 border-line px-5 text-[15px] font-medium">
                {ano || "Ano"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => update({ ano: "" })}>Todos os anos</DropdownMenuItem>
              {publicationYears.map((year) => (
                <DropdownMenuItem key={year} onClick={() => update({ ano: String(year) })}>
                  {year}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="h-12 rounded-full border-2 border-line px-5 text-[15px] font-medium">
                {activeTheme?.short ?? "Tema"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => update({ tema: "" })}>Todos os temas</DropdownMenuItem>
              {themes.map((item) => (
                <DropdownMenuItem key={item.id} onClick={() => update({ tema: item.id })}>
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <button type="button" className="h-12 rounded-full border-2 border-line px-5 text-[15px] font-medium" onClick={() => update({ ordem: ordem === "antigas" ? "" : "antigas" })}>
            Ordenar: {ordem === "antigas" ? "Mais antigas" : "Mais recentes"}
          </button>
        </div>
        <div className="mt-8">
          {loading ? (
            <ListingState kind="loading" />
          ) : shown.length === 0 ? (
            <ListingState kind="empty" onClear={() => setParams(new URLSearchParams())} />
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
            <BrandButton type="button" tone="outline" className="mt-3" onClick={() => setVisible((value) => value + pageSize)}>
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

export function PostPublicacaoPage() {
  const { slug = "" } = useParams()
  const item = publicationBySlug(slug)
  if (!item) return <Navigate to="/nao-encontrada" replace />
  const related = relatedPublications(item.slug)
  return (
    <article className="bg-white">
      <header className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-16 md:grid-cols-[400px_1fr] md:px-20">
        <img src={item.image} alt="" className="aspect-[3/4] w-full rounded-[20px] object-cover" />
        <div className="self-center">
          <p className="text-[15px] font-medium text-violet">
            <Link to="/publicacoes">Publicações</Link>
          </p>
          <p className="mt-4 text-[13px] font-extrabold tracking-[1.04px] text-orange uppercase">
            {item.type} · {item.year} · {formatDate(item.date)}
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[56px] font-medium">{item.title}</h1>
          <p className="mt-6 max-w-xl text-[22px] leading-[34px]">{item.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {item.themes.map((theme) => (
              <ThemeTag key={theme} id={theme} />
            ))}
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

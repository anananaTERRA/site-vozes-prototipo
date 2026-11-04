import { useEffect, useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router"
import photo from "@/assets/photo-vozes.png"
import { BrandButton } from "@/components/brand/BrandButton"
import { EventCard, NewsCard, PressCard } from "@/components/content/Cards"
import { ListingState } from "@/components/content/ListingState"
import { ThemeTag } from "@/components/content/ThemeTag"
import { PageHero } from "@/components/layout/PageHero"
import { useSiteContent } from "@/content/provider"
import { filterFeed, type FeedKind } from "@/content/posts"
import { themes } from "@/content/themes"
import type { EventArticle, NewsArticle, PressItem } from "@/content/types"
import { formatDate } from "@/lib/format"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tabs: { id: FeedKind; label: string }[] = [
  { id: "tudo", label: "Tudo" },
  { id: "noticias", label: "Notícias" },
  { id: "eventos", label: "Eventos" },
  { id: "midia", label: "Na mídia" },
]

const pageSize = 6

export function VozesPage() {
  const [params, setParams] = useSearchParams()
  const content = useSiteContent()
  const tipo = (params.get("tipo") as FeedKind | null) ?? "tudo"
  const tema = params.get("tema") ?? ""
  const q = params.get("q") ?? ""
  const ordem = params.get("ordem") ?? "recentes"
  const forceError = params.get("estado") === "erro"
  const [visible, setVisible] = useState(pageSize)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setVisible(pageSize)
    const timer = window.setTimeout(() => setLoading(false), 350)
    return () => window.clearTimeout(timer)
  }, [tipo, tema, q, ordem])

  const { items, destaque } = useMemo(
    () => filterFeed(content, { tipo: tabs.some((tab) => tab.id === tipo) ? tipo : "tudo", tema, q, ordem }),
    [content, tipo, tema, q, ordem],
  )

  function update(next: Record<string, string>) {
    const draft = new URLSearchParams(params)
    for (const [key, value] of Object.entries(next)) {
      if (value) draft.set(key, value)
      else draft.delete(key)
    }
    setParams(draft)
  }

  function clearFilters() {
    setParams(new URLSearchParams())
  }

  const shown = items.slice(0, visible)
  const activeTheme = themes.find((item) => item.id === tema)

  return (
    <div className="bg-surface">
      <PageHero
        background="#ff8327"
        title="Vozes na mídia"
        titleColor="#493975"
        statement="Aqui você acompanha nossas aparições na mídia: em entrevistas, debates e eventos sobre educação."
        textColor="#493975"
        image={photo}
        imageAlt="Entrevista, imagem provisória"
      />
      <section id="imprensa" className="mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-8 px-6 py-16 md:flex-row md:px-20">
        <div className="max-w-xl">
          <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">Assessoria de imprensa</p>
          <p className="mt-3 text-lg leading-[29px]">
            Para entrevistas, dados e posicionamentos, fale com a equipe. Respondemos com o contexto do que está em pauta.
          </p>
        </div>
        <div>
          <p className="font-display text-[32px] leading-10">(11) 94629-2212</p>
          <p className="mt-2 text-[15px]">contato@…</p>
          <BrandButton asChild tone="outline" className="mt-4 h-12">
            <Link to="/contato?assunto=imprensa">Enviar mensagem</Link>
          </BrandButton>
        </div>
      </section>

      {destaque ? (
        <section className="mx-auto grid w-full max-w-[1440px] items-center gap-8 px-6 pb-8 md:grid-cols-[720px_1fr] md:px-20">
          <img src={destaque.image} alt="" className="aspect-video w-full rounded-[20px] object-cover" />
          <div>
            <p className="text-[13px] font-extrabold tracking-[1.04px] uppercase">Destaque · {formatDate(destaque.date)}</p>
            <h2 className="mt-4 font-display text-4xl leading-[48px] font-medium">{destaque.title}</h2>
            <p className="mt-4 text-lg leading-[29px]">{destaque.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {destaque.themes.map((item) => (
                <ThemeTag key={item} id={item} />
              ))}
            </div>
            <BrandButton asChild tone="link-indigo" className="mt-4 px-0">
              <Link to={`/vozes/noticias/${destaque.slug}`}>Ler notícia</Link>
            </BrandButton>
          </div>
        </section>
      ) : null}

      <section className="mx-auto w-full max-w-[1440px] px-6 py-10 md:px-20">
        <Tabs value={tipo} onValueChange={(value) => update({ tipo: value === "tudo" ? "" : value })}>
          <TabsList className="h-auto gap-6 bg-transparent p-0">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="rounded-none bg-transparent px-0 text-[15px] font-extrabold data-active:bg-transparent data-active:shadow-none">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Input
            value={q}
            onChange={(event) => update({ q: event.target.value })}
            placeholder="Buscar na listagem"
            className="h-12 max-w-sm rounded-2xl border-2 border-line"
            aria-label="Buscar na listagem"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="h-12 rounded-2xl border-2 border-line px-4 text-[15px] font-medium">
                {activeTheme?.label ?? "Temas"}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="h-12 rounded-2xl border-2 border-line px-4 text-[15px] font-medium">
                Ordenar: {ordem === "antigas" ? "Mais antigas" : "Mais recentes"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => update({ ordem: "" })}>Mais recentes</DropdownMenuItem>
              <DropdownMenuItem onClick={() => update({ ordem: "antigas" })}>Mais antigas</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="ml-auto text-[15px] font-medium text-violet">{items.length + (destaque ? 1 : 0)} resultados</p>
        </div>
        {activeTheme ? (
          <div className="mt-4 flex items-center gap-4">
            <ThemeTag id={activeTheme.id} />
            <button type="button" className="text-[15px] font-medium" onClick={clearFilters}>
              Limpar filtros
            </button>
          </div>
        ) : null}

        <div className="mt-8">
          {forceError ? (
            <ListingState
              kind="error"
              onRetry={() => {
                update({ estado: "" })
              }}
            />
          ) : loading ? (
            <ListingState kind="loading" />
          ) : shown.length === 0 ? (
            <ListingState kind="empty" onClear={clearFilters} />
          ) : (
            <div className="grid gap-x-8 gap-y-10 md:grid-cols-3">
              {shown.map((item) => {
                if (item.kind === "noticia") return <NewsCard key={item.slug} item={item as NewsArticle} />
                if (item.kind === "evento") return <EventCard key={item.slug} item={item as EventArticle} />
                return <PressCard key={item.slug} item={item as PressItem} />
              })}
            </div>
          )}
        </div>
        {!loading && !forceError && visible < items.length ? (
          <div className="mt-10 text-center">
            <p className="text-[15px] text-violet">
              Mostrando {shown.length} de {items.length}
            </p>
            <BrandButton
              type="button"
              tone="outline"
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

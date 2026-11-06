import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router"
import { heroPhotos } from "@/content/hero-photos"
import { BrandButton } from "@/components/brand/BrandButton"
import { EventCard, FeaturedNewsCard, NewsCard } from "@/components/content/Cards"
import { ListingFilterSelect } from "@/components/content/ListingFilterSelect"
import { ListingState } from "@/components/content/ListingState"
import { ThemeFilterChip } from "@/components/content/ThemeFilterChip"
import { PageHero } from "@/components/layout/PageHero"
import { pressPhone } from "@/content/institutional"
import { useSiteContent } from "@/content/provider"
import { filterFeed, type FeedKind } from "@/content/posts"
import { themes } from "@/content/themes"
import type { EventArticle, NewsArticle } from "@/content/types"
import { cn } from "cn"
import { roundFilterInput } from "@/lib/round-control"
import { parseThemeFilter, serializeThemeFilter, toggleThemeFilter } from "@/lib/theme-filter"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const sortOptions = [
  { value: "recentes", label: "Mais recentes" },
  { value: "antigas", label: "Mais antigas" },
] as const

type VozesTab = Exclude<FeedKind, "midia">

const tabs: { id: VozesTab; label: string }[] = [
  { id: "tudo", label: "Tudo" },
  { id: "noticias", label: "Notícias" },
  { id: "eventos", label: "Eventos" },
]

const pageSize = 6

export function VozesPage() {
  const [params, setParams] = useSearchParams()
  const content = useSiteContent()
  const rawTipo = params.get("tipo")
  const tipo: VozesTab =
    rawTipo === "noticias" || rawTipo === "eventos" ? rawTipo : "tudo"
  const tema = params.get("tema") ?? ""
  const q = params.get("q") ?? ""
  const ordem = params.get("ordem") ?? "recentes"
  const forceError = params.get("estado") === "erro"
  const [visible, setVisible] = useState(pageSize)
  const [loading, setLoading] = useState(false)
  const scrollLockY = useRef<number | null>(null)

  useEffect(() => {
    setVisible(pageSize)
  }, [tipo, tema, q, ordem])

  useEffect(() => {
    setLoading(true)
    const timer = window.setTimeout(() => setLoading(false), 350)
    return () => window.clearTimeout(timer)
  }, [tema, q, ordem])

  useLayoutEffect(() => {
    if (scrollLockY.current === null) return
    window.scrollTo({ top: scrollLockY.current, left: 0, behavior: "instant" })
    scrollLockY.current = null
  }, [tipo])

  const { items, destaque } = useMemo(
    () => filterFeed(content, { tipo, tema, q, ordem }),
    [content, tipo, tema, q, ordem],
  )

  function update(next: Record<string, string>) {
    const draft = new URLSearchParams(params)
    for (const [key, value] of Object.entries(next)) {
      if (value) draft.set(key, value)
      else draft.delete(key)
    }
    if (draft.get("tipo") === "midia") draft.delete("tipo")
    setParams(draft, { preventScrollReset: true })
  }

  function clearFilters() {
    setParams(new URLSearchParams(), { preventScrollReset: true })
  }

  const shown = items.slice(0, visible)
  const selectedTemas = parseThemeFilter(tema)
  const sortValue = ordem === "antigas" ? "antigas" : "recentes"

  function toggleTema(id: (typeof themes)[number]["id"]) {
    const next = toggleThemeFilter(selectedTemas, id)
    update({ tema: serializeThemeFilter(next) })
  }

  function setTipo(next: VozesTab) {
    scrollLockY.current = window.scrollY
    update({ tipo: next === "tudo" ? "" : next })
  }

  return (
    <div className="bg-surface">
      <PageHero
        background="#d0e770"
        title="Vozes na mídia"
        titleColor="#0d6353"
        statement="Aqui você acompanha nossas aparições na mídia: em entrevistas, debates e eventos sobre educação."
        textColor="#0d6353"
        image={heroPhotos.vozesMidia}
        imageAlt="Entrevista ou evento: palestrante com microfone"
        imageObjectPosition="50% 28%"
      />
      <section id="imprensa" className="scroll-mt-28 mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-8 px-6 py-16 md:flex-row md:px-20">
        <div className="max-w-xl">
          <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">Assessoria de imprensa</p>
          <p className="mt-3 text-lg leading-[29px]">
            Para entrevistas, pautas e participação em eventos, fale com a nossa assessoria.
          </p>
        </div>
        <div>
          <p className="font-display text-[32px] leading-10">
            ({pressPhone.slice(0, 2)}) {pressPhone.slice(3)}
          </p>
          <p className="mt-2 text-[15px]">contato@…</p>
          <BrandButton asChild tone="outline" pillSize="md" className="mt-4">
            <Link to="/contato?assunto=imprensa">Enviar mensagem</Link>
          </BrandButton>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 py-10 md:px-20">
        <Tabs value={tipo} onValueChange={(value) => setTipo(value as VozesTab)}>
          <div className="border-b border-line">
            <TabsList
              variant="line"
              className="h-auto w-full justify-start gap-6 rounded-none border-0 bg-transparent p-0"
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "h-auto flex-none rounded-none border-0 bg-transparent px-0 pb-3 pt-0 text-[15px] font-extrabold",
                    "text-violet/45 shadow-none hover:text-navy focus-visible:ring-0 focus-visible:outline-none",
                    "after:hidden data-active:bg-transparent data-active:text-navy",
                    "data-active:shadow-[inset_0_-2px_0_0_var(--color-violet)]",
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Input
            value={q}
            onChange={(event) => update({ q: event.target.value })}
            placeholder="Buscar na listagem"
            className={roundFilterInput}
            aria-label="Buscar na listagem"
          />
          <ListingFilterSelect
            ariaLabel="Ordenar listagem"
            prefix="Ordenar:"
            value={sortValue}
            options={[...sortOptions]}
            onValueChange={(value) => update({ ordem: value === "recentes" ? "" : "antigas" })}
          />
          <p className="ml-auto text-[15px] font-medium text-violet">{items.length + (destaque ? 1 : 0)} resultados</p>
        </div>
        <div className="mt-5">
          <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">Temas</p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filtrar por temas">
            {themes.map((item) => (
              <ThemeFilterChip
                key={item.id}
                id={item.id}
                selected={selectedTemas.includes(item.id)}
                onToggle={toggleTema}
              />
            ))}
          </div>
          {selectedTemas.length > 0 || q || tipo !== "tudo" ? (
            <button type="button" className="mt-4 text-[15px] font-medium text-navy underline-offset-2 hover:underline" onClick={clearFilters}>
              Limpar filtros
            </button>
          ) : null}
        </div>

        {destaque ? <FeaturedNewsCard item={destaque} /> : null}

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
                return <EventCard key={item.slug} item={item as EventArticle} />
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

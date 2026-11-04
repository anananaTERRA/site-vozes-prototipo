import { useMemo, useState } from "react"
import { Link, useNavigate } from "react-router"
import { useSiteContent } from "@/content/provider"
import { recentSearches, searchContent } from "@/content/posts"
import { themes } from "@/content/themes"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import searchIcon from "@/assets/icon-search.svg"
import { themeTag } from "@/lib/round-control"

export function SearchMenu({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const navigate = useNavigate()
  const content = useSiteContent()
  const [query, setQuery] = useState("")
  const [expanded, setExpanded] = useState(false)
  const results = useMemo(() => searchContent(content, query), [content, query])
  const visible = expanded ? results : results.slice(0, 6)

  function go(href: string, external?: boolean) {
    onOpenChange(false)
    setQuery("")
    if (external) {
      window.open(href, "_blank", "noreferrer")
      return
    }
    void navigate(href)
  }

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Fechar busca"
          className="fixed inset-0 z-40 bg-indigo/45"
          onClick={() => onOpenChange(false)}
        />
      ) : null}
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <button type="button" aria-label="Buscar no site" className="relative z-50 grid size-10 place-items-center">
            <img src={searchIcon} alt="" className="size-6 dark:brightness-0 dark:invert" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={18}
          className="z-50 w-[min(480px,calc(100vw-2rem))] rounded-[20px] border-none p-4 shadow-xl"
        >
          <div className="flex items-center gap-2 rounded-xl border border-line px-3">
            <img src={searchIcon} alt="" className="size-4 dark:brightness-0 dark:invert" />
            <Input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setExpanded(false)
              }}
              placeholder="Buscar notícias, eventos e publicações"
              className="h-11 border-0 px-0 shadow-none focus-visible:ring-0"
              autoFocus
            />
            {query ? (
              <button type="button" className="text-sm font-extrabold text-violet" onClick={() => setQuery("")}>
                Limpar
              </button>
            ) : null}
          </div>
          {query.trim() === "" ? (
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">Temas</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {themes.map((theme) => (
                    <Link
                      key={theme.id}
                      to={`/vozes?tema=${theme.id}`}
                      onClick={() => onOpenChange(false)}
                      className={themeTag()}
                      style={{ background: theme.background, color: theme.foreground }}
                    >
                      {theme.short}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">Recentes</p>
                <ul className="mt-2">
                  {recentSearches(content).map((item) => (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={() => go(item.href)}
                        className="flex w-full gap-3 py-2 text-left"
                      >
                        <span className="w-24 shrink-0 text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">
                          {item.type}
                        </span>
                        <span className="line-clamp-1 text-[15px] leading-[22px]">{item.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="mt-3">
              {visible.length === 0 ? (
                <p className="py-6 text-[15px] leading-[22px] text-violet">Nada encontrado para “{query}”.</p>
              ) : (
                <ul>
                  {visible.map((item) => (
                    <li key={`${item.type}-${item.href}`} className="border-b border-line last:border-0">
                      <button
                        type="button"
                        onClick={() => go(item.href, item.external)}
                        className="flex w-full gap-3 py-2.5 text-left"
                      >
                        <span className="w-24 shrink-0 text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">
                          {item.type}
                        </span>
                        <span className="line-clamp-2 text-[15px] leading-[22px]">{item.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {results.length > 6 && !expanded ? (
                <button
                  type="button"
                  className="mt-2 text-[15px] font-extrabold text-ink"
                  onClick={() => setExpanded(true)}
                >
                  Ver todos
                </button>
              ) : null}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  )
}

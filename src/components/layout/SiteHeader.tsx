import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react"
import { AnimatePresence, motion } from "motion/react"
import { createPortal } from "react-dom"
import { Link, NavLink, useLocation } from "react-router"
import { Menu, X } from "lucide-react"
import logo from "@/assets/logo.svg"
import { BrandButton } from "@/components/brand/BrandButton"
import { SearchMenu } from "@/components/layout/SearchMenu"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { cn } from "cn"

const links = [
  { to: "/quem-somos", label: "Quem somos" },
  { to: "/o-que-fazemos", label: "O que fazemos" },
  { to: "/vozes", label: "Vozes na mídia" },
  { to: "/publicacoes", label: "Publicações" },
]

type BarBox = { left: number; width: number }

function isCurrent(pathname: string, to: string) {
  return pathname === to || pathname.startsWith(`${to}/`)
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => setReduce(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  return reduce
}

const barPadding =
  "pr-[max(1rem,env(safe-area-inset-right))] pl-[max(1rem,env(safe-area-inset-left))] sm:pr-[max(1.5rem,env(safe-area-inset-right))] sm:pl-[max(1.5rem,env(safe-area-inset-left))] md:pr-[max(5rem,env(safe-area-inset-right))] md:pl-[max(5rem,env(safe-area-inset-left))]"

export function SiteHeader() {
  const location = useLocation()
  const reduceMotion = usePrefersReducedMotion()
  const headerRef = useRef<HTMLElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [compact, setCompact] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [barHeight, setBarHeight] = useState(88)
  const [boxes, setBoxes] = useState<Record<string, BarBox>>({})
  const [hovered, setHovered] = useState<string | null>(null)

  const activeTo = links.find((item) => isCurrent(location.pathname, item.to))?.to ?? null
  const activeBox = activeTo ? boxes[activeTo] : undefined
  const hoverTo = hovered && hovered !== activeTo ? hovered : null
  const hoverBox = hoverTo ? boxes[hoverTo] : undefined

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const state = location.state as { openSearch?: boolean } | null
    if (state?.openSearch) setSearchOpen(true)
  }, [location.state])

  useEffect(() => {
    setMenuOpen(false)
    setHovered(null)
  }, [location.pathname])

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)")
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false)
    }
    desktop.addEventListener("change", closeOnDesktop)
    return () => desktop.removeEventListener("change", closeOnDesktop)
  }, [])

  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el) return
    const update = () => setBarHeight(el.offsetHeight)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const measure = () => {
      const navBox = nav.getBoundingClientRect()
      const next: Record<string, BarBox> = {}
      for (const item of links) {
        const el = linkRefs.current[item.to]
        if (!el) continue
        const rect = el.getBoundingClientRect()
        next[item.to] = {
          left: Math.round((rect.left - navBox.left) * 10) / 10,
          width: Math.round(rect.width * 10) / 10,
        }
      }
      setBoxes((prev) => {
        const unchanged = links.every((item) => {
          const before = prev[item.to]
          const after = next[item.to]
          if (!before || !after) return false
          return Math.abs(before.left - after.left) < 0.5 && Math.abs(before.width - after.width) < 0.5
        })
        return unchanged ? prev : next
      })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(nav)
    for (const item of links) {
      const el = linkRefs.current[item.to]
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const main = document.querySelector("main")
    const footer = document.querySelector("footer")
    if (!menuOpen) {
      root.classList.remove("nav-open")
      main?.removeAttribute("inert")
      footer?.removeAttribute("inert")
      return
    }

    root.classList.add("nav-open")
    main?.setAttribute("inert", "")
    footer?.setAttribute("inert", "")

    const menu = menuRef.current
    const header = headerRef.current
    const blockBackgroundScroll = (event: TouchEvent) => {
      const target = event.target
      if (!(target instanceof Node)) return
      if (menu?.contains(target) || header?.contains(target)) return
      event.preventDefault()
    }
    document.addEventListener("touchmove", blockBackgroundScroll, { passive: false })

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }
      if (event.key !== "Tab" || !menu || !header) return
      const focusable = [header, menu].flatMap((node) =>
        [...node.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input, textarea, select")].filter(
          (el) => el.tabIndex !== -1,
        ),
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)

    return () => {
      root.classList.remove("nav-open")
      main?.removeAttribute("inert")
      footer?.removeAttribute("inert")
      document.removeEventListener("touchmove", blockBackgroundScroll)
      document.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  function toggleMenu() {
    setMenuOpen((open) => {
      const next = !open
      if (next) setSearchOpen(false)
      return next
    })
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 border-b border-transparent bg-surface pt-[env(safe-area-inset-top)] dark:border-line",
        "mr-[calc(env(safe-area-inset-right)*-1)] ml-[calc(env(safe-area-inset-left)*-1)]",
      )}
    >
      <div className={cn("flex items-center justify-between gap-2", barPadding, compact && !menuOpen ? "h-16" : "h-[88px]")}>
        <Link to="/" aria-label="Vozes da Educação" className="shrink-0" onClick={() => setMenuOpen(false)}>
          <img
            src={logo}
            alt="Vozes da Educação"
            className="h-11 w-[108px] object-contain object-left dark:brightness-0 dark:invert"
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <nav
            ref={navRef}
            className="relative hidden items-center gap-6 lg:flex"
            aria-label="Principal"
            onMouseLeave={() => setHovered(null)}
          >
            {links.map((item) => {
              const active = item.to === activeTo
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  ref={(node) => {
                    linkRefs.current[item.to] = node
                  }}
                  onMouseEnter={() => setHovered(active ? null : item.to)}
                  className="pb-[6px] text-[13px] font-extrabold tracking-[1.04px] text-ink uppercase"
                >
                  {item.label}
                </NavLink>
              )
            })}
            <AnimatePresence>
              {hoverBox && hoverBox.width > 0 && (
                <motion.span
                  key={hoverTo}
                  aria-hidden
                  className="pointer-events-none absolute bottom-0 z-0 h-0.5 bg-violet/35"
                  style={{ left: hoverBox.left, width: hoverBox.width, originX: 0.5 }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0, transition: { duration: reduceMotion ? 0 : 0.14, ease: "easeIn" } }}
                  transition={
                    reduceMotion ? { duration: 0 } : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }
                  }
                />
              )}
            </AnimatePresence>
            {activeBox && activeBox.width > 0 ? (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute bottom-0 z-[1] h-0.5 bg-violet"
                initial={false}
                animate={{ left: activeBox.left, width: activeBox.width }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 36, mass: 0.6 }
                }
              />
            ) : null}
          </nav>
          <SearchMenu
            open={searchOpen}
            onOpenChange={(open) => {
              setSearchOpen(open)
              if (open) setMenuOpen(false)
            }}
          />
          <button
            ref={menuButtonRef}
            type="button"
            className="grid size-10 shrink-0 place-items-center rounded-full text-ink hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={toggleMenu}
          >
            {menuOpen ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
          <div className="flex shrink-0 items-center gap-2">
            <BrandButton tone="outline" asChild className="hidden h-12 px-5 lg:inline-flex">
              <Link to="/contato">Contato</Link>
            </BrandButton>
            <ThemeToggle />
          </div>
        </div>
      </div>
      {menuOpen
        ? createPortal(
            <nav
              ref={menuRef}
              id="menu-principal"
              aria-label="Principal"
              className={cn(
                "mobile-nav overflow-y-auto border-t border-line bg-surface pt-2 lg:hidden",
                "pr-[max(1.5rem,env(safe-area-inset-right))] pl-[max(1.5rem,env(safe-area-inset-left))]",
              )}
              style={{ "--header-bar": `${barHeight}px` } as CSSProperties}
            >
              <ul className="flex flex-col">
                {links.map((item) => (
                  <li key={item.to} className="border-b border-line">
                    <NavLink
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-14 items-center justify-between gap-4 py-3 text-base font-extrabold tracking-[1.04px] text-ink uppercase"
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          <span className={cn("h-0.5 w-8 shrink-0 bg-violet", isActive ? "opacity-100" : "opacity-0")} />
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <BrandButton tone="outline" asChild className="mt-8 w-full">
                <Link to="/contato" onClick={() => setMenuOpen(false)}>
                  Contato
                </Link>
              </BrandButton>
            </nav>,
            document.body,
          )
        : null}
    </header>
  )
}

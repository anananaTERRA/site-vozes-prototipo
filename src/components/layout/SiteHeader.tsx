import { useEffect, useState } from "react"
import { Link, NavLink, useLocation } from "react-router"
import logo from "@/assets/logo.svg"
import { BrandButton } from "@/components/brand/BrandButton"
import { SearchMenu } from "@/components/layout/SearchMenu"
import { cn } from "cn"

const links = [
  { to: "/quem-somos", label: "Quem somos" },
  { to: "/o-que-fazemos", label: "O que fazemos" },
  { to: "/vozes", label: "Vozes na mídia" },
  { to: "/publicacoes", label: "Publicações" },
]

export function SiteHeader() {
  const location = useLocation()
  const [compact, setCompact] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

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

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between bg-white px-6 transition-[height] md:px-20",
        compact ? "h-16" : "h-[88px]",
      )}
    >
      <Link to="/" aria-label="Vozes da Educação" className="shrink-0">
        <img src={logo} alt="Vozes da Educação" className="h-11 w-[108px] object-contain object-left" />
      </Link>
      <div className="flex items-center gap-6">
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {links.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1 text-[13px] font-extrabold tracking-[1.04px] text-indigo uppercase"
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span className={cn("h-0.5 w-full bg-violet", isActive ? "opacity-100" : "opacity-0")} />
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <SearchMenu open={searchOpen} onOpenChange={setSearchOpen} />
        <BrandButton tone="outline" asChild className="h-12 px-5">
          <Link to="/contato">Contato</Link>
        </BrandButton>
      </div>
    </header>
  )
}

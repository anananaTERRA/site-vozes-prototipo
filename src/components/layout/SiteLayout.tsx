import { useEffect } from "react"
import { Outlet, ScrollRestoration, useLocation } from "react-router"
import { RouteSeo } from "@/components/seo/RouteSeo"
import { ContentProvider } from "@/content/provider"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import {
  isOQueFazemosPath,
  scrollToHashAfterPaint,
  SERVICE_ANCHOR_IDS,
} from "@/lib/scroll-to-hash"

export function SiteLayout() {
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    const hash = location.hash
    if (!hash) return
    const id = hash.replace(/^#/, "")
    if (isOQueFazemosPath(pathname) && SERVICE_ANCHOR_IDS.has(id)) return
    return scrollToHashAfterPaint(hash, "auto")
  }, [location.hash, pathname])

  return (
    <ContentProvider>
      <RouteSeo />
      <div className="bleed-x min-h-dvh bg-paper text-ink">
        <SiteHeader />
        <main>
          <Outlet />
        </main>
        <SiteFooter
          showCta={pathname !== "/contato"}
          ctaVariant={pathname === "/quem-somos" ? "quem-somos" : "default"}
        />
        <ScrollRestoration getKey={(location) => location.pathname} />
      </div>
    </ContentProvider>
  )
}

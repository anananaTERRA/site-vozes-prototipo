import { Outlet, ScrollRestoration, useLocation } from "react-router"
import { RouteSeo } from "@/components/seo/RouteSeo"
import { ContentProvider } from "@/content/provider"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"

export function SiteLayout() {
  const { pathname } = useLocation()
  return (
    <ContentProvider>
      <RouteSeo />
      <div className="min-h-dvh bg-paper text-ink">
        <SiteHeader />
        <main>
          <Outlet />
        </main>
        <SiteFooter showCta={pathname !== "/contato"} />
        <ScrollRestoration />
      </div>
    </ContentProvider>
  )
}

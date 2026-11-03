import { Outlet, useLocation } from "react-router"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"

export function SiteLayout() {
  const { pathname } = useLocation()
  return (
    <div className="min-h-screen bg-paper text-indigo">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter showCta={pathname !== "/contato"} />
    </div>
  )
}

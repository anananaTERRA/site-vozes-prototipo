import { createBrowserRouter } from "react-router"
import { SiteLayout } from "@/components/layout/SiteLayout"
import { ContatoPage } from "@/pages/ContatoPage"
import { HomePage } from "@/pages/HomePage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { OQueFazemosPage } from "@/pages/OQueFazemosPage"
import { PostEventoPage, PostNoticiaPage } from "@/pages/PostPages"
import { PostPublicacaoPage, PublicacoesPage } from "@/pages/PublicacoesPage"
import { QuemSomosPage } from "@/pages/QuemSomosPage"
import { VozesPage } from "@/pages/VozesPage"

const basename = import.meta.env.BASE_URL.replace(/\/$/, "")

export const appRoutes = [
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "quem-somos", element: <QuemSomosPage /> },
      { path: "o-que-fazemos", element: <OQueFazemosPage /> },
      { path: "vozes", element: <VozesPage /> },
      { path: "vozes/noticias/:slug", element: <PostNoticiaPage /> },
      { path: "vozes/eventos/:slug", element: <PostEventoPage /> },
      { path: "publicacoes", element: <PublicacoesPage /> },
      { path: "publicacoes/:slug", element: <PostPublicacaoPage /> },
      { path: "contato", element: <ContatoPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]

export const router = createBrowserRouter(appRoutes, basename ? { basename } : undefined)

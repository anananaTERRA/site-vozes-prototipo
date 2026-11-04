import { useMemo } from "react"
import { useLocation } from "react-router"
import { Seo } from "@/components/seo/Seo"
import { eventBySlug, newsBySlug, publicationBySlug } from "@/content/posts"
import { useSiteContent } from "@/content/provider"
import { STATIC_SOCIAL } from "@/content/social-meta"
import {
  articleJsonLd,
  organizationJsonLd,
  truncateDescription,
  type SeoInput,
} from "@/lib/seo"

const STATIC_PAGES: Record<string, SeoInput> = Object.fromEntries(
  Object.entries(STATIC_SOCIAL).map(([pathname, page]) => [
    pathname,
    pathname === "/"
      ? { description: page.description, jsonLd: organizationJsonLd() }
      : { title: page.title, description: page.description },
  ]),
)

function matchArticleSeo(pathname: string, ready: boolean, content: ReturnType<typeof useSiteContent>): SeoInput | null {
  if (!ready) return null

  const news = pathname.match(/^\/vozes\/noticias\/([^/]+)$/)
  if (news) {
    const article = newsBySlug(content.noticias, news[1])
    if (!article) return null
    const path = pathname
    return {
      title: article.title,
      description: truncateDescription(article.excerpt),
      pathname: path,
      image: article.image,
      type: "article",
      jsonLd: articleJsonLd({
        title: article.title,
        description: article.excerpt,
        pathname: path,
        image: article.image,
        datePublished: article.date,
      }),
    }
  }

  const event = pathname.match(/^\/vozes\/eventos\/([^/]+)$/)
  if (event) {
    const article = eventBySlug(content.eventos, event[1])
    if (!article) return null
    const path = pathname
    return {
      title: article.title,
      description: truncateDescription(article.excerpt),
      pathname: path,
      image: article.image,
      type: "article",
      jsonLd: articleJsonLd({
        title: article.title,
        description: article.excerpt,
        pathname: path,
        image: article.image,
        datePublished: article.date,
      }),
    }
  }

  const publication = pathname.match(/^\/publicacoes\/([^/]+)$/)
  if (publication) {
    const item = publicationBySlug(content.publicacoes, publication[1])
    if (!item) return null
    const path = pathname
    return {
      title: item.title,
      description: truncateDescription(item.excerpt),
      pathname: path,
      image: item.image,
      type: "article",
      jsonLd: articleJsonLd({
        title: item.title,
        description: item.excerpt,
        pathname: path,
        image: item.image,
        datePublished: item.date,
      }),
    }
  }

  return null
}

export function RouteSeo() {
  const { pathname } = useLocation()
  const content = useSiteContent()
  const canonicalPath = pathname.split("?")[0] || "/"

  const seo = useMemo(() => {
    const dynamic = matchArticleSeo(canonicalPath, content.ready, content)
    if (dynamic) return dynamic
    const staticPage = STATIC_PAGES[canonicalPath]
    if (staticPage) return { ...staticPage, pathname: canonicalPath }
    return {
      pathname: canonicalPath,
      title: "Página não encontrada",
      noindex: true as const,
    }
  }, [canonicalPath, content.ready, content.noticias, content.eventos, content.publicacoes])

  return <Seo {...seo} />
}

import {
  DEFAULT_SOCIAL_DESCRIPTION,
  OG_DEFAULT_PATH,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/content/social-meta"

export { SITE_NAME, SITE_TAGLINE }
export const DEFAULT_DESCRIPTION = DEFAULT_SOCIAL_DESCRIPTION

export const SOCIAL_PROFILES = [
  "https://br.linkedin.com/company/vozes-da-educação",
  "https://www.instagram.com/vozesdaeducacao_/",
  "https://www.facebook.com/people/Vozes-da-Educação/100054698893381/",
] as const

export const DEFAULT_OG_IMAGE = OG_DEFAULT_PATH
export { OG_IMAGE_ALT, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT }

export function getSiteOrigin(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined
  if (fromEnv?.trim()) return fromEnv.trim().replace(/\/$/, "")
  if (typeof window !== "undefined") return window.location.origin
  return "https://site-vozes-prototipo.vercel.app"
}

/** Path público incluindo `base` do Vite (ex.: GitHub Pages). */
export function publicPath(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "")
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`
  if (!base) return path
  if (path === "/") return `${base}/`
  return `${base}${path}`
}

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`
  return new URL(publicPath(path), `${getSiteOrigin()}/`).href
}

export function canonicalUrl(pathname: string): string {
  const clean = pathname.split("?")[0] || "/"
  return new URL(publicPath(clean), `${getSiteOrigin()}/`).href
}

export function pageTitle(title?: string): string {
  if (!title) return `${SITE_NAME} · ${SITE_TAGLINE}`
  return `${title} · ${SITE_NAME}`
}

export function truncateDescription(text: string, max = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim()
  if (normalized.length <= max) return normalized
  const slice = normalized.slice(0, max - 1)
  const lastSpace = slice.lastIndexOf(" ")
  const trimmed = (lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice).trimEnd()
  return `${trimmed}…`
}

export type SeoInput = {
  title?: string
  description?: string
  pathname?: string
  image?: string
  type?: "website" | "article"
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: canonicalUrl("/"),
    logo: absoluteUrl("/favicon.svg"),
    description: DEFAULT_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Pamplona, 943/12, Jardim Paulista",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "01405-200",
      addressCountry: "BR",
    },
    telephone: "+55-11-94629-2212",
    sameAs: [...SOCIAL_PROFILES],
  }
}

export function articleJsonLd(input: {
  title: string
  description: string
  pathname: string
  image: string
  datePublished: string
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: absoluteUrl(input.image),
    datePublished: input.datePublished,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.svg") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl(input.pathname) },
  }
}

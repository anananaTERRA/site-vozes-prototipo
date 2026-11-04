import { useEffect } from "react"
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  absoluteUrl,
  canonicalUrl,
  pageTitle,
  truncateDescription,
  type SeoInput,
} from "@/lib/seo"

const JSON_LD_ID = "vozes-json-ld"

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

function upsertLink(rel: string, href: string) {
  const selector = `link[rel="${rel}"]`
  let el = document.head.querySelector(selector) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement("link")
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

function setJsonLd(data: SeoInput["jsonLd"]) {
  const existing = document.getElementById(JSON_LD_ID)
  if (existing) existing.remove()
  if (!data) return
  const script = document.createElement("script")
  script.id = JSON_LD_ID
  script.type = "application/ld+json"
  script.text = JSON.stringify(data)
  document.head.appendChild(script)
}

export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  pathname = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
  jsonLd,
}: SeoInput) {
  useEffect(() => {
    const fullTitle = pageTitle(title)
    const desc = truncateDescription(description)
    const canonical = canonicalUrl(pathname)
    const ogImage = absoluteUrl(image)

    document.title = fullTitle
    upsertLink("canonical", canonical)

    upsertMeta("name", "description", desc)
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow")

    upsertMeta("property", "og:site_name", SITE_NAME)
    upsertMeta("property", "og:locale", "pt_BR")
    upsertMeta("property", "og:type", type)
    upsertMeta("property", "og:title", fullTitle)
    upsertMeta("property", "og:description", desc)
    upsertMeta("property", "og:url", canonical)
    upsertMeta("property", "og:image", ogImage)
    upsertMeta("property", "og:image:secure_url", ogImage)
    upsertMeta("property", "og:image:width", String(OG_IMAGE_WIDTH))
    upsertMeta("property", "og:image:height", String(OG_IMAGE_HEIGHT))
    upsertMeta("property", "og:image:type", "image/jpeg")
    upsertMeta("property", "og:image:alt", OG_IMAGE_ALT)

    upsertMeta("name", "twitter:card", "summary_large_image")
    upsertMeta("name", "twitter:title", fullTitle)
    upsertMeta("name", "twitter:description", desc)
    upsertMeta("name", "twitter:image", ogImage)

    setJsonLd(jsonLd)
  }, [title, description, pathname, image, type, noindex, jsonLd])

  return null
}

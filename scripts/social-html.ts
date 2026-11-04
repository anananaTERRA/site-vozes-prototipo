import fs from "node:fs"
import path from "node:path"
import {
  DEFAULT_SOCIAL_DESCRIPTION,
  OG_DEFAULT_PATH,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  STATIC_SOCIAL,
  socialPageTitle,
} from "../src/content/social-meta"
import { publicPathForBase, resolveSiteUrl } from "./generate-seo-files"

export type SocialRouteMeta = {
  pathname: string
  title?: string
  description: string
  ogType?: "website" | "article"
  ogImagePath?: string
  noindex?: boolean
}

function absoluteAsset(siteUrl: string, base: string, assetPath: string) {
  return new URL(publicPathForBase(base, assetPath), `${siteUrl}/`).href
}

function canonicalFor(siteUrl: string, base: string, pathname: string) {
  return new URL(publicPathForBase(base, pathname), `${siteUrl}/`).href
}

export function renderSocialHead(meta: SocialRouteMeta, siteUrl: string, base: string): string {
  const fullTitle = socialPageTitle(meta.title)
  const description = meta.description.trim()
  const canonical = canonicalFor(siteUrl, base, meta.pathname)
  const ogImage = absoluteAsset(siteUrl, base, meta.ogImagePath ?? OG_DEFAULT_PATH)
  const ogType = meta.ogType ?? "website"
  const robots = meta.noindex ? "noindex, nofollow" : "index, follow"

  return `    <title>${escapeHtml(fullTitle)}</title>
    <meta name="description" content="${escapeAttr(description)}" />
    <meta name="robots" content="${robots}" />
    <link rel="canonical" href="${escapeAttr(canonical)}" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:title" content="${escapeAttr(fullTitle)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:url" content="${escapeAttr(canonical)}" />
    <meta property="og:image" content="${escapeAttr(ogImage)}" />
    <meta property="og:image:secure_url" content="${escapeAttr(ogImage)}" />
    <meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />
    <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:alt" content="${escapeAttr(OG_IMAGE_ALT)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(fullTitle)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    <meta name="twitter:image" content="${escapeAttr(ogImage)}" />`
}

function escapeAttr(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;")
}

const SOCIAL_BLOCK_END = '<link rel="preconnect"'

export function replaceSocialHead(html: string, headInner: string) {
  const start = html.indexOf("<title>")
  const end = html.indexOf(SOCIAL_BLOCK_END)
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("index.html precisa de <title> e link preconnect para injetar metadados sociais")
  }
  return `${html.slice(0, start)}${headInner}\n    ${html.slice(end)}`
}

function extractPostSection(source: string, exportName: string) {
  const marker = `export const ${exportName}`
  const start = source.indexOf(marker)
  if (start === -1) return ""
  const next = source.indexOf("\nexport const ", start + marker.length)
  return next === -1 ? source.slice(start) : source.slice(start, next)
}

function parsePostBlocks(section: string) {
  const items: { slug: string; title: string; excerpt: string }[] = []
  for (const block of section.split(/\n  \},?\n/)) {
    const slug = block.match(/slug:\s*"([^"]+)"/)?.[1]
    const title = block.match(/title:\s*"([^"]+)"/)?.[1]
    const excerpt = block.match(/excerpt:\s*"([^"]+)"/)?.[1]
    if (slug && title && excerpt) items.push({ slug, title, excerpt })
  }
  return items
}

export function collectSocialRoutes(): SocialRouteMeta[] {
  const postsSource = fs.readFileSync(path.resolve("src/content/posts.ts"), "utf8")
  const routes: SocialRouteMeta[] = Object.entries(STATIC_SOCIAL).map(([pathname, page]) => ({
    pathname,
    title: page.title,
    description: page.description,
  }))

  for (const item of parsePostBlocks(extractPostSection(postsSource, "noticias"))) {
    routes.push({
      pathname: `/vozes/noticias/${item.slug}`,
      title: item.title,
      description: item.excerpt,
      ogType: "article",
    })
  }
  for (const item of parsePostBlocks(extractPostSection(postsSource, "eventos"))) {
    routes.push({
      pathname: `/vozes/eventos/${item.slug}`,
      title: item.title,
      description: item.excerpt,
      ogType: "article",
    })
  }
  for (const item of parsePostBlocks(extractPostSection(postsSource, "publicacoes"))) {
    routes.push({
      pathname: `/publicacoes/${item.slug}`,
      title: item.title,
      description: item.excerpt,
      ogType: "article",
    })
  }

  return routes
}

function writeRouteHtml(template: string, distDir: string, meta: SocialRouteMeta, siteUrl: string, base: string) {
  const head = renderSocialHead(meta, siteUrl, base)
  const html = replaceSocialHead(template, head)
  const segments = meta.pathname.split("/").filter(Boolean)
  const dir = path.join(distDir, ...segments)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, "index.html"), html)
}

export function injectAndPrerenderSocialHtml(distDir: string, env: NodeJS.ProcessEnv = process.env) {
  const siteUrl = resolveSiteUrl(env)
  const base = env.VITE_BASE || "/"
  const indexPath = path.join(distDir, "index.html")
  if (!fs.existsSync(indexPath)) return

  let template = fs.readFileSync(indexPath, "utf8")
  template = replaceSocialHead(
    template,
    renderSocialHead({ pathname: "/", description: STATIC_SOCIAL["/"].description }, siteUrl, base),
  )
  fs.writeFileSync(indexPath, template)

  for (const route of collectSocialRoutes()) {
    if (route.pathname === "/") continue
    writeRouteHtml(template, distDir, route, siteUrl, base)
  }

  fs.copyFileSync(indexPath, path.join(distDir, "404.html"))
}

export function devSocialHead(siteUrl: string, base = "/") {
  return renderSocialHead(
    { pathname: "/", description: DEFAULT_SOCIAL_DESCRIPTION },
    siteUrl,
    base,
  )
}

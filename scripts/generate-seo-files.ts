import fs from "node:fs"
import path from "node:path"

export function resolveSiteUrl(env: NodeJS.ProcessEnv = process.env) {
  const explicit = env.VITE_SITE_URL?.trim().replace(/\/$/, "")
  if (explicit) return explicit
  const base = env.VITE_BASE || "/"
  if (base !== "/" && base !== "") {
    return `https://anananaterra.github.io${base.replace(/\/$/, "")}`
  }
  return "https://site-vozes-prototipo.vercel.app"
}

export function publicPathForBase(base: string, pathname: string) {
  const prefix = (base || "/").replace(/\/$/, "")
  const pathPart = pathname.startsWith("/") ? pathname : `/${pathname}`
  if (!prefix) return pathPart
  if (pathPart === "/") return `${prefix}/`
  return `${prefix}${pathPart}`
}

function absoluteUrl(siteUrl: string, base: string, pathname: string) {
  const pathPart = publicPathForBase(base, pathname)
  return new URL(pathPart, `${siteUrl}/`).href
}

function slugsFromPostsSource(source: string) {
  const noticias: string[] = []
  const eventos: string[] = []
  const publicacoes: string[] = []
  let section: "noticias" | "eventos" | "publicacoes" | null = null
  for (const line of source.split("\n")) {
    if (line.includes("export const noticias")) section = "noticias"
    else if (line.includes("export const eventos")) section = "eventos"
    else if (line.includes("export const publicacoes")) section = "publicacoes"
    else if (line.includes("export const midia")) section = null
    const match = line.match(/slug:\s*"([^"]+)"/)
    if (match && section === "noticias") noticias.push(match[1])
    if (match && section === "eventos") eventos.push(match[1])
    if (match && section === "publicacoes") publicacoes.push(match[1])
  }
  return { noticias, eventos, publicacoes }
}

export function generateSeoFiles(distDir: string, env: NodeJS.ProcessEnv = process.env) {
  const siteUrl = resolveSiteUrl(env)
  const base = env.VITE_BASE || "/"

  const postsSource = fs.readFileSync(path.resolve("src/content/posts.ts"), "utf8")
  const { noticias, eventos, publicacoes } = slugsFromPostsSource(postsSource)

  const staticRoutes = ["/", "/quem-somos", "/o-que-fazemos", "/vozes", "/publicacoes", "/contato"]

  const dynamicRoutes = [
    ...noticias.map((slug) => `/vozes/noticias/${slug}`),
    ...eventos.map((slug) => `/vozes/eventos/${slug}`),
    ...publicacoes.map((slug) => `/publicacoes/${slug}`),
  ]

  const urls = [...staticRoutes, ...dynamicRoutes]
  const lastmod = new Date().toISOString().slice(0, 10)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((route) => {
    const loc = absoluteUrl(siteUrl, base, route)
    const priority = route === "/" ? "1.0" : route.split("/").length > 2 ? "0.7" : "0.8"
    const changefreq =
      route === "/" ? "weekly" : route.startsWith("/vozes") || route.startsWith("/publicacoes") ? "weekly" : "monthly"
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  })
  .join("\n")}
</urlset>
`

  const robots = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl(siteUrl, base, "/sitemap.xml")}
`

  fs.mkdirSync(distDir, { recursive: true })
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap)
  fs.writeFileSync(path.join(distDir, "robots.txt"), robots)
}

import { sanityClient } from "@/sanity/client"
import { mapSanityContent, type SanityPayload } from "@/sanity/map"
import type { SiteContent } from "@/content/site"

const query = `{
  "noticias": *[_type == "noticia" && defined(slug.current)] | order(date desc) {
    title, "slug": slug.current, excerpt, date, themes, imagePosition, caption, featured,
    "imageUrl": image.asset->url, "hotspot": image.hotspot,
    body[]{ ..., _type == "image" => { alt, caption, "url": asset->url } }
  },
  "eventos": *[_type == "evento" && defined(slug.current)] | order(date desc) {
    title, "slug": slug.current, excerpt, date, themes, imagePosition, caption, place, format, ficha,
    "imageUrl": image.asset->url, "hotspot": image.hotspot,
    body[]{ ..., _type == "image" => { alt, caption, "url": asset->url } }
  },
  "midia": *[_type == "midia" && defined(slug.current)] | order(date desc) {
    title, "slug": slug.current, excerpt, date, themes, outlet, url,
    "imageUrl": image.asset->url, "hotspot": image.hotspot
  },
  "publicacoes": *[_type == "publicacao" && defined(slug.current)] | order(date desc) {
    title, "slug": slug.current, excerpt, date, themes, imagePosition, type, year,
    "imageUrl": image.asset->url, "hotspot": image.hotspot,
    body[]{ ..., _type == "image" => { alt, caption, "url": asset->url } }
  },
  "team": *[_type == "teamMember"] | order(order asc) {
    name, role, "photo": photo.asset->url, "childhoodPhoto": childhoodPhoto.asset->url, color, faceX, faceY, bio, dreamJobText
  },
  "partners": *[_type == "partner"] | order(order asc) { name, "src": logo.asset->url, invertOnDark },
  "services": *[_type == "service"] | order(order asc) { id, title, face, accent, text, body, audience, delivery },
  "testimonials": *[_type == "testimonial"] | order(order asc) { quote, name, role },
  "chapters": *[_type == "chapter"] | order(order asc) { year, title, background, color, text, kicker },
  "values": *[_type == "value"] | order(order asc) { icon, title, text },
  "faq": *[_type == "faq"] | order(order asc) { "q": question, "a": answer },
  "settings": *[_id == "siteSettings"][0]{ servicesIntro, stats, segments, historyIntro }
}`

export async function fetchSanityContent(): Promise<SiteContent> {
  const payload = await sanityClient.fetch<SanityPayload>(query)
  return mapSanityContent(payload)
}

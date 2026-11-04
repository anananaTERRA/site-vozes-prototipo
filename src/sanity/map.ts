import type { ThemeId } from "@/content/themes"
import { themes } from "@/content/themes"
import { publicationTypes } from "@/content/posts"
import type { Block, EventArticle, NewsArticle, PressItem, Publication, PublicationType } from "@/content/types"
import type { Chapter, FaqItem, Partner, Segment, Service, SiteContent, Stat, TeamMember, Testimonial, ValueItem } from "@/content/site"

type Hotspot = { x?: number; y?: number } | null

type RawBlock = {
  _type?: string
  style?: string
  listItem?: string
  children?: { text?: string }[]
  url?: string | null
  alt?: string | null
  caption?: string | null
  value?: string | null
  text?: string | null
}

type RawArticle = {
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  date?: string | null
  themes?: string[] | null
  imageUrl?: string | null
  hotspot?: Hotspot
  imagePosition?: string | null
  caption?: string | null
  featured?: boolean | null
  body?: RawBlock[] | null
  place?: string | null
  format?: string | null
  ficha?: { label?: string | null; value?: string | null }[] | null
  outlet?: string | null
  url?: string | null
  type?: string | null
  year?: number | null
}

export type SanityPayload = {
  noticias?: RawArticle[] | null
  eventos?: RawArticle[] | null
  midia?: RawArticle[] | null
  publicacoes?: RawArticle[] | null
  team?: { name?: string | null; role?: string | null; photo?: string | null; color?: string | null; faceX?: number | null; faceY?: number | null; bio?: string | null }[] | null
  partners?: { name?: string | null; src?: string | null; invertOnDark?: boolean | null }[] | null
  services?: { id?: string | null; title?: string | null; face?: string | null; accent?: string | null; text?: string | null; body?: string | null; audience?: string | null; delivery?: string | null }[] | null
  testimonials?: { quote?: string | null; name?: string | null; role?: string | null }[] | null
  chapters?: { year?: string | null; title?: string | null; background?: string | null; color?: string | null; text?: string | null; kicker?: string | null }[] | null
  values?: { icon?: string | null; title?: string | null; text?: string | null }[] | null
  faq?: { q?: string | null; a?: string | null }[] | null
  settings?: {
    servicesIntro?: (string | null)[] | null
    stats?: { value?: string | null; label?: string | null }[] | null
    segments?: { title?: string | null; text?: string | null; background?: string | null; titleColor?: string | null; href?: string | null }[] | null
  } | null
}

const themeIds = new Set<string>(themes.map((theme) => theme.id))
const publicationTypeSet = new Set<string>(publicationTypes)

export function mapSanityContent(payload: SanityPayload): SiteContent {
  return {
    noticias: (payload.noticias ?? []).flatMap((item) => {
      const article = baseArticle(item)
      if (!article) return []
      const news: NewsArticle = { ...article, kind: "noticia", caption: item.caption ?? "", featured: item.featured === true }
      return [news]
    }),
    eventos: (payload.eventos ?? []).flatMap((item) => {
      const article = baseArticle(item)
      const ficha = (item.ficha ?? []).flatMap((row) => (row.label && row.value ? [{ label: row.label, value: row.value }] : []))
      if (!article || !item.place || !item.format || ficha.length === 0) return []
      const event: EventArticle = { ...article, kind: "evento", caption: item.caption ?? "", place: item.place, format: item.format, ficha }
      return [event]
    }),
    midia: (payload.midia ?? []).flatMap((item) => {
      if (!item.slug || !item.title || !item.excerpt || !item.date || !item.imageUrl || !item.outlet || !item.url) return []
      const press: PressItem = {
        kind: "midia",
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        date: item.date,
        themes: themeIdsOf(item.themes),
        image: item.imageUrl,
        imagePosition: imagePosition(item.hotspot, item.imagePosition),
        outlet: item.outlet,
        url: item.url,
      }
      return [press]
    }),
    publicacoes: (payload.publicacoes ?? []).flatMap((item) => {
      const article = baseArticle(item)
      if (!article || !item.type || !publicationTypeSet.has(item.type) || !item.year) return []
      const publication: Publication = { ...article, kind: "publicacao", type: item.type as PublicationType, year: item.year }
      return [publication]
    }),
    team: (payload.team ?? []).flatMap((item) => {
      if (!item.name || !item.role || !item.photo || !item.color || item.faceX == null || item.faceY == null) return []
      const member: TeamMember = {
        name: item.name,
        role: item.role,
        photo: item.photo,
        color: item.color,
        face: { x: item.faceX, y: item.faceY },
        bio: item.bio || undefined,
      }
      return [member]
    }),
    partners: (payload.partners ?? []).flatMap((item) => {
      if (!item.name || !item.src) return []
      const partner: Partner = { name: item.name, src: item.src, invertOnDark: item.invertOnDark === true }
      return [partner]
    }),
    services: (payload.services ?? []).flatMap((item) => {
      if (!item.id || !item.title || !item.face || !item.accent || !item.text || !item.body || !item.audience || !item.delivery) return []
      const service: Service = {
        id: item.id,
        title: item.title,
        face: item.face,
        accent: item.accent,
        text: item.text,
        body: item.body,
        audience: item.audience,
        delivery: item.delivery,
      }
      return [service]
    }),
    servicesIntro: (payload.settings?.servicesIntro ?? []).flatMap((paragraph) => (paragraph ? [paragraph] : [])),
    segments: (payload.settings?.segments ?? []).flatMap((item) => {
      if (!item.title || !item.text || !item.background || !item.titleColor || !item.href) return []
      const segment: Segment = { title: item.title, text: item.text, background: item.background, titleColor: item.titleColor, href: item.href }
      return [segment]
    }),
    testimonials: (payload.testimonials ?? []).flatMap((item) => {
      if (!item.quote || !item.name || !item.role) return []
      const testimonial: Testimonial = { quote: item.quote, name: item.name, role: item.role }
      return [testimonial]
    }),
    chapters: (payload.chapters ?? []).flatMap((item) => {
      if (!item.year || !item.title || !item.background || !item.color || !item.text) return []
      const chapter: Chapter = {
        year: item.year,
        title: item.title,
        background: item.background,
        color: item.color,
        text: item.text,
        kicker: item.kicker || undefined,
      }
      return [chapter]
    }),
    values: (payload.values ?? []).flatMap((item) => {
      if (!item.icon || !item.title || !item.text) return []
      const value: ValueItem = { icon: item.icon, title: item.title, text: item.text }
      return [value]
    }),
    faq: (payload.faq ?? []).flatMap((item) => {
      if (!item.q || !item.a) return []
      const faq: FaqItem = { q: item.q, a: item.a }
      return [faq]
    }),
    stats: (payload.settings?.stats ?? []).flatMap((item) => {
      if (!item.value || !item.label) return []
      const stat: Stat = { value: item.value, label: item.label }
      return [stat]
    }),
  }
}

function baseArticle(item: RawArticle) {
  if (!item.slug || !item.title || !item.excerpt || !item.date || !item.imageUrl) return null
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    date: item.date,
    themes: themeIdsOf(item.themes),
    image: item.imageUrl,
    imagePosition: imagePosition(item.hotspot, item.imagePosition),
    body: portableToBlocks(item.body),
  }
}

function themeIdsOf(ids: string[] | null | undefined): ThemeId[] {
  return (ids ?? []).filter((id): id is ThemeId => themeIds.has(id))
}

function imagePosition(hotspot?: Hotspot, fallback?: string | null) {
  if (hotspot && Number.isFinite(hotspot.x) && Number.isFinite(hotspot.y)) {
    return `${Math.round((hotspot.x ?? 0) * 100)}% ${Math.round((hotspot.y ?? 0) * 100)}%`
  }
  return fallback || undefined
}

function portableToBlocks(body: RawBlock[] | null | undefined): Block[] {
  const blocks: Block[] = []
  let list: string[] | null = null
  const flush = () => {
    if (!list) return
    blocks.push({ type: "list", items: list })
    list = null
  }
  for (const block of body ?? []) {
    if (block._type === "block" && block.listItem === "bullet") {
      list = list ?? []
      list.push(plainText(block))
      continue
    }
    flush()
    if (block._type === "block") {
      const text = plainText(block)
      if (block.style === "h2") blocks.push({ type: "h2", text })
      else if (block.style === "h3") blocks.push({ type: "h3", text })
      else if (block.style === "blockquote") blocks.push({ type: "quote", text })
      else blocks.push({ type: "p", text })
    } else if (block._type === "image" && block.url) {
      blocks.push({ type: "image", src: block.url, alt: block.alt ?? "", caption: block.caption ?? "" })
    } else if (block._type === "stat" && block.value && block.text) {
      blocks.push({ type: "stat", value: block.value, text: block.text })
    }
  }
  flush()
  return blocks
}

function plainText(block: RawBlock) {
  return (block.children ?? []).map((child) => child.text ?? "").join("")
}

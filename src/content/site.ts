import type { EventArticle, NewsArticle, PressItem, Publication } from "@/content/types"

export type Service = {
  id: string
  title: string
  face: string
  accent: string
  text: string
  body: string
  audience: string
  delivery: string
}

export type Partner = {
  name: string
  src: string
  invertOnDark?: boolean
}

export type Segment = {
  title: string
  /** Corpo curto (Home / PARA QUEM). */
  text: string
  /** Corpo completo (página O que fazemos / COM QUEM). */
  textComplete?: string
  background: string
  titleColor: string
  href: string
}

export type Testimonial = {
  quote: string
  name?: string
  role?: string
}

export type Chapter = {
  year: string
  title: string
  background: string
  color: string
  text: string
  kicker?: string
}

export type TeamMember = {
  name: string
  role: string
  photo: string
  color: string
  face: { x: number; y: number }
  bio?: string
  /** URL da foto de infância (Sanity). */
  childhoodPhoto?: string
  dreamJobText?: string
}

export type ValueItem = {
  icon: string
  title: string
  text: string
}

export type FaqItem = {
  q: string
  a: string
}

export type Stat = {
  value: string
  label: string
}

export type SiteContent = {
  noticias: NewsArticle[]
  eventos: EventArticle[]
  midia: PressItem[]
  publicacoes: Publication[]
  partners: Partner[]
  services: Service[]
  servicesIntro: string[]
  segments: Segment[]
  testimonials: Testimonial[]
  chapters: Chapter[]
  team: TeamMember[]
  values: ValueItem[]
  faq: FaqItem[]
  stats: Stat[]
  historyIntro: string
}

function mergeTeam(remote: TeamMember[], local: TeamMember[]): TeamMember[] {
  if (remote.length === 0) return local
  const localByName = new Map(local.map((member) => [member.name, member]))
  return remote.flatMap((member) => {
    const fallback = localByName.get(member.name)
    const photo = member.photo || fallback?.photo
    if (!photo) return []
    const merged: TeamMember = {
      ...member,
      photo,
      childhoodPhoto: member.childhoodPhoto || undefined,
      dreamJobText: member.dreamJobText ?? fallback?.dreamJobText,
      bio: member.bio ?? fallback?.bio,
    }
    return [merged]
  })
}

function mergePublicacoes(remote: Publication[], local: Publication[]): Publication[] {
  if (remote.length === 0) return local
  const localBySlug = new Map(local.map((item) => [item.slug, item]))
  return remote.map((item) => {
    const fallback = localBySlug.get(item.slug)
    return {
      ...item,
      authorship: item.authorship ?? fallback?.authorship,
      pageCount: item.pageCount ?? fallback?.pageCount,
      pdfUrl: item.pdfUrl ?? fallback?.pdfUrl,
      pdfSizeLabel: item.pdfSizeLabel ?? fallback?.pdfSizeLabel,
    }
  })
}

function mergeEventos(remote: EventArticle[], local: EventArticle[]): EventArticle[] {
  if (remote.length === 0) return local
  const localBySlug = new Map(local.map((item) => [item.slug, item]))
  return remote.map((item) => {
    const fallback = localBySlug.get(item.slug)
    return {
      ...item,
      registrationUrl: item.registrationUrl ?? fallback?.registrationUrl,
      recordingUrl: item.recordingUrl ?? fallback?.recordingUrl,
    }
  })
}

export function mergeContent(local: SiteContent, remote: SiteContent): SiteContent {
  const pick = <T,>(next: T[], prev: T[]) => (next.length > 0 ? next : prev)
  return {
    noticias: pick(remote.noticias, local.noticias),
    eventos: mergeEventos(remote.eventos, local.eventos),
    midia: pick(remote.midia, local.midia),
    publicacoes: mergePublicacoes(remote.publicacoes, local.publicacoes),
    partners: pick(remote.partners, local.partners),
    services: pick(remote.services, local.services),
    servicesIntro: pick(remote.servicesIntro, local.servicesIntro),
    segments: pick(remote.segments, local.segments),
    testimonials: pick(remote.testimonials, local.testimonials),
    chapters: pick(remote.chapters, local.chapters),
    team: mergeTeam(remote.team, local.team),
    values: pick(remote.values, local.values),
    faq: pick(remote.faq, local.faq),
    stats: pick(remote.stats, local.stats),
    historyIntro: remote.historyIntro.trim() ? remote.historyIntro : local.historyIntro,
  }
}

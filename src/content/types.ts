import type { ThemeId } from "@/content/themes"

export type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; src: string; alt: string; caption: string }
  | { type: "stat"; value: string; text: string }

export type ArticleBase = {
  slug: string
  title: string
  excerpt: string
  date: string
  themes: ThemeId[]
  image: string
  imagePosition?: string
  body: Block[]
}

export type NewsArticle = ArticleBase & {
  kind: "noticia"
  caption: string
  featured?: boolean
}

export type EventArticle = ArticleBase & {
  kind: "evento"
  caption: string
  place: string
  format: string
  ficha: { label: string; value: string }[]
  registrationUrl?: string
  recordingUrl?: string
}

export type PressItem = {
  kind: "midia"
  slug: string
  title: string
  excerpt: string
  date: string
  themes: ThemeId[]
  image: string
  imagePosition?: string
  outlet: string
  url: string
}

export type PublicationType = "Guia" | "Relatório" | "Pesquisa" | "Artigo"

export type Publication = ArticleBase & {
  kind: "publicacao"
  type: PublicationType
  year: number
  authorship?: string
  pageCount?: number
  pdfUrl?: string
  pdfSizeLabel?: string
}

export type FeedEntry = NewsArticle | EventArticle | PressItem

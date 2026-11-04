export const OG_DEFAULT_PATH = "/og/default.jpg"
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const OG_IMAGE_ALT = "Vozes da Educação — Conectar vozes, transformar a educação"

export const SITE_NAME = "Vozes da Educação"
export const SITE_TAGLINE = "Inteligência educacional"

export const DEFAULT_SOCIAL_DESCRIPTION =
  "Consultoria de inteligência educacional que transforma conhecimento de ponta em soluções para escolas, redes e organizações no Brasil."

export type StaticSocialPage = {
  title?: string
  description: string
}

/** Metadados para previews (WhatsApp, iMessage, LinkedIn). */
export const STATIC_SOCIAL: Record<string, StaticSocialPage> = {
  "/": {
    description:
      "Conectamos vozes e transformamos a educação. Soluções de inteligência educacional para escolas, redes e organizações no Brasil.",
  },
  "/quem-somos": {
    title: "Quem somos",
    description:
      "Consultoria de inteligência educacional movida pela certeza de que a educação brasileira pode ser mais segura e afetiva.",
  },
  "/o-que-fazemos": {
    title: "O que fazemos",
    description:
      "Transformamos conhecimento de ponta em soluções personalizadas para quem lidera escolas, redes e organizações.",
  },
  "/vozes": {
    title: "Vozes na mídia",
    description:
      "Notícias, eventos e aparições na mídia sobre educação — entrevistas, debates e cobertura do Vozes da Educação.",
  },
  "/publicacoes": {
    title: "Publicações",
    description:
      "Pesquisas, levantamentos e artigos do Vozes da Educação para quem decide com informação de qualidade.",
  },
  "/contato": {
    title: "Contato",
    description:
      "Conte o desafio da sua instituição. Construímos juntos soluções de inteligência educacional para escolas, redes e organizações.",
  },
}

export function socialPageTitle(title?: string): string {
  if (!title) return `${SITE_NAME} · ${SITE_TAGLINE}`
  return `${title} · ${SITE_NAME}`
}

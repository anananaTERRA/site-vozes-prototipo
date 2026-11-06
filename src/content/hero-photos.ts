/**
 * Uma foto por hero de rota (evita repetir o mesmo ficheiro entre páginas).
 * Blocos da home usam outros assets em `HomeVoiceBand`, `WhyWeExist`, etc.
 */
/** JPG original em plano de fundo (hero); overlay alinha ao bloco "Por que existimos". */
import heroHome from "@/assets/hero-criancas-escola.jpg"
import photoQuemSomos from "@/assets/photo-quem-somos.png"
import photoOQueFazemos from "@/assets/hero-o-que-fazemos.jpg"
import photoVozes from "@/assets/hero-vozes-na-midia.jpg"
import photoPublicacoes from "@/assets/photo-impacto.png"
import photoContatoDecor from "@/assets/photo-transicao.png"

export const heroPhotos = {
  home: heroHome,
  quemSomos: photoQuemSomos,
  oQueFazemos: photoOQueFazemos,
  vozesMidia: photoVozes,
  publicacoes: photoPublicacoes,
  contatoDecor: photoContatoDecor,
} as const

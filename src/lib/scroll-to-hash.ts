import { services } from "@/content/institutional"

/** Âncoras de serviço em /o-que-fazemos — tratadas pelo ServiceIndex. */
export const SERVICE_ANCHOR_IDS = new Set<string>(services.map((service) => service.id))

export function isOQueFazemosPath(pathname: string) {
  const normalized = pathname.replace(/\/$/, "") || "/"
  return normalized === "/o-que-fazemos" || normalized.endsWith("/o-que-fazemos")
}

export function scrollToHashAnchor(hash: string, behavior: ScrollBehavior = "auto") {
  const id = hash.replace(/^#/, "")
  if (!id) return false
  const element = document.getElementById(id)
  if (!element) return false
  element.scrollIntoView({ behavior, block: "start" })
  return true
}

/** Após troca de rota, espera layout antes de rolar para a âncora. */
export function scrollToHashAfterPaint(hash: string, behavior: ScrollBehavior = "auto") {
  let cancelled = false
  const frame = window.requestAnimationFrame(() => {
    if (cancelled) return
    window.requestAnimationFrame(() => {
      if (cancelled) return
      scrollToHashAnchor(hash, behavior)
    })
  })
  return () => {
    cancelled = true
    window.cancelAnimationFrame(frame)
  }
}

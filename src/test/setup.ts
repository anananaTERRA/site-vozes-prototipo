import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

vi.mock("@/components/home/ProcessScroll", () => ({
  ProcessScroll: () => null,
}))

vi.mock("@/sanity/fetch", () => ({
  // Resposta vazia: mergeContent mantém textos locais, sem passar pelo console.warn de fallback.
  fetchSanityContent: vi.fn(() =>
    Promise.resolve({
      noticias: [],
      eventos: [],
      midia: [],
      publicacoes: [],
      partners: [],
      services: [],
      servicesIntro: [],
      segments: [],
      testimonials: [],
      chapters: [],
      team: [],
      values: [],
      faq: [],
      stats: [],
      historyIntro: "",
    }),
  ),
}))

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

class ResizeObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
window.ResizeObserver = ResizeObserverMock

class IntersectionObserverMock {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
window.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver

Element.prototype.scrollTo = vi.fn()
window.scrollTo = vi.fn()

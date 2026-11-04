import "@testing-library/jest-dom/vitest"
import { vi } from "vitest"

vi.mock("@/components/home/ProcessScroll", () => ({
  ProcessScroll: () => null,
}))

vi.mock("@/sanity/fetch", () => ({
  fetchSanityContent: vi.fn(() => Promise.reject(new Error("test: Sanity offline"))),
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

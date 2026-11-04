import { describe, expect, it } from "vitest"
import { eventCta } from "@/components/content/EventFichaBar"
import type { EventArticle } from "@/content/types"

const base: EventArticle = {
  kind: "evento",
  slug: "teste",
  title: "Teste",
  excerpt: "Excerpt",
  date: "2026-10-22",
  themes: ["recomposicao"],
  image: "/x.png",
  caption: "",
  place: "SP",
  format: "Presencial",
  ficha: [{ label: "Quando", value: "22 out 2026" }],
  body: [],
}

describe("eventCta", () => {
  it("mostra Inscreva-se quando há registrationUrl e data futura", () => {
    expect(
      eventCta({
        ...base,
        date: "2027-01-01",
        registrationUrl: "https://example.com/inscricao",
      }),
    ).toEqual({ href: "https://example.com/inscricao", label: "Inscreva-se" })
  })

  it("mostra link de inscrição mesmo com data passada se não houver gravação", () => {
    expect(
      eventCta({
        ...base,
        date: "2026-10-22",
        registrationUrl: "https://example.com/inscricao",
      }),
    ).toEqual({ href: "https://example.com/inscricao", label: "Ver gravação" })
  })

  it("prioriza gravação quando evento passou e há recordingUrl", () => {
    expect(
      eventCta({
        ...base,
        date: "2026-10-22",
        registrationUrl: "https://example.com/inscricao",
        recordingUrl: "https://example.com/gravacao",
      }),
    ).toEqual({ href: "https://example.com/gravacao", label: "Ver gravação" })
  })
})

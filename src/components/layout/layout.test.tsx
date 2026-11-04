import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import { describe, expect, it } from "vitest"
import { PageHero } from "@/components/layout/PageHero"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { SiteHeader } from "@/components/layout/SiteHeader"
import photo from "@/assets/photo-quem-somos.png"

describe("SiteHeader", () => {
  it("mostra logo e links principais do menu", () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>,
    )
    expect(screen.getByRole("link", { name: /Vozes da Educação/i })).toHaveAttribute("href", "/")
    expect(screen.getByRole("link", { name: "Quem somos" })).toHaveAttribute("href", "/quem-somos")
    expect(screen.getByRole("link", { name: "Publicações" })).toHaveAttribute("href", "/publicacoes")
    expect(screen.getByRole("button", { name: /Buscar/i })).toBeInTheDocument()
  })
})

describe("SiteFooter", () => {
  it("mostra CTA de contato quando showCta=true", () => {
    render(
      <MemoryRouter>
        <SiteFooter showCta />
      </MemoryRouter>,
    )
    expect(screen.getByRole("heading", { level: 2, name: /desafio/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /LinkedIn/i })).toBeInTheDocument()
  })

  it("oculta faixa de CTA na página de contato", () => {
    render(
      <MemoryRouter>
        <SiteFooter showCta={false} />
      </MemoryRouter>,
    )
    expect(screen.queryByRole("heading", { level: 2, name: /desafio/i })).not.toBeInTheDocument()
  })
})

describe("PageHero", () => {
  it("renderiza título, statement e imagem", () => {
    render(
      <PageHero
        background="#000"
        title="Título teste"
        titleColor="#fff"
        statement="Frase de apoio"
        support="Texto secundário"
        image={photo}
        imageAlt="Foto exemplo"
      />,
    )
    expect(screen.getByRole("heading", { level: 1, name: "Título teste" })).toBeInTheDocument()
    expect(screen.getByText("Frase de apoio")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Foto exemplo" })).toBeInTheDocument()
  })
})

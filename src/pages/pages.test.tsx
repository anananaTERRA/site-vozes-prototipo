import { screen, waitFor } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { renderApp } from "@/test/render"

describe("Páginas principais (smoke)", () => {
  it("Home — hero e navegação", async () => {
    renderApp("/")
    expect(await screen.findByRole("heading", { level: 1, name: /Conectar vozes/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Início" })).toBeInTheDocument()
  })

  it("Quem somos — título da página", async () => {
    renderApp("/quem-somos")
    expect(await screen.findByRole("heading", { level: 1, name: "Quem somos" })).toBeInTheDocument()
  })

  it("O que fazemos — título e seção de segmentos", async () => {
    renderApp("/o-que-fazemos")
    expect(await screen.findByRole("heading", { level: 1, name: "O que fazemos" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2, name: "Com quem trabalhamos" })).toBeInTheDocument()
  })

  it("Vozes na mídia — hero após carregar listagem", async () => {
    renderApp("/vozes")
    expect(await screen.findByRole("heading", { level: 1, name: "Vozes na mídia" })).toBeInTheDocument()
    await waitFor(
      () => {
        expect(document.querySelector('[aria-busy="true"]')).not.toBeInTheDocument()
      },
      { timeout: 2000 },
    )
    expect(screen.getByRole("tab", { name: "Notícias" })).toBeInTheDocument()
  })

  it("Publicações — listagem após loading", async () => {
    renderApp("/publicacoes")
    expect(await screen.findByRole("heading", { level: 1, name: "Publicações" })).toBeInTheDocument()
    expect(await screen.findByRole("heading", { level: 2, name: "Todas as publicações" })).toBeInTheDocument()
  })

  it("Contato — formulário e FAQ", async () => {
    renderApp("/contato")
    expect(await screen.findByRole("heading", { level: 1, name: /Tem um desafio em mente/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Enviar" })).toBeInTheDocument()
  })

  it("404 — mensagem amigável", () => {
    renderApp("/rota-inexistente")
    expect(screen.getByRole("heading", { level: 1, name: "Página não encontrada." })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Voltar para a Home" })).toHaveAttribute("href", "/")
  })
})

describe("Páginas de conteúdo (posts)", () => {
  it("Notícia — título do artigo local", async () => {
    renderApp("/vozes/noticias/saude-mental-docente")
    expect(
      await screen.findByRole("heading", { level: 1, name: /Saúde mental docente entra na rotina/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2, name: "Leia também" })).toBeInTheDocument()
  })

  it("Evento — ficha e relacionados", async () => {
    renderApp("/vozes/eventos/seminario-recomposicao")
    expect(await screen.findByRole("heading", { level: 1, name: /seminário/i })).toBeInTheDocument()
  })

  it("Publicação — capa e blocos", async () => {
    renderApp("/publicacoes/guia-escolas-em-crise-2025")
    expect(
      await screen.findByRole("heading", { level: 1, name: /Guia para escolas em contexto de crise/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2, name: "Relacionadas" })).toBeInTheDocument()
  })
})

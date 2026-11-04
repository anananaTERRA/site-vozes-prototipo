import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { renderApp } from "@/test/render"

describe("Fluxo de contato", () => {
  it("valida campos obrigatórios antes de enviar", async () => {
    const user = userEvent.setup()
    renderApp("/contato")

    await screen.findByRole("button", { name: "Enviar" })
    await user.click(screen.getByRole("button", { name: "Enviar" }))

    await waitFor(() => {
      expect(screen.getByText("Informe seu nome")).toBeInTheDocument()
      expect(screen.getByText("Informe um e-mail válido")).toBeInTheDocument()
      expect(screen.getByText("Escolha um assunto")).toBeInTheDocument()
    })
  })
})

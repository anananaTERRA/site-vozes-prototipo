import { render, type RenderOptions } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router"
import { appRoutes } from "@/app/router"

export function renderApp(initialPath = "/", options?: Omit<RenderOptions, "wrapper">) {
  const router = createMemoryRouter(appRoutes, { initialEntries: [initialPath] })
  return {
    ...render(<RouterProvider router={router} />, options),
    router,
  }
}

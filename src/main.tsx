import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router"
import { router } from "@/app/router"
import { ThemeInit } from "@/components/theme/ThemeToggle"
import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeInit />
    <RouterProvider router={router} />
  </StrictMode>,
)

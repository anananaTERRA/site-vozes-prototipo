import fs from "node:fs"
import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin, type ProxyOptions } from "vite"

function spaFallback(): Plugin {
  return {
    name: "spa-fallback",
    apply: "build",
    closeBundle() {
      const dist = path.resolve(__dirname, "dist")
      const index = path.join(dist, "index.html")
      if (fs.existsSync(index)) fs.copyFileSync(index, path.join(dist, "404.html"))
    },
  }
}

const sanityProxy: ProxyOptions = {
  target: "https://n5x78djy.api.sanity.io",
  changeOrigin: true,
  rewrite: (requestPath) => requestPath.replace(/^\/sanity-api/, ""),
  configure: (proxy) => {
    proxy.on("proxyReq", (proxyReq) => {
      proxyReq.removeHeader("origin")
    })
  },
}

export default defineConfig({
  base: process.env.VITE_BASE || "/",
  plugins: [react(), tailwindcss(), spaFallback()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: { proxy: { "/sanity-api": sanityProxy } },
  preview: { proxy: { "/sanity-api": sanityProxy } },
})

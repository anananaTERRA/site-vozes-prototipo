/// <reference types="vitest/config" />
import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin, type ProxyOptions } from "vite"
function spaFallback(): Plugin {
  return {
    name: "spa-fallback",
    apply: "build",
    async closeBundle() {
      const dist = path.resolve(__dirname, "dist")
      const { generateSeoFiles } = await import("./scripts/generate-seo-files")
      generateSeoFiles(dist)
      const { injectAndPrerenderSocialHtml } = await import("./scripts/social-html")
      injectAndPrerenderSocialHtml(dist)
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
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    css: true,
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/test/**", "src/**/*.test.{ts,tsx}", "src/main.tsx"],
    },
  },
})

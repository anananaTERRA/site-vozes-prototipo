import { spawn } from "node:child_process"
import fs from "node:fs"
import http from "node:http"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { chromium } from "playwright"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const outFile = path.join(root, "public/og/default.jpg")
const port = 5199
const previewUrl = `http://127.0.0.1:${port}/__og-hero`

function waitForServer(url, timeoutMs = 60_000) {
  const started = Date.now()
  return new Promise((resolve, reject) => {
    const tick = () => {
      http
        .get(url, (res) => {
          res.resume()
          resolve()
        })
        .on("error", () => {
          if (Date.now() - started > timeoutMs) reject(new Error(`Servidor não respondeu: ${url}`))
          else setTimeout(tick, 250)
        })
    }
    tick()
  })
}

async function serverReady(url, timeoutMs = 2_000) {
  try {
    await waitForServer(url, timeoutMs)
    return true
  } catch {
    return false
  }
}

function runViteDev() {
  return spawn("npx", ["vite", "--port", String(port), "--strictPort", "--host", "127.0.0.1"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, BROWSER: "none" },
  })
}

async function main() {
  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  let vite = null
  let ownsServer = false

  if (!(await serverReady(previewUrl))) {
    vite = runViteDev()
    ownsServer = true
    await waitForServer(`http://127.0.0.1:${port}/`)
    await waitForServer(previewUrl)
  }

  try {
    const browser = await chromium.launch()
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
    })
    await page.goto(previewUrl, { waitUntil: "networkidle" })
    await page.waitForFunction(() => document.fonts.ready)
    await page.screenshot({
      path: outFile,
      type: "jpeg",
      quality: 92,
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    })
    await browser.close()
    console.log(`Open Graph atualizado: ${path.relative(root, outFile)}`)
  } finally {
    if (ownsServer && vite) vite.kill("SIGTERM")
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

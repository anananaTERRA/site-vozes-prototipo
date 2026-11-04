import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const assetExtensions = new Set([".png", ".svg", ".jpg", ".jpeg", ".webp", ".gif"])

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    let full = path.join(root, "src", specifier.slice(2))
    if (!path.extname(full)) {
      for (const extension of [".ts", ".tsx", ".js"]) {
        if (existsSync(full + extension)) {
          full += extension
          break
        }
      }
    }
    return nextResolve(pathToFileURL(full).href, context)
  }
  return nextResolve(specifier, context)
}

export async function load(url, context, nextLoad) {
  const extension = path.extname(new URL(url).pathname)
  if (assetExtensions.has(extension)) {
    return {
      format: "module",
      source: `export default ${JSON.stringify(fileURLToPath(url))}\n`,
      shortCircuit: true,
    }
  }
  return nextLoad(url, context)
}

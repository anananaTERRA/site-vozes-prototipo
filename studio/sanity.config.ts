import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { schemaTypes } from "./schemaTypes"
import { structure } from "./structure"

export default defineConfig({
  name: "vozes",
  title: "Vozes da Educação",
  projectId: "n5x78djy",
  dataset: "production",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
})

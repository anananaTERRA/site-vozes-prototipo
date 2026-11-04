import { defineField } from "sanity"
import { themeList } from "./options"

export const titleField = defineField({
  name: "title",
  title: "Título",
  type: "string",
  validation: (rule) => rule.required(),
})

export const slugField = defineField({
  name: "slug",
  title: "Endereço",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (rule) => rule.required(),
})

export const excerptField = defineField({
  name: "excerpt",
  title: "Chamada",
  type: "text",
  rows: 3,
  validation: (rule) => rule.required(),
})

export const dateField = defineField({
  name: "date",
  title: "Data",
  type: "date",
  validation: (rule) => rule.required(),
})

export const themesField = defineField({
  name: "themes",
  title: "Temas",
  type: "array",
  of: [{ type: "string" }],
  options: { list: themeList },
  validation: (rule) => rule.required().min(1),
})

export const imageField = defineField({
  name: "image",
  title: "Imagem",
  type: "image",
  options: { hotspot: true },
  validation: (rule) => rule.required(),
})

export const imagePositionField = defineField({
  name: "imagePosition",
  title: "Posição da imagem",
  type: "string",
  description: "Opcional. Exemplo: center top. O recorte feito na imagem tem prioridade.",
})

export const bodyField = defineField({
  name: "body",
  title: "Corpo",
  type: "blockContent",
  validation: (rule) => rule.required(),
})

export const orderField = defineField({
  name: "order",
  title: "Ordem",
  type: "number",
  description: "Menor número aparece primeiro.",
  initialValue: 0,
  validation: (rule) => rule.required(),
})

import { defineArrayMember, defineField, defineType } from "sanity"

export const stat = defineType({
  name: "stat",
  title: "Número em destaque",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Valor", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "text", title: "Texto", type: "text", rows: 3, validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: "value", subtitle: "text" },
  },
})

export const blockContent = defineType({
  name: "blockContent",
  title: "Corpo",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Parágrafo", value: "normal" },
        { title: "Título", value: "h2" },
        { title: "Subtítulo", value: "h3" },
        { title: "Citação", value: "blockquote" },
      ],
      lists: [{ title: "Lista", value: "bullet" }],
      marks: { decorators: [], annotations: [] },
    }),
    defineArrayMember({
      type: "image",
      title: "Imagem",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texto alternativo", type: "string" }),
        defineField({ name: "caption", title: "Legenda", type: "string" }),
      ],
    }),
    defineArrayMember({ type: "stat" }),
  ],
})

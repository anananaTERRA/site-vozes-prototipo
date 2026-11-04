import { defineField, defineType } from "sanity"

export const fichaItem = defineType({
  name: "fichaItem",
  title: "Item da ficha",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Rótulo", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "value", title: "Valor", type: "string", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
})

export const homeStat = defineType({
  name: "homeStat",
  title: "Número da home",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Valor", type: "string", description: "Só o número, sem o sinal de +.", validation: (rule) => rule.required() }),
    defineField({ name: "label", title: "Legenda", type: "string", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
})

export const segment = defineType({
  name: "segment",
  title: "Segmento",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "text", title: "Texto", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "background", title: "Cor de fundo", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "titleColor", title: "Cor do título", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "href", title: "Link", type: "string", initialValue: "/o-que-fazemos", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: "title", subtitle: "text" },
  },
})

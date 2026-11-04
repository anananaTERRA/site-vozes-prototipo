import { defineField, defineType } from "sanity"
import { bodyField, dateField, excerptField, imageField, imagePositionField, orderField, slugField, themesField, titleField } from "./fields"
import { faceList, publicationTypeList, valueIconList } from "./options"

const articlePreview = {
  select: { title: "title", subtitle: "date", media: "image" },
}

export const noticia = defineType({
  name: "noticia",
  title: "Notícia",
  type: "document",
  fields: [
    titleField,
    slugField,
    excerptField,
    dateField,
    themesField,
    imageField,
    imagePositionField,
    defineField({ name: "caption", title: "Legenda da capa", type: "string" }),
    defineField({ name: "featured", title: "Destaque na listagem", type: "boolean", initialValue: false }),
    bodyField,
  ],
  preview: articlePreview,
})

export const evento = defineType({
  name: "evento",
  title: "Evento",
  type: "document",
  fields: [
    titleField,
    slugField,
    excerptField,
    dateField,
    themesField,
    imageField,
    imagePositionField,
    defineField({ name: "caption", title: "Legenda da capa", type: "string" }),
    defineField({ name: "place", title: "Lugar", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "format", title: "Formato", type: "string", description: "Presencial, remoto ou híbrido.", validation: (rule) => rule.required() }),
    defineField({
      name: "ficha",
      title: "Ficha",
      type: "array",
      of: [{ type: "fichaItem" }],
      validation: (rule) => rule.required().min(1),
    }),
    bodyField,
  ],
  preview: articlePreview,
})

export const midia = defineType({
  name: "midia",
  title: "Na mídia",
  type: "document",
  fields: [
    titleField,
    slugField,
    excerptField,
    dateField,
    themesField,
    imageField,
    defineField({ name: "outlet", title: "Veículo", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "url", title: "Link da matéria", type: "url", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: "title", subtitle: "outlet", media: "image" },
  },
})

export const publicacao = defineType({
  name: "publicacao",
  title: "Publicação",
  type: "document",
  fields: [
    titleField,
    slugField,
    excerptField,
    dateField,
    themesField,
    imageField,
    imagePositionField,
    defineField({
      name: "type",
      title: "Tipo",
      type: "string",
      options: { list: publicationTypeList, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "year", title: "Ano", type: "number", validation: (rule) => rule.required().integer().min(2000).max(2100) }),
    bodyField,
  ],
  preview: {
    select: { title: "title", subtitle: "type", media: "image" },
  },
})

export const teamMember = defineType({
  name: "teamMember",
  title: "Pessoa da equipe",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Cargo", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true }, validation: (rule) => rule.required() }),
    defineField({ name: "color", title: "Cor de fundo", type: "string", description: "Hexadecimal, como #9ca7ef.", validation: (rule) => rule.required() }),
    defineField({ name: "faceX", title: "Rosto, eixo horizontal", type: "number", description: "De 1 a 99. Centraliza o rosto no círculo.", validation: (rule) => rule.required().min(1).max(99) }),
    defineField({ name: "faceY", title: "Rosto, eixo vertical", type: "number", validation: (rule) => rule.required().min(1).max(99) }),
    defineField({ name: "bio", title: "Mini bio", type: "text", rows: 6 }),
    defineField({
      name: "childhoodPhoto",
      title: "Foto de infância",
      type: "image",
      options: { hotspot: true },
      description: "Aparece no verso do card na seção Equipe (Quem somos).",
    }),
    defineField({
      name: "dreamJobText",
      title: "Sonho de infância",
      type: "string",
      description: "Profissão que queria ser quando crescesse (ex.: Professora).",
    }),
    orderField,
  ],
  orderings: [{ title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
})

export const partner = defineType({
  name: "partner",
  title: "Cliente ou parceiro",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "logo", title: "Logo", type: "image", validation: (rule) => rule.required() }),
    defineField({ name: "invertOnDark", title: "Inverter no tema escuro", type: "boolean", initialValue: false }),
    orderField,
  ],
  orderings: [{ title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", media: "logo" } },
})

export const service = defineType({
  name: "service",
  title: "Serviço",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "Identificador",
      type: "string",
      description: "Vira a âncora do link, como #levantamentos. Não mude depois de publicado.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Título", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "face", title: "Ilustração", type: "string", options: { list: faceList }, validation: (rule) => rule.required() }),
    defineField({ name: "accent", title: "Cor de destaque", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "text", title: "Resumo", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({ name: "body", title: "Texto", type: "text", rows: 6, validation: (rule) => rule.required() }),
    defineField({ name: "audience", title: "Para quem", type: "text", rows: 2, validation: (rule) => rule.required() }),
    defineField({ name: "delivery", title: "Como entregamos", type: "text", rows: 2, validation: (rule) => rule.required() }),
    orderField,
  ],
  orderings: [{ title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "text" } },
})

export const testimonial = defineType({
  name: "testimonial",
  title: "Depoimento",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Frase", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "name", title: "Nome", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "role", title: "Cargo e instituição", type: "string", validation: (rule) => rule.required() }),
    orderField,
  ],
  orderings: [{ title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "quote" } },
})

export const chapter = defineType({
  name: "chapter",
  title: "Marco da linha do tempo",
  type: "document",
  fields: [
    orderField,
    defineField({
      name: "year",
      title: "Ano",
      type: "string",
      description: "Aparece no arco interativo em Quem somos → Nossa história.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Título", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "text",
      title: "Texto",
      type: "text",
      rows: 6,
      description: "Parágrafo exibido abaixo do arco quando este marco está selecionado.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "kicker",
      title: "Destaque",
      type: "string",
      description: "Opcional. Reservado para layouts antigos.",
    }),
    defineField({ name: "background", title: "Cor de fundo (legado)", type: "string", hidden: true }),
    defineField({ name: "color", title: "Cor do texto (legado)", type: "string", hidden: true }),
  ],
  orderings: [{ title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "year", subtitle: "title" } },
})

export const value = defineType({
  name: "value",
  title: "Valor",
  type: "document",
  fields: [
    defineField({ name: "icon", title: "Ícone", type: "string", options: { list: valueIconList }, validation: (rule) => rule.required() }),
    defineField({ name: "title", title: "Título", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "text", title: "Texto", type: "text", rows: 4, validation: (rule) => rule.required() }),
    orderField,
  ],
  orderings: [{ title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "text" } },
})

export const faq = defineType({
  name: "faq",
  title: "Pergunta frequente",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Pergunta", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "answer", title: "Resposta", type: "text", rows: 4, validation: (rule) => rule.required() }),
    orderField,
  ],
  orderings: [{ title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question", subtitle: "answer" } },
})

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Textos do site",
  type: "document",
  fields: [
    defineField({
      name: "servicesIntro",
      title: "Introdução dos serviços",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "stats",
      title: "Números da home",
      type: "array",
      of: [{ type: "homeStat" }],
    }),
    defineField({
      name: "segments",
      title: "Com quem trabalhamos",
      type: "array",
      of: [{ type: "segment" }],
    }),
    defineField({
      name: "historyIntro",
      title: "Introdução — Nossa história",
      type: "text",
      rows: 4,
      description: "Parágrafo acima da linha do tempo em Quem somos.",
    }),
  ],
  preview: { prepare: () => ({ title: "Textos do site" }) },
})

export const schemaTypes = [
  noticia,
  evento,
  midia,
  publicacao,
  teamMember,
  partner,
  service,
  testimonial,
  chapter,
  value,
  faq,
  siteSettings,
]

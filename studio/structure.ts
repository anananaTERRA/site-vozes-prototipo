import type { StructureBuilder, StructureResolver } from "sanity/structure"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Textos do site")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      dated(S, "noticia", "Notícias"),
      dated(S, "evento", "Eventos"),
      dated(S, "midia", "Na mídia"),
      dated(S, "publicacao", "Publicações"),
      S.divider(),
      ordered(S, "teamMember", "Equipe"),
      ordered(S, "partner", "Clientes e parceiros"),
      ordered(S, "service", "Serviços"),
      ordered(S, "testimonial", "Depoimentos"),
      ordered(S, "chapter", "Linha do tempo"),
      ordered(S, "value", "Valores"),
      ordered(S, "faq", "Perguntas frequentes"),
    ])

function dated(S: StructureBuilder, typeName: string, title: string) {
  return S.listItem()
    .title(title)
    .child(S.documentTypeList(typeName).title(title).defaultOrdering([{ field: "date", direction: "desc" }]))
}

function ordered(S: StructureBuilder, typeName: string, title: string) {
  return S.listItem()
    .title(title)
    .child(S.documentTypeList(typeName).title(title).defaultOrdering([{ field: "order", direction: "asc" }]))
}

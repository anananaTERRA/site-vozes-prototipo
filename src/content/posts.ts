import impacto from "@/assets/photo-impacto.png"
import porque from "@/assets/photo-porque.png"
import classroom from "@/assets/photo-quem-somos.png"
import school from "@/assets/photo-servicos.png"
import transicao from "@/assets/photo-transicao.png"
import portrait from "@/assets/photo-vozes.png"
import type { ThemeId } from "@/content/themes"
import type { Block, EventArticle, NewsArticle, PressItem, Publication, PublicationType } from "@/content/types"

const photos = [classroom, school, portrait, porque, impacto, transicao]

function story(focus: string, image: string): Block[] {
  return [
    { type: "h2", text: "O que está em jogo" },
    { type: "p", text: focus },
    {
      type: "p",
      text: "A escola vive desafios urgentes e estruturais. As respostas não podem chegar tarde demais, sem contexto ou serem de difícil implementação.",
    },
    { type: "h3", text: "Por onde começar" },
    {
      type: "list",
      items: [
        "Escutar quem vai implementar.",
        "Sistematizar o que já existe de evidência.",
        "Devolver uma solução que caiba na rotina da escola.",
      ],
    },
    {
      type: "quote",
      text: "A parceria trouxe clareza para a nossa rede e segurança para decidir o próximo passo.",
    },
    {
      type: "image",
      src: image,
      alt: "Estudante em ambiente escolar",
      caption: "Imagem provisória do protótipo.",
    },
    {
      type: "stat",
      value: "+12",
      text: "estados já aparecem nos projetos de escuta e implementação da consultoria.",
    },
    {
      type: "p",
      text: "O fechamento devolve um próximo passo concreto para quem lidera a rede, a escola ou a organização.",
    },
  ]
}

export const noticias: NewsArticle[] = [
  {
    kind: "noticia",
    slug: "recomposicao-da-leitura",
    title: "Como redes públicas estão recompondo a leitura sem tratar o atraso como culpa",
    excerpt: "Um relato de escuta com equipes que precisavam decidir o próximo passo da recomposição, com método e sem pressa vazia.",
    date: "2026-09-12",
    themes: ["recomposicao", "aprendizagem"],
    image: photos[0],
    caption: "Sala de aula, imagem provisória.",
    featured: true,
    body: story(
      "Recompor a leitura pede mais do que uma meta anual. As redes que avançaram começaram por escutar quem está na sala antes de escolher o material.",
      photos[1],
    ),
  },
  {
    kind: "noticia",
    slug: "saude-mental-docente",
    title: "Saúde mental docente entra na rotina, não só na semana de conscientização",
    excerpt: "O que muda quando o cuidado deixa de ser campanha e passa a caber no calendário de quem gere a escola.",
    date: "2026-08-03",
    themes: ["saude"],
    image: photos[1],
    caption: "Equipe escolar, imagem provisória.",
    body: story(
      "O desgaste de educadores não se resolve com um cartaz. As escolas que sustentaram o cuidado trataram a saúde mental como parte da organização do trabalho.",
      photos[2],
    ),
  },
  {
    kind: "noticia",
    slug: "escola-em-emergencia",
    title: "Quando a emergência chega, a escola precisa de resposta didática e rápida",
    excerpt: "Protocolos que as equipes conseguem usar no meio da crise, sem um manual que só funciona no papel.",
    date: "2026-07-18",
    themes: ["emergencias"],
    image: photos[2],
    caption: "Estudante em sala, imagem provisória.",
    body: story(
      "Enchente, calor extremo ou uma escola fechada de novo: a pergunta é o que a equipe faz na segunda-feira, não o que o relatório recomenda em abstrato.",
      photos[3],
    ),
  },
  {
    kind: "noticia",
    slug: "familias-na-decisao",
    title: "Parentalidade na pauta: famílias dentro da decisão, não só do convite",
    excerpt: "Reuniões que deixam de ser aviso e passam a organizar o que a escola e a casa podem sustentar juntas.",
    date: "2026-06-02",
    themes: ["parentalidade"],
    image: photos[3],
    caption: "Encontro com famílias, imagem provisória.",
    body: story(
      "Chamar a família para ouvir um comunicado não é parceria. O trabalho começa quando a escola e a casa dividem o que cada uma consegue sustentar.",
      photos[4],
    ),
  },
  {
    kind: "noticia",
    slug: "patio-que-ensina",
    title: "Aprendizagem segura também se decide no pátio e no intervalo",
    excerpt: "O que equipes reorganizaram fora da sala para o estudante se sentir seguro o bastante para aprender.",
    date: "2026-05-14",
    themes: ["aprendizagem", "saude"],
    image: photos[4],
    caption: "Pátio escolar, imagem provisória.",
    body: story(
      "Segurança para aprender não cabe só na aula. Intervalo, entrada e saída mudam o que o estudante consegue fazer quando volta para a carteira.",
      photos[5],
    ),
  },
  {
    kind: "noticia",
    slug: "evidencia-que-chega-na-escola",
    title: "Pesquisa que chega na escola, e não só no congresso",
    excerpt: "Como traduzir evidência nacional e internacional para quem decide na rede, com contexto e linguagem direta.",
    date: "2026-04-09",
    themes: ["pesquisa"],
    image: photos[5],
    caption: "Leitura em sala, imagem provisória.",
    body: story(
      "Evidência que não cabe na rotina de quem implementa chega tarde. O trabalho é escolher o que importa e devolver em formato de decisão.",
      photos[0],
    ),
  },
]

export const eventos: EventArticle[] = [
  {
    kind: "evento",
    slug: "seminario-recomposicao",
    title: "Seminário Recomposição das aprendizagens",
    excerpt: "Um dia para redes compararem o que já tentaram e saírem com um próximo passo combinado.",
    date: "2026-10-22",
    themes: ["recomposicao"],
    image: photos[1],
    imagePosition: "center top",
    caption: "Plateia, imagem provisória.",
    place: "São Paulo",
    format: "Presencial",
    ficha: [
      { label: "Quando", value: "22 de outubro de 2026, 9h" },
      { label: "Onde", value: "São Paulo" },
      { label: "Formato", value: "Presencial" },
      { label: "Para quem", value: "Gestores de rede e coordenadores pedagógicos" },
    ],
    body: story(
      "O seminário junta redes que já começaram a recompor a aprendizagem e ainda precisam decidir o que sustentar no ano seguinte.",
      photos[0],
    ),
  },
  {
    kind: "evento",
    slug: "oficina-parentalidade",
    title: "Oficina Parentalidade e escola",
    excerpt: "Uma oficina curta para redesenhar a reunião de famílias com menos aviso e mais decisão compartilhada.",
    date: "2026-09-30",
    themes: ["parentalidade"],
    image: photos[2],
    caption: "Roda de conversa, imagem provisória.",
    place: "Online",
    format: "Remoto",
    ficha: [
      { label: "Quando", value: "30 de setembro de 2026, 14h" },
      { label: "Onde", value: "Online" },
      { label: "Formato", value: "Remoto" },
      { label: "Para quem", value: "Coordenações e equipes de relação com famílias" },
    ],
    body: story(
      "A oficina parte de uma reunião real da escola e devolve um roteiro que a equipe consegue usar na semana seguinte.",
      photos[3],
    ),
  },
  {
    kind: "evento",
    slug: "imersao-emergencias",
    title: "Imersão Educação nas emergências",
    excerpt: "Dois dias para montar uma resposta de crise que a escola consegue acionar sem esperar um manual novo.",
    date: "2026-08-19",
    themes: ["emergencias"],
    image: photos[3],
    caption: "Equipe em imersão, imagem provisória.",
    place: "Recife",
    format: "Presencial",
    ficha: [
      { label: "Quando", value: "19 e 20 de agosto de 2026" },
      { label: "Onde", value: "Recife" },
      { label: "Formato", value: "Presencial" },
      { label: "Para quem", value: "Secretarias e organizações que atuam em crise" },
    ],
    body: story(
      "A imersão simula a segunda-feira depois da crise: quem decide, o que se comunica às famílias e o que a aula vira.",
      photos[4],
    ),
  },
  {
    kind: "evento",
    slug: "ciclo-saude-mental",
    title: "Ciclo Saúde mental na escola",
    excerpt: "Quatro encontros para equipes tratarem o cuidado como organização do trabalho, não como campanha.",
    date: "2026-11-05",
    themes: ["saude", "aprendizagem"],
    image: photos[4],
    caption: "Encontro de equipe, imagem provisória.",
    place: "Belo Horizonte",
    format: "Híbrido",
    ficha: [
      { label: "Quando", value: "5 de novembro de 2026, 10h" },
      { label: "Onde", value: "Belo Horizonte e transmissão" },
      { label: "Formato", value: "Híbrido" },
      { label: "Para quem", value: "Gestoras escolares e equipes de formação" },
    ],
    body: story(
      "O ciclo ajuda a equipe a localizar o que já desgasta o trabalho e o que pode mudar sem esperar um programa novo.",
      photos[5],
    ),
  },
]

export const midia: PressItem[] = [
  {
    kind: "midia",
    slug: "entrevista-recomposicao",
    title: "Entrevista sobre recomposição das aprendizagens nas redes públicas",
    excerpt: "Conversa sobre o que as redes estão priorizando depois do retorno presencial.",
    date: "2026-03-21",
    themes: ["recomposicao"],
    image: photos[0],
    outlet: "Veículo a confirmar",
    url: "https://example.com/vozes/entrevista-recomposicao",
  },
  {
    kind: "midia",
    slug: "debate-emergencias",
    title: "Debate sobre educação em contextos de emergência",
    excerpt: "Participação em uma mesa sobre resposta rápida para escolas atingidas por crise.",
    date: "2026-02-11",
    themes: ["emergencias"],
    image: photos[2],
    outlet: "Rádio a confirmar",
    url: "https://example.com/vozes/debate-emergencias",
  },
  {
    kind: "midia",
    slug: "artigo-saude-mental",
    title: "Artigo de opinião sobre saúde mental de quem ensina",
    excerpt: "Um texto sobre cuidado que cabe no calendário, não só na campanha.",
    date: "2025-11-28",
    themes: ["saude"],
    image: photos[5],
    outlet: "Revista a confirmar",
    url: "https://example.com/vozes/artigo-saude-mental",
  },
  {
    kind: "midia",
    slug: "comentario-pesquisa",
    title: "Comentário sobre pesquisa que chega na escola",
    excerpt: "Nota sobre traduzir evidência para quem decide no chão da escola.",
    date: "2025-10-04",
    themes: ["pesquisa"],
    image: photos[1],
    outlet: "Portal a confirmar",
    url: "https://example.com/vozes/comentario-pesquisa",
  },
]

const publicationSeed: Array<Omit<Publication, "kind" | "body" | "image"> & { photo: number }> = [
  {
    slug: "guia-escolas-em-crise-2025",
    title: "Guia para escolas em contexto de crise",
    excerpt: "Um roteiro curto para a equipe decidir comunicação, cuidado e aula quando a rotina quebra.",
    date: "2025-11-02",
    themes: ["emergencias"],
    type: "Guia",
    year: 2025,
    photo: 2,
  },
  {
    slug: "relatorio-redes-2025",
    title: "Relatório de escuta com redes públicas",
    excerpt: "O que coordenadores disseram sobre recomposição, tempo e o que não cabe mais no calendário.",
    date: "2025-09-15",
    themes: ["recomposicao"],
    type: "Relatório",
    year: 2025,
    photo: 0,
  },
  {
    slug: "pesquisa-aprendizagem-segura-2024",
    title: "Pesquisa aprendizagem segura fora da sala",
    excerpt: "Achados sobre pátio, entrada e intervalo em escolas que reorganizaram o cuidado.",
    date: "2024-08-20",
    themes: ["aprendizagem"],
    type: "Pesquisa",
    year: 2024,
    photo: 4,
  },
  {
    slug: "artigo-saude-mental-2025",
    title: "Artigo saúde mental como organização do trabalho",
    excerpt: "Uma leitura didática para equipes que querem sair da campanha e entrar na rotina.",
    date: "2025-06-08",
    themes: ["saude"],
    type: "Artigo",
    year: 2025,
    photo: 5,
  },
  {
    slug: "guia-parentalidade-2024",
    title: "Guia de reuniões com famílias",
    excerpt: "Como transformar o encontro com responsáveis em decisão compartilhada.",
    date: "2024-05-12",
    themes: ["parentalidade"],
    type: "Guia",
    year: 2024,
    photo: 3,
  },
  {
    slug: "relatorio-evidencias-2024",
    title: "Relatório de evidências para quem decide",
    excerpt: "Uma seleção comentada do que há de mais útil na pesquisa recente para redes e organizações.",
    date: "2024-12-03",
    themes: ["pesquisa"],
    type: "Relatório",
    year: 2024,
    photo: 1,
  },
  {
    slug: "pesquisa-emergencias-2025",
    title: "Pesquisa respostas educacionais em emergência",
    excerpt: "O que funcionou, e o que não chegou na escola, em respostas recentes a crise.",
    date: "2025-03-18",
    themes: ["emergencias", "pesquisa"],
    type: "Pesquisa",
    year: 2025,
    photo: 2,
  },
  {
    slug: "artigo-recomposicao-2024",
    title: "Artigo recomposição sem culpa",
    excerpt: "Um texto para equipes que precisam recuperar aprendizagem sem transformar o atraso em falta individual.",
    date: "2024-04-07",
    themes: ["recomposicao"],
    type: "Artigo",
    year: 2024,
    photo: 0,
  },
]

export const publicacoes: Publication[] = publicationSeed.map((item) => ({
  kind: "publicacao",
  slug: item.slug,
  title: item.title,
  excerpt: item.excerpt,
  date: item.date,
  themes: item.themes,
  image: photos[item.photo] ?? photos[0],
  imagePosition: item.photo % 2 === 0 ? "center" : "center top",
  type: item.type,
  year: item.year,
  body: story(item.excerpt, photos[(item.photo + 1) % photos.length] ?? photos[0]),
}))

export const publicationTypes: PublicationType[] = ["Guia", "Relatório", "Pesquisa", "Artigo"]

export function newsBySlug(items: NewsArticle[], slug: string) {
  return items.find((item) => item.slug === slug)
}

export function eventBySlug(items: EventArticle[], slug: string) {
  return items.find((item) => item.slug === slug)
}

export function publicationBySlug(items: Publication[], slug: string) {
  return items.find((item) => item.slug === slug)
}

export function relatedNews(items: NewsArticle[], slug: string) {
  return items.filter((item) => item.slug !== slug).slice(0, 3)
}

export function relatedEvents(items: EventArticle[], slug: string) {
  return items.filter((item) => item.slug !== slug).slice(0, 3)
}

export function relatedPublications(items: Publication[], slug: string) {
  return items.filter((item) => item.slug !== slug).slice(0, 3)
}

export type FeedKind = "tudo" | "noticias" | "eventos" | "midia"

export function filterFeed(
  source: { noticias: NewsArticle[]; eventos: EventArticle[]; midia: PressItem[] },
  input: { tipo: FeedKind; tema: string; q: string; ordem: string },
) {
  const { noticias, eventos, midia } = source
  const query = input.q.trim().toLocaleLowerCase("pt-BR")
  const featured = noticias.find((item) => item.featured)
  let items = [
    ...noticias.filter((item) => item.slug !== featured?.slug),
    ...eventos,
    ...midia,
  ]
  if (input.tipo === "noticias") items = items.filter((item) => item.kind === "noticia")
  if (input.tipo === "eventos") items = items.filter((item) => item.kind === "evento")
  if (input.tipo === "midia") items = items.filter((item) => item.kind === "midia")
  if (input.tema) items = items.filter((item) => item.themes.includes(input.tema as ThemeId))
  if (query) {
    items = items.filter((item) =>
      `${item.title} ${item.excerpt}`.toLocaleLowerCase("pt-BR").includes(query),
    )
  }
  items.sort((a, b) =>
    input.ordem === "antigas" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date),
  )
  const destaque =
    featured &&
    (input.tipo === "tudo" || input.tipo === "noticias") &&
    (!input.tema || featured.themes.includes(input.tema as ThemeId)) &&
    (!query || `${featured.title} ${featured.excerpt}`.toLocaleLowerCase("pt-BR").includes(query))
      ? featured
      : undefined
  return { items, destaque }
}

export function filterPublications(
  publications: Publication[],
  input: {
    tipo: string
    ano: string
    tema: string
    q: string
    ordem: string
  },
) {
  const query = input.q.trim().toLocaleLowerCase("pt-BR")
  let items = [...publications]
  if (input.tipo) items = items.filter((item) => item.type === input.tipo)
  if (input.ano) items = items.filter((item) => String(item.year) === input.ano)
  if (input.tema) items = items.filter((item) => item.themes.includes(input.tema as ThemeId))
  if (query) {
    items = items.filter((item) =>
      `${item.title} ${item.excerpt} ${item.type}`.toLocaleLowerCase("pt-BR").includes(query),
    )
  }
  items.sort((a, b) =>
    input.ordem === "antigas" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date),
  )
  return items
}

export type SearchHit = {
  type: "Notícia" | "Evento" | "Na mídia" | "Publicação"
  title: string
  href: string
  external?: boolean
}

export function searchContent(
  source: { noticias: NewsArticle[]; eventos: EventArticle[]; midia: PressItem[]; publicacoes: Publication[] },
  query: string,
): SearchHit[] {
  const q = query.trim().toLocaleLowerCase("pt-BR")
  if (!q) return []
  const hits: SearchHit[] = [
    ...source.noticias.map((item) => ({
      type: "Notícia" as const,
      title: item.title,
      href: `/vozes/noticias/${item.slug}`,
    })),
    ...source.eventos.map((item) => ({
      type: "Evento" as const,
      title: item.title,
      href: `/vozes/eventos/${item.slug}`,
    })),
    ...source.midia.map((item) => ({
      type: "Na mídia" as const,
      title: item.title,
      href: item.url,
      external: true,
    })),
    ...source.publicacoes.map((item) => ({
      type: "Publicação" as const,
      title: item.title,
      href: `/publicacoes/${item.slug}`,
    })),
  ]
  return hits.filter((item) => item.title.toLocaleLowerCase("pt-BR").includes(q))
}

export function recentSearches(source: {
  noticias: NewsArticle[]
  eventos: EventArticle[]
  publicacoes: Publication[]
}): SearchHit[] {
  const hits: SearchHit[] = []
  const news = source.noticias[0]
  const event = source.eventos[0]
  const publication = source.publicacoes[0]
  if (news) hits.push({ type: "Notícia", title: news.title, href: `/vozes/noticias/${news.slug}` })
  if (event) hits.push({ type: "Evento", title: event.title, href: `/vozes/eventos/${event.slug}` })
  if (publication) hits.push({ type: "Publicação", title: publication.title, href: `/publicacoes/${publication.slug}` })
  return hits
}

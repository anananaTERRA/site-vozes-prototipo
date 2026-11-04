import carolina from "@/assets/equipe-carolina.png"
import carolinaChildhood from "@/assets/equipe-carolina-infancia.jpg"
import vanessa from "@/assets/equipe-vanessa.png"
import lais from "@/assets/equipe-lais.png"
import laisChildhood from "@/assets/equipe-lais-infancia.jpg"
import ana from "@/assets/equipe-ana.png"
import anaChildhood from "@/assets/equipe-ana-infancia.jpg"
import claudilene from "@/assets/equipe-claudilene.png"
import claudileneChildhood from "@/assets/equipe-claudilene-infancia.jpg"
import lemann from "@/assets/partners/fundacao-lemann.svg"
import reuna from "@/assets/partners/reuna.svg"
import b3 from "@/assets/partners/b3-social.png"
import mpb from "@/assets/partners/movimento-pela-base.png"
import type { ThemeId } from "@/content/themes"

export const servicesIntro = [
  "Violência, bullying, racismo, emergências climáticas, saúde mental: gestores e educadores enfrentam questões complexas e precisam de ferramentas para respondê-las com eficiência, profundidade e segurança.",
  "Atuamos em seis frentes complementares, que podem ser contratadas separadamente ou combinadas conforme a necessidade da sua escola, rede ou organização.",
] as const

export const services = [
  {
    id: "levantamentos",
    title: "Levantamentos",
    face: "carinha-1",
    accent: "#153792",
    text: "Evidências nacionais e internacionais organizadas para apoiar decisões.",
    body: "Os levantamentos reúnem, comparam e sistematizam o que redes de ensino no Brasil e em outros países já fizeram diante de um mesmo desafio. Partimos de uma dor ou pergunta concreta e, a partir dela, fazemos a curadoria de políticas, protocolos e resultados disponíveis. Ao final, a instituição recebe um relatório estruturado, com casos comparados, lições aprendidas e recomendações adaptadas à sua realidade, pronto para orientar decisões e apoiar o diálogo com equipes e parceiros institucionais.",
    audience: "Redes de ensino, fundações, organizações do terceiro setor e mandatos parlamentares.",
    delivery: "Relatório, painel de dados e oficina de devolutiva.",
  },
  {
    id: "facilitacao",
    title: "Facilitação",
    face: "carinha-2",
    accent: "#1157f3",
    text: "Encontros e oficinas que transformam diferentes vozes em decisões compartilhadas.",
    body: "A facilitação desenha e conduz encontros em que gestores, educadores e parceiros chegam a uma decisão compartilhada. A pauta nasce do desafio da instituição. Cuidamos da escuta entre vozes diferentes e devolvemos o que foi combinado em linguagem que a equipe consegue usar na sequência.",
    audience: "Equipes de secretarias, redes e organizações que precisam decidir juntas.",
    delivery: "Desenho do encontro, condução e registro das decisões.",
  },
  {
    id: "imersoes",
    title: "Imersões",
    face: "carinha-3",
    accent: "#493975",
    text: "Experiências intensivas para conhecer de perto práticas que funcionam.",
    body: "As imersões levam equipes a ver de perto uma prática que já funciona em outro contexto. O percurso junta visita, conversa com quem implementa e tempo para traduzir o que foi observado à realidade de quem volta para a própria rede, escola ou organização.",
    audience: "Lideranças e equipes que precisam alinhar um desafio em comum.",
    delivery: "Roteiro da imersão, mediação e síntese do que levar de volta.",
  },
  {
    id: "materiais",
    title: "Materiais Orientadores",
    face: "carinha-4",
    accent: "#9ca7ef",
    text: "Guias e protocolos que traduzem evidências em orientações práticas.",
    body: "Os materiais orientadores traduzem evidências em guias e protocolos que cabem na rotina de quem implementa. O texto é didático, o formato é o que a equipe realmente abre, e o conteúdo parte do contexto de uso, não de um modelo genérico para arquivar.",
    audience: "Educadores, equipes técnicas e quem implementa a política no dia a dia.",
    delivery: "Guia, protocolo ou documento pronto para uso.",
  },
  {
    id: "consultorias",
    title: "Consultorias",
    face: "carinha-5",
    accent: "#8146cb",
    text: "Assessoria técnica para apoiar o desenho e a implementação de políticas.",
    body: "A consultoria acompanha o desenho e a implementação de uma política ou programa. O trabalho começa pela escuta de quem vai executar e segue nas etapas em que a decisão precisa virar prática, com assessoria técnica ajustada à instituição.",
    audience: "Gestores e equipes que estão desenhando ou implementando uma política.",
    delivery: "Assessoria contínua, com entregas combinadas para cada etapa.",
  },
  {
    id: "cursos",
    title: "Cursos",
    face: "carinha-6",
    accent: "#01c689",
    text: "Formações que conectam evidências à prática de educadores.",
    body: "Os cursos formam educadores e gestores a partir do contexto em que eles trabalham. A evidência entra como ferramenta de aula e de gestão, conectada à prática, e não como leitura separada do dia a dia da escola.",
    audience: "Educadores e gestores de escolas, redes e organizações.",
    delivery: "Formação desenhada para o grupo, com materiais de apoio.",
  },
] as const

export const partners = [
  { name: "Fundação Lemann", src: lemann },
  { name: "Reúna", src: reuna },
  { name: "B3 Social", src: b3 },
  { name: "Movimento pela Base", src: mpb, invertOnDark: true },
] as const

export const segments = [
  {
    title: "Escolas e redes públicas",
    text: "Apoio educacional customizado para quem busca segurança na tomada de decisões ou implementa políticas educacionais.",
    background: "#0d6353",
    titleColor: "#d0e770",
    href: "/o-que-fazemos",
  },
  {
    title: "Terceiro setor",
    text: "Institutos, fundações e organizações que precisam de parceiros para que cada recurso gere o impacto que merece.",
    background: "#153792",
    titleColor: "#9ca7ef",
    href: "/o-que-fazemos",
  },
  {
    title: "Escolas e sistemas de ensino",
    text: "Soluções baseadas em evidências nacionais e internacionais, no que há de mais promissor e inovador em educação para instituições que buscam segurança e excelência.",
    background: "#8146cb",
    titleColor: "#faa4ff",
    href: "/o-que-fazemos",
  },
]

export const testimonials = [
  {
    quote: "A parceria trouxe clareza para a nossa rede e segurança para decidir o próximo passo.",
    name: "Nome a confirmar",
    role: "Cargo · Instituição",
  },
  {
    quote: "O material chegou em linguagem de quem implementa. A equipe usou na semana seguinte.",
    name: "Nome a confirmar",
    role: "Cargo · Instituição",
  },
  {
    quote: "Saímos da escuta com uma decisão, não com mais um diagnóstico parado.",
    name: "Nome a confirmar",
    role: "Cargo · Instituição",
  },
]

export const historyIntro =
  "O Vozes da Educação saiu de uma ideia para se tornar referência nacional em consultoria educacional, influenciando políticas públicas, apoiando gestões estaduais e impactando mais de 2.000 escolas em todo o Brasil. Tudo começou com uma mulher que acreditava, e ainda acredita, que a educação brasileira pode ser muito melhor."

const chapterTone = { background: "#f5f2eb", color: "#493975" }

export const chapters = [
  {
    year: "2019",
    title: "Nasce uma Consultoria",
    ...chapterTone,
    text: "Depois de atuar como professora, gestora pública e formadora de educadores, Carolina Campos percebeu que muitas soluções em educação já estavam disponíveis no Brasil e no mundo, mas em geral, quem vive a escola no dia-a-dia não era suficientemente ouvido. Isso a motivou a criar o Vozes, em Fevereiro de 2019.",
  },
  {
    year: "2020",
    title: "A Pandemia, o Vozes e a reabertura das escolas",
    ...chapterTone,
    text: "Poucos meses depois, a pandemia fechou as escolas do mundo inteiro. Começamos a mapear como outros países estavam reabrindo as suas escolas e o nosso documento serviu de insumo para uma série de publicações. Ele foi traduzido para o inglês e distribuído globalmente. Até hoje, esses materiais orientam decisões de juízes, promotores e gestores públicos.",
  },
  {
    year: "2021",
    title: "Iniciativas para mitigar impactos da pandemia nas redes públicas brasileiras",
    ...chapterTone,
    text: "Alguns parceiros nos procuraram para implementar estratégias de reabertura. Em um mês, alocamos consultores em 12 estados brasileiros. A meta foi 100% cumprida. Nosso levantamento sobre recomposição de aprendizagens chegou ao Ministério da Educação, ao CNE e foi apresentado a mais de 300 redes de ensino, inspirando a criação de uma escola de verão pela Prefeitura do Rio de Janeiro. Depois, nos debruçamos sobre a temática de saúde mental no pós-pandemia, analisando boas práticas em oito países. O trabalho apoiou mais de 400 redes de ensino, embasou um projeto de lei no Congresso e sustentou o relatório da COMEX na Câmara.",
  },
  {
    year: "2022",
    title: "Saúde Mental nas Escolas",
    ...chapterTone,
    text: "Criamos o PodCast “Vozes da Educação” e lançamos o Movimento “Aprendizagem Segura”, que teve como objetivo mostrar a intersecção entre saúde mental, trauma e educação para redes de ensino e escolas de todo o país. O que começou como um movimento, virou nossa forma de trabalhar e atuar, que perdura até hoje.",
  },
  {
    year: "2023",
    title: "Violência nas escolas: protocolos de prevenção, proteção e segurança",
    ...chapterTone,
    text: "O ano marcado pelo aumento significativo do número de atentados de violência extrema nas escolas de todo o Brasil, também foi o ano que nos levou a desenvolver protocolos de enfrentamento às múltiplas violências escolares e encaminhamentos de saúde mental no ambiente escolar. Apoiamos redes municipais e estaduais no desenho, escrita e implementação de seus protocolos.",
  },
  {
    year: "2024",
    title: "As enchentes do Rio Grande do Sul e a Escola Resiliente",
    ...chapterTone,
    text: "As enchentes no Rio Grande do Sul destruíram escolas e deixaram comunidades inteiras em colapso. Em parceria com a SEDUC-RS e outros parceiros incríveis, ofertamos formações sobre acolhimento escolar e abordagem sensível ao trauma em contexto de crise climática.",
  },
  {
    year: "2025",
    title: "Iniciativas para fortalecer os sistemas educacionais frente às crises climáticas",
    ...chapterTone,
    text: "Lançamos, junto com grandes parceiros, o documento “Educação Resiliente”. No mesmo ano, publicamos o PLANCON Escolar, guia para elaboração de planos de contingência escolares para eventos climáticos, que está apoiando as mais de 2.700 escolas gaúchas.",
  },
  {
    year: "2026",
    title: "Seguimos ouvindo, sistematizando e ecoando as Vozes da Educação.",
    ...chapterTone,
    text: "Estamos ampliando a abrangência dos Planos de Contingência para outros estados brasileiros e lançamos a coletânea “Cadernos Educação e Emergências Climáticas”, graças ao apoio de parceiros que seguem acreditando no nosso trabalho. Seguimos respondendo aos desafios que a educação já conhece e nos preparamos para os que estão chegando, como o impacto do El Niño e de outras emergências em educação.",
  },
]

export const team = [
  {
    name: "Carolina Campos",
    role: "Fundadora e diretora executiva",
    photo: carolina,
    color: "#9ca7ef",
    face: { x: 62.1, y: 46.8 },
    childhoodPhoto: carolinaChildhood,
    dreamJobText: "Professora",
    bio: "Professora e advogada com mestrado em Políticas Públicas, estudou inovação educacional na escola de extensão da Universidade de Harvard. Foi Diretora Pedagógica da ESFAPEGE, a escola de formação de professores em Sobral/CE, além de Secretária Municipal de Educação de Gravatá/PE. Assessorou a Diretoria de Formação dos Profissionais da Educação da Secretaria de Educação Básica/MEC. É membro do Conselho do Movimento Mapa Educação e do Conselho Representativo da Fundação Lemann, além de pesquisadora associada do CPRE / Teachers College / Columbia University. Acredita que as escolas podem ser espaços melhores, mais humanos e afetivos para educadores e estudantes. Fora do Vozes: sou mãe de um rapaz e de 2 gatos, mosaiquista e tenho paixão por pipoca, discos de vinil e cultura brasileira!",
  },
  {
    name: "Vanessa Terra",
    role: "Coordenadora de projetos",
    photo: vanessa,
    color: "#d0e770",
    face: { x: 40.9, y: 40.4 },
  },
  {
    name: "Laís Fonseca",
    role: "Analista de Pesquisa e Inovação",
    photo: lais,
    color: "#9ca7ef",
    face: { x: 59.4, y: 37.7 },
    childhoodPhoto: laisChildhood,
    dreamJobText: "Psicóloga",
    bio: "Sou formada em Engenharia Civil pela USP, Licenciatura em Matemática e Pedagogia, e pós-graduada em Práticas da Educação Bilíngue. Atuei em escolas bilíngues com turmas do Ensino Fundamental, como professora autônoma com materiais didáticos autorais e como assistente administrativa em escola. Hoje, sou Analista de Pesquisa e Inovação no Vozes da Educação. Para mim, a educação é o que nos desperta como seres humanos e amplia nossas possibilidades. Fora do trabalho, sou apaixonada por música e gosto de aprender um pouco de cada instrumento.",
  },
  {
    name: "Ana Terra Viana",
    role: "Designer Gráfica",
    photo: ana,
    color: "#faa4ff",
    face: { x: 56.5, y: 55.7 },
    childhoodPhoto: anaChildhood,
    dreamJobText: "Arqueóloga",
  },
  {
    name: "Claudilene Santos",
    role: "Analista Financeiro",
    photo: claudilene,
    color: "#01c689",
    face: { x: 54.1, y: 47.5 },
    childhoodPhoto: claudileneChildhood,
    dreamJobText: "Contadora",
  },
]

export const values = [
  {
    title: "Antecipação",
    text: "Estamos sempre um passo à frente, acompanhando o que há de mais atual e relevante no cenário da educação mundial.",
  },
  {
    title: "Tradução",
    text: "Transformamos o que é complexo em linguagem acessível para todos que se envolvem com a educação.",
  },
  {
    title: "Humanidade",
    text: "Para nós, o cuidado com as pessoas é primordial. Cada projeto carrega afeto por quem está do outro lado.",
  },
  {
    title: "Fundamentação",
    text: "Produzimos soluções fundamentadas em conhecimento verificável, análise cuidadosa e aplicação prática.",
  },
  {
    title: "Colaboração",
    text: "Criamos parceria com instituições, gestores e educadores para encontrar, criar e disseminar o que há de melhor em educação.",
  },
]

export const faq = [
  {
    q: "O Vozes é uma ONG?",
    a: "Não. Somos uma consultoria privada.",
  },
  {
    q: "Como funciona o trabalho do Vozes?",
    a: "Cada projeto começa pela escuta do contexto e dos desafios de quem vai implementar. A solução vem depois, desenhada sob medida.",
  },
  {
    q: "O Vozes atende organizações de todo o Brasil?",
    a: "Trabalhamos com escolas, redes públicas, terceiro setor e sistemas de ensino. Os projetos já passaram por estados diferentes e também por outros países.",
  },
  {
    q: "Como entrar em contato para entrevistas ou matérias?",
    a: "Pelo bloco de assessoria em Vozes na mídia, ou pelo formulário com o assunto Imprensa. Telefone (11) 94629-2212.",
  },
  {
    q: "Como trabalhar no Vozes?",
    a: "Envie uma mensagem pelo formulário com o assunto Trabalhe conosco e conte em que frente você quer contribuir.",
  },
  {
    q: "Como posso saber se o Vozes é o parceiro certo para o meu projeto?",
    a: "Conte o que sua instituição está enfrentando. A partir daí, construímos juntos a melhor solução — e também dizemos se não formos o parceiro certo.",
  },
]

export const subjects = [
  { value: "parceria", label: "Parceria" },
  { value: "imprensa", label: "Imprensa" },
  { value: "trabalhe", label: "Trabalhe conosco" },
  { value: "outro", label: "Outro assunto" },
]

export const footerColumns: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Quem somos",
    links: [
      { label: "Nossa história", to: "/quem-somos#historia" },
      { label: "Equipe", to: "/quem-somos#equipe" },
      { label: "Como trabalhamos", to: "/quem-somos#como-trabalhamos" },
    ],
  },
  {
    title: "O que fazemos",
    links: [
      { label: "Levantamentos", to: "/o-que-fazemos#levantamentos" },
      { label: "Facilitação", to: "/o-que-fazemos#facilitacao" },
      { label: "Documentos", to: "/o-que-fazemos#materiais" },
      { label: "Consultorias", to: "/o-que-fazemos#consultorias" },
      { label: "Advocacy", to: "/o-que-fazemos#imersoes" },
      { label: "Cursos", to: "/o-que-fazemos#cursos" },
    ],
  },
  {
    title: "Publicações",
    links: [
      { label: "Educação nas emergências", to: "/publicacoes?tema=emergencias" },
      { label: "Aprendizagem segura", to: "/publicacoes?tema=aprendizagem" },
      { label: "Recomposição das aprendizagens", to: "/publicacoes?tema=recomposicao" },
      { label: "Saúde mental", to: "/publicacoes?tema=saude" },
      { label: "Parentalidade", to: "/publicacoes?tema=parentalidade" },
      { label: "Pesquisa e inovação", to: "/publicacoes?tema=pesquisa" },
    ],
  },
  {
    title: "Vozes na mídia",
    links: [
      { label: "Reportagens", to: "/vozes?tipo=noticias" },
      { label: "Eventos", to: "/vozes?tipo=eventos" },
      { label: "Assessoria de imprensa", to: "/vozes#imprensa" },
    ],
  },
  {
    title: "Contato",
    links: [
      { label: "Fale conosco", to: "/contato" },
      { label: "Perguntas frequentes", to: "/contato#faq" },
    ],
  },
]

export const stats = [
  { value: "12", label: "estados atendidos" },
  { value: "5", label: "países alcançados" },
  { value: "50", label: "parceiros pelo mundo" },
  { value: "2.000", label: "redes impactadas" },
]

export function themeHref(id: ThemeId, target: "vozes" | "publicacoes" = "vozes") {
  const base = target === "vozes" ? "/vozes" : "/publicacoes"
  return `${base}?tema=${id}`
}

export const themes = [
  {
    id: "emergencias",
    label: "Educação nas emergências",
    short: "Educação nas emergências",
    background: "#d0e770",
    foreground: "#0d6353",
  },
  {
    id: "aprendizagem",
    label: "Aprendizagem segura",
    short: "Aprendizagem segura",
    background: "#9ca7ef",
    foreground: "#153792",
  },
  {
    id: "recomposicao",
    label: "Recomposição das aprendizagens",
    short: "Recomposição",
    background: "#faa4ff",
    foreground: "#493975",
  },
  {
    id: "saude",
    label: "Saúde mental",
    short: "Saúde mental",
    background: "#0d6353",
    foreground: "#d0e770",
  },
  {
    id: "parentalidade",
    label: "Parentalidade",
    short: "Parentalidade",
    background: "#153792",
    foreground: "#9ca7ef",
  },
  {
    id: "pesquisa",
    label: "Pesquisa e inovação",
    short: "Pesquisa",
    background: "#8146cb",
    foreground: "#ffffff",
  },
] as const

export type ThemeId = (typeof themes)[number]["id"]

export function themeById(id: ThemeId) {
  const theme = themes.find((item) => item.id === id)
  if (!theme) throw new Error(`Tema desconhecido: ${id}`)
  return theme
}

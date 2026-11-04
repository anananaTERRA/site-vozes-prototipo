/** Vertical rhythm for the paper section — Agente 14 stacks PartnerStrip + ServiceCards after this block. */
export const SOLUTIONS_PAPER_SPACING = {
  introToPartners: "mt-20 md:mt-24",
  partnersToServices: "mt-20 md:mt-28",
  servicesToCta: "mt-16 md:mt-20",
} as const

export function SolutionsIntro() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-8 text-center md:gap-10">
      <h2 className="max-w-[1040px] font-display text-4xl leading-[54px] tracking-[-0.48px] md:text-5xl">
        Soluções personalizadas para os desafios que sua instituição enfrenta
      </h2>
      <p className="max-w-[540px] text-lg leading-[29px]">
        Cada projeto começa pela escuta do contexto e dos desafios de quem vai implementar. A solução vem depois, desenhada sob medida.
      </p>
    </div>
  )
}

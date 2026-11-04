import { MorphPillButton } from "@/components/brand/MorphPillButton"

export function SolutionsIntro() {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-6 text-center">
      <h2 className="max-w-[1040px] font-display text-4xl leading-[54px] tracking-[-0.48px] md:text-5xl">
        Soluções personalizadas para os desafios que sua instituição enfrenta
      </h2>
      <p className="max-w-[540px] text-lg leading-[29px]">
        Cada projeto começa pela escuta do contexto e dos desafios de quem vai implementar. A solução vem depois, desenhada sob medida.
      </p>
      <MorphPillButton to="/contato" />
    </div>
  )
}

import { MorphPillButton } from "@/components/brand/MorphPillButton"
import { SOLUTIONS_PAPER_SPACING } from "@/components/home/SolutionsIntro"

/** CTA “Fale conosco” — montado após ServiceCards na seção paper (Agente 14). */
export function SolutionsContactCta() {
  return (
    <div className={`mx-auto flex w-full max-w-[1280px] justify-center ${SOLUTIONS_PAPER_SPACING.servicesToCta}`}>
      <MorphPillButton to="/contato" />
    </div>
  )
}

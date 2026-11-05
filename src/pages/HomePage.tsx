import { PartnerStrip } from "@/components/content/PartnerStrip"
import { HomeHero } from "@/components/home/HomeHero"
import { HomeConvictionBand } from "@/components/home/HomeConvictionBand"
import { HomeMediaSection } from "@/components/home/HomeMediaSection"
import { HomePublicationsSection } from "@/components/home/HomePublicationsSection"
import { HomeSegmentsSection } from "@/components/home/HomeSegmentsSection"
import { HomeVoiceBand } from "@/components/home/HomeVoiceBand"
import { ProcessScroll } from "@/components/home/ProcessScroll"
import { ServiceCards } from "@/components/home/ServiceCards"
import { SolutionsContactCta } from "@/components/home/SolutionsContactCta"
import { SOLUTIONS_PAPER_SPACING, SolutionsIntro } from "@/components/home/SolutionsIntro"
import { StatsBand } from "@/components/home/StatsBand"
import { TestimonialsLayer } from "@/components/home/TestimonialsLayer"
import { WhyWeExist } from "@/components/home/WhyWeExist"
import { useSiteContent } from "@/content/provider"

export function HomePage() {
  const { testimonials, segments, noticias, publicacoes } = useSiteContent()
  const featured = noticias.filter((item) => !item.featured).slice(0, 3)
  const books = publicacoes.slice(0, 4)

  return (
    <div>
      <HomeHero />

      <StatsBand />
      <WhyWeExist />
      <ProcessScroll />

      <section className="bg-paper px-6 py-24 md:px-20">
        <SolutionsIntro />
        <div className={`mx-auto w-full max-w-[1280px] ${SOLUTIONS_PAPER_SPACING.introToPartners}`}>
          <PartnerStrip heading="Clientes e parceiros" />
        </div>
        <div className={SOLUTIONS_PAPER_SPACING.partnersToServices}>
          <ServiceCards />
        </div>
        <SolutionsContactCta />
      </section>

      <TestimonialsLayer items={testimonials} />
      <HomeSegmentsSection segments={segments} />
      <HomeConvictionBand />
      <HomeMediaSection items={featured} />
      <HomeVoiceBand />
      <HomePublicationsSection items={books} />
    </div>
  )
}

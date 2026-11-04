import { Link } from "react-router"
import { BrandButton } from "@/components/brand/BrandButton"
import { MorphPillButton } from "@/components/brand/MorphPillButton"
import { WordBalloon } from "@/components/brand/WordBalloon"
import { PartnerStrip } from "@/components/content/PartnerStrip"
import { HomeConvictionBand } from "@/components/home/HomeConvictionBand"
import { HomeFinalCta } from "@/components/home/HomeFinalCta"
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
      <section className="bg-indigo text-white">
        <div className="mx-auto flex min-h-[640px] w-full max-w-[1440px] items-center px-6 py-16 md:px-20">
          <div className="max-w-[640px]">
            <h1 className="font-display text-6xl leading-none font-normal tracking-[-1.76px] md:text-[88px] md:leading-[92px]">
              Conectar vozes,
              <span className="block">
                <WordBalloon color="#ff8327" className="text-[56px] leading-none md:text-[88px] md:leading-[92px]">
                  transformar
                </WordBalloon>
              </span>
              a educação
            </h1>
            <p className="mt-8 max-w-xl text-[22px] leading-[34px]">
              Transformamos conhecimento de ponta em soluções personalizadas para quem lidera escolas, redes e organizações.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <MorphPillButton to="/contato" surface="dark" pill="orange" size="compact" />
              <BrandButton tone="link" asChild className="shrink-0">
                <Link to="/o-que-fazemos">Conheça o que fazemos →</Link>
              </BrandButton>
            </div>
          </div>
        </div>
      </section>

      <StatsBand />
      <WhyWeExist />
      <ProcessScroll />

      <section className="bg-paper px-6 py-24 md:px-20">
        <SolutionsIntro />
        <div className={`mx-auto w-full max-w-[1280px] ${SOLUTIONS_PAPER_SPACING.introToPartners}`}>
          <PartnerStrip heading="PARCEIROS" />
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
      <HomeFinalCta />
    </div>
  )
}

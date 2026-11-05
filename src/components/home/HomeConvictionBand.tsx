import { Link } from "react-router"
import impacto from "@/assets/photo-impacto.png"
import { BrandButton } from "@/components/brand/BrandButton"
import { ParallaxPhotoSection } from "@/components/motion/ParallaxPhotoSection"

export function HomeConvictionBand() {
  return (
    <ParallaxPhotoSection
      imageSrc={impacto}
      imageAlt="Professora em corredor de escola"
      imageObjectPosition="42% 38%"
      imageOverscan={1.1}
      yRange={["-20%", "20%"]}
      scaleRange={[1.06, 1]}
      minHeight="min-h-[min(560px,85vh)]"
      overlayClassName="bg-gradient-to-r from-indigo/88 via-indigo/55 to-indigo/15"
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-center md:grid-cols-[minmax(0,560px)_1fr] md:gap-12">
        <div className="max-w-[520px] text-left text-white">
          <p className="font-display text-4xl leading-[48px]">
            Nascemos da convicção de que a educação brasileira pode ser muito melhor.
          </p>
          <p className="mt-6 text-lg leading-[29px] text-white/95">
            Acreditamos que isso só acontece quando quem está no chão da escola recebe apoio e tem acesso a conhecimento
            de ponta, contextualizado e aplicável.
          </p>
          <BrandButton asChild className="mt-8">
            <Link to="/contato">Fale com a gente</Link>
          </BrandButton>
        </div>
      </div>
    </ParallaxPhotoSection>
  )
}

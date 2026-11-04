import { Link } from "react-router"
import impacto from "@/assets/photo-impacto.png"
import { BrandButton } from "@/components/brand/BrandButton"
import { ParallaxPhotoSection } from "@/components/motion/ParallaxPhotoSection"

export function HomeConvictionBand() {
  return (
    <ParallaxPhotoSection
      imageSrc={impacto}
      overlayClassName="bg-indigo/65"
      minHeight="min-h-[420px]"
    >
      <div className="mx-auto max-w-[900px] text-center text-white">
        <p className="font-display text-4xl leading-[48px]">
          Nascemos da convicção de que a educação brasileira pode ser muito melhor.
        </p>
        <BrandButton asChild className="mt-8">
          <Link to="/contato">Vamos construir juntos</Link>
        </BrandButton>
      </div>
    </ParallaxPhotoSection>
  )
}

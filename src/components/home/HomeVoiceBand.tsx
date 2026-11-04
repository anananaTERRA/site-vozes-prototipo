import transicao from "@/assets/photo-transicao.png"
import { ParallaxPhotoSection } from "@/components/motion/ParallaxPhotoSection"

export function HomeVoiceBand() {
  return (
    <ParallaxPhotoSection
      imageSrc={transicao}
      overlayClassName="bg-[#49278f]/50"
      minHeight="min-h-[360px]"
      className="py-24"
    >
      <p className="mx-auto max-w-5xl text-center font-display text-4xl leading-[48px] text-white">
        Ouvimos, sistematizamos e <span className="text-white/95">(ecoamos)</span> as vozes da educação.
      </p>
    </ParallaxPhotoSection>
  )
}

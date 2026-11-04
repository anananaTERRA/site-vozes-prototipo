import transicao from "@/assets/photo-transicao.png"
import { ParallaxPhotoSection } from "@/components/motion/ParallaxPhotoSection"

export function HomeVoiceBand() {
  return (
    <ParallaxPhotoSection
      imageSrc={transicao}
      imageAlt="Mãos escrevendo em caderno"
      imageObjectPosition="54% 48%"
      imageOverscan={1.04}
      yRange={["-16%", "16%"]}
      scaleRange={[1.04, 1]}
      minHeight="min-h-[min(640px,82vh)]"
      overlayClassName="bg-gradient-to-r from-[#49278f]/88 via-[#49278f]/52 to-[#49278f]/12"
      className="py-20 md:py-24"
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-center md:grid-cols-[minmax(0,620px)_1fr] md:gap-12">
        <p className="max-w-[580px] text-left font-display text-4xl leading-[48px] text-white">
          Ouvimos, sistematizamos e{" "}
          <span className="inline-flex items-baseline text-pink-light">
            <span className="text-[1.22em] leading-none font-bold">(</span>
            <span className="px-[0.14em] font-bold">ecoamos</span>
            <span className="text-[1.22em] leading-none font-bold">)</span>
          </span>{" "}
          as vozes da educação.
        </p>
      </div>
    </ParallaxPhotoSection>
  )
}

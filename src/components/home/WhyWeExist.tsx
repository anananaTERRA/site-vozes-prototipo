import porque from "@/assets/photo-porque.png"
import { ParallaxPhotoSection } from "@/components/motion/ParallaxPhotoSection"

export function WhyWeExist() {
  return (
    <ParallaxPhotoSection
      imageSrc={porque}
      imageAlt="Estudante em sala de aula"
      imageObjectPosition="72% 40%"
      imageOverscan={1.1}
      yRange={["-20%", "20%"]}
      scaleRange={[1.06, 1]}
      minHeight="min-h-[min(720px,90vh)]"
      overlayClassName="bg-gradient-to-r from-indigo/88 via-indigo/55 to-indigo/15"
    >
      <div className="mx-auto grid w-full max-w-[1280px] items-center md:grid-cols-[minmax(0,560px)_1fr] md:gap-12">
        <div className="max-w-[500px] text-left text-white">
          <p className="text-[13px] font-extrabold tracking-[1.04px]">POR QUE EXISTIMOS</p>
          <p className="mt-6 font-display text-[32px] leading-[44px]">
            A escola vive desafios urgentes e estruturais. As respostas não podem chegar tarde demais, sem contexto ou serem de difícil implementação.
          </p>
          <p className="mt-6 font-display text-[28px] leading-9 text-white">É aí que o Vozes entra.</p>
        </div>
      </div>
    </ParallaxPhotoSection>
  )
}

import porque from "@/assets/photo-porque.png"
import { ParallaxPhotoSection } from "@/components/motion/ParallaxPhotoSection"

export function WhyWeExist() {
  return (
    <ParallaxPhotoSection imageSrc={porque} overlayClassName="bg-indigo/55">
      <div className="mx-auto max-w-[800px] text-center text-white">
        <p className="text-[13px] font-extrabold tracking-[1.04px]">POR QUE EXISTIMOS</p>
        <p className="mt-6 font-display text-[32px] leading-[44px]">
          A escola vive desafios urgentes e estruturais. As respostas não podem chegar tarde demais, sem contexto ou serem de difícil implementação.
        </p>
        <p className="mt-6 font-display text-[28px] leading-9 text-white">É aí que o Vozes entra.</p>
      </div>
    </ParallaxPhotoSection>
  )
}

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import porque from "@/assets/photo-porque.png"
import { WordBalloon } from "@/components/brand/WordBalloon"

export function WhyWeExist() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[520px] items-center justify-center overflow-hidden px-6 py-24"
    >
      {reduceMotion ? (
        <img src={porque} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <motion.div className="pointer-events-none absolute inset-0" style={{ y }}>
          <img
            src={porque}
            alt=""
            className="absolute top-[-20%] left-[-20%] h-[140%] w-[140%] max-w-none object-cover"
          />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-indigo/55" />
      <div className="relative max-w-[800px] text-center text-white">
        <p className="text-[13px] font-extrabold tracking-[1.04px]">POR QUE EXISTIMOS</p>
        <p className="mt-6 font-display text-[32px] leading-[44px]">
          A escola vive desafios urgentes e estruturais. As respostas não podem chegar tarde demais, sem contexto ou serem de difícil implementação.
        </p>
        <p className="mt-6">
          <span className="inline-block rounded-[24px] bg-[#1a122e] px-3 pt-2 pb-4 shadow-[0_0_0_8px_rgba(26,18,46,0.72),0_18px_48px_rgba(12,8,24,0.35)]">
            <WordBalloon color="#d0e770" className="text-[28px] leading-9 not-italic">É aí que o Vozes entra.</WordBalloon>
          </span>
        </p>
      </div>
    </section>
  )
}

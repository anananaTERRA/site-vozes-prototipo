import { useRef, useState } from "react"
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react"

const steps = [
  "Transformamos conhecimento de ponta",
  "Em soluções personalizadas para você",
]

const colors = ["#493975", "#0d6353"]
const anchors = [0, 1]

function nearestStep(value: number) {
  return value < 0.5 ? 0 : 1
}

export function ProcessScroll() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })
  const [step, setStep] = useState(0)
  const backgroundColor = useTransform(scrollYProgress, [0, 1], colors)
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const scale = useTransform(scrollYProgress, (value) => {
    const distance = Math.min(Math.abs(value - anchors[nearestStep(value)]) / 0.5, 1)
    return 1 - distance * 0.38
  })

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = nearestStep(value)
    setStep((current) => (current === next ? current : next))
  })

  if (reduce) {
    return (
      <section className="bg-[#493975] px-6 py-24 text-white md:px-20">
        <ul className="mx-auto flex w-full max-w-xl flex-col gap-6 text-2xl leading-9 font-light tracking-wide md:text-3xl">
          {steps.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative h-[240vh]">
      <motion.div style={{ backgroundColor }} className="sticky top-0 flex h-svh items-center justify-center px-6">
        <div className="w-full max-w-5xl">
          <div className="relative mx-[5.5rem] h-40">
            <motion.p
              style={{ left: progress, x: "-50%", scale, originX: 0.5, originY: 1 }}
              className="absolute bottom-2 w-min text-left text-xl leading-snug font-light tracking-wide text-white"
            >
              {steps[step]}
            </motion.p>
          </div>
          <div className="relative h-6 w-full">
            <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/30" />
            <div className="absolute inset-x-[5.5rem] top-0 h-6">
              <motion.div className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 rounded-full bg-white" style={{ width: progress }} />
              <motion.div className="absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg" style={{ left: progress }} />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

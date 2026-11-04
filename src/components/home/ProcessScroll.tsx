import { useLayoutEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

const steps = [
  ["Transformamos conhecimento", "de ponta"],
  ["Em soluções personalizadas", "para você"],
]

const colors = ["#493975", "#0d6353"]

export function ProcessScroll() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const [headerHeight, setHeaderHeight] = useState(88)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${headerHeight}px`, "end end"],
  })
  const backgroundColor = useTransform(scrollYProgress, [0, 1], colors)
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const dotScale = useTransform(scrollYProgress, (value) => {
    const anchor = value < 0.5 ? 0 : 1
    const distance = Math.min(Math.abs(value - anchor) / 0.5, 1)
    return 1 + (1 - distance) * 0.35
  })
  const firstOpacity = useTransform(scrollYProgress, (value) => (value < 0.5 ? 1 : 0))
  const secondOpacity = useTransform(scrollYProgress, (value) => (value < 0.5 ? 0 : 1))
  const textScale = useTransform(scrollYProgress, (value) => {
    const anchor = value < 0.5 ? 0 : 1
    const distance = Math.min(Math.abs(value - anchor) / 0.5, 1)
    return 1 - distance * 0.1
  })

  useLayoutEffect(() => {
    const header = document.querySelector("header.sticky")
    if (!header) return
    const update = () => {
      const next = header.getBoundingClientRect().height
      setHeaderHeight((current) => (Math.abs(current - next) < 0.5 ? current : next))
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  if (reduce) {
    return (
      <section className="bg-[#493975] px-6 py-24 text-white md:px-20">
        <ul className="mx-auto flex w-full max-w-xl flex-col gap-6 text-2xl leading-9 font-light tracking-wide md:text-3xl">
          {steps.map((lines) => (
            <li key={lines.join(" ")}>
              {lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </li>
          ))}
        </ul>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative h-[240vh]">
      <motion.div
        style={{ backgroundColor, top: headerHeight, height: `calc(100svh - ${headerHeight}px)` }}
        className="sticky z-0 flex items-center justify-center px-6"
      >
        <div className="relative w-full max-w-5xl">
          <div className="relative h-10 w-full">
            <div className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/30" />
            <motion.div
              className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 rounded-full bg-white"
              style={{ width: progress }}
            />
            <motion.div
              className="absolute top-1/2 z-10 flex w-[min(100%,300px)] flex-col items-center"
              style={{ left: progress, x: "-50%", y: "-50%" }}
            >
              <div className="relative mb-4 min-h-[4.5rem] w-full text-center">
                <motion.div
                  className="absolute inset-x-0 text-xl leading-8 font-light tracking-wide text-white md:text-2xl md:leading-9"
                  style={{ opacity: firstOpacity, scale: textScale }}
                >
                  {steps[0].map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </motion.div>
                <motion.div
                  className="absolute inset-x-0 text-xl leading-8 font-light tracking-wide text-white md:text-2xl md:leading-9"
                  style={{ opacity: secondOpacity, scale: textScale }}
                >
                  {steps[1].map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </motion.div>
              </div>
              <motion.div className="size-6 shrink-0 rounded-full bg-white shadow-lg" style={{ scale: dotScale }} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

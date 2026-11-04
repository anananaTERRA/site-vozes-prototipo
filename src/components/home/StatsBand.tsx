import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"
import { useSiteContent } from "@/content/provider"

const COUNT_SECONDS = 1.2

function targetOf(value: string) {
  const target = Number(value.replace(/\./g, "").replace(",", "."))
  return Number.isFinite(target) ? target : 0
}

function formatStat(current: number, source: string) {
  const digits = String(Math.max(0, Math.round(current)))
  if (!source.includes(".")) return digits
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function StatItem({ value, label, divided }: { value: string; label: string; divided: boolean }) {
  const target = targetOf(value)
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.55 })
  const [text, setText] = useState(() =>
    prefersReducedMotion() ? formatStat(target, value) : formatStat(0, value),
  )

  useEffect(() => {
    if (reduce === null) return
    if (reduce) {
      setText(formatStat(target, value))
      return
    }
    if (!inView) return

    const controls = animate(0, target, {
      duration: COUNT_SECONDS,
      ease: "easeOut",
      onUpdate: (latest) => setText(formatStat(latest, value)),
      onComplete: () => setText(formatStat(target, value)),
    })

    return () => controls.stop()
  }, [inView, reduce, target, value])

  return (
    <div
      ref={ref}
      className={`flex h-full flex-col items-start gap-2 px-3 text-left sm:px-6 xl:px-8 ${
        divided ? "xl:border-l xl:border-indigo dark:xl:border-ink/30" : ""
      }`}
    >
      <p className="flex items-baseline font-display text-4xl leading-none whitespace-nowrap tabular-nums sm:text-5xl xl:text-6xl">
        <span>+</span>
        <span>{text}</span>
      </p>
      <p className="text-[15px] leading-[22px] font-medium">{label}</p>
    </div>
  )
}

export function StatsBand() {
  const { stats } = useSiteContent()
  return (
    <section className="bg-surface">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-y-10 px-6 py-14 md:px-20 xl:grid-cols-4 xl:gap-y-0">
        {stats.map((item, index) => (
          <StatItem key={item.label} value={item.value} label={item.label} divided={index > 0} />
        ))}
      </div>
    </section>
  )
}

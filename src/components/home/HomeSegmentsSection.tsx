import { useState } from "react"
import { Link } from "react-router"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { BrandButton } from "@/components/brand/BrandButton"
import type { Segment } from "@/content/site"

type HomeSegmentsSectionProps = {
  segments: Segment[]
}

function SegmentCard({ segment }: { segment: Segment }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const duration = reduce ? 0 : 0.35

  return (
    <article
      className="relative flex min-h-[400px] flex-col overflow-hidden p-8 text-white"
      style={{ background: segment.background }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      <h3 className="font-display text-[32px] leading-[38px] font-medium" style={{ color: segment.titleColor }}>
        {segment.title}
      </h3>
      <motion.p
        initial={false}
        animate={{ opacity: open ? 1 : 0, y: open || reduce ? 0 : 12 }}
        transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 text-lg leading-[29px]"
      >
        {segment.text}
      </motion.p>
    </article>
  )
}

export function HomeSegmentsSection({ segments }: HomeSegmentsSectionProps) {
  return (
    <section className="bg-surface px-6 py-24 md:px-20">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="font-display text-5xl leading-[54px]">Com quem trabalhamos</h2>
        <div className="mt-10 grid overflow-hidden rounded-[20px] md:grid-cols-3">
          {segments.map((segment) => (
            <SegmentCard key={segment.title} segment={segment} />
          ))}
        </div>
        <div className="mt-10 flex justify-end">
          <BrandButton tone="primary" asChild className="relative pr-12">
            <Link to="/o-que-fazemos#segmentos">
              Saiba mais
              <ArrowRight className="absolute right-4 bottom-3 size-5" aria-hidden />
            </Link>
          </BrandButton>
        </div>
      </div>
    </section>
  )
}

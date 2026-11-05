import { useState } from "react"
import { Link } from "react-router"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { BrandButton } from "@/components/brand/BrandButton"
import { segmentsHomeHeader } from "@/content/institutional"
import type { Segment } from "@/content/site"

type HomeSegmentsSectionProps = {
  segments: Segment[]
}

/** Room for the longest segment blurb (3 cols × 29px line-height, ~5 lines). */
const SEGMENT_BODY_MAX_PX = 150
/** Titles wrap to two lines at card width. */
const SEGMENT_TITLE_MIN_PX = 76
const SEGMENT_BODY_GAP_PX = 32
/** Matches `p-6` vertical padding. */
const SEGMENT_CARD_PADDING_Y_PX = 48

/** Fixed row height = tallest card with title + body fully visible (p-8 × 2). */
const SEGMENT_ROW_MIN_PX =
  SEGMENT_CARD_PADDING_Y_PX + SEGMENT_TITLE_MIN_PX + SEGMENT_BODY_GAP_PX + SEGMENT_BODY_MAX_PX

function SegmentCard({ segment }: { segment: Segment }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const duration = reduce ? 0 : 0.35
  const showBody = open || !!reduce

  return (
    <article
      className="relative flex h-full min-h-[var(--segment-row-min)] flex-col overflow-hidden px-6 py-6 text-white md:px-8"
      style={{ background: segment.background, ["--segment-row-min" as string]: `${SEGMENT_ROW_MIN_PX}px` }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      <h3
        className="shrink-0 font-display text-[32px] leading-[38px] font-medium"
        style={{ minHeight: SEGMENT_TITLE_MIN_PX, color: segment.titleColor }}
      >
        {segment.title}
      </h3>
      <motion.div
        initial={false}
        animate={{ opacity: showBody ? 1 : 0 }}
        transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
        className="shrink-0 overflow-hidden"
        style={{ marginTop: SEGMENT_BODY_GAP_PX, minHeight: SEGMENT_BODY_MAX_PX }}
        aria-hidden={!showBody}
      >
        <p className="text-lg leading-[29px]">{segment.text}</p>
      </motion.div>
    </article>
  )
}

export function HomeSegmentsSection({ segments }: HomeSegmentsSectionProps) {
  return (
    <section className="bg-surface px-6 py-24 md:px-20">
      <div className="mx-auto w-full max-w-[1280px]">
        <h2 className="font-display text-5xl leading-[54px]">{segmentsHomeHeader.title}</h2>
        <p className="mt-4 max-w-3xl text-lg leading-[29px]">{segmentsHomeHeader.support}</p>
        <div
          className="mt-10 grid overflow-hidden rounded-[20px] md:grid-cols-3 md:items-stretch"
          style={{ ["--segment-row-min" as string]: `${SEGMENT_ROW_MIN_PX}px`, minHeight: SEGMENT_ROW_MIN_PX }}
        >
          {segments.map((segment) => (
            <SegmentCard key={segment.title} segment={segment} />
          ))}
        </div>
        <div className="mt-10 flex justify-end">
          <BrandButton tone="primary" asChild>
            <Link to="/o-que-fazemos#segmentos">
              Saiba mais
              <ArrowRight aria-hidden />
            </Link>
          </BrandButton>
        </div>
      </div>
    </section>
  )
}

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import type { Chapter } from "@/content/site"
import { cn } from "cn"

type HistoryTimelineCarouselProps = {
  chapters: Chapter[]
}

const STEP = 28
const VISIBLE = 102
const ACTIVE_SCALE = 2.08
const ARROW_ZONE = 56
const COMPACT_COPY_HEIGHT = 300
const EASE = [0.16, 1, 0.3, 1] as const

export function HistoryTimelineCarousel({ chapters }: HistoryTimelineCarouselProps) {
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const frameRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const active = Math.min(index, Math.max(chapters.length - 1, 0))
  const chapter = chapters[active]

  useLayoutEffect(() => {
    const el = frameRef.current
    if (!el) return
    const measure = () => setWidth(el.clientWidth)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function go(delta: number) {
    setIndex((current) => Math.min(Math.max(current + delta, 0), chapters.length - 1))
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      go(1)
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      go(-1)
    }
  }

  if (!chapter) return null

  const compact = width > 0 && width < 720
  const radius = width === 0 ? 420 : compact ? Math.min(220, width * 0.62) : Math.min(560, width * 0.48)
  const restGap = compact ? 24 : 34
  const selectedLift = compact ? 14 : 18
  const selectedSize = compact ? 22 : 38
  const arcTop = restGap + selectedLift + Math.round(selectedSize * ACTIVE_SCALE) + (compact ? 12 : 16)
  const cx = (width || 960) / 2
  const cy = arcTop + radius
  const sweep = compact ? 74 : 90
  const arcDepth = radius * (1 - Math.cos((sweep * Math.PI) / 180))
  const frameHeight = arcTop + arcDepth + (compact ? 20 : 16)
  const copyTop = arcTop + (compact ? 72 : 108)
  const ticks = gaugeTicks(cx, cy, radius)
  const travel = reduceMotion ? { duration: 0 } : { duration: 0.78, ease: EASE }
  const copyTravel = reduceMotion ? { duration: 0 } : { duration: 0.4, ease: EASE }

  const copyBody = (
    <div className="text-center" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.div
          key={chapter.year}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
          transition={copyTravel}
        >
          <h3 className="font-display text-2xl leading-8 font-medium text-balance md:text-[28px] md:leading-9">
            {chapter.title}
          </h3>
          <p className="mt-4 text-base leading-[26px] md:text-lg md:leading-[29px]">{chapter.text}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )

  const arrows = (
    <div className="pointer-events-auto flex items-center justify-center gap-8">
      <button
        type="button"
        className="flex size-11 items-center justify-center text-3xl text-ink transition-opacity disabled:opacity-30"
        onClick={() => go(-1)}
        disabled={active === 0}
        aria-label="Marco anterior"
      >
        ←
      </button>
      <button
        type="button"
        className="flex size-11 items-center justify-center text-3xl text-ink transition-opacity disabled:opacity-30"
        onClick={() => go(1)}
        disabled={active === chapters.length - 1}
        aria-label="Próximo marco"
      >
        →
      </button>
    </div>
  )

  return (
    <div
      className="mt-10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet"
      role="region"
      aria-roledescription="linha do tempo"
      aria-label="Nossa história"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div ref={frameRef} className="relative overflow-hidden" style={{ height: frameHeight }}>
        <svg className="pointer-events-none absolute inset-0 text-ink" width={width || "100%"} height={frameHeight} aria-hidden>
          {ticks.map((tick) => (
            <line
              key={tick.key}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke="currentColor"
              strokeWidth={tick.center ? 1.6 : 1}
              strokeLinecap="round"
              opacity={tick.center ? 0.92 : tick.opacity * (tick.major ? 0.55 : 0.28)}
            />
          ))}
        </svg>

        {!compact ? (
          <>
            <div
              className="pointer-events-none absolute z-20 flex justify-center overflow-hidden"
              style={{
                left: "50%",
                top: copyTop,
                width: Math.min(540, (width || 960) * 0.44),
                bottom: ARROW_ZONE + 12,
                transform: "translateX(-50%)",
              }}
            >
              <div className="pointer-events-auto w-full">{copyBody}</div>
            </div>
            <div
              className="pointer-events-none absolute inset-x-0 z-20 flex justify-center"
              style={{ bottom: 12 }}
            >
              {arrows}
            </div>
          </>
        ) : null}

        {chapters.map((item, i) => {
          const offset = i - active
          const angle = offset * STEP
          const hidden = Math.abs(angle) > VISIBLE
          const selected = i === active
          const dist = Math.abs(offset)
          const lift = selected ? selectedLift : 0
          const scale = selected ? ACTIVE_SCALE : dist === 1 ? 1 : 0.86

          return (
            <motion.div
              key={`${item.year}-${item.title}`}
              className="absolute top-0 left-0 h-0 w-0"
              style={{ left: cx, top: cy }}
              initial={false}
              animate={{ rotate: angle }}
              transition={travel}
              aria-hidden={hidden || undefined}
            >
              <motion.div
                className="absolute top-0 left-0"
                initial={false}
                animate={{ y: -(radius + restGap + lift) }}
                transition={travel}
              >
                <motion.button
                  type="button"
                  tabIndex={hidden ? -1 : 0}
                  aria-current={selected ? "true" : undefined}
                  aria-hidden={hidden || undefined}
                  aria-label={`${item.year}: ${item.title}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "absolute top-0 left-0 cursor-pointer font-display font-bold leading-none tracking-[0.03em] whitespace-nowrap text-violet",
                    compact ? "text-[22px]" : "text-[38px]",
                    selected ? "z-10" : "z-[1]",
                    hidden && "pointer-events-none",
                  )}
                  style={{ originX: 0.5, originY: 1 }}
                  initial={false}
                  animate={{
                    x: "-50%",
                    y: "-100%",
                    scale,
                    opacity: hidden ? 0 : yearOpacity(dist),
                  }}
                  transition={travel}
                >
                  {item.year}
                </motion.button>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {compact ? (
        <div className="relative mx-auto mt-6 max-w-3xl">
          <div className="overflow-y-auto pb-2" style={{ maxHeight: COMPACT_COPY_HEIGHT - ARROW_ZONE }}>
            {copyBody}
          </div>
          <div className="mt-6 flex justify-center">{arrows}</div>
        </div>
      ) : null}
    </div>
  )
}

function yearOpacity(dist: number) {
  if (dist === 0) return 1
  if (dist === 1) return 0.68
  if (dist === 2) return 0.32
  return 0.12
}

function pointOnArc(cx: number, cy: number, radius: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) }
}

function gaugeTicks(cx: number, cy: number, radius: number) {
  const ticks: { key: string; x1: number; y1: number; x2: number; y2: number; center: boolean; major: boolean; opacity: number }[] = []
  for (let angle = -90; angle <= 90; angle += 2) {
    const center = angle === 0
    const major = angle % 10 === 0
    const length = center ? 76 : major ? 22 : 12
    const fade = 1 - (Math.abs(angle) / 90) ** 2.6
    const outer = pointOnArc(cx, cy, radius, angle)
    const inner = pointOnArc(cx, cy, radius - length, angle)
    ticks.push({
      key: String(angle),
      x1: inner.x,
      y1: inner.y,
      x2: outer.x,
      y2: outer.y,
      center,
      major,
      opacity: fade,
    })
  }
  return ticks
}

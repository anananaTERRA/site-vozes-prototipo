import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react"
import type { Chapter } from "@/content/site"
import { cn } from "cn"

type HistoryTimelineCarouselProps = {
  chapters: Chapter[]
}

const STEP = 22.5
const VISIBLE = 96

export function HistoryTimelineCarousel({ chapters }: HistoryTimelineCarouselProps) {
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const frameRef = useRef<HTMLDivElement>(null)
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
    setIndex((current) => {
      const next = Math.min(Math.max(current + delta, 0), chapters.length - 1)
      return next
    })
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
  const radius = width === 0 ? 420 : compact ? Math.min(210, width * 0.58) : Math.min(540, width * 0.48)
  const arcTop = compact ? 52 : 64
  const cx = (width || 960) / 2
  const cy = arcTop + radius
  const frameHeight = arcTop + radius * (1 - Math.cos((72 * Math.PI) / 180)) + (compact ? 36 : 28)
  const ticks = gaugeTicks(cx, cy, radius, -active * STEP - 8, (chapters.length - 1 - active) * STEP + 8)

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
        <svg
          className="absolute inset-0 text-ink"
          width={width || "100%"}
          height={frameHeight}
          aria-hidden
        >
          {ticks.map((tick) => (
            <line
              key={tick.key}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke="currentColor"
              strokeWidth={tick.center ? 1.5 : 1}
              strokeLinecap="round"
              opacity={tick.center ? 0.9 : tick.major ? 0.55 : 0.28}
            />
          ))}
        </svg>
        {chapters.map((item, i) => {
          const angle = (i - active) * STEP
          const hidden = Math.abs(angle) > VISIBLE
          const point = pointOnArc(cx, cy, radius, angle)
          return (
            <button
              key={`${item.year}-${item.title}`}
              type="button"
              tabIndex={hidden ? -1 : 0}
              aria-current={i === active ? "true" : undefined}
              aria-hidden={hidden || undefined}
              aria-label={item.year}
              onClick={() => setIndex(i)}
              className={cn(
                "absolute font-display leading-none tracking-[-0.03em] whitespace-nowrap text-ink transition-[left,top,transform,opacity,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                compact ? "text-[28px]" : "text-[42px]",
                i === active ? "z-10 text-violet" : "text-ink/75",
                hidden ? "pointer-events-none" : "cursor-pointer",
              )}
              style={{
                left: point.x,
                top: point.y,
                opacity: hidden ? 0 : Math.abs(angle) > 72 ? 0.45 : 1,
                transform: `translate(-50%, -50%) rotate(${angle}deg) scale(${i === active ? (compact ? 1.35 : 1.45) : 1})`,
              }}
            >
              {item.year}
            </button>
          )
        })}
      </div>

      <div className="mx-auto mt-2 max-w-3xl text-center" aria-live="polite">
        <h3 className="font-display text-2xl leading-8 font-medium text-balance md:text-[28px] md:leading-9">{chapter.title}</h3>
        <p className="mt-4 text-lg leading-[29px]">{chapter.text}</p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-8">
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
    </div>
  )
}

function pointOnArc(cx: number, cy: number, radius: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) }
}

function gaugeTicks(cx: number, cy: number, radius: number, fromAngle: number, toAngle: number) {
  const ticks: { key: string; x1: number; y1: number; x2: number; y2: number; center: boolean; major: boolean }[] = []
  const start = Math.max(-84, Math.min(0, Math.floor(fromAngle / 3) * 3))
  const end = Math.min(84, Math.max(0, Math.ceil(toAngle / 3) * 3))
  for (let angle = start; angle <= end; angle += 3) {
    const center = angle === 0
    const major = angle % 9 === 0
    const outer = pointOnArc(cx, cy, radius - (center ? 6 : 2), angle)
    const inner = pointOnArc(cx, cy, radius - (center ? 78 : major ? 22 : 14), angle)
    ticks.push({ key: String(angle), ...outerToLine(inner, outer), center, major })
  }
  return ticks
}

function outerToLine(
  inner: { x: number; y: number },
  outer: { x: number; y: number },
) {
  return { x1: inner.x, y1: inner.y, x2: outer.x, y2: outer.y }
}

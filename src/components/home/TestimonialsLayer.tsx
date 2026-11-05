import { useRef, useState, type KeyboardEvent } from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "cn"
import testimonialsGrafismos from "@/assets/testimonials-grafismos.svg?raw"
import type { Testimonial } from "@/content/site"

type TestimonialsLayerProps = {
  items: Testimonial[]
  className?: string
}

const EASE = [0.16, 1, 0.3, 1] as const
const SLIDE_MIN_H = "min-h-[280px] md:min-h-[260px]"
const GRAFISMOS_Y: [string, string] = ["-36%", "36%"]
const GRAFISMOS_SCALE: [number, number] = [1.16, 1]
const GRAFISMOS_OVERSCAN = 1.32

function grafismosOverscanStyle(overscan: number) {
  const bleed = ((overscan - 1) / 2) * 100
  return {
    top: `-${bleed}%`,
    left: `-${bleed}%`,
    width: `${overscan * 100}%`,
    height: `${overscan * 100}%`,
  }
}

export function TestimonialsLayer({ items, className = "" }: TestimonialsLayerProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : GRAFISMOS_Y)
  const bgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : GRAFISMOS_SCALE)

  const grafismosLayer = (
    <div
      className="absolute [&>svg]:absolute [&>svg]:top-[18%] [&>svg]:left-1/2 [&>svg]:h-auto [&>svg]:w-[105%] [&>svg]:max-w-none [&>svg]:-translate-x-1/2"
      style={grafismosOverscanStyle(GRAFISMOS_OVERSCAN)}
      dangerouslySetInnerHTML={{ __html: testimonialsGrafismos }}
    />
  )

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden bg-lavender py-16 md:py-24 bleed-x ${className}`}
      aria-labelledby="depoimentos-home"
    >
      {reduce ? (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {grafismosLayer}
        </div>
      ) : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{ y: bgY, scale: bgScale }}
        >
          {grafismosLayer}
        </motion.div>
      )}

      <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-20">
        <div className="mb-10 text-center md:mb-12">
          <h2 id="depoimentos-home" className="font-display text-5xl leading-[54px] text-white">
            Vozes de quem já caminhou com a gente
          </h2>
          <p className="mt-3 text-lg leading-[29px] text-white/90">O que dizem nossos clientes e parceiros</p>
        </div>
        <TestimonialsCarousel items={items} reduceMotion={!!reduce} />
      </div>
    </section>
  )
}

function TestimonialsCarousel({
  items,
  reduceMotion,
}: {
  items: Testimonial[]
  reduceMotion: boolean
}) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const count = items.length
  const active = count === 0 ? 0 : ((index % count) + count) % count
  const item = items[active]
  const travel = reduceMotion ? { duration: 0 } : { duration: 0.55, ease: EASE }

  function go(delta: number) {
    if (count <= 1) return
    setDirection(delta)
    setIndex((current) => (current + delta + count) % count)
  }

  function goTo(next: number) {
    if (count <= 1 || next === active) return
    setDirection(next > active ? 1 : -1)
    setIndex(next)
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

  if (!item) return null

  const slideVariants = {
    enter: (d: number) =>
      reduceMotion
        ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
        : {
            opacity: 0,
            x: d * 56,
            scale: 0.97,
            filter: "blur(8px)",
          },
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (d: number) =>
      reduceMotion
        ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
        : {
            opacity: 0,
            x: d * -56,
            scale: 0.97,
            filter: "blur(8px)",
          },
  }

  return (
    <div
      className="relative z-10 mx-auto w-full max-w-[912px]"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Depoimentos"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="flex items-center gap-3 md:gap-5">
        <CarouselNavButton
          direction="prev"
          onClick={() => go(-1)}
          disabled={count <= 1}
          className="max-md:hidden"
        />

        <div className={cn("relative flex-1 overflow-hidden", SLIDE_MIN_H)}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.figure
              key={`${active}-${item.quote}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={travel}
              drag={count > 1 && !reduceMotion ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.14}
              onDragEnd={(_, info) => {
                if (info.offset.x < -72 || info.velocity.x < -400) go(1)
                else if (info.offset.x > 72 || info.velocity.x > 400) go(-1)
              }}
              className={cn(
                "relative cursor-grab touch-pan-y rounded-3xl bg-surface/95 px-8 py-12 text-center shadow-[0_24px_80px_rgba(73,57,117,0.14)] backdrop-blur-sm active:cursor-grabbing md:px-20",
                SLIDE_MIN_H,
              )}
              aria-live="polite"
            >
              <blockquote className="relative text-lg leading-[29px] text-balance">
                {item.quote}
              </blockquote>
              {item.name?.trim() || item.role?.trim() ? (
                <figcaption className="relative mt-8">
                  {item.name?.trim() ? <p className="text-xl font-extrabold">{item.name}</p> : null}
                  {item.role?.trim() ? <p className="text-sm font-medium text-violet">{item.role}</p> : null}
                </figcaption>
              ) : null}
            </motion.figure>
          </AnimatePresence>
        </div>

        <CarouselNavButton
          direction="next"
          onClick={() => go(1)}
          disabled={count <= 1}
          className="max-md:hidden"
        />
      </div>

      <div className="mt-8 flex flex-col items-center gap-6">
        <div className="flex items-center justify-center gap-2.5" role="tablist" aria-label="Selecionar depoimento">
          {items.map((entry, i) => (
            <button
              key={entry.quote}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Depoimento ${i + 1} de ${count}`}
              onClick={() => goTo(i)}
              className="flex h-2.5 items-center rounded-full p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet"
            >
              {i === active ? (
                <motion.span
                  layoutId="testimonial-indicator"
                  className="block h-2.5 w-8 rounded-full bg-surface shadow-[0_4px_16px_rgba(73,57,117,0.2)]"
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 32 }}
                />
              ) : (
                <span className="block size-2 rounded-full bg-surface/45 transition-colors hover:bg-surface/70" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <CarouselNavButton direction="prev" onClick={() => go(-1)} disabled={count <= 1} />
          <CarouselNavButton direction="next" onClick={() => go(1)} disabled={count <= 1} />
        </div>
      </div>
    </div>
  )
}

function CarouselNavButton({
  direction,
  onClick,
  disabled,
  className,
}: {
  direction: "prev" | "next"
  onClick: () => void
  disabled?: boolean
  className?: string
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight
  const label = direction === "prev" ? "Depoimento anterior" : "Próximo depoimento"

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "group flex size-12 shrink-0 items-center justify-center rounded-full border border-white/50 bg-surface/90 text-indigo shadow-[0_10px_40px_rgba(73,57,117,0.2)] backdrop-blur-md transition-[transform,box-shadow,background-color] hover:bg-surface hover:shadow-[0_14px_48px_rgba(73,57,117,0.28)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet active:scale-95 disabled:pointer-events-none disabled:opacity-40 md:size-14",
        className,
      )}
    >
      <Icon
        className={cn(
          "size-6 stroke-[2.25] transition-transform md:size-7",
          direction === "prev" ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5",
        )}
        aria-hidden
      />
    </button>
  )
}

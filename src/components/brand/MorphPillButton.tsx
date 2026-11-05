import { useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { ArrowRight, ChevronRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "cn"

const MotionLink = motion.create(Link)
const MotionButton = motion.create("button")

const spring = { type: "spring" as const, stiffness: 400, damping: 30 }
const pillEndPad = 28

const iconEase = [0.45, 0, 0.2, 1] as const
const iconFade = { duration: 0.28, ease: iconEase }
const iconMove = { duration: 0.42, ease: iconEase }

/** Lucide viewBox 24: chevron h=12, ponta da ArrowRight h=14. */
const chevronToArrowHead = 14 / 12
const lucideViewBox = 24
const arrowHeadCenterShift = (12 + 19) / 2 - lucideViewBox / 2

const pillBackground = {
  ink: "bg-ink",
  orange: "bg-orange",
  mint: "bg-mint",
  lime: "bg-lime",
  pink: "bg-pink-light",
} as const

const sizes = {
  default: {
    circle: 56,
    height: 56,
    gap: 12,
    icon: 24,
    label: "text-base font-semibold tracking-wide uppercase whitespace-nowrap leading-none",
  },
  compact: {
    circle: 44,
    height: 44,
    gap: 10,
    icon: 20,
    label: "text-sm font-medium tracking-wide uppercase whitespace-nowrap leading-none",
  },
} as const

function MorphPillIcon({ expanded, size }: { expanded: boolean; size: number }) {
  const chevronSize = size * chevronToArrowHead
  const tipShift = arrowHeadCenterShift * (size / lucideViewBox)

  return (
    <span className="relative grid place-items-center overflow-visible" aria-hidden>
      <motion.span
        className="col-start-1 row-start-1 flex items-center justify-center will-change-transform"
        initial={false}
        animate={{
          opacity: expanded ? 0 : 1,
          x: expanded ? tipShift : 0,
        }}
        transition={{ opacity: iconFade, x: iconMove }}
      >
        <ChevronRight size={chevronSize} strokeWidth={2} absoluteStrokeWidth />
      </motion.span>
      <motion.span
        className="col-start-1 row-start-1 flex items-center justify-center will-change-transform"
        initial={false}
        animate={{
          opacity: expanded ? 1 : 0,
          x: expanded ? 0 : -tipShift,
        }}
        transition={{ opacity: iconFade, x: iconMove }}
      >
        <ArrowRight size={size} strokeWidth={2} absoluteStrokeWidth />
      </motion.span>
    </span>
  )
}

type MorphPillButtonBaseProps = {
  className?: string
  label?: string
  /** Repouso: texto claro ao lado do círculo (hero, footer). */
  surface?: "light" | "dark"
  pill?: keyof typeof pillBackground
  size?: keyof typeof sizes
}

type MorphPillButtonLinkProps = MorphPillButtonBaseProps & {
  to: string
  onClick?: never
}

type MorphPillButtonActionProps = MorphPillButtonBaseProps & {
  to?: never
  onClick: () => void
}

type MorphPillButtonProps = MorphPillButtonLinkProps | MorphPillButtonActionProps

export function MorphPillButton(props: MorphPillButtonProps) {
  const {
    className,
    label = "Fale com a gente",
    surface = "light",
    pill = "ink",
    size = "default",
  } = props
  const to = "to" in props ? props.to : undefined
  const onClick = "onClick" in props ? props.onClick : undefined
  const MotionRoot = to ? MotionLink : MotionButton
  const reducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [textWidth, setTextWidth] = useState(0)

  const metrics = sizes[size]
  const circleSize = metrics.circle
  const labelGap = metrics.gap

  useLayoutEffect(() => {
    if (!labelRef.current) return
    setTextWidth(labelRef.current.offsetWidth)
  }, [label, metrics.label])

  const expanded = reducedMotion === true ? true : hovered
  const labelLeft = circleSize + labelGap
  const expandedWidth = labelLeft + textWidth + pillEndPad
  const pillWidth = textWidth > 0 ? (expanded ? expandedWidth : circleSize) : circleSize

  return (
    <MotionRoot
      {...(to ? { to } : { type: "button" as const, onClick })}
      aria-label={label}
      style={textWidth > 0 ? { width: expandedWidth, height: metrics.height } : { height: metrics.height }}
      className={cn(
        "relative block shrink-0 cursor-pointer border-0 bg-transparent p-0 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHovered(false)
        }
      }}
    >
      <span ref={labelRef} className={cn("pointer-events-none absolute opacity-0", metrics.label)} aria-hidden>
        {label}
      </span>

      <motion.span
        className={cn(
          "absolute top-0 left-0 z-10 rounded-full",
          pillBackground[pill]
        )}
        style={{ height: metrics.height }}
        animate={{ width: pillWidth }}
        transition={spring}
        aria-hidden
      />

      <span
        className="absolute top-0 left-0 z-40 flex items-center justify-center text-white"
        style={{ width: circleSize, height: metrics.height }}
      >
        <MorphPillIcon expanded={expanded} size={metrics.icon} />
      </span>

      <span
        className={cn(
          "absolute top-1/2 z-20 -translate-y-1/2",
          metrics.label,
          surface === "dark" ? "text-white" : "text-ink"
        )}
        style={{ left: labelLeft }}
      >
        {label}
      </span>

      <motion.span
        className="absolute top-0 left-0 z-30 overflow-hidden"
        style={{ height: metrics.height }}
        animate={{ width: pillWidth }}
        transition={spring}
        aria-hidden
      >
        <span
          className={cn("absolute top-1/2 -translate-y-1/2 text-white", metrics.label)}
          style={{ left: labelLeft }}
        >
          {label}
        </span>
      </motion.span>
    </MotionRoot>
  )
}

import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

export type ParallaxPhotoSectionProps = {
  imageSrc: string
  imageAlt?: string
  overlayClassName?: string
  minHeight?: string
  children: ReactNode
  yRange?: [string, string]
  /** Extra image size for parallax travel (1 = flush, 1.2 = 120%). */
  imageOverscan?: number
  imageObjectPosition?: string
  /** Optional zoom-out while scrolling (start → end). */
  scaleRange?: [number, number]
  className?: string
}

function overscanStyle(overscan: number) {
  const bleed = ((overscan - 1) / 2) * 100
  return {
    top: `-${bleed}%`,
    left: `-${bleed}%`,
    width: `${overscan * 100}%`,
    height: `${overscan * 100}%`,
  }
}

export function ParallaxPhotoSection({
  imageSrc,
  imageAlt = "",
  overlayClassName = "bg-indigo/55",
  minHeight = "min-h-[520px]",
  children,
  yRange = ["-12%", "12%"],
  imageOverscan = 1.28,
  imageObjectPosition = "50% 50%",
  scaleRange,
  className = "",
}: ParallaxPhotoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], yRange)
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange ?? [1, 1])
  const bleed = overscanStyle(imageOverscan)

  const imageClass = "absolute max-w-none object-cover"

  return (
    <section
      ref={sectionRef}
      className={`relative flex ${minHeight} items-center justify-center overflow-hidden px-6 py-24 ${className}`}
    >
      {reduceMotion ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: imageObjectPosition }}
        />
      ) : (
        <motion.div
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={scaleRange ? { y, scale } : { y }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className={imageClass}
            style={{ ...bleed, objectPosition: imageObjectPosition }}
          />
        </motion.div>
      )}
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="relative z-10 w-full">{children}</div>
    </section>
  )
}

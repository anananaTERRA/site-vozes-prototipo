import { useRef, type ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

export type ParallaxPhotoSectionProps = {
  imageSrc: string
  imageAlt?: string
  overlayClassName?: string
  minHeight?: string
  children: ReactNode
  yRange?: [string, string]
  className?: string
}

export function ParallaxPhotoSection({
  imageSrc,
  imageAlt = "",
  overlayClassName = "bg-indigo/55",
  minHeight = "min-h-[520px]",
  children,
  yRange = ["-12%", "12%"],
  className = "",
}: ParallaxPhotoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], yRange)

  return (
    <section
      ref={sectionRef}
      className={`relative flex ${minHeight} items-center justify-center overflow-hidden px-6 py-24 ${className}`}
    >
      {reduceMotion ? (
        <img src={imageSrc} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <motion.div className="pointer-events-none absolute inset-0" style={{ y }}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="absolute top-[-20%] left-[-20%] h-[140%] w-[140%] max-w-none object-cover"
          />
        </motion.div>
      )}
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="relative z-10">{children}</div>
    </section>
  )
}

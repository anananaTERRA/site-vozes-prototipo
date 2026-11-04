import { useState } from "react"
import { Link } from "react-router"
import { motion, useReducedMotion } from "motion/react"
import face1 from "@/assets/carinha-1.svg"
import face2 from "@/assets/carinha-2.svg"
import face3 from "@/assets/carinha-3.svg"
import face4 from "@/assets/carinha-4.svg"
import face5 from "@/assets/carinha-5.svg"
import face6 from "@/assets/carinha-6.svg"
import { useSiteContent } from "@/content/provider"
import type { Service } from "@/content/site"

const faceByName: Record<string, string> = {
  "carinha-1": face1,
  "carinha-2": face2,
  "carinha-3": face3,
  "carinha-4": face4,
  "carinha-5": face5,
  "carinha-6": face6,
}

const faces = [face1, face2, face3, face4, face5, face6]
const ease = [0.22, 1, 0.36, 1] as const

function luminance(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16)
  const linear = (channel: number) => {
    const amount = channel / 255
    return amount <= 0.04045 ? amount / 12.92 : ((amount + 0.055) / 1.055) ** 2.4
  }
  const red = linear((value >> 16) & 255)
  const green = linear((value >> 8) & 255)
  const blue = linear(value & 255)
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

const faceLuminance = luminance("#493975")

/** Indigo faces disappear on the darker accents. Those hover copies knock out to white. */
function accentHidesMark(accent: string) {
  const accentLuminance = luminance(accent)
  const lighter = Math.max(accentLuminance, faceLuminance)
  const darker = Math.min(accentLuminance, faceLuminance)
  return (lighter + 0.05) / (darker + 0.05) < 3
}

const MotionLink = motion.create(Link)

function syncOpen(element: HTMLElement) {
  return element.matches(":hover") || element.matches(":focus-visible")
}

function ServiceCard({
  service,
  index,
}: {
  service: Service
  index: number
}) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const duration = reduce ? 0 : 0.4
  const transition = { duration, ease }
  const src = faceByName[service.face] ?? faces[index] ?? face1
  const lighten = accentHidesMark(service.accent)

  function sync(element: HTMLElement) {
    setOpen(syncOpen(element))
  }

  return (
    <MotionLink
      to={`/o-que-fazemos#${service.id}`}
      className="relative flex h-64 w-full flex-col rounded-[20px] bg-surface p-6 outline-none transition-colors duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet motion-reduce:transition-none"
      onMouseEnter={(event) => sync(event.currentTarget)}
      onMouseLeave={(event) => sync(event.currentTarget)}
      onFocus={(event) => {
        const element = event.currentTarget
        requestAnimationFrame(() => {
          if (element.isConnected) sync(element)
        })
      }}
      onBlur={(event) => sync(event.currentTarget)}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[20px]"
        style={{ backgroundColor: service.accent }}
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={transition}
      />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <span className="relative block h-8 w-8 shrink-0">
          <motion.img
            src={src}
            alt=""
            className="h-8 w-8 object-contain dark:brightness-0 dark:invert"
            initial={false}
            animate={{ opacity: open ? 0 : 1 }}
            transition={transition}
          />
          <motion.img
            src={src}
            alt=""
            aria-hidden
            className={`absolute inset-0 h-8 w-8 object-contain ${lighten ? "brightness-0 invert" : ""}`}
            initial={false}
            animate={{ opacity: open ? 1 : 0 }}
            transition={transition}
          />
        </span>
        <div className="relative min-h-0 flex-1">
          <motion.div
            className="absolute inset-x-0 bottom-3"
            initial={false}
            animate={{ opacity: open ? 1 : 0, y: open || reduce ? 0 : 10 }}
            transition={transition}
          >
            <p className="line-clamp-3 text-[15px] leading-[22px] font-medium text-white">{service.text}</p>
          </motion.div>
        </div>
        <h3 className="shrink-0 font-display text-[32px] leading-[38px] font-medium">{service.title}</h3>
        <motion.span
          className="pointer-events-none absolute top-0 right-0 text-[15px] leading-[18px] font-extrabold whitespace-nowrap text-white"
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={transition}
        >
          Saiba mais
        </motion.span>
      </div>
    </MotionLink>
  )
}

export function ServiceCards() {
  const { services } = useSiteContent()
  return (
    <section className="mx-auto mt-16 w-full max-w-[1280px]" aria-labelledby="nossos-servicos">
      <h2 id="nossos-servicos" className="font-display text-5xl leading-[54px]">
        Nossos serviços
      </h2>
      <ul className="mt-10 grid gap-8 md:grid-cols-3">
        {services.map((service, index) => (
          <li key={service.id} className="min-w-0">
            <ServiceCard service={service} index={index} />
          </li>
        ))}
      </ul>
    </section>
  )
}

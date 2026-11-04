import { useState, type FocusEvent, type MouseEvent } from "react"
import { Link } from "react-router"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "cn"

const ease = [0.22, 1, 0.36, 1] as const

export const contactRoutes = [
  {
    id: "whatsapp",
    title: "Fale no WhatsApp",
    href: "https://wa.me/5511946292212",
    external: true,
    accent: "#01c689",
    tone: "light" as const,
  },
  {
    id: "servicos",
    title: "Conheça nossos serviços",
    href: "/o-que-fazemos",
    external: false,
    accent: "#d0e770",
    tone: "dark" as const,
  },
  {
    id: "orcamento",
    title: "Solicite um orçamento",
    href: "/contato?assunto=parceria#inicio",
    external: false,
    accent: "#8146cb",
    tone: "light" as const,
  },
  {
    id: "trabalhe",
    title: "Trabalhe com a gente",
    href: "/contato?assunto=trabalhe#inicio",
    external: false,
    accent: "#9ca7ef",
    tone: "dark" as const,
  },
] as const

const MotionLink = motion.create(Link)
const MotionA = motion.create("a")

function syncOpen(element: HTMLElement) {
  return element.matches(":hover") || element.matches(":focus-visible")
}

function ContactRouteCard({ route }: { route: (typeof contactRoutes)[number] }) {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(false)
  const duration = reduce ? 0 : 0.35
  const transition = { duration, ease }
  const textClass = route.tone === "light" ? "text-white" : "text-indigo"

  const shared = {
    className: cn(
      "group relative flex h-full min-h-[140px] w-full flex-col rounded-[20px] p-6 outline-none",
      textClass,
      "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet",
    ),
    style: { backgroundColor: route.accent },
    onMouseEnter: (event: MouseEvent<HTMLElement>) => setOpen(syncOpen(event.currentTarget)),
    onMouseLeave: (event: MouseEvent<HTMLElement>) => setOpen(syncOpen(event.currentTarget)),
    onFocus: (event: FocusEvent<HTMLElement>) => {
      const element = event.currentTarget
      requestAnimationFrame(() => {
        if (element.isConnected) setOpen(syncOpen(element))
      })
    },
    onBlur: (event: FocusEvent<HTMLElement>) => setOpen(syncOpen(event.currentTarget)),
  }

  const body = (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[20px] bg-black"
        initial={false}
        animate={{ opacity: open ? 0.12 : 0 }}
        transition={transition}
      />
      <h2 className="relative z-10 max-w-[calc(100%-2.5rem)] font-display text-2xl leading-[30px] font-medium">
        {route.title}
      </h2>
      <motion.span
        className="pointer-events-none absolute right-6 bottom-6 z-10"
        aria-hidden
        initial={false}
        animate={{ x: open ? 6 : 0 }}
        transition={transition}
      >
        <ArrowRight size={24} strokeWidth={2} absoluteStrokeWidth />
      </motion.span>
    </>
  )

  if (route.external) {
    return (
      <MotionA href={route.href} target="_blank" rel="noreferrer" {...shared}>
        {body}
      </MotionA>
    )
  }

  return (
    <MotionLink to={route.href} {...shared}>
      {body}
    </MotionLink>
  )
}

export function ContactRouteCards() {
  return (
    <section className="mx-auto grid w-full max-w-[1440px] items-stretch gap-4 px-6 py-10 md:grid-cols-4 md:px-20">
      {contactRoutes.map((route) => (
        <ContactRouteCard key={route.id} route={route} />
      ))}
    </section>
  )
}

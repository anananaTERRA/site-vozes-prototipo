import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router"
import { ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useSiteContent } from "@/content/provider"
import { cn } from "cn"

/** Wait for accordion height animations before aligning the section under the sticky header. */
const ACCORDION_LAYOUT_MS = 280

function scrollServiceIntoView(id: string, behavior: ScrollBehavior = "smooth") {
  const element = document.getElementById(id)
  if (!element) return
  const header = document.querySelector("header")
  const offset = (header?.getBoundingClientRect().height ?? 88) + 12
  const top = element.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top: Math.max(0, top), behavior })
}

export function ServiceIndex() {
  const { services, servicesIntro } = useSiteContent()
  const location = useLocation()
  const pendingScrollRef = useRef<string | null>(null)
  const [open, setOpen] = useState(() => {
    const hash = window.location.hash.replace("#", "")
    return services.some((service) => service.id === hash) ? hash : (services[0]?.id ?? "")
  })

  useEffect(() => {
    const hash = location.hash.replace("#", "")
    if (!services.some((service) => service.id === hash)) return
    setOpen(hash)
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    const timeout = window.setTimeout(() => scrollServiceIntoView(hash, behavior), ACCORDION_LAYOUT_MS)
    return () => window.clearTimeout(timeout)
  }, [location.hash, services])

  useEffect(() => {
    const id = pendingScrollRef.current
    if (!id || id !== open) return
    pendingScrollRef.current = null
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    const timeout = window.setTimeout(() => scrollServiceIntoView(id, behavior), ACCORDION_LAYOUT_MS)
    return () => window.clearTimeout(timeout)
  }, [open])

  function onValueChange(next: string) {
    if (next) pendingScrollRef.current = next
    setOpen(next)
    const hash = `#${next || "servicos"}`
    const path = `${location.pathname}${location.search}${hash}`
    if (`${location.pathname}${location.search}${location.hash}` === path) return
    window.history.replaceState(null, "", path)
  }

  return (
    <section id="servicos" className="bg-surface px-6 py-16 md:px-20 md:py-24">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl leading-[1.12] text-ink md:text-5xl md:leading-[54px]">Nossos serviços</h2>
          <div className="mt-6 flex flex-col gap-4 text-lg leading-7">
            {servicesIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.id}>
              <Link
                to={`#${service.id}`}
                onClick={(event) => {
                  event.preventDefault()
                  onValueChange(service.id)
                }}
                className="group flex h-full min-h-[200px] flex-col rounded-[20px] bg-paper p-6 transition-shadow hover:shadow-lg"
                style={{ borderLeft: `6px solid ${service.accent}` }}
              >
                <span className="text-[13px] font-extrabold tracking-[1.04px] text-violet">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-[28px] leading-8 font-medium">{service.title}</h3>
                <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-[22px]">{service.text}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[15px] font-extrabold text-violet">
                  Ver detalhes
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Accordion type="single" collapsible value={open} onValueChange={onValueChange} className="mt-16 min-w-0 border-t border-line pt-8">
          {services.map((service, index) => {
            const isOpen = open === service.id
            return (
              <AccordionItem
                key={service.id}
                id={service.id}
                value={service.id}
                style={{
                  borderLeftColor: service.accent,
                  borderBottomColor: service.accent,
                  backgroundColor: isOpen ? `color-mix(in srgb, ${service.accent} 10%, white)` : undefined,
                }}
                className={cn(
                  "scroll-mt-28 border-x-0 border-t-0 border-b border-l-4 px-4 py-5 md:px-6 md:py-6",
                  !isOpen && "hover:bg-paper/60",
                )}
              >
                <AccordionTrigger className="items-start gap-4 rounded-none border-0 py-0 text-left hover:no-underline [&_[data-slot=accordion-trigger-icon]]:hidden">
                  <span className="w-10 shrink-0 font-display text-3xl leading-none text-navy tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 font-display text-[26px] leading-8 font-medium md:text-[30px]">
                    {service.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-4 pl-14 text-lg leading-7 text-ink md:pl-16">
                  <p>{service.body}</p>
                  <dl className="mt-5 grid gap-3 text-[15px] leading-6">
                    <div>
                      <dt className="font-extrabold">Para quem</dt>
                      <dd>{service.audience}</dd>
                    </div>
                    <div>
                      <dt className="font-extrabold">Como entregamos</dt>
                      <dd>{service.delivery}</dd>
                    </div>
                  </dl>
                  <Link
                    to={`/contato?assunto=parceria&servico=${encodeURIComponent(service.title)}`}
                    className="mt-5 inline-flex items-center gap-1 font-extrabold text-violet hover:underline"
                  >
                    Conversar sobre este serviço
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}

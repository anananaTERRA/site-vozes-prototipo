import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router"
import { Minus, Plus } from "lucide-react"
import { BrandButton } from "@/components/brand/BrandButton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { services, servicesIntro } from "@/content/institutional"
import { cn } from "cn"

const serviceIds = new Set<string>(services.map((service) => service.id))

function serviceFromHash() {
  const hash = window.location.hash.replace("#", "")
  return serviceIds.has(hash) ? hash : services[0].id
}

export function ServiceIndex() {
  const location = useLocation()
  const [open, setOpen] = useState(serviceFromHash)

  useEffect(() => {
    const hash = location.hash.replace("#", "")
    if (!serviceIds.has(hash)) return
    setOpen(hash)
    document.getElementById(hash)?.scrollIntoView({ block: "start" })
  }, [location.hash])

  function onValueChange(next: string) {
    setOpen(next)
    const hash = `#${next || "servicos"}`
    if (window.location.hash === hash) return
    window.history.replaceState(null, "", hash)
  }

  return (
    <section id="servicos" className="mx-auto grid w-full max-w-[1440px] items-start gap-10 px-6 py-16 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-8 lg:px-20 lg:py-24 xl:grid-cols-[405px_minmax(0,1fr)]">
      <div className="lg:sticky lg:top-28">
        <h2 className="font-display text-4xl leading-[1.12] text-ink md:text-5xl md:leading-[54px]">Nossos serviços</h2>
        <div className="mt-6 flex flex-col gap-6 text-lg leading-7">
          {servicesIntro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <Accordion type="single" collapsible value={open} onValueChange={onValueChange} className="min-w-0">
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
                backgroundColor: isOpen ? `color-mix(in srgb, ${service.accent} 13%, white)` : undefined,
              }}
              className={cn(
                "scroll-mt-28 border-x-0 border-t-0 border-b-[1.5px] border-l-4 px-4 py-5 transition-colors md:px-4 md:py-6",
                !isOpen && "hover:bg-paper/70",
              )}
            >
              <AccordionTrigger className="items-start gap-4 rounded-none border-0 py-0 text-left hover:no-underline focus-visible:ring-violet/40 md:items-center md:gap-6 [&_[data-slot=accordion-trigger-icon]]:hidden">
                <span className="w-12 shrink-0 font-display text-[40px] leading-none text-navy tabular-nums md:w-14 md:text-[56px] md:leading-[56px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[26px] leading-8 font-medium text-ink md:text-[32px] md:leading-10">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-base leading-6 font-normal text-ink/85 md:text-lg md:leading-[26px]">
                    {service.text}
                  </span>
                </span>
                <Plus aria-hidden className="mt-1 size-6 shrink-0 self-center text-ink group-aria-expanded/accordion-trigger:hidden md:mt-0" />
                <Minus aria-hidden className="mt-1 hidden size-6 shrink-0 self-center text-ink group-aria-expanded/accordion-trigger:inline md:mt-0" />
              </AccordionTrigger>
              <AccordionContent className="pt-4 pr-0 pb-1 pl-16 text-lg leading-7 text-ink md:pt-5 md:pl-20">
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
                <BrandButton asChild tone="link-indigo" className="mt-5 h-auto px-0 text-[19px] text-violet no-underline! hover:text-violet/80">
                  <Link to={`/contato?assunto=parceria&servico=${encodeURIComponent(service.title)}`}>
                    Conversar sobre este serviço →
                  </Link>
                </BrandButton>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </section>
  )
}

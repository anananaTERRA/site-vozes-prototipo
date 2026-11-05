import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router"
import { ArrowRight } from "lucide-react"
import { LayoutGroup, motion, useReducedMotion } from "motion/react"
import { ServiceCarinha, serviceAccent } from "@/components/content/serviceCarinha"
import { useSiteContent } from "@/content/provider"
import type { Service } from "@/content/site"
import { scrollToHashAfterPaint, scrollToHashAnchor } from "@/lib/scroll-to-hash"
import { cn } from "cn"

const navHighlightSpring = { type: "spring" as const, stiffness: 260, damping: 32, bounce: 0.12 }

function luminance(hex: string) {
  const value = Number.parseInt(hex.replace("#", ""), 16)
  const linear = (channel: number) => {
    const amount = channel / 255
    return amount <= 0.04045 ? amount / 12.92 : ((amount + 0.055) / 1.055) ** 2.4
  }
  const red = linear((value >> 16) & 255)
  const green = linear((value >> 8) & 255)
  const blue = linear(value & 255)
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function accentIsLight(accent: string) {
  return luminance(accent) > 0.58
}

function selectedNavText(accent: string) {
  return accentIsLight(accent) ? "text-ink" : "text-white"
}

function selectedNavTextMuted(accent: string) {
  return accentIsLight(accent) ? "text-ink/75" : "text-white/75"
}

function serviceIndexLabel(index: number) {
  return String(index + 1).padStart(2, "0")
}

function ServiceIndexNumber({
  index,
  className,
  inverted = false,
}: {
  index: number
  className?: string
  inverted?: boolean
}) {
  return (
    <span
      className={cn(
        "text-[11px] font-medium tracking-[0.12em] tabular-nums",
        inverted ? "text-white/55" : "text-ink/45",
        className,
      )}
    >
      {serviceIndexLabel(index)}
    </span>
  )
}

function ServiceDetailBody({ service }: { service: Service }) {
  return (
    <>
      <p className="max-w-3xl text-lg leading-[1.65] text-ink md:text-[19px] md:leading-8">{service.body}</p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-[16px] border border-line bg-white p-5 md:p-6">
          <p className="text-[12px] font-extrabold tracking-[0.08em] text-violet uppercase">Para quem</p>
          <p className="mt-3 text-[15px] leading-6 text-ink">{service.audience}</p>
        </div>
        <div className="rounded-[16px] border border-line bg-white p-5 md:p-6">
          <p className="text-[12px] font-extrabold tracking-[0.08em] text-violet uppercase">Como entregamos</p>
          <p className="mt-3 text-[15px] leading-6 text-ink">{service.delivery}</p>
        </div>
      </div>
      <Link
        to={`/contato?assunto=parceria&servico=${encodeURIComponent(service.title)}`}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] font-extrabold tracking-wide text-white uppercase transition-transform hover:scale-[1.02] active:scale-[0.99]"
      >
        Conversar sobre este serviço
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </>
  )
}

function ServiceDetailPanel({
  service,
  index,
  className,
}: {
  service: Service
  index: number
  className?: string
}) {
  return (
    <article
      id={service.id}
      className={cn("scroll-mt-28 overflow-hidden rounded-[24px] bg-white", className)}
    >
      <div className="bg-white px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0 max-w-2xl">
            <h3 className="font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.08] font-medium text-ink">
              {service.title}
            </h3>
            <p className="mt-4 text-base leading-7 text-ink/80 md:text-lg">{service.text}</p>
          </div>
          <ServiceCarinha service={service} index={index} className="h-[4.5rem] w-[5.25rem] md:h-28 md:w-[7.25rem]" />
        </div>
      </div>
      <div className="bg-white px-6 py-8 md:px-10 md:py-10">
        <ServiceDetailBody service={service} />
      </div>
    </article>
  )
}

function ServiceNavButton({
  service,
  index,
  isSelected,
  onSelect,
  layout,
  highlightLayoutId,
}: {
  service: Service
  index: number
  isSelected: boolean
  onSelect: () => void
  layout: "rail" | "pill"
  highlightLayoutId: string
}) {
  const reduce = useReducedMotion()
  const highlightTransition = reduce ? { duration: 0 } : navHighlightSpring
  const accent = serviceAccent(service)
  const selectedText = selectedNavText(accent)
  const selectedMuted = selectedNavTextMuted(accent)

  if (layout === "pill") {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-current={isSelected ? "true" : undefined}
        className={cn(
          "relative shrink-0 snap-start rounded-full px-5 py-2.5 text-[13px] font-extrabold tracking-wide whitespace-nowrap uppercase",
          isSelected ? selectedText : "bg-white text-ink",
        )}
      >
        {isSelected ? (
          <motion.span
            layoutId={highlightLayoutId}
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: accent }}
            transition={highlightTransition}
            aria-hidden
          />
        ) : null}
        <span className="relative z-10">{service.title}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={isSelected ? "true" : undefined}
      className={cn(
        "relative w-full rounded-[18px] px-5 py-5 text-left transition-colors",
        isSelected ? selectedText : "text-ink hover:bg-white",
      )}
    >
      {isSelected ? (
        <motion.span
          layoutId={highlightLayoutId}
          className="absolute inset-0 rounded-[18px]"
          style={{ backgroundColor: accent }}
          transition={highlightTransition}
          aria-hidden
        />
      ) : null}
      <span className="relative z-10 flex items-start justify-between gap-4">
        <span className="min-w-0">
          <ServiceIndexNumber
            index={index}
            inverted={isSelected && !accentIsLight(accent)}
            className={isSelected && accentIsLight(accent) ? "text-ink/50" : undefined}
          />
          <span className="mt-1 block font-display text-[clamp(1.25rem,2vw,1.5rem)] leading-tight font-medium">
            {service.title}
          </span>
          <span className={cn("mt-2 line-clamp-2 block text-[14px] leading-5", isSelected ? selectedMuted : "text-ink/70")}>
            {service.text}
          </span>
        </span>
        {!isSelected ? <ServiceCarinha service={service} index={index} className="mt-1 size-9 shrink-0 md:size-10" /> : null}
      </span>
    </button>
  )
}

export function ServiceIndex() {
  const { services, servicesIntro } = useSiteContent()
  const location = useLocation()
  const pendingScrollRef = useRef<string | null>(null)
  const [selected, setSelected] = useState(() => {
    const hash = window.location.hash.replace("#", "")
    return services.some((service) => service.id === hash) ? hash : (services[0]?.id ?? "")
  })

  const selectedIndex = services.findIndex((service) => service.id === selected)
  const active = selectedIndex >= 0 ? services[selectedIndex] : services[0]

  useEffect(() => {
    const hash = location.hash.replace("#", "")
    if (!services.some((service) => service.id === hash)) return
    setSelected(hash)
    return scrollToHashAfterPaint(hash, "auto")
  }, [location.hash, services])

  useEffect(() => {
    const id = pendingScrollRef.current
    if (!id || id !== selected) return
    pendingScrollRef.current = null
    scrollToHashAnchor(id, "auto")
  }, [selected])

  function selectService(next: string, scroll = true) {
    if (!next) return
    if (scroll) pendingScrollRef.current = next
    setSelected(next)
    const hash = `#${next}`
    const path = `${location.pathname}${location.search}${hash}`
    if (`${location.pathname}${location.search}${location.hash}` === path) return
    window.history.replaceState(null, "", path)
  }

  if (!active) return null

  return (
    <section id="servicos" className="scroll-mt-28 bg-paper px-6 py-20 md:px-20 md:py-28">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end lg:gap-16">
          <div>
            <p className="text-[13px] font-extrabold tracking-[0.12em] text-violet uppercase">O que fazemos</p>
            <h2 className="mt-3 font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.05] text-ink">
              Nossos serviços
            </h2>
          </div>
          <div className="mt-8 flex flex-col gap-4 text-lg leading-7 text-ink lg:mt-0">
            {servicesIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-14 lg:mt-16">
          <LayoutGroup id="service-nav-pills">
            <ul
              className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
              aria-label="Serviços"
            >
              {services.map((service, index) => (
                <li key={service.id}>
                  <ServiceNavButton
                    service={service}
                    index={index}
                    isSelected={selected === service.id}
                    layout="pill"
                    highlightLayoutId="service-nav-pill-active"
                    onSelect={() => selectService(service.id)}
                  />
                </li>
              ))}
            </ul>
          </LayoutGroup>

          <div className="mt-6 lg:mt-0 lg:grid lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:gap-12">
            <nav className="hidden lg:block lg:sticky lg:top-28" aria-label="Lista de serviços">
              <LayoutGroup id="service-nav-rail">
                <ul className="flex flex-col gap-3">
                  {services.map((service, index) => (
                    <li key={service.id}>
                      <ServiceNavButton
                        service={service}
                        index={index}
                        isSelected={selected === service.id}
                        layout="rail"
                        highlightLayoutId="service-nav-rail-active"
                        onSelect={() => selectService(service.id, false)}
                      />
                    </li>
                  ))}
                </ul>
              </LayoutGroup>
            </nav>

            <div className="min-w-0">
              <ServiceDetailPanel service={active} index={selectedIndex >= 0 ? selectedIndex : 0} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

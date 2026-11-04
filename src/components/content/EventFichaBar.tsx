import { BrandButton } from "@/components/brand/BrandButton"
import type { EventArticle } from "@/content/types"

function fichaValue(ficha: EventArticle["ficha"], label: string) {
  return ficha.find((row) => row.label === label)?.value
}

function eventIsPast(isoDate: string) {
  return new Date(`${isoDate}T23:59:59`) < new Date()
}

function localLine(item: EventArticle) {
  const onde = fichaValue(item.ficha, "Onde") ?? item.place
  const format = item.format.trim()
  if (!format || format.toLowerCase() === onde.toLowerCase()) return onde
  if (format.toLowerCase() === "online" || format.toLowerCase() === "remoto") {
    return `${onde} · ${format}`
  }
  return `${onde} · ${format}`
}

function eventCta(item: EventArticle): { href: string; label: string } | null {
  const past = eventIsPast(item.date)
  if (past && item.recordingUrl) return { href: item.recordingUrl, label: "Ver gravação" }
  if (!past && item.registrationUrl) return { href: item.registrationUrl, label: "Inscreva-se" }
  return null
}

export function EventFichaBar({ item }: { item: EventArticle }) {
  const when = fichaValue(item.ficha, "Quando") ?? item.date
  const cta = eventCta(item)

  return (
    <div className="mx-auto w-full max-w-[1440px] px-6 md:px-20">
      <div className="rounded-[20px] bg-paper p-5 md:flex md:items-center md:justify-between md:gap-8 md:px-8 md:py-6">
        <div className="flex flex-col gap-4 md:flex-row md:gap-16">
          <div>
            <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">Data e horário</p>
            <p className="mt-1 text-lg leading-[29px]">{when}</p>
          </div>
          <div>
            <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">Local</p>
            <p className="mt-1 text-lg leading-[29px]">{localLine(item)}</p>
          </div>
        </div>
        {cta ? (
          <BrandButton tone="primary" pillSize="md" className="mt-5 w-full md:mt-0 md:w-auto" asChild>
            <a href={cta.href} target="_blank" rel="noopener noreferrer">
              {cta.label}
            </a>
          </BrandButton>
        ) : null}
      </div>
    </div>
  )
}

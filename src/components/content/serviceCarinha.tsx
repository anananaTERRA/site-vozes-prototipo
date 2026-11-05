import face1 from "@/assets/carinha-1.svg"
import face2 from "@/assets/carinha-2.svg"
import face3 from "@/assets/carinha-3.svg"
import face4 from "@/assets/carinha-4.svg"
import face5 from "@/assets/carinha-5.svg"
import face6 from "@/assets/carinha-6.svg"
import { services as institutionalServices } from "@/content/institutional"
import type { Service } from "@/content/site"
import { cn } from "cn"

export const serviceFaceUrls = [face1, face2, face3, face4, face5, face6] as const

export const serviceFaceByName: Record<string, string> = {
  "carinha-1": face1,
  "carinha-2": face2,
  "carinha-3": face3,
  "carinha-4": face4,
  "carinha-5": face5,
  "carinha-6": face6,
}

const accentByServiceId = Object.fromEntries(institutionalServices.map((service) => [service.id, service.accent]))

/** Paleta da sequência local (verde → rosa → azul → …), independente do Sanity. */
export function serviceAccent(service: Service) {
  return accentByServiceId[service.id] ?? service.accent
}

export function serviceFaceUrl(service: Service, index: number) {
  return serviceFaceByName[service.face] ?? serviceFaceUrls[index] ?? face1
}

type ServiceCarinhaProps = {
  service: Service
  index: number
  className?: string
}

/** Carinha na cor do serviço, proporção preservada (img + object-contain). */
export function ServiceCarinha({ service, index, className }: ServiceCarinhaProps) {
  const src = serviceFaceUrl(service, index)
  const color = serviceAccent(service)
  const mask = `url("${src}")`

  return (
    <span aria-hidden className={cn("relative block shrink-0 bg-transparent", className)}>
      <img src={src} alt="" className="size-full object-contain opacity-0" aria-hidden />
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: color,
          maskImage: mask,
          WebkitMaskImage: mask,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
    </span>
  )
}

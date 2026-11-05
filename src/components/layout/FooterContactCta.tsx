import type { ReactNode } from "react"
import { MorphPillButton } from "@/components/brand/MorphPillButton"
import { FooterCtaGrafismos } from "@/components/layout/FooterCtaGrafismos"

export type FooterContactCtaVariant = "default" | "quem-somos"

const variants: Record<
  FooterContactCtaVariant,
  { badge: string; title: ReactNode; description: string; buttonTo: string; buttonLabel: string }
> = {
  default: {
    badge: "Contato",
    title: (
      <>
        Tem um desafio
        <br />
        em mente?
      </>
    ),
    description:
      "Vamos conversar sobre o que sua escola, rede ou organização está enfrentando e pensar juntos em uma resposta à altura.",
    buttonTo: "/contato#inicio",
    buttonLabel: "Fale com a gente",
  },
  "quem-somos": {
    badge: "Contato",
    title: "Quer conhecer nosso trabalho?",
    description: "Entre em contato e agende uma conversa com a nossa equipe.",
    buttonTo: "/contato",
    buttonLabel: "Fale com a gente",
  },
}

export function FooterContactCta({ variant = "default" }: { variant?: FooterContactCtaVariant }) {
  const copy = variants[variant]

  return (
    <div className="bg-paper px-6 py-14 md:px-20">
      <div className="relative flex min-h-[360px] items-center overflow-hidden rounded-[40px] bg-indigo px-8 py-12 md:min-h-[400px] md:px-16">
        <FooterCtaGrafismos />
        <div className="relative z-10 max-w-[560px]">
          <span className="inline-flex rounded-full border-2 border-white/90 px-4 py-1.5 text-[13px] font-extrabold tracking-[1.5px] text-white uppercase">
            {copy.badge}
          </span>
          <h2 className="mt-6 font-display text-4xl leading-[48px] font-medium md:text-[44px] md:leading-[52px]">
            {copy.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-6 font-normal text-white/90">{copy.description}</p>
          <MorphPillButton
            to={copy.buttonTo}
            label={copy.buttonLabel}
            surface="dark"
            pill="orange"
            className="mt-8"
          />
        </div>
      </div>
    </div>
  )
}

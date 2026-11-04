import { Link } from "react-router"
import carinha from "@/assets/carinha-canto.svg"
import instagram from "@/assets/icon-instagram.svg"
import linkedin from "@/assets/icon-linkedin.svg"
import whatsapp from "@/assets/icon-whatsapp.svg"
import youtube from "@/assets/icon-youtube.svg"
import logo from "@/assets/logo.svg"
import peca1 from "@/assets/peca-1.svg"
import peca2 from "@/assets/peca-2.svg"
import peca3 from "@/assets/peca-3.svg"
import peca4 from "@/assets/peca-4.svg"
import peca5 from "@/assets/peca-5.svg"
import { MorphPillButton } from "@/components/brand/MorphPillButton"
import { footerColumns } from "@/content/institutional"

const social = [
  { href: "https://www.linkedin.com", label: "LinkedIn", icon: linkedin },
  { href: "https://www.instagram.com", label: "Instagram", icon: instagram },
  { href: "https://www.youtube.com", label: "YouTube", icon: youtube },
  { href: "https://wa.me/5511946292212", label: "WhatsApp", icon: whatsapp },
]

export function SiteFooter({ showCta = true }: { showCta?: boolean }) {
  return (
    <footer className="relative mr-[calc(env(safe-area-inset-right)*-1)] ml-[calc(env(safe-area-inset-left)*-1)] bg-indigo pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] text-white">
      {showCta ? (
        <div className="bg-paper px-6 py-14 md:px-20">
          <div className="relative flex min-h-[360px] items-center overflow-hidden rounded-[40px] bg-indigo px-8 py-12 md:px-16">
            <div className="relative z-10 max-w-[620px]">
              <p className="text-[13px] font-extrabold tracking-[1.5px] text-lime uppercase">CONTATO</p>
              <h2 className="mt-5 font-display text-4xl leading-[48px] font-medium">
                Tem um desafio educacional em mente?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-6 text-white/90">
                Vamos conversar sobre o que sua rede ou organização está enfrentando e pensar juntos em uma resposta à altura.
              </p>
              <MorphPillButton to="/contato#inicio" surface="dark" pill="orange" className="mt-6" />
            </div>
            <div className="pointer-events-none absolute top-0 right-0 hidden h-full w-[460px] lg:block">
              <img src={peca1} alt="" className="absolute top-6 left-4 w-48" />
              <img src={peca2} alt="" className="absolute top-0 left-40 w-44" />
              <img src={peca3} alt="" className="absolute top-28 right-4 w-36" />
              <img src={peca4} alt="" className="absolute bottom-6 left-10 w-40" />
              <img src={peca5} alt="" className="absolute right-10 bottom-10 w-28" />
            </div>
          </div>
        </div>
      ) : null}
      <div className="h-px bg-violet" />
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-12 md:px-16">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="max-w-[260px]">
            <img src={logo} alt="Vozes da Educação" className="h-[72px] w-auto brightness-0 invert" />
            <p className="mt-3 text-[15px] font-extrabold tracking-[1px] text-lime">INTELIGÊNCIA EDUCACIONAL</p>
            <p className="mt-6 text-[15px] leading-[22px] font-medium">
              Rua Pamplona, 943/12, Jardim Paulista, São Paulo - SP. 01405-200
              <br />
              (11) 94629-2212
            </p>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-5">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <p className="text-[13px] font-extrabold tracking-[1.04px]">{column.title}</p>
                <ul className="mt-2 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="text-[15px] leading-[22px] font-medium hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          {social.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
              <img src={item.icon} alt="" className="size-7 brightness-0 invert" />
            </a>
          ))}
        </div>
        <p className="text-[15px] leading-[22px] font-medium">© 2026 · Política de privacidade</p>
      </div>
      {showCta ? <img src={carinha} alt="" className="pointer-events-none absolute right-2 bottom-6 hidden w-24 md:block" /> : null}
    </footer>
  )
}

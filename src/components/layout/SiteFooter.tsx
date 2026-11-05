import { Link } from "react-router"
import carinha from "@/assets/carinha-canto.svg"
import facebook from "@/assets/icon-facebook.svg"
import instagram from "@/assets/icon-instagram.svg"
import linkedin from "@/assets/icon-linkedin.svg"
import whatsapp from "@/assets/icon-whatsapp.svg"
import logo from "@/assets/logo.svg"
import { FooterContactCta, type FooterContactCtaVariant } from "@/components/layout/FooterContactCta"
import { footerColumns } from "@/content/institutional"

const social = [
  { href: "https://br.linkedin.com/company/vozes-da-educação", label: "LinkedIn", icon: linkedin },
  { href: "https://www.instagram.com/vozesdaeducacao_/", label: "Instagram", icon: instagram },
  { href: "https://www.facebook.com/people/Vozes-da-Educação/100054698893381/", label: "Facebook", icon: facebook },
  { href: "https://wa.me/5511946292212", label: "WhatsApp", icon: whatsapp },
] as const

export function SiteFooter({
  showCta = true,
  ctaVariant = "default",
}: {
  showCta?: boolean
  ctaVariant?: FooterContactCtaVariant
}) {
  return (
    <footer className="relative mr-[calc(env(safe-area-inset-right)*-1)] ml-[calc(env(safe-area-inset-left)*-1)] bg-indigo pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] text-white">
      {showCta ? <FooterContactCta variant={ctaVariant} /> : null}
      <div className="h-px bg-violet" />
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-12 md:px-16">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="max-w-[260px]">
            <img src={logo} alt="Vozes da Educação" className="h-[72px] w-auto brightness-0 invert" />
            <p className="mt-3 text-[15px] font-extrabold tracking-[1px] text-lime">INTELIGÊNCIA EDUCACIONAL</p>
            <p className="mt-6 text-[15px] leading-[22px] font-normal text-white/85">
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
                      <Link
                        to={link.to}
                        className="text-[15px] leading-[22px] font-normal text-white/85 transition-colors hover:text-lime"
                      >
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
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
              className="text-white/85 transition-colors hover:text-lime"
            >
              <img src={item.icon} alt="" className="size-7 brightness-0 invert transition-opacity hover:opacity-90" />
            </a>
          ))}
        </div>
        <p className="text-[15px] leading-[22px] font-normal text-white/75">© 2026 · Política de privacidade</p>
      </div>
      {showCta ? (
        <img
          src={carinha}
          alt=""
          className="pointer-events-none absolute right-4 bottom-4 w-[88px] sm:w-24 sm:right-6 sm:bottom-6"
        />
      ) : null}
    </footer>
  )
}

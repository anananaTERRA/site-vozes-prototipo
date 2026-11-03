import { Link } from "react-router"
import photo from "@/assets/photo-servicos.png"
import { ServiceIndex } from "@/components/content/ServiceIndex"
import { PageHero } from "@/components/layout/PageHero"
import { partners, segments } from "@/content/institutional"

export function OQueFazemosPage() {
  return (
    <div className="bg-white">
      <PageHero
        background="#153792"
        title="O que fazemos"
        titleColor="#d0e770"
        statement="Transformamos conhecimento de ponta em soluções personalizadas para quem lidera escolas, redes e organizações."
        support="Trabalhamos sistematizando o que há de melhor no mundo e comunicando isso em soluções que fazem sentido para a realidade de quem está no chão da escola."
        image={photo}
        imageAlt="Ambiente escolar"
      />
      <ServiceIndex />
      <section className="bg-paper px-6 py-24 md:px-20">
        <div className="mx-auto w-full max-w-[1280px]">
          <h2 className="font-display text-5xl leading-[54px]">Com quem trabalhamos</h2>
          <div className="mt-10 grid overflow-hidden rounded-[20px] md:grid-cols-3">
            {segments.map((segment) => (
              <article key={segment.title} className="min-h-80 p-8 text-white" style={{ background: segment.background }}>
                <h3 className="font-display text-[32px] leading-[38px] font-medium" style={{ color: segment.titleColor }}>
                  {segment.title}
                </h3>
                <p className="mt-4 text-lg leading-[29px]">{segment.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="overflow-hidden px-6 py-16 md:px-20">
        <p className="mx-auto mb-6 w-full max-w-[1280px] text-[13px] font-extrabold tracking-[1.04px]">CLIENTES E PARCEIROS</p>
        <div className="mx-auto flex w-full max-w-[1280px] flex-wrap gap-4">
          {partners.map((name) => (
            <span key={name} className="grid h-[72px] min-w-40 place-items-center rounded-2xl bg-paper px-6 text-sm font-extrabold tracking-[1px] uppercase">
              {name}
            </span>
          ))}
        </div>
        <div className="mx-auto mt-10 w-full max-w-[1280px]">
          <Link to="/contato" className="text-[19px] font-extrabold">
            Fale com a gente →
          </Link>
        </div>
      </section>
    </div>
  )
}

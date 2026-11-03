import { Link } from "react-router"
import face1 from "@/assets/carinha-1.svg"
import face2 from "@/assets/carinha-2.svg"
import face3 from "@/assets/carinha-3.svg"
import face4 from "@/assets/carinha-4.svg"
import face5 from "@/assets/carinha-5.svg"
import face6 from "@/assets/carinha-6.svg"
import photo from "@/assets/photo-servicos.png"
import { PageHero } from "@/components/layout/PageHero"
import { partners, segments, services } from "@/content/institutional"

const faces = [face1, face2, face3, face4, face5, face6]

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
      <section id="servicos" className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-20">
        <h2 className="font-display text-5xl leading-[54px]">Nossos serviços</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <article id={service.id} key={service.id} className="scroll-mt-24 rounded-[20px] bg-paper p-8">
              <img src={faces[index]} alt="" className="h-8 w-8 object-contain" />
              <h3 className="mt-8 font-display text-[32px] leading-[38px] font-medium">{service.title}</h3>
              <p className="mt-4 text-lg leading-[29px]">{service.text}</p>
            </article>
          ))}
        </div>
      </section>
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

import { Link } from "react-router"
import photo from "@/assets/photo-servicos.png"
import { PartnerStrip } from "@/components/content/PartnerStrip"
import { ServiceIndex } from "@/components/content/ServiceIndex"
import { PageHero } from "@/components/layout/PageHero"
import { useSiteContent } from "@/content/provider"

export function OQueFazemosPage() {
  const { segments } = useSiteContent()
  return (
    <div className="bg-surface">
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
        <div className="mx-auto w-full max-w-[1280px]">
          <PartnerStrip />
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

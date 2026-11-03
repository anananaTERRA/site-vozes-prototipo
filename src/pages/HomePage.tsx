import { useRef } from "react"
import { Link } from "react-router"
import { motion, useScroll, useTransform } from "motion/react"
import face1 from "@/assets/carinha-1.svg"
import face2 from "@/assets/carinha-2.svg"
import face3 from "@/assets/carinha-3.svg"
import face4 from "@/assets/carinha-4.svg"
import face5 from "@/assets/carinha-5.svg"
import face6 from "@/assets/carinha-6.svg"
import impacto from "@/assets/photo-impacto.png"
import porque from "@/assets/photo-porque.png"
import transicao from "@/assets/photo-transicao.png"
import { BrandButton } from "@/components/brand/BrandButton"
import { WordBalloon } from "@/components/brand/WordBalloon"
import { ProcessScroll } from "@/components/home/ProcessScroll"
import { NewsCard, PublicationCard } from "@/components/content/Cards"
import { PartnerStrip } from "@/components/content/PartnerStrip"
import { segments, services, stats, testimonials } from "@/content/institutional"
import { noticias, publicacoes } from "@/content/posts"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const faces = [face1, face2, face3, face4, face5, face6]

export function HomePage() {
  const parallaxRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  })
  const shift = useTransform(scrollYProgress, [0, 1], [48, -48])
  const featured = noticias.filter((item) => !item.featured).slice(0, 3)
  const books = publicacoes.slice(0, 4)

  return (
    <div>
      <section className="bg-indigo text-white">
        <div className="mx-auto flex min-h-[640px] w-full max-w-[1440px] items-center px-6 py-16 md:px-20">
          <div className="max-w-[640px]">
            <h1 className="font-display text-6xl leading-none font-normal tracking-[-1.76px] md:text-[88px] md:leading-[92px]">
              Conectar vozes,
              <span className="block">
                <WordBalloon className="text-[56px] leading-none md:text-[88px] md:leading-[92px]">transformar</WordBalloon>
              </span>
              a educação
            </h1>
            <p className="mt-8 max-w-xl text-[22px] leading-[34px]">
              Transformamos conhecimento de ponta em soluções personalizadas para quem lidera escolas, redes e organizações.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BrandButton asChild>
                <Link to="/contato">Fale com a gente</Link>
              </BrandButton>
              <BrandButton tone="link" asChild>
                <Link to="/o-que-fazemos">Conheça o que fazemos →</Link>
              </BrandButton>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-6 py-14 sm:grid-cols-2 xl:grid-cols-4 md:px-20">
          {stats.map((item, index) => (
            <div key={item.label} className={index > 0 ? "xl:border-l xl:border-indigo xl:pl-8 dark:xl:border-ink/30" : ""}>
              <p className="font-display text-6xl leading-none">
                <span className="text-5xl font-bold">+</span>
                {item.value}
              </p>
              <p className="mt-2 text-center text-[15px] leading-[22px] font-medium xl:text-left">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden px-6 py-24">
        <img src={porque} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-indigo/55" />
        <div className="relative max-w-[800px] text-center text-white">
          <p className="text-[13px] font-extrabold tracking-[1.04px]">POR QUE EXISTIMOS</p>
          <p className="mt-6 font-display text-[32px] leading-[44px]">
            A escola vive desafios urgentes e estruturais. As respostas não podem chegar tarde demais, sem contexto ou serem de difícil implementação.
          </p>
          <p className="mt-6">
            <WordBalloon className="text-[28px] leading-9 not-italic">É aí que o Vozes entra.</WordBalloon>
          </p>
        </div>
      </section>

      <ProcessScroll />

      <section className="bg-paper px-6 py-24 md:px-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-14">
          <h2 className="max-w-[1040px] text-center font-display text-4xl leading-[54px] tracking-[-0.48px] md:text-5xl">
            Soluções personalizadas para os desafios que sua instituição enfrenta
          </h2>
          <p className="max-w-[540px] self-end text-lg leading-[29px]">
            Cada projeto começa pela escuta do contexto e dos desafios de quem vai implementar. A solução vem depois, desenhada sob medida.
          </p>
          <BrandButton asChild className="text-white">
            <Link to="/o-que-fazemos">Entenda nossos serviços</Link>
          </BrandButton>
        </div>
        <div className="mx-auto mt-16 w-full max-w-[1280px]">
          <PartnerStrip />
        </div>
        <div className="mx-auto mt-16 grid w-full max-w-[1280px] gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to={`/o-que-fazemos#${service.id}`}
              className="group flex h-60 flex-col justify-between rounded-[20px] bg-surface p-6"
            >
              <img src={faces[index]} alt="" className="h-8 w-8 object-contain dark:brightness-0 dark:invert" />
              <div>
                <p className="hidden text-[15px] leading-[22px] font-medium group-hover:block">{service.text}</p>
                <h3 className="font-display text-[32px] leading-[38px] font-medium">{service.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section ref={parallaxRef} className="relative overflow-hidden bg-lavender/40 px-6 py-24 md:px-20">
        <motion.img src={face1} alt="" style={{ y: shift }} className="pointer-events-none absolute top-10 right-10 w-40 opacity-80" />
        <Carousel className="mx-auto w-full max-w-[912px]">
          <CarouselContent>
            {testimonials.map((item) => (
              <CarouselItem key={item.quote}>
                <figure className="rounded-3xl bg-surface px-8 py-12 text-center md:px-20">
                  <blockquote className="text-lg leading-[29px]">“{item.quote}”</blockquote>
                  <figcaption className="mt-8">
                    <p className="text-xl font-extrabold">{item.name}</p>
                    <p className="text-sm font-medium text-violet">{item.role}</p>
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-6 flex justify-center gap-4">
            <CarouselPrevious className="static translate-none" />
            <CarouselNext className="static translate-none" />
          </div>
        </Carousel>
      </section>

      <section className="bg-surface px-6 py-24 md:px-20">
        <div className="mx-auto w-full max-w-[1280px]">
          <h2 className="font-display text-5xl leading-[54px]">Com quem trabalhamos</h2>
          <div className="mt-10 grid overflow-hidden rounded-[20px] md:grid-cols-3">
            {segments.map((segment) => (
              <article key={segment.title} className="flex min-h-[400px] flex-col p-8 text-white" style={{ background: segment.background }}>
                <h3 className="font-display text-[32px] leading-[38px] font-medium" style={{ color: segment.titleColor }}>
                  {segment.title}
                </h3>
                <p className="mt-4 text-lg leading-[29px]">{segment.text}</p>
                <Link to={segment.href} className="mt-auto self-end text-center text-[15px] leading-[18px] font-extrabold">
                  Saiba
                  <br />
                  mais
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden px-6">
        <img src={impacto} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-indigo/65" />
        <div className="relative max-w-[900px] text-center text-white">
          <p className="font-display text-4xl leading-[48px]">
            Nascemos da convicção de que a educação brasileira pode ser muito melhor.
          </p>
          <BrandButton asChild className="mt-8">
            <Link to="/contato">Vamos construir juntos</Link>
          </BrandButton>
        </div>
      </section>

      <section className="bg-paper px-6 py-24 md:px-20">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-5xl leading-[54px]">Vozes na mídia</h2>
            <Link to="/vozes" className="text-[15px] font-extrabold tracking-[1.04px] uppercase">
              Ver todas
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {featured.map((item) => (
              <NewsCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[360px] items-center justify-center overflow-hidden px-6 py-24">
        <img src={transicao} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#49278f]/50" />
        <p className="relative flex max-w-5xl flex-wrap items-center justify-center gap-x-3 text-center font-display text-4xl leading-[48px] text-white">
          Ouvimos, sistematizamos e <WordBalloon color="#faa4ff" className="text-[40px] leading-[48px] not-italic">ecoamos</WordBalloon> as vozes da educação.
        </p>
      </section>

      <section className="bg-surface px-6 py-24 md:px-20">
        <div className="mx-auto w-full max-w-[1280px]">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-5xl leading-[54px]">Publicações</h2>
            <Link to="/publicacoes" className="text-[15px] font-extrabold tracking-[1.04px] uppercase">
              Ver todas
            </Link>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((item) => (
              <PublicationCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

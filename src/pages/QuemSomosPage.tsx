import { useState } from "react"
import portrait from "@/assets/photo-quem-somos.png"
import { PageHero } from "@/components/layout/PageHero"
import { chapters, steps, team } from "@/content/institutional"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function QuemSomosPage() {
  const [open, setOpen] = useState(0)
  const chapter = chapters[open]

  return (
    <div className="bg-white">
      <PageHero
        background="#0d6353"
        title="Quem somos"
        titleColor="#d0e770"
        statement="Somos uma consultoria de inteligência educacional movida pela certeza de que a educação brasileira pode ser mais segura e afetiva."
        support="Nossa missão é ajudar a resolver os problemas da educação do Brasil de forma inteligente, didática e humana."
        image={portrait}
        imageAlt="Retrato em ambiente escolar"
      />

      <section id="historia" className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-20">
        <div className="grid gap-8 md:grid-cols-2">
          <h2 className="font-display text-5xl leading-[54px] tracking-[-0.48px]">Nossa história</h2>
          <p className="text-[22px] leading-[34px]">
            Desde 2019, seguimos conectando pessoas e ideias para resolver os problemas da educação brasileira de forma inteligente, didática e humana.
          </p>
        </div>
        {chapter ? (
          <div className="mt-12 flex h-[520px] gap-2">
            {chapters.map((item, index) =>
              index === open ? (
                <article key={item.year} className="flex min-w-0 flex-1 gap-8 rounded-[20px] border border-line bg-white p-10">
                  <div>
                    <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet">{item.year}</p>
                    <h3 className="mt-4 font-display text-[32px] leading-[38px] font-medium">{item.title}</h3>
                    <p className="mt-4 max-w-xl text-lg leading-[29px]">{item.text}</p>
                    {item.kicker ? <p className="mt-6 font-display text-5xl text-violet">{item.kicker}</p> : null}
                  </div>
                </article>
              ) : (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => setOpen(index)}
                  className="flex w-24 shrink-0 flex-col items-center gap-4 rounded-[20px] px-2 py-6"
                  style={{ background: item.background, color: item.color }}
                >
                  <span className="text-[13px] font-extrabold tracking-[1.04px]">{item.year}</span>
                  <span className="text-[15px] font-extrabold [writing-mode:vertical-rl] rotate-180">{item.title}</span>
                </button>
              ),
            )}
          </div>
        ) : null}
        <div className="mt-6 flex items-center gap-4 text-[15px] font-medium text-violet">
          <Button type="button" variant="outline" className="size-14 rounded-full border-2 border-indigo" onClick={() => setOpen((value) => (value + chapters.length - 1) % chapters.length)} aria-label="Capítulo anterior">
            ←
          </Button>
          Capítulo anterior · Próximo
          <Button type="button" variant="outline" className="size-14 rounded-full border-2 border-indigo" onClick={() => setOpen((value) => (value + 1) % chapters.length)} aria-label="Próximo capítulo">
            →
          </Button>
        </div>
      </section>

      <section id="equipe" className="bg-paper px-6 py-24 md:px-20">
        <div className="mx-auto w-full max-w-[1280px]">
          <h2 className="font-display text-5xl leading-[54px]">Equipe</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {team.map((person) => (
              <Dialog key={person.name}>
                <DialogTrigger asChild>
                  <button type="button" className="rounded-[20px] bg-white p-8 text-left">
                    <p className="font-display text-[32px] leading-[38px] font-medium">{person.name}</p>
                    <p className="mt-2 text-[15px] font-medium text-violet">{person.role}</p>
                    <p className="mt-6 text-[13px] font-extrabold tracking-[1.04px] uppercase">Ler bio</p>
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="font-display text-3xl">{person.name}</DialogTitle>
                    <DialogDescription>{person.role}</DialogDescription>
                  </DialogHeader>
                  <p className="text-lg leading-[29px] text-indigo">{person.bio}</p>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      <section id="como-trabalhamos" className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-20">
        <h2 className="font-display text-5xl leading-[54px]">Como trabalhamos</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-[20px] bg-paper p-8">
              <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet">0{index + 1}</p>
              <h3 className="mt-4 font-display text-[32px] leading-[38px] font-medium">{step.title}</h3>
              <p className="mt-4 text-lg leading-[29px]">{step.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

import { useState } from "react"
import portrait from "@/assets/photo-quem-somos.png"
import { PageHero } from "@/components/layout/PageHero"
import { chapters, steps, team } from "@/content/institutional"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

export function QuemSomosPage() {
  const [open, setOpen] = useState(0)
  const [active, setActive] = useState<number | null>(null)
  const chapter = chapters[open]
  const person = active === null ? null : team[active]

  function step(delta: number) {
    setActive((current) => {
      const index = current ?? 0
      return (index + delta + team.length) % team.length
    })
  }

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

      <section id="equipe" className="bg-white px-6 py-24 md:px-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-5xl leading-[54px] tracking-[-0.48px]">Nossa equipe</h2>
            <p className="text-[22px] leading-[34px]">
              Pessoas que vieram da sala de aula, da gestão pública e da pesquisa, unidas pela mesma escuta.
            </p>
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-10">
              {team.slice(0, 4).map((member, index) => (
                <PersonCard key={member.name} person={member} onOpen={() => setActive(index)} />
              ))}
            </div>
            <div className="flex">
              {team.slice(4).map((member, index) => (
                <PersonCard key={member.name} person={member} onOpen={() => setActive(index + 4)} />
              ))}
            </div>
          </div>
        </div>
        <Dialog open={person !== null} onOpenChange={(next) => { if (!next) setActive(null) }}>
          <DialogContent
            showCloseButton={false}
            overlayClassName="bg-black/50"
            className="max-w-[760px] border-0 bg-transparent p-0 shadow-none ring-0 sm:max-w-[760px]"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault()
                step(1)
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault()
                step(-1)
              }
            }}
          >
            {person ? (
              <div className="relative flex items-center justify-center">
                <button type="button" className="absolute left-0 flex size-14 items-center justify-center rounded-full border-2 border-indigo bg-white text-2xl" onClick={() => step(-1)} aria-label="Pessoa anterior">
                  ←
                </button>
                <div className="flex w-full max-w-[600px] flex-col items-center gap-4 rounded-[20px] bg-white px-10 pt-8 pb-10">
                  <div className="flex w-full items-center">
                    <span className="size-10" />
                    <p className="flex-1 text-center text-[13px] font-medium text-violet">Mini bio</p>
                    <DialogClose className="flex size-10 items-center justify-center rounded-full bg-indigo text-2xl leading-none font-extrabold text-white">
                      ×
                      <span className="sr-only">Fechar</span>
                    </DialogClose>
                  </div>
                  <span className="size-[120px] overflow-hidden rounded-full" style={{ backgroundColor: person.color }}>
                    <img src={person.photo} alt="" className="size-full object-cover" />
                  </span>
                  <DialogTitle className="text-center font-display text-[28px] font-medium">{person.name}</DialogTitle>
                  <DialogDescription className="text-center text-base font-medium text-violet">{person.role}</DialogDescription>
                  {person.bio ? <p className="text-[15px] leading-[1.5] text-indigo">{person.bio}</p> : null}
                </div>
                <button type="button" className="absolute right-0 flex size-14 items-center justify-center rounded-full border-2 border-indigo bg-white text-2xl" onClick={() => step(1)} aria-label="Próxima pessoa">
                  →
                </button>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
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

function PersonCard({ person, onOpen }: { person: (typeof team)[number]; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="flex w-[240px] flex-col items-center gap-3 text-center">
      <span className="size-[240px] overflow-hidden rounded-full" style={{ backgroundColor: person.color }}>
        <img src={person.photo} alt="" className="size-full object-cover" />
      </span>
      <span className="w-full font-display text-2xl leading-[30px] font-medium">{person.name}</span>
      <span className="w-full text-[15px] leading-[22px] font-medium text-violet">{person.role}</span>
    </button>
  )
}

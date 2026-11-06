import { Fragment, useState } from "react"
import photoComo from "@/assets/photo-como-trabalhamos.jpg"
import { heroPhotos } from "@/content/hero-photos"
import valorAntecipacao from "@/assets/valor-antecipacao.svg"
import valorColaboracao from "@/assets/valor-colaboracao.svg"
import valorFundamentacao from "@/assets/valor-fundamentacao.svg"
import valorHumanidade from "@/assets/valor-humanidade.svg"
import valorTraducao from "@/assets/valor-traducao.svg"
import { PageHero } from "@/components/layout/PageHero"
import { HistoryTimelineCarousel } from "@/components/quem-somos/HistoryTimelineCarousel"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useSiteContent } from "@/content/provider"
import type { TeamMember } from "@/content/site"
import { cn } from "cn"

const valueIcons: Record<string, string> = {
  antecipacao: valorAntecipacao,
  traducao: valorTraducao,
  humanidade: valorHumanidade,
  fundamentacao: valorFundamentacao,
  colaboracao: valorColaboracao,
}

const teamGridClass = (index: number) => {
  if (index < 3) return "lg:col-span-2"
  if (index === 3) return "lg:col-span-2 lg:col-start-2"
  return "lg:col-span-2 lg:col-start-4"
}

export function QuemSomosPage() {
  const { chapters, team, values, historyIntro } = useSiteContent()
  const [active, setActive] = useState<number | null>(null)
  const person = active === null ? null : team[active]

  function step(delta: number) {
    setActive((current) => {
      const index = current ?? 0
      return (index + delta + team.length) % team.length
    })
  }

  return (
    <div className="bg-surface">
      <PageHero
        background="#0d6353"
        title="Quem somos"
        titleColor="#d0e770"
        statement="Vozes da Educação é uma consultoria de inteligência educacional, formada por profissionais que acreditam que a educação brasileira pode ser mais segura e afetiva."
        support="Nossa missão é ajudar a resolver os problemas da educação do Brasil de forma inteligente, didática e humana."
        image={heroPhotos.quemSomos}
        imageAlt="Retrato em ambiente escolar"
        imageObjectPosition="55% 35%"
      />

      <section id="historia" className="scroll-mt-28 overflow-x-clip bg-paper">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <h2 className="font-display text-5xl leading-[54px] tracking-[-0.48px]">Nossa história</h2>
            <p className="text-[22px] leading-[34px]">{historyIntro}</p>
          </div>
          <HistoryTimelineCarousel chapters={chapters} />
        </div>
      </section>

      <Separator className="mx-auto max-w-[1280px] bg-line" />

      <section id="equipe" className="scroll-mt-28 bg-surface px-6 py-24 md:px-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-5xl leading-[54px] tracking-[-0.48px]">Nossa equipe</h2>
            <p className="text-[22px] leading-[34px]">
              Pessoas que vieram da sala de aula, da gestão pública e da pesquisa, unidas pela mesma escuta.
            </p>
          </div>
          <ul className="mx-auto grid w-full max-w-[960px] grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
            {team.map((member, index) => (
              <li key={member.name} className={cn("flex justify-center px-3", teamGridClass(index))}>
                <TeamFlipCard person={member} onOpen={() => setActive(index)} />
              </li>
            ))}
          </ul>
        </div>
        <Dialog
          open={person !== null}
          onOpenChange={(next) => {
            if (!next) setActive(null)
          }}
        >
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
                <button
                  type="button"
                  className="absolute left-0 flex size-14 items-center justify-center rounded-full border-2 border-ink bg-surface text-2xl"
                  onClick={() => step(-1)}
                  aria-label="Pessoa anterior"
                >
                  ←
                </button>
                <div className="flex w-full max-w-[600px] flex-col items-center gap-4 rounded-[20px] bg-surface px-10 pt-8 pb-10">
                  <div className="flex w-full items-center">
                    <span className="size-10" />
                    <p className="flex-1 text-center text-[13px] font-medium text-violet">Mini bio</p>
                    <DialogClose className="flex size-10 items-center justify-center rounded-full bg-indigo text-2xl leading-none font-extrabold text-white">
                      ×
                      <span className="sr-only">Fechar</span>
                    </DialogClose>
                  </div>
                  <Portrait src={person.photo} face={person.face} color={person.color} className="size-[120px]" />
                  <DialogTitle className="text-center font-display text-[28px] font-medium">{person.name}</DialogTitle>
                  <DialogDescription className="text-center text-base font-medium text-violet">{person.role}</DialogDescription>
                  {person.bio ? <p className="text-[15px] leading-[1.5] text-ink">{person.bio}</p> : null}
                </div>
                <button
                  type="button"
                  className="absolute right-0 flex size-14 items-center justify-center rounded-full border-2 border-ink bg-surface text-2xl"
                  onClick={() => step(1)}
                  aria-label="Próxima pessoa"
                >
                  →
                </button>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </section>

      <section id="como-trabalhamos" className="scroll-mt-28 bg-surface">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 py-24 md:px-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="h-[400px] w-full max-w-[480px] shrink-0 overflow-hidden rounded-[20px] bg-paper">
              <img src={photoComo} alt="" className="size-full object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <h2 className="font-display text-[40px] leading-[48px] font-normal tracking-[-0.48px] md:text-5xl md:leading-[54px]">
                Como trabalhamos
              </h2>
              <p className="text-[22px] leading-[34px]">
                Atuamos com linguagem acessível, escuta sensível e olhar atento às evidências mais atuais em educação. O
                que nos une a cada parceiro é o compromisso com o impacto educacional: aquele que chega no estudante,
                passa pelo professor e começa na decisão de quem lidera.
              </p>
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 xl:flex xl:items-start xl:gap-0">
            {values.map((item, index) => (
              <Fragment key={item.title}>
                {index > 0 ? <div aria-hidden className="hidden h-[200px] w-px shrink-0 bg-line xl:block" /> : null}
                <article className="flex min-w-0 flex-1 flex-col gap-4 xl:px-6">
                  <img
                    src={valueIcons[item.icon]}
                    alt=""
                    className="h-16 w-16 shrink-0 object-contain object-left"
                  />
                  <h3 className="font-display text-2xl leading-[30px] font-medium">{item.title}</h3>
                  <p className="text-[15px] leading-[22px] font-medium">{item.text}</p>
                </article>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function TeamFlipCard({ person, onOpen }: { person: TeamMember; onOpen: () => void }) {
  const childhoodPhoto = person.childhoodPhoto?.trim()
  const dreamJob = person.dreamJobText?.trim()
  const showDream = Boolean(childhoodPhoto || dreamJob)

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group flex w-full max-w-[240px] flex-col items-center gap-3 text-center",
        childhoodPhoto && "[perspective:1000px]",
      )}
    >
      <span
        className={cn(
          "relative block aspect-square w-full max-w-[220px]",
          childhoodPhoto && "[transform-style:preserve-3d] transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)] motion-reduce:transition-none",
        )}
      >
        <span className="absolute inset-0 overflow-hidden rounded-full [backface-visibility:hidden]" style={{ backgroundColor: person.color }}>
          <img src={person.photo} alt="" className="absolute inset-0 size-full object-cover" style={faceFrame(person.face)} />
        </span>
        {childhoodPhoto ? (
          <span
            className="absolute inset-0 overflow-hidden rounded-full [transform:rotateY(180deg)] [backface-visibility:hidden]"
            style={{ backgroundColor: person.color }}
          >
            <img src={childhoodPhoto} alt="" className="size-full object-cover opacity-90" />
          </span>
        ) : null}
      </span>
      <span className="relative grid w-full min-h-[76px] grid-rows-[auto_auto] content-start gap-0.5">
        <span
          className={cn(
            "col-start-1 row-start-1 font-display text-[22px] leading-7 font-medium text-balance transition-opacity duration-300 ease-in-out",
            showDream && "group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:group-hover:opacity-100",
          )}
        >
          {person.name}
        </span>
        <span
          className={cn(
            "col-start-1 row-start-2 text-[15px] leading-[22px] font-medium text-balance text-ink transition-opacity duration-300 ease-in-out",
            showDream && "group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:group-hover:opacity-100",
          )}
        >
          {person.role}
        </span>
        {showDream ? (
          <>
            <span className="pointer-events-none col-start-1 row-start-1 font-display text-[22px] leading-7 font-medium text-balance opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:hidden">
              Queria ser…
            </span>
            <span className="pointer-events-none col-start-1 row-start-2 text-[15px] leading-[22px] font-medium text-balance text-ink opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:hidden">
              {dreamJob ?? "—"}
            </span>
          </>
        ) : null}
      </span>
    </button>
  )
}

function Portrait({
  src,
  face,
  color,
  className,
}: {
  src: string
  face: { x: number; y: number }
  color: string
  className?: string
}) {
  return (
    <span className={`relative block overflow-hidden rounded-full ${className ?? ""}`} style={{ backgroundColor: color }}>
      <img src={src} alt="" className="absolute inset-0 size-full object-cover" style={faceFrame(face)} />
    </span>
  )
}

function faceFrame(face: { x: number; y: number }) {
  return {
    objectPosition: `${face.x}% ${face.y}%`,
  }
}

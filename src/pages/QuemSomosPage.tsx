import { Fragment, useLayoutEffect, useRef, useState } from "react"
import photoComo from "@/assets/photo-como-trabalhamos.png"
import portrait from "@/assets/photo-quem-somos.png"
import valorAntecipacao from "@/assets/valor-antecipacao.svg"
import valorColaboracao from "@/assets/valor-colaboracao.svg"
import valorFundamentacao from "@/assets/valor-fundamentacao.svg"
import valorHumanidade from "@/assets/valor-humanidade.svg"
import valorTraducao from "@/assets/valor-traducao.svg"
import { PageHero } from "@/components/layout/PageHero"
import { chapters, team, values } from "@/content/institutional"

const valueIcons = [valorAntecipacao, valorTraducao, valorHumanidade, valorFundamentacao, valorColaboracao]
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
  const historyRef = useRef<HTMLDivElement>(null)
  const [chapterWidth, setChapterWidth] = useState<number | null>(null)
  const person = active === null ? null : team[active]

  useLayoutEffect(() => {
    const el = historyRef.current
    if (!el) return
    const measure = () => {
      const gap = Number.parseFloat(getComputedStyle(el).columnGap || "0") || 0
      const rail = 96
      const width = el.clientWidth - rail * (chapters.length - 1) - gap * (chapters.length - 1)
      setChapterWidth(Math.max(280, Math.round(width)))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

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
        <div ref={historyRef} className="mt-12 flex h-[520px] gap-2">
          {chapters.map((item, index) => (
            <ChapterRail key={item.year} item={item} open={index === open} textWidth={chapterWidth} onOpen={() => setOpen(index)} />
          ))}
        </div>
        <div className="mt-6 flex items-center gap-4 text-[15px] font-medium text-violet">
          <Button type="button" variant="outline" className="size-14 rounded-full border-2 border-ink" onClick={() => setOpen((value) => (value + chapters.length - 1) % chapters.length)} aria-label="Capítulo anterior">
            ←
          </Button>
          Capítulo anterior · Próximo
          <Button type="button" variant="outline" className="size-14 rounded-full border-2 border-ink" onClick={() => setOpen((value) => (value + 1) % chapters.length)} aria-label="Próximo capítulo">
            →
          </Button>
        </div>
      </section>

      <section id="equipe" className="bg-surface px-6 py-24 md:px-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-5xl leading-[54px] tracking-[-0.48px]">Nossa equipe</h2>
            <p className="text-[22px] leading-[34px]">
              Pessoas que vieram da sala de aula, da gestão pública e da pesquisa, unidas pela mesma escuta.
            </p>
          </div>
          <ul className="flex flex-wrap justify-center gap-y-12">
            {team.map((member, index) => (
              <li key={member.name} className="flex w-1/2 justify-center px-3 min-[720px]:w-1/3 min-[1100px]:w-1/5">
                <PersonCard person={member} onOpen={() => setActive(index)} />
              </li>
            ))}
          </ul>
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
                <button type="button" className="absolute left-0 flex size-14 items-center justify-center rounded-full border-2 border-ink bg-surface text-2xl" onClick={() => step(-1)} aria-label="Pessoa anterior">
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
                <button type="button" className="absolute right-0 flex size-14 items-center justify-center rounded-full border-2 border-ink bg-surface text-2xl" onClick={() => step(1)} aria-label="Próxima pessoa">
                  →
                </button>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </section>

      <section id="como-trabalhamos" className="bg-surface">
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
                Atuamos com linguagem acessível, escuta sensível e olhar atento às evidências mais atuais em educação. O que nos une a cada parceiro é o compromisso com o impacto real na vida de quem aprende e ensina.
              </p>
            </div>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 xl:flex xl:items-start xl:gap-0">
            {values.map((item, index) => (
              <Fragment key={item.title}>
                {index > 0 ? <div aria-hidden className="hidden h-[200px] w-px shrink-0 bg-line xl:block" /> : null}
                <article className="flex min-w-0 flex-1 flex-col gap-4 xl:px-6">
                  <img src={valueIcons[index]} alt="" className="self-start" />
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

function ChapterRail({
  item,
  open,
  textWidth,
  onOpen,
}: {
  item: (typeof chapters)[number]
  open: boolean
  textWidth: number | null
  onOpen: () => void
}) {
  return (
    <div
      role={open ? "article" : "button"}
      tabIndex={open ? -1 : 0}
      aria-expanded={open}
      aria-label={open ? undefined : `${item.year}. ${item.title}`}
      onClick={() => {
        if (!open) onOpen()
      }}
      onKeyDown={(event) => {
        if (open) return
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          onOpen()
        }
      }}
      className={`relative h-full min-w-24 basis-0 overflow-hidden rounded-[20px] border text-left motion-reduce:transition-none! ${open ? "grow cursor-default border-line" : "grow-0 cursor-pointer border-transparent"}`}
      style={{
        backgroundColor: open ? "#ffffff" : item.background,
        transition: "flex-grow 680ms cubic-bezier(0.4, 0, 0.2, 1), background-color 360ms ease, border-color 360ms ease",
      }}
    >
      <div
        aria-hidden={open}
        className={`pointer-events-none absolute inset-y-0 left-0 flex w-24 flex-col items-center gap-4 px-2 py-6 transition-opacity ease-out motion-reduce:transition-none ${open ? "opacity-0 duration-150" : "opacity-100 delay-150 duration-300"}`}
        style={{ color: item.color }}
      >
        <span className="text-[13px] font-extrabold tracking-[1.04px]">{item.year}</span>
        <span className="text-[15px] font-extrabold [writing-mode:vertical-rl] rotate-180">{item.title}</span>
      </div>
      <div
        aria-hidden={!open}
        className={`absolute inset-y-0 left-0 overflow-hidden p-10 text-ink transition-opacity ease-out motion-reduce:transition-none ${open ? "opacity-100 delay-150 duration-[450ms]" : "pointer-events-none opacity-0 duration-200"}`}
        style={{ width: textWidth ? `${textWidth}px` : "100%" }}
      >
        <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet">{item.year}</p>
        <h3 className="mt-4 font-display text-[32px] leading-[38px] font-medium">{item.title}</h3>
        <p className="mt-4 max-w-xl text-lg leading-[29px]">{item.text}</p>
        {item.kicker ? <p className="mt-6 font-display text-5xl text-violet">{item.kicker}</p> : null}
      </div>
    </div>
  )
}

function PersonCard({ person, onOpen }: { person: (typeof team)[number]; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="flex w-full max-w-[220px] flex-col items-center gap-4 text-center">
      <Portrait src={person.photo} face={person.face} color={person.color} className="aspect-square w-full" />
      <span className="w-full font-display text-[22px] leading-7 font-medium text-balance">{person.name}</span>
      <span className="w-full text-[15px] leading-[22px] font-medium text-balance text-violet">{person.role}</span>
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
      <img src={src} alt="" className="absolute max-w-none" style={faceFrame(face)} />
    </span>
  )
}

function faceFrame(face: { x: number; y: number }) {
  const fx = face.x / 100
  const fy = face.y / 100
  const targetX = 0.5
  const targetY = 0.42
  const scale = Math.max(targetX / fx, (1 - targetX) / (1 - fx), targetY / fy, (1 - targetY) / (1 - fy)) * 1.05
  return {
    width: `${scale * 100}%`,
    height: `${scale * 100}%`,
    left: `${(targetX - fx * scale) * 100}%`,
    top: `${(targetY - fy * scale) * 100}%`,
  }
}

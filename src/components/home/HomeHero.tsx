import { Link } from "react-router"
import { MorphPillButton } from "@/components/brand/MorphPillButton"
import { WordBalloon } from "@/components/brand/WordBalloon"
import { cn } from "cn"

type HomeHeroProps = {
  /** Layout fixo 1200×630 para captura da imagem Open Graph. */
  forOpenGraph?: boolean
}

export function HomeHero({ forOpenGraph = false }: HomeHeroProps) {
  return (
    <section className={cn("bg-indigo text-white", forOpenGraph && "size-full")}>
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1440px] items-center px-6 py-16 md:px-20",
          forOpenGraph
            ? "h-full max-w-none justify-center px-20 py-0"
            : "min-h-[max(640px,calc(100dvh-88px-env(safe-area-inset-top,0px)))]",
        )}
      >
        <div className={cn("max-w-[640px]", forOpenGraph && "max-w-[720px]")}>
          <h1
            className={cn(
              "font-display font-normal leading-none tracking-[-1.76px]",
              forOpenGraph
                ? "text-[72px] leading-[76px]"
                : "text-6xl md:text-[88px] md:leading-[92px]",
            )}
          >
            Conectar vozes,
            <span className="block">
              <WordBalloon
                color="#ff8327"
                className={
                  forOpenGraph
                    ? "text-[72px] leading-[76px]"
                    : "text-[56px] leading-none md:text-[88px] md:leading-[92px]"
                }
              >
                transformar
              </WordBalloon>
            </span>
            a educação
          </h1>
          <p
            className={cn(
              "text-pretty leading-[34px]",
              forOpenGraph ? "mt-6 text-[20px] leading-[30px]" : "mt-8 text-[22px] leading-[34px]",
            )}
          >
            Transformamos conhecimento de ponta em soluções personalizadas para quem lidera escolas, redes e{"\u00A0"}
            organizações.
          </p>
          {!forOpenGraph ? (
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <MorphPillButton to="/contato" surface="dark" pill="orange" size="compact" />
              <Link
                to="/o-que-fazemos"
                className="shrink-0 text-sm font-medium tracking-wide uppercase whitespace-nowrap leading-none text-white outline-none hover:text-white/90 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Conheça o que fazemos →
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

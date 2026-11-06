import { Link } from "react-router"
import { MorphPillButton } from "@/components/brand/MorphPillButton"
import { WordBalloon } from "@/components/brand/WordBalloon"
import { cn } from "cn"
import { heroPhotos } from "@/content/hero-photos"

/** Mesmo tratamento de cor que `WhyWeExist` (ParallaxPhotoSection). */
const homeHeroOverlay =
  "bg-gradient-to-r from-indigo/88 via-indigo/55 to-indigo/15"

type HomeHeroProps = {
  /** Layout fixo 1200×630 para captura da imagem Open Graph. */
  forOpenGraph?: boolean
}

export function HomeHero({ forOpenGraph = false }: HomeHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden text-white",
        forOpenGraph ? "h-full" : "min-h-[max(560px,calc(100dvh-88px-env(safe-area-inset-top,0px)))]",
      )}
    >
      {/* Plano de fundo: foto original + overlay roxo (como "Por que existimos") */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <img
          src={heroPhotos.home}
          alt=""
          width={1024}
          height={684}
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover"
          style={{ objectPosition: "58% 32%" }}
        />
        <div className={cn("absolute inset-0", homeHeroOverlay)} />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-[1440px] flex-col justify-center px-6 py-12",
          forOpenGraph ? "h-full px-10 py-8" : "min-h-[inherit] lg:px-12 lg:py-16 xl:px-20 xl:py-20",
        )}
      >
        <div
          className={cn(
            "max-w-[640px]",
            forOpenGraph && "max-w-[720px]",
          )}
        >
          <h1
            className={cn(
              "font-display font-normal leading-none tracking-[-1.76px]",
              forOpenGraph
                ? "text-[56px] leading-[60px]"
                : "text-5xl sm:text-6xl md:text-[72px] md:leading-[76px] lg:text-[80px] lg:leading-[84px] xl:text-[88px] xl:leading-[92px]",
            )}
          >
            Conectar vozes,
            <span className="block">
              <WordBalloon
                color="#ff8327"
                className={
                  forOpenGraph
                    ? "text-[56px] leading-[60px]"
                    : "text-[44px] leading-none sm:text-[52px] md:text-[72px] md:leading-[76px] lg:text-[80px] lg:leading-[84px] xl:text-[88px] xl:leading-[92px]"
                }
              >
                transformar
              </WordBalloon>
            </span>
            a educação
          </h1>
          <p
            className={cn(
              "text-pretty text-white/95",
              forOpenGraph ? "mt-5 text-[16px] leading-[24px]" : "mt-6 text-lg leading-[30px] md:mt-8 md:text-[22px] md:leading-[34px]",
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

import type { ReactNode } from "react"
import { cn } from "cn"
import { PageHeroDecorations } from "@/components/layout/PageHeroDecorations"

export function PageHero({
  background,
  title,
  titleColor,
  statement,
  textColor = "#ffffff",
  support,
  image,
  imageAlt,
  imageObjectPosition = "50% 42%",
}: {
  background: string
  title: string
  titleColor: string
  statement: string
  textColor?: string
  support?: string
  image: string
  imageAlt: string
  /** `object-position` da foto (imagens de banco costumam precisar de ajuste fino). */
  imageObjectPosition?: string
}) {
  return (
    <section className="overflow-hidden" style={{ background }}>
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-[1440px] flex-col",
          "min-h-[max(560px,calc(100dvh-88px-env(safe-area-inset-top,0px)))]",
          "gap-10 px-6 py-12 lg:flex-row lg:items-stretch lg:gap-x-12 lg:gap-y-0 lg:px-12 lg:py-0 xl:gap-x-20 xl:px-20",
        )}
      >
        <div
          className="relative z-10 flex w-full shrink-0 flex-col justify-center lg:w-[42%] lg:max-w-[560px] lg:py-16 lg:pr-2 xl:pr-8 xl:py-20"
          style={{ color: textColor }}
        >
          <h1 className="font-display text-5xl leading-[1.05] font-medium tracking-[-1.76px] md:text-[72px] md:leading-[76px] lg:text-[80px] lg:leading-[84px] xl:text-[88px] xl:leading-[92px]" style={{ color: titleColor }}>
            {title}
          </h1>
          <p className="mt-6 text-pretty font-display text-[28px] leading-10 font-medium md:text-[32px]">{statement}</p>
          {support ? (
            <p className="mt-6 text-[22px] leading-[34px] opacity-[0.92]" style={{ color: textColor }}>
              {support}
            </p>
          ) : null}
        </div>

        <div className="relative min-h-[300px] w-full min-w-0 flex-1 overflow-hidden sm:min-h-[380px] lg:min-h-0 lg:pl-2">
          <PageHeroDecorations />
          <img
            src={image}
            alt={imageAlt}
            decoding="async"
            fetchPriority="high"
            className="relative z-[1] h-full w-full select-none object-cover lg:absolute lg:inset-0"
            style={{ objectPosition: imageObjectPosition }}
            sizes="(min-width: 1024px) 52vw, 100vw"
          />
        </div>
      </div>
    </section>
  )
}

export function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string
  title: string
  children?: ReactNode
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-4xl leading-[54px] font-normal tracking-[-0.48px] md:text-5xl">{title}</h2>
      {children ? <div className="mt-4 text-lg leading-[29px]">{children}</div> : null}
    </div>
  )
}

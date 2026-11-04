import type { ReactNode } from "react"
import grafismo1 from "@/assets/grafismo-1.svg"
import grafismo2 from "@/assets/grafismo-2.svg"
import grafismo3 from "@/assets/grafismo-3.svg"

export function PageHero({
  background,
  title,
  titleColor,
  statement,
  textColor = "#ffffff",
  support,
  image,
  imageAlt,
}: {
  background: string
  title: string
  titleColor: string
  statement: string
  textColor?: string
  support?: string
  image: string
  imageAlt: string
}) {
  return (
    <section className="overflow-hidden" style={{ background }}>
      <div className="mx-auto grid min-h-[max(560px,calc(100dvh-88px-env(safe-area-inset-top,0px)))] w-full max-w-[1440px] items-center gap-10 px-6 py-16 md:grid-cols-[1.1fr_560px] md:px-20">
        <div className="max-w-[672px]" style={{ color: textColor }}>
          <h1 className="font-display text-6xl leading-[1.05] font-medium md:text-[96px] md:leading-[100px]" style={{ color: titleColor }}>
            {title}
          </h1>
          <p className="mt-6 font-display text-[28px] leading-10 font-medium md:text-[32px]">{statement}</p>
          {support ? <p className="mt-6 text-[22px] leading-[34px]">{support}</p> : null}
        </div>
        <div className="relative mx-auto h-[420px] w-full max-w-[560px] md:h-[560px]">
          <img src={image} alt={imageAlt} className="absolute top-0 left-10 h-full w-[86%] rounded-[20px] object-cover" />
          <img src={grafismo1} alt="" className="absolute top-8 left-0 w-24" />
          <img src={grafismo2} alt="" className="absolute right-2 bottom-4 w-32" />
          <img src={grafismo3} alt="" className="absolute top-16 right-0 w-16" />
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

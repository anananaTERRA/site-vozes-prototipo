import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import face1 from "@/assets/carinha-1.svg"
import peca2 from "@/assets/peca-2.svg"
import peca4 from "@/assets/peca-4.svg"
import type { Testimonial } from "@/content/site"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type TestimonialsLayerProps = {
  items: Testimonial[]
  className?: string
}

export function TestimonialsLayer({ items, className = "" }: TestimonialsLayerProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [32, -32])
  const drift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-24, 24])

  return (
    <section
      ref={ref}
      className={`relative -mt-6 px-6 pb-24 md:-mt-10 md:px-20 ${className}`}
      aria-labelledby="depoimentos-home"
    >
      <div className="relative mx-auto max-w-[960px]">
        <div className="pointer-events-none absolute -top-8 right-8 hidden w-32 opacity-70 md:block">
          <motion.img src={face1} alt="" style={{ y: drift }} className="w-full" />
        </div>
        <motion.div
          style={{ y }}
          className="relative overflow-hidden rounded-t-[32px] rounded-b-[32px] bg-lavender/50 px-4 py-10 shadow-[0_-24px_64px_rgba(73,57,117,0.18),0_32px_80px_rgba(26,18,46,0.12)] md:px-8 md:py-14"
        >
          <img src={peca2} alt="" className="pointer-events-none absolute -top-6 -left-4 w-24 opacity-80" />
          <img src={peca4} alt="" className="pointer-events-none absolute -right-2 -bottom-4 w-20 opacity-70" />
          <h2 id="depoimentos-home" className="sr-only">
            Depoimentos
          </h2>
          <Carousel className="relative z-10 mx-auto w-full max-w-[912px]">
            <CarouselContent>
              {items.map((item) => (
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
        </motion.div>
      </div>
    </section>
  )
}

import testimonialsGrafismos from "@/assets/testimonials-grafismos.svg?raw"

/** Mesmos grafismos da seção Depoimentos, recortados à direita do CTA com cores da marca. */
export function FooterCtaGrafismos() {
  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute inset-0 left-[38%] hidden overflow-hidden md:block sm:left-[40%] lg:left-[42%]",
        "[&_path:nth-child(1)]:fill-lime",
        "[&_path:nth-child(2)]:fill-orange",
        "[&_path:nth-child(3)]:fill-lavender",
        "[&_path:nth-child(4)]:fill-mint",
        "[&_path:nth-child(5)]:fill-pink-light",
        "[&_path:nth-child(6)]:fill-pink",
        "[&_path:nth-child(7)]:fill-sky-band",
        "[&_path:nth-child(8)]:fill-orange",
        "[&_path:nth-child(9)]:fill-lime",
        "[&_path:nth-child(10)]:fill-lavender",
        "[&_path:nth-child(11)]:fill-mint",
        "[&_path:nth-child(12)]:fill-pink",
        "[&_path:nth-child(13)]:fill-pink-light",
        "[&_path:nth-child(14)]:fill-sky-band",
        "[&_path:nth-child(15)]:fill-lime",
        "[&_path:nth-child(16)]:fill-orange",
        "[&_path:nth-child(17)]:fill-lavender",
        "[&>svg]:absolute [&>svg]:top-1/2 [&>svg]:left-1/2 [&>svg]:h-[132%] [&>svg]:w-auto [&>svg]:max-w-none [&>svg]:min-w-[118%] [&>svg]:-translate-x-[34%] [&>svg]:-translate-y-[44%]",
        "[&_g]:fill-none",
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: testimonialsGrafismos }}
    />
  )
}

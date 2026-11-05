import { Link } from "react-router"
import { ArrowRight } from "lucide-react"
import { NewsCard } from "@/components/content/Cards"
import type { NewsArticle } from "@/content/types"

type HomeMediaSectionProps = {
  items: NewsArticle[]
}

export function HomeMediaSection({ items }: HomeMediaSectionProps) {
  return (
    <section className="bg-paper px-6 py-24 md:px-20">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-6">
          <div>
            <h2 className="font-display text-5xl leading-[54px]">Acompanhe nossas aparições na mídia</h2>
            <p className="mt-4 max-w-xl text-lg leading-[29px]">
              Acompanhe nossas aparições na imprensa, entrevistas e coberturas sobre os temas que pautamos.
            </p>
          </div>
          <Link
            to="/vozes"
            className="inline-flex shrink-0 items-center gap-2 text-[15px] font-extrabold tracking-[1.04px] uppercase hover:text-violet"
          >
            Ver toda a cobertura
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

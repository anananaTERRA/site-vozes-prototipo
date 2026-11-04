import { Link } from "react-router"
import { ArrowRight } from "lucide-react"
import { PublicationCard } from "@/components/content/Cards"
import type { Publication } from "@/content/types"

type HomePublicationsSectionProps = {
  items: Publication[]
}

export function HomePublicationsSection({ items }: HomePublicationsSectionProps) {
  return (
    <section className="bg-surface px-6 py-24 md:px-20">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="flex items-end justify-between gap-6">
          <h2 className="font-display text-5xl leading-[54px]">Publicações</h2>
          <Link
            to="/publicacoes"
            className="inline-flex items-center gap-2 text-[15px] font-extrabold tracking-[1.04px] uppercase hover:text-violet"
          >
            Ver todas
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <PublicationCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

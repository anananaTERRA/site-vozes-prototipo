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
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-5xl leading-[54px]">Confira nossas publicações e fique por dentro</h2>
            <p className="mt-4 text-lg leading-[29px]">
              Pesquisas, artigos e materiais produzidos pelo Vozes, disponíveis para quem quer entender mais a fundo o
              que acontece na educação brasileira.
            </p>
          </div>
          <Link
            to="/publicacoes"
            className="inline-flex shrink-0 items-center gap-2 text-[15px] font-extrabold tracking-[1.04px] uppercase hover:text-violet"
          >
            Acessar todas as publicações
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

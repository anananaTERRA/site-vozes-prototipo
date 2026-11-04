import { Link, Navigate, useParams } from "react-router"
import { EventCard, NewsCard } from "@/components/content/Cards"
import { ListingState } from "@/components/content/ListingState"
import { PostArticle } from "@/components/content/PostArticle"
import { useSiteContent } from "@/content/provider"
import { eventBySlug, newsBySlug, relatedEvents, relatedNews } from "@/content/posts"

export function PostNoticiaPage() {
  const { slug = "" } = useParams()
  const { ready, noticias } = useSiteContent()
  const article = newsBySlug(noticias, slug)
  if (!ready) return <div className="bg-surface px-6 py-16"><ListingState kind="loading" /></div>
  if (!article) return <Navigate to="/nao-encontrada" replace />
  const related = relatedNews(noticias, article.slug)
  return (
    <div className="bg-surface">
      <PostArticle item={article} trail={{ to: "/vozes", label: "Vozes na mídia" }} />
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-20 md:px-0">
        <h2 className="font-display text-[32px] leading-[38px]">Leia também</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {related.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
        <Link to="/vozes" className="mt-8 inline-block text-[15px] font-extrabold tracking-[1.04px] uppercase">
          Voltar para a listagem
        </Link>
      </section>
    </div>
  )
}

export function PostEventoPage() {
  const { slug = "" } = useParams()
  const { ready, eventos } = useSiteContent()
  const article = eventBySlug(eventos, slug)
  if (!ready) return <div className="bg-surface px-6 py-16"><ListingState kind="loading" /></div>
  if (!article) return <Navigate to="/nao-encontrada" replace />
  const related = relatedEvents(eventos, article.slug)
  return (
    <div className="bg-surface">
      <PostArticle item={article} trail={{ to: "/vozes?tipo=eventos", label: "Vozes na mídia" }} ficha={article.ficha} />
      <section className="mx-auto w-full max-w-[1280px] px-6 pb-20 md:px-0">
        <h2 className="font-display text-[32px] leading-[38px]">Leia também</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {related.map((item) => (
            <EventCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}

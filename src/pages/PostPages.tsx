import { Link, Navigate, useParams } from "react-router"
import { EventCard, NewsCard } from "@/components/content/Cards"
import { PostArticle } from "@/components/content/PostArticle"
import { eventBySlug, newsBySlug, relatedEvents, relatedNews } from "@/content/posts"

export function PostNoticiaPage() {
  const { slug = "" } = useParams()
  const article = newsBySlug(slug)
  if (!article) return <Navigate to="/nao-encontrada" replace />
  const related = relatedNews(article.slug)
  return (
    <div className="bg-white">
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
  const article = eventBySlug(slug)
  if (!article) return <Navigate to="/nao-encontrada" replace />
  const related = relatedEvents(article.slug)
  return (
    <div className="bg-white">
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

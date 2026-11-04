import type { ReactNode } from "react"
import { Link } from "react-router"
import { EventFichaBar } from "@/components/content/EventFichaBar"
import { PostShareAside } from "@/components/content/PostShareAside"
import { ThemeTag } from "@/components/content/ThemeTag"
import type { Block, EventArticle, NewsArticle } from "@/content/types"
import { formatDate } from "@/lib/format"

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex max-w-[640px] flex-col gap-6">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2 key={index} className="font-display text-[32px] leading-[38px] font-medium">
              {block.text}
            </h2>
          )
        }
        if (block.type === "h3") {
          return (
            <h3 key={index} className="font-display text-2xl leading-[30px] font-medium">
              {block.text}
            </h3>
          )
        }
        if (block.type === "list") {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5 text-lg leading-[29px]">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={index}
              className="rounded-[20px] bg-lavender/35 px-6 py-5 font-display text-[28px] leading-[38px] text-indigo"
            >
              “{block.text}”
            </blockquote>
          )
        }
        if (block.type === "image") {
          return (
            <figure key={index}>
              <img src={block.src} alt={block.alt} className="aspect-video w-full rounded-[16px] object-cover" />
              <figcaption className="mt-2 text-[15px] leading-[22px] text-violet">{block.caption}</figcaption>
            </figure>
          )
        }
        if (block.type === "stat") {
          return (
            <div key={index} className="flex items-center gap-6 rounded-[20px] bg-paper px-6 py-4">
              <p className="font-display text-6xl leading-none">{block.value}</p>
              <p className="text-lg leading-[29px]">{block.text}</p>
            </div>
          )
        }
        return (
          <p key={index} className="text-lg leading-[29px]">
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

type Trail = {
  to: string
  label: string
  section?: { to: string; label: string }
}

export function PostArticle({
  item,
  trail,
  related,
}: {
  item: NewsArticle | EventArticle
  trail: Trail
  related?: ReactNode
}) {
  const isEvent = item.kind === "evento"
  const kindLabel = isEvent ? "Evento" : "Notícia"

  return (
    <article>
      <header className="mx-auto w-full max-w-[1440px] px-6 pb-8 pt-10 md:px-20">
        <p className="text-[15px] leading-[22px] font-medium text-violet">
          <Link to={trail.to} className="hover:underline">
            {trail.label}
          </Link>
          {trail.section ? (
            <>
              <span className="text-indigo/50"> / </span>
              <Link to={trail.section.to} className="hover:underline">
                {trail.section.label}
              </Link>
            </>
          ) : null}
        </p>
        <div className="mt-6 max-w-[960px] md:pl-40">
          <p className="text-[13px] font-extrabold tracking-[1.04px] uppercase">
            {kindLabel} · {formatDate(item.date)}
          </p>
          <h1 className="mt-4 font-display text-[34px] leading-[40px] font-medium md:text-[56px] md:leading-[62px]">
            {item.title}
          </h1>
          <p className="mt-6 max-w-[800px] text-[22px] leading-[34px]">{item.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {item.themes.map((theme) => (
              <ThemeTag key={theme} id={theme} />
            ))}
          </div>
        </div>
      </header>

      {isEvent ? <EventFichaBar item={item} /> : null}

      <figure className="mx-auto w-full max-w-[1440px] pt-8 md:px-20 md:pt-10">
        <img
          src={item.image}
          alt={item.title}
          className="aspect-video w-full object-cover md:rounded-[16px]"
          style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
        />
        {"caption" in item && item.caption ? (
          <figcaption className="mt-3 px-6 text-[15px] leading-[22px] text-violet md:px-0">{item.caption}</figcaption>
        ) : null}
      </figure>

      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-16 md:grid-cols-[160px_minmax(0,640px)] md:gap-x-16 md:px-20">
        <aside className="hidden md:block">
          <div className="sticky top-28">
            <PostShareAside themes={item.themes} />
          </div>
        </aside>
        <Blocks blocks={item.body} />
      </div>

      {related ? (
        <section className="mx-auto w-full max-w-[1440px] px-6 pb-20 md:px-20">
          <div className="max-w-[1280px] md:pl-36">
            <div className="md:hidden">
              <PostShareAside themes={item.themes} layout="horizontal" />
            </div>
            <div className="hidden md:block md:max-w-[640px]">
              <PostShareAside themes={item.themes} layout="horizontal" />
            </div>
            <div className="mt-10 border-t border-line pt-10">
              <h2 className="font-display text-[32px] leading-[38px]">Leia também</h2>
              <div className="mt-8 grid gap-8 md:grid-cols-3">{related}</div>
            </div>
          </div>
        </section>
      ) : null}
    </article>
  )
}

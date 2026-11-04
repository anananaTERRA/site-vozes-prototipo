import { useState } from "react"
import { Link } from "react-router"
import { ThemeTag } from "@/components/content/ThemeTag"
import type { Block, EventArticle, NewsArticle } from "@/content/types"
import { formatDate } from "@/lib/format"

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
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
            <ul key={index} className="list-disc space-y-2 pl-5">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )
        }
        if (block.type === "quote") {
          return (
            <blockquote key={index} className="border-l-4 border-orange pl-6 text-[22px] leading-[34px]">
              “{block.text}”
            </blockquote>
          )
        }
        if (block.type === "image") {
          return (
            <figure key={index}>
              <img src={block.src} alt={block.alt} className="aspect-video w-full rounded-[20px] object-cover" />
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

export function PostArticle({
  item,
  trail,
  ficha,
}: {
  item: NewsArticle | EventArticle
  trail: { to: string; label: string }
  ficha?: { label: string; value: string }[]
}) {
  const [copied, setCopied] = useState(false)

  async function share() {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
  }

  return (
    <article>
      <header className="mx-auto w-full max-w-[1440px] px-6 py-10 md:px-20">
        <p className="text-[15px] leading-[22px] font-medium text-violet">
          <Link to={trail.to} className="hover:underline">
            {trail.label}
          </Link>
        </p>
        <div className="mx-auto mt-6 max-w-[800px]">
          <p className="text-center text-[13px] font-extrabold tracking-[1.04px] uppercase">
            {item.kind === "evento" ? "Evento" : "Notícia"} · {formatDate(item.date)}
          </p>
          <h1 className="mt-4 text-center font-display text-5xl leading-[56px] font-medium md:text-[56px] md:leading-[64px]">
            {item.title}
          </h1>
          <p className="mt-6 text-center text-[22px] leading-[34px]">{item.excerpt}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {item.themes.map((theme) => (
              <ThemeTag key={theme} id={theme} />
            ))}
          </div>
        </div>
      </header>
      {ficha ? (
        <dl className="mx-auto grid w-full max-w-[1280px] gap-6 px-6 py-6 sm:grid-cols-2 md:grid-cols-4 md:px-0">
          {ficha.map((row) => (
            <div key={row.label} className="rounded-[20px] bg-paper px-5 py-4">
              <dt className="text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">{row.label}</dt>
              <dd className="mt-1 text-lg leading-[29px]">{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <figure className="mx-auto w-full max-w-[1440px] px-6 md:px-20">
        <img src={item.image} alt={item.title} className="aspect-video w-full rounded-[20px] object-cover" />
        <figcaption className="mt-3 text-[15px] leading-[22px] text-violet">{item.caption}</figcaption>
      </figure>
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-16 md:grid-cols-[160px_640px] md:justify-center md:px-20">
        <aside className="flex flex-col gap-6">
          <button type="button" onClick={share} className="text-left text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">
            {copied ? "Link copiado" : "Compartilhar"}
          </button>
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-extrabold tracking-[1.04px] uppercase">Tags</p>
            {item.themes.map((theme) => (
              <ThemeTag key={theme} id={theme} />
            ))}
          </div>
        </aside>
        <Blocks blocks={item.body} />
      </div>
    </article>
  )
}

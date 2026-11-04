import { Link } from "react-router"
import { ThemeTag } from "@/components/content/ThemeTag"
import type { EventArticle, NewsArticle, PressItem, Publication } from "@/content/types"
import { formatDate } from "@/lib/format"

const contentCardLinkClass =
  "group flex flex-col gap-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"

const contentCardMediaShellClass =
  "overflow-hidden rounded-[20px] bg-paper shadow-sm transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_20px_40px_-12px_rgba(45,27,78,0.18)] motion-reduce:transition-none"

const contentCardImageClass =
  "w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] motion-reduce:transition-none motion-reduce:group-hover:scale-100"

function CardCover({
  src,
  aspectClass,
  objectPosition,
}: {
  src: string
  aspectClass: "aspect-[4/3]" | "aspect-[3/4]"
  objectPosition?: string
}) {
  return (
    <div className={contentCardMediaShellClass}>
      <img
        src={src}
        alt=""
        className={`${aspectClass} ${contentCardImageClass}`}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  )
}

function Meta({ label, date }: { label: string; date: string }) {
  return (
    <p className="text-[13px] font-extrabold tracking-[1.04px] text-navy uppercase">
      {label} <span className="font-medium tracking-normal normal-case">·</span> {formatDate(date)}
    </p>
  )
}

function CardThemes({ ids }: { ids: NewsArticle["themes"] }) {
  if (ids.length === 0) return null
  return (
    <div className="flex flex-wrap gap-1.5">
      {ids.map((id) => (
        <ThemeTag key={id} id={id} />
      ))}
    </div>
  )
}

export function FeaturedNewsCard({ item }: { item: NewsArticle }) {
  return (
    <Link
      to={`/vozes/noticias/${item.slug}`}
      aria-label={`Ler notícia: ${item.title}`}
      className="group mt-10 grid items-center gap-8 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:grid-cols-[720px_1fr]"
    >
      <div className={contentCardMediaShellClass}>
        <img
          src={item.image}
          alt=""
          className={`aspect-video w-full ${contentCardImageClass}`}
          style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
        />
      </div>
      <div>
        <p className="text-[13px] font-extrabold tracking-[1.04px] uppercase">Destaque · {formatDate(item.date)}</p>
        <h2 className="mt-4 font-display text-4xl leading-[48px] font-medium text-navy transition-colors group-hover:text-violet">
          {item.title}
        </h2>
        <p className="mt-4 text-lg leading-[29px]">{item.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.themes.map((theme) => (
            <ThemeTag key={theme} id={theme} />
          ))}
        </div>
        <span className="mt-4 inline-block text-lg font-extrabold text-ink underline-offset-4 group-hover:text-mint">
          Ler notícia
        </span>
      </div>
    </Link>
  )
}

export function NewsCard({ item }: { item: NewsArticle }) {
  return (
    <Link to={`/vozes/noticias/${item.slug}`} className={contentCardLinkClass}>
      <CardCover src={item.image} aspectClass="aspect-[4/3]" objectPosition={item.imagePosition} />
      <Meta label="Notícia" date={item.date} />
      <h3 className="font-display text-2xl leading-[30px] font-medium text-navy transition-colors group-hover:text-violet">
        {item.title}
      </h3>
      <p className="text-[15px] leading-[22px] text-violet line-clamp-2">{item.excerpt}</p>
      <CardThemes ids={item.themes} />
    </Link>
  )
}

export function EventCard({ item }: { item: EventArticle }) {
  return (
    <Link to={`/vozes/eventos/${item.slug}`} className={contentCardLinkClass}>
      <CardCover src={item.image} aspectClass="aspect-[4/3]" objectPosition={item.imagePosition} />
      <Meta label="Evento" date={item.date} />
      <h3 className="font-display text-2xl leading-[30px] font-medium text-navy transition-colors group-hover:text-violet">
        {item.title}
      </h3>
      <p className="text-[15px] leading-[22px] font-medium text-violet">
        {item.place} · {item.format}
      </p>
      <CardThemes ids={item.themes} />
    </Link>
  )
}

export function PressCard({ item }: { item: PressItem }) {
  return (
    <a href={item.url} target="_blank" rel="noreferrer" className={contentCardLinkClass}>
      <CardCover src={item.image} aspectClass="aspect-[4/3]" />
      <p className="text-[13px] font-extrabold tracking-[1.04px] text-navy uppercase">
        Na mídia · {item.outlet}
      </p>
      <h3 className="font-display text-2xl leading-[30px] font-medium text-navy transition-colors group-hover:text-violet">
        {item.title}
      </h3>
      <p className="text-[15px] leading-[22px] text-violet line-clamp-2">{item.excerpt}</p>
      <CardThemes ids={item.themes} />
    </a>
  )
}

export function PublicationCard({ item }: { item: Publication }) {
  return (
    <Link to={`/publicacoes/${item.slug}`} className={contentCardLinkClass}>
      <CardCover src={item.image} aspectClass="aspect-[3/4]" objectPosition={item.imagePosition} />
      <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">
        {item.type} · {item.year}
      </p>
      <h3 className="font-display text-xl leading-[28px] font-medium text-ink transition-colors group-hover:text-violet md:text-2xl md:leading-[30px]">
        {item.title}
      </h3>
      <CardThemes ids={item.themes} />
    </Link>
  )
}

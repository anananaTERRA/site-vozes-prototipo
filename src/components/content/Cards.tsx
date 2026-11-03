import { Link } from "react-router"
import { ThemeTag } from "@/components/content/ThemeTag"
import type { EventArticle, NewsArticle, PressItem, Publication } from "@/content/types"
import { formatDate } from "@/lib/format"

function Meta({ label, date }: { label: string; date: string }) {
  return (
    <p className="text-[13px] font-extrabold tracking-[1.04px] text-navy uppercase">
      {label} <span className="font-medium tracking-normal normal-case">·</span> {formatDate(date)}
    </p>
  )
}

export function NewsCard({ item }: { item: NewsArticle }) {
  return (
    <Link to={`/vozes/noticias/${item.slug}`} className="group flex flex-col gap-3">
      <img
        src={item.image}
        alt=""
        className="aspect-[4/3] w-full rounded-[20px] object-cover"
        style={{ objectPosition: item.imagePosition }}
      />
      <Meta label="Notícia" date={item.date} />
      <h3 className="font-display text-2xl leading-[30px] font-medium text-navy group-hover:text-violet">
        {item.title}
      </h3>
      {item.themes[0] ? (
        <div>
          <ThemeTag id={item.themes[0]} />
        </div>
      ) : null}
    </Link>
  )
}

export function EventCard({ item }: { item: EventArticle }) {
  return (
    <Link to={`/vozes/eventos/${item.slug}`} className="group flex flex-col gap-3">
      <img
        src={item.image}
        alt=""
        className="aspect-[4/3] w-full rounded-[20px] object-cover"
        style={{ objectPosition: item.imagePosition }}
      />
      <Meta label="Evento" date={item.date} />
      <h3 className="font-display text-2xl leading-[30px] font-medium text-navy group-hover:text-violet">
        {item.title}
      </h3>
      <p className="text-[15px] leading-[22px] font-medium text-violet">
        {item.place} · {item.format}
      </p>
      {item.themes[0] ? (
        <div>
          <ThemeTag id={item.themes[0]} />
        </div>
      ) : null}
    </Link>
  )
}

export function PressCard({ item }: { item: PressItem }) {
  return (
    <a href={item.url} target="_blank" rel="noreferrer" className="group flex flex-col gap-3">
      <img src={item.image} alt="" className="aspect-[4/3] w-full rounded-[20px] object-cover" />
      <p className="text-[13px] font-extrabold tracking-[1.04px] text-navy uppercase">
        Na mídia · {item.outlet}
      </p>
      <h3 className="font-display text-2xl leading-[30px] font-medium text-navy group-hover:text-violet">
        {item.title}
      </h3>
      {item.themes[0] ? (
        <div>
          <ThemeTag id={item.themes[0]} />
        </div>
      ) : null}
    </a>
  )
}

export function PublicationCard({ item }: { item: Publication }) {
  return (
    <Link to={`/publicacoes/${item.slug}`} className="group flex flex-col gap-4">
      <img
        src={item.image}
        alt=""
        className="aspect-[3/4] w-full rounded-[20px] object-cover"
        style={{ objectPosition: item.imagePosition }}
      />
      <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">
        {item.type} · {item.year}
      </p>
      <h3 className="font-display text-2xl leading-[30px] font-medium text-indigo group-hover:text-violet">
        {item.title}
      </h3>
      {item.themes[0] ? (
        <div>
          <ThemeTag id={item.themes[0]} />
        </div>
      ) : null}
    </Link>
  )
}

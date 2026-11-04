import {
  chapters,
  faq,
  historyIntro,
  partners,
  segments,
  services,
  servicesIntro,
  stats,
  team,
  testimonials,
  values,
} from "@/content/institutional"
import { eventos, midia, noticias, publicacoes } from "@/content/posts"
import type { SiteContent } from "@/content/site"

const valueIcons = ["antecipacao", "traducao", "humanidade", "fundamentacao", "colaboracao"] as const

export function localContent(): SiteContent {
  return {
    noticias,
    eventos,
    midia,
    publicacoes,
    partners: partners.map((partner) => ({
      name: partner.name,
      src: partner.src,
      invertOnDark: "invertOnDark" in partner ? partner.invertOnDark : false,
    })),
    services: services.map((service) => ({
      id: service.id,
      title: service.title,
      face: service.face,
      accent: service.accent,
      text: service.text,
      body: service.body,
      audience: service.audience,
      delivery: service.delivery,
    })),
    servicesIntro: [...servicesIntro],
    segments: segments.map((segment) => ({ ...segment })),
    testimonials: testimonials.map((item) => ({ ...item })),
    chapters: chapters.map((chapter) => ({
      year: chapter.year,
      title: chapter.title,
      background: chapter.background,
      color: chapter.color,
      text: chapter.text,
      kicker: "kicker" in chapter && typeof chapter.kicker === "string" ? chapter.kicker : undefined,
    })),
    team: team.map((member) => ({
      name: member.name,
      role: member.role,
      photo: member.photo,
      color: member.color,
      face: member.face,
      bio: "bio" in member ? member.bio : undefined,
      childhoodPhoto:
        "childhoodPhoto" in member && typeof member.childhoodPhoto === "string" ? member.childhoodPhoto : undefined,
      dreamJobText: "dreamJobText" in member && typeof member.dreamJobText === "string" ? member.dreamJobText : undefined,
    })),
    values: values.map((item, index) => ({
      title: item.title,
      text: item.text,
      icon: valueIcons[index] ?? "antecipacao",
    })),
    faq: faq.map((item) => ({ ...item })),
    stats: stats.map((item) => ({ ...item })),
    historyIntro,
  }
}

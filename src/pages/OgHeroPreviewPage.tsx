import { HomeHero } from "@/components/home/HomeHero"
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "@/content/social-meta"

/** Rota interna para gerar public/og/default.jpg a partir do hero real. */
export function OgHeroPreviewPage() {
  return (
    <div
      className="overflow-hidden bg-indigo"
      style={{ width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT }}
    >
      <HomeHero forOpenGraph />
    </div>
  )
}

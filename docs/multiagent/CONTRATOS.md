# Contratos de componentes (Foundation → Integração)

Documento vivo. **Agente 00** inicia; outros agentes registram props aqui ao criar componentes.

## `ParallaxPhotoSection`

**Owner:** Agente 00  
**Path:** `src/components/motion/ParallaxPhotoSection.tsx`

```tsx
type ParallaxPhotoSectionProps = {
  imageSrc: string
  imageAlt?: string
  overlayClassName?: string // ex: bg-indigo/65
  minHeight?: string // ex: min-h-[420px]
  children: React.ReactNode // texto fixo (não parallax)
  yRange?: [string, string] // default ["-12%", "12%"]
}
```

## `TestimonialsLayer`

**Owner:** Agente 04  
**Path:** `src/components/home/TestimonialsLayer.tsx`

```tsx
import type { Testimonial } from "@/content/site"

type TestimonialsLayerProps = {
  items: Testimonial[]
  className?: string
}
```

## `HomeSegmentsSection`

**Owner:** Agente 05  

```tsx
import type { Segment } from "@/content/site"

type HomeSegmentsSectionProps = {
  segments: Segment[]
}
```

## `HomeConvictionBand` / `HomeVoiceBand`

**Owner:** Agente 06 — ambos wrap `ParallaxPhotoSection` + CTA ou copy conforme Home atual.

## `HomeMediaSection` / `HomePublicationsSection`

**Owner:** Agente 07 — props derivadas de `noticias` e `publicacoes` (slice feito no integrador ou dentro do componente).

## `HomeFinalCta`

**Owner:** Agente 08 — sem props ou `{ className?: string }`.

## Ordem da seção paper (Home)

**Owner:** Agente 02 define spacing; **Agente 14** monta:

1. `SolutionsIntro`
2. `PartnerStrip` (título PARCEIROS)
3. `ServiceCards`
4. CTA contato — `SolutionsContactCta` (`MorphPillButton`)

## Integração Home (Agente 14)

Imports esperados em `HomePage.tsx`:

- `WhyWeExist`, `ProcessScroll`, `SolutionsIntro`, `SOLUTIONS_PAPER_SPACING`, `SolutionsContactCta`
- `ServiceCards`, `PartnerStrip`, `TestimonialsLayer`, `HomeSegmentsSection`
- `HomeConvictionBand`, `HomeMediaSection`, `HomeVoiceBand`, `HomePublicationsSection`, `HomeFinalCta`

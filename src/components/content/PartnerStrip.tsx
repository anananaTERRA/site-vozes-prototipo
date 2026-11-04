import { partners } from "@/content/institutional"

const BELT_CSS = `
.partner-belt {
  animation: vozes-partner-belt 52s linear infinite;
}
@keyframes vozes-partner-belt {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .partner-belt-viewport { overflow: visible; }
  .partner-belt {
    animation: none;
    transform: none;
    width: 100%;
  }
  .partner-belt-copy {
    flex-wrap: wrap;
    width: 100%;
    padding-right: 0;
    row-gap: 2rem;
  }
  .partner-belt-copy[data-duplicate="true"] { display: none; }
}
`

/** Cap-height / lockup weight, not a shared box. Wide wordmarks stay short; the stacked mark sits taller. */
const logoHeight: Record<string, number> = {
  "Fundação Lemann": 46,
  "Reúna": 34,
  "B3 Social": 42,
  "Movimento pela Base": 76,
}

const PLACEHOLDER_COUNT = 6

type LogoSlot = {
  id: string
  kind: "logo"
  name: string
  src: string
  invert: boolean
  height: number
}

type EmptySlot = {
  id: string
  kind: "slot"
}

type StripSlot = LogoSlot | EmptySlot

const sequence: StripSlot[] = [
  ...partners.flatMap((partner, index) => {
    const logo: LogoSlot = {
      id: partner.name,
      kind: "logo",
      name: partner.name,
      src: partner.src,
      invert: "invertOnDark" in partner && partner.invertOnDark === true,
      height: logoHeight[partner.name] ?? 40,
    }
    const slot: EmptySlot = { id: `slot-${index + 1}`, kind: "slot" }
    return [logo, slot]
  }),
  ...Array.from({ length: PLACEHOLDER_COUNT - partners.length }, (_, index): EmptySlot => ({
    id: `slot-${partners.length + index + 1}`,
    kind: "slot",
  })),
]

function PlaceholderSlot() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 148 48"
      className="h-12 w-[148px] shrink-0 text-foreground/30"
      fill="none"
    >
      <rect
        x="0.75"
        y="0.75"
        width="146.5"
        height="46.5"
        rx="8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 5"
      />
      <circle cx="74" cy="24" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function StripCopy({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      data-duplicate={duplicate ? "true" : undefined}
      className="partner-belt-copy flex shrink-0 items-center gap-x-20 pr-20"
    >
      {sequence.map((slot) => (
        <li key={slot.id} aria-hidden={slot.kind === "slot" || undefined} className="flex shrink-0 items-center">
          {slot.kind === "logo" ? (
            <img
              src={slot.src}
              alt={duplicate ? "" : slot.name}
              draggable={false}
              style={{ height: slot.height }}
              className={`w-auto max-w-none object-contain ${slot.invert ? "dark:brightness-0 dark:invert" : ""}`}
            />
          ) : (
            <PlaceholderSlot />
          )}
        </li>
      ))}
    </ul>
  )
}

export function PartnerStrip() {
  return (
    <div>
      <p className="text-[13px] font-extrabold tracking-[1.04px]">PARCEIROS</p>
      <div className="partner-belt-viewport mt-5 overflow-hidden">
        <div className="partner-belt flex w-max items-center">
          <StripCopy />
          <StripCopy duplicate />
        </div>
      </div>
      <style>{BELT_CSS}</style>
    </div>
  )
}

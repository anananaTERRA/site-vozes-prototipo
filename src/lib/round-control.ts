import { cn } from "cn"

/** Round button / tag sizes from design spec (height, horizontal padding, icon gap, icon, type). */
export type RoundControlSize = "lg" | "md" | "sm"

const roundSizeClasses: Record<RoundControlSize, string> = {
  lg: "h-14 gap-2 rounded-full px-5 text-lg leading-none [&_svg:not([class*='size-'])]:size-6",
  md: "h-10 gap-2 rounded-full px-4 text-base leading-none [&_svg:not([class*='size-'])]:size-5",
  sm: "h-9 gap-1.5 rounded-full px-3 text-sm leading-none [&_svg:not([class*='size-'])]:size-4",
}

export function roundControl(size: RoundControlSize = "md", className?: string) {
  return cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap disabled:cursor-not-allowed",
    roundSizeClasses[size],
    className,
  )
}

/** Text-only chips (theme tags, labels) — same metrics as small round buttons. */
export function roundTag(className?: string) {
  return roundControl("sm", cn("font-extrabold tracking-[1.04px]", className))
}

/** Theme labels on cards and articles — compact, medium weight, soft hover. */
export function themeTag(className?: string) {
  return cn(
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap",
    "h-7 rounded-full px-2.5 text-xs font-medium leading-none",
    "transition-[transform,filter,opacity] duration-300 ease-out motion-reduce:transition-none",
    "hover:scale-[1.03] hover:brightness-[0.94] hover:saturate-[1.06]",
    "motion-reduce:hover:scale-100",
    className,
  )
}

/** Filter / toolbar pills paired with listing controls. */
export function roundFilterPill(className?: string) {
  return roundControl("md", cn("border-2 border-line font-medium", className))
}

/** Search fields aligned to medium round control height. */
export const roundFilterInput = cn(
  "h-10 max-w-sm rounded-full border-2 border-line px-5 text-[15px] leading-snug shadow-none",
  "focus-visible:border-line focus-visible:ring-2 focus-visible:ring-navy/15 focus-visible:ring-offset-0",
)

/** Sort / filter selects in listing toolbars (pairs with roundFilterInput). */
export function roundFilterSelectTrigger(className?: string) {
  return cn(
    roundFilterPill(),
    "w-auto min-w-[12rem] justify-between gap-2 rounded-full border-2 border-line bg-surface px-5 text-[15px] font-medium shadow-none",
    "focus-visible:border-line focus-visible:ring-2 focus-visible:ring-navy/15 focus-visible:ring-offset-0 data-[size=default]:h-10",
    "dark:bg-surface dark:hover:bg-surface",
    className,
  )
}

export const roundFilterSelectContent = cn(
  "min-w-[var(--radix-select-trigger-width)] rounded-2xl border-2 border-line bg-surface p-2",
  "shadow-[0_16px_40px_-12px_rgba(45,27,78,0.18)] ring-0",
)

export const roundFilterSelectItem = cn(
  "min-h-10 cursor-pointer rounded-xl py-2.5 pl-4 pr-10 text-[15px] font-medium leading-snug",
)

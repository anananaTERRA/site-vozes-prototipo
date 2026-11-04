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
    "inline-flex shrink-0 items-center justify-center whitespace-nowrap",
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
export const roundFilterInput = "h-10 max-w-sm rounded-full border-2 border-line"

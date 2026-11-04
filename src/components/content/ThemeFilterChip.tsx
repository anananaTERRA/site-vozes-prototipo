import { themeById, type ThemeId } from "@/content/themes"
import { cn } from "cn"
import { themeTag } from "@/lib/round-control"

export function ThemeFilterChip({
  id,
  selected,
  onToggle,
}: {
  id: ThemeId
  selected: boolean
  onToggle: (id: ThemeId) => void
}) {
  const theme = themeById(id)
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={(event) => {
        event.preventDefault()
        onToggle(id)
      }}
      className={cn(
        themeTag(),
        "cursor-pointer border-2 motion-reduce:hover:scale-100",
        selected
          ? "border-transparent shadow-sm ring-2 ring-navy/25 ring-offset-2 ring-offset-surface"
          : "border-transparent opacity-50 saturate-[0.85] hover:opacity-90 hover:saturate-100",
      )}
      style={{ background: theme.background, color: theme.foreground }}
    >
      {theme.label}
    </button>
  )
}

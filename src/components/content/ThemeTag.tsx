import { themeById, type ThemeId } from "@/content/themes"
import { themeTag } from "@/lib/round-control"

export function ThemeTag({ id }: { id: ThemeId }) {
  const theme = themeById(id)
  return (
    <span className={themeTag()} style={{ background: theme.background, color: theme.foreground }}>
      {theme.label}
    </span>
  )
}

import { themeById, type ThemeId } from "@/content/themes"

export function ThemeTag({ id }: { id: ThemeId }) {
  const theme = themeById(id)
  return (
    <span
      className="inline-flex items-center rounded-full px-4 py-1 text-[13px] font-extrabold tracking-[1.04px]"
      style={{ background: theme.background, color: theme.foreground }}
    >
      {theme.label}
    </span>
  )
}

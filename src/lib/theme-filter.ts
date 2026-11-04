import { themes, type ThemeId } from "@/content/themes"

const themeIdSet = new Set<string>(themes.map((theme) => theme.id))

export function parseThemeFilter(raw: string): ThemeId[] {
  if (!raw.trim()) return []
  return raw
    .split(",")
    .map((part) => part.trim())
    .filter((id): id is ThemeId => themeIdSet.has(id))
}

export function serializeThemeFilter(ids: ThemeId[]): string {
  return ids.join(",")
}

/** Item passes when it includes every selected theme (accumulative narrowing). */
export function matchesThemeFilter(itemThemes: ThemeId[], selected: ThemeId[]): boolean {
  if (selected.length === 0) return true
  return selected.every((id) => itemThemes.includes(id))
}

export function toggleThemeFilter(selected: ThemeId[], id: ThemeId): ThemeId[] {
  return selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]
}

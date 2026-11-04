import { useState } from "react"
import { ThemeTag } from "@/components/content/ThemeTag"
import type { ThemeId } from "@/content/themes"

export function PostShareAside({
  themes,
  layout = "vertical",
}: {
  themes: ThemeId[]
  layout?: "vertical" | "horizontal"
}) {
  const [copied, setCopied] = useState(false)

  async function share() {
    await navigator.clipboard.writeText(window.location.href)
    setCopied(true)
  }

  const shareButton = (
    <button
      type="button"
      onClick={share}
      className="text-left text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase"
    >
      {copied ? "Link copiado" : "Compartilhar"}
    </button>
  )

  const tagsBlock = (
    <div className="flex flex-col gap-2">
      <p className="text-[13px] font-extrabold tracking-[1.04px] uppercase">Tags</p>
      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <ThemeTag key={theme} id={theme} />
        ))}
      </div>
    </div>
  )

  if (layout === "horizontal") {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap gap-2">{themes.map((theme) => <ThemeTag key={theme} id={theme} />)}</div>
        {shareButton}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {shareButton}
      {tagsBlock}
    </div>
  )
}

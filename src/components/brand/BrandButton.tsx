import type { ComponentProps } from "react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { roundControl, type RoundControlSize } from "@/lib/round-control"

/** Shadcn Button uses bg-clip-padding; a transparent border leaves a gap that shows the page background. */
const pillShell = "bg-clip-border shadow-none focus-visible:ring-0"

const pillTones = {
  primary:
    `${pillShell} border-0 bg-lime font-extrabold text-green hover:bg-lime hover:text-green`,
  outline:
    `${pillShell} border-2 border-ink bg-transparent font-extrabold text-ink hover:border-mint hover:bg-mint hover:text-white`,
  "outline-light":
    `${pillShell} border-2 border-white bg-transparent font-extrabold text-white hover:border-lime hover:bg-lime hover:text-green`,
  orange:
    `${pillShell} border-2 border-orange bg-transparent font-extrabold text-orange hover:border-orange hover:bg-orange hover:text-white`,
}

const linkTones = {
  link: "h-auto rounded-sm border-transparent bg-transparent px-2 text-lg font-extrabold text-white underline-offset-4 hover:bg-transparent hover:underline",
  "link-indigo":
    "h-auto rounded-sm border-transparent bg-transparent px-0 text-lg font-extrabold text-ink underline-offset-4 hover:bg-transparent hover:text-mint",
}

type BrandTone = keyof typeof pillTones | keyof typeof linkTones

export function BrandButton({
  tone = "primary",
  pillSize = "lg",
  className,
  ...props
}: ComponentProps<typeof Button> & { tone?: BrandTone; pillSize?: RoundControlSize }) {
  const isLink = tone === "link" || tone === "link-indigo"

  return (
    <Button
      className={cn(
        isLink ? linkTones[tone] : cn(roundControl(pillSize), pillTones[tone as keyof typeof pillTones]),
        className,
      )}
      {...props}
    />
  )
}

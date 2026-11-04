import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { roundControl, type RoundControlSize } from "@/lib/round-control"

/** Shadcn Button uses bg-clip-padding; a transparent border leaves a gap that shows the page background. */
const pillShell =
  "bg-clip-border shadow-none ring-0 outline-none focus-visible:ring-0 active:translate-y-0"

/** Skew overlay sweep — see brand-button-hover.css */
const primaryPill =
  `${pillShell} hover-paint-horizontal border-0 font-extrabold [--paint-overlay:var(--color-lime)]`

const pillTones = {
  outline:
    `${pillShell} border-2 border-ink bg-transparent font-extrabold text-ink hover:border-mint hover:bg-mint hover:text-white`,
  "outline-light":
    `${pillShell} border-2 border-white bg-transparent font-extrabold text-white hover:border-green hover:bg-green hover:text-lime focus-visible:border-green focus-visible:bg-green focus-visible:text-lime`,
  orange:
    `${pillShell} border-2 border-orange bg-transparent font-extrabold text-orange hover:border-orange hover:bg-orange hover:text-white`,
}

const linkTones = {
  link: "h-auto rounded-sm border-transparent bg-transparent px-2 text-lg font-extrabold text-white underline-offset-4 hover:bg-transparent hover:underline",
  "link-indigo":
    "h-auto rounded-sm border-transparent bg-transparent px-0 text-lg font-extrabold text-ink underline-offset-4 hover:bg-transparent hover:text-mint",
}

type BrandTone = "primary" | keyof typeof pillTones | keyof typeof linkTones

function PrimaryPaintLabel({ children }: { children: ReactNode }) {
  return <span className="hover-paint-horizontal__label">{children}</span>
}

function wrapPrimaryPaintContent(content: ReactNode) {
  return <PrimaryPaintLabel>{content}</PrimaryPaintLabel>
}

export function BrandButton({
  tone = "primary",
  pillSize = "lg",
  className,
  asChild,
  children,
  ...props
}: ComponentProps<typeof Button> & { tone?: BrandTone; pillSize?: RoundControlSize }) {
  const isLink = tone === "link" || tone === "link-indigo"
  const isPrimaryPaint = !isLink && tone === "primary"

  const classes = isLink
    ? linkTones[tone]
    : isPrimaryPaint
      ? cn(roundControl(pillSize), primaryPill)
      : cn(roundControl(pillSize), pillTones[tone])

  if (asChild && isPrimaryPaint) {
    const child = Children.only(children)
    if (!isValidElement(child)) {
      throw new Error("BrandButton with asChild expects a single React element child.")
    }
    const element = child as ReactElement<{ children?: ReactNode }>
    return (
      <Button asChild className={cn(classes, className)} {...props}>
        {cloneElement(element, {}, wrapPrimaryPaintContent(element.props.children))}
      </Button>
    )
  }

  return (
    <Button asChild={asChild} className={cn(classes, className)} {...props}>
      {isPrimaryPaint ? wrapPrimaryPaintContent(children) : children}
    </Button>
  )
}

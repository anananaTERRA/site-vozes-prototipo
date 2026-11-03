import type { ComponentProps } from "react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"

const tones = {
  primary:
    "h-14 rounded-3xl border-transparent bg-orange px-6 text-[19px] font-extrabold text-indigo hover:bg-orange/90",
  outline:
    "h-14 rounded-3xl border-2 border-ink bg-transparent px-6 text-[19px] font-extrabold text-ink hover:bg-ink/5",
  "outline-light":
    "h-14 rounded-3xl border-2 border-white bg-transparent px-6 text-[19px] font-extrabold text-white hover:bg-white/10",
  link: "h-14 bg-transparent px-2 text-[19px] font-extrabold text-white hover:bg-transparent",
  "link-indigo": "h-14 bg-transparent px-0 text-[19px] font-extrabold text-ink hover:bg-transparent",
}

export function BrandButton({
  tone = "primary",
  className,
  ...props
}: ComponentProps<typeof Button> & { tone?: keyof typeof tones }) {
  return <Button className={cn(tones[tone], className)} {...props} />
}

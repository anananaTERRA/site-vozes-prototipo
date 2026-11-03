import { cn } from "cn"
import balloon from "@/assets/balloon.svg"

export function WordBalloon({
  children,
  className,
  color = "#ff8327",
}: {
  children: string
  className?: string
  color?: string
}) {
  return (
    <span className={cn("relative inline-flex items-center justify-center px-5 py-1", className)}>
      <img src={balloon} alt="" className="pointer-events-none absolute inset-x-0 -bottom-2 top-0 h-[115%] w-full" />
      <span className="relative font-extrabold italic" style={{ color }}>
        {children}
      </span>
    </span>
  )
}

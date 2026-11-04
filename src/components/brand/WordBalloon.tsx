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
    <span
      className={cn(
        "relative inline-flex items-baseline ps-[0.2em] pe-[0.52em] pb-[0.05em] pt-0",
        className,
      )}
    >
      <img
        src={balloon}
        alt=""
        className="pointer-events-none absolute inset-x-0 -bottom-2 top-0 h-[115%] w-full object-fill"
      />
      <span className="relative font-bold italic" style={{ color }}>
        {children}
      </span>
    </span>
  )
}

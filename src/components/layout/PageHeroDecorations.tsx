import { cn } from "cn"

/**
 * Camadas orgânicas atrás da foto nos heros internos — mesma linguagem visual do HomeHero,
 * sem recortar a imagem (a foto cobre o bloco inteiro por baixo dos vetores).
 */
export function PageHeroDecorations({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      <svg
        className="absolute -right-[12%] top-1/2 h-[120%] w-[98%] max-w-none -translate-y-1/2 text-white/90"
        viewBox="0 0 520 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M420 40c48 38 92 118 88 198-4 96-52 168-130 206-62 31-138 38-212 22-52-11-96-38-120-88-18-38-22-84-8-128 14-48 48-88 92-114 44-28 96-42 150-48 48-6 100 2 140 22v-70zm-88 52c-38-8-78-6-114 8-36 12-68 34-88 64-18 28-24 62-14 92 10 32 38 54 72 64 40 12 86 10 128-6 48-18 84-56 94-108 8-44-8-90-44-118-20-16-46-26-74-28z"
        />
        <ellipse cx="120" cy="380" rx="100" ry="72" fill="currentColor" opacity="0.35" />
      </svg>

      <svg
        className="absolute right-[2%] top-[10%] h-[44%] w-[50%] text-[#9bb7ff]"
        viewBox="0 0 200 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          opacity="0.82"
          d="M160 20c28 18 44 52 38 86-6 34-32 62-66 72-40 12-86 2-118-28-26-24-40-58-34-92 6-36 32-66 68-78 36-12 76-4 112 40z"
        />
      </svg>

      <svg
        className="absolute -right-[4%] bottom-[6%] h-[40%] w-[46%] text-[#d0e770]"
        viewBox="0 0 180 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          opacity="0.88"
          d="M24 124c-18-28-14-64 10-90 26-28 68-38 106-22 34 14 58 46 58 82 0 40-26 74-62 88-40 16-86 8-112-22z"
        />
      </svg>

      <svg
        className="absolute right-[26%] top-[20%] h-[20%] w-[24%] text-[#faa4ff]"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="40" cy="40" r="36" fill="currentColor" opacity="0.72" />
      </svg>

      <svg
        className="absolute right-[10%] bottom-[28%] h-[16%] w-[20%] text-[#ff8327]"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="32" cy="32" r="28" fill="currentColor" opacity="0.5" />
      </svg>

      <svg
        className="absolute right-[36%] bottom-[14%] h-[14%] w-[16%] text-[#01c689]"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="20" fill="currentColor" opacity="0.42" />
      </svg>
    </div>
  )
}

import { BrandButton } from "@/components/brand/BrandButton"
import { Skeleton } from "@/components/ui/skeleton"

export function ListingState({
  kind,
  onRetry,
  onClear,
}: {
  kind: "empty" | "loading" | "error"
  onRetry?: () => void
  onClear?: () => void
}) {
  if (kind === "loading") {
    return (
      <div className="grid gap-8 md:grid-cols-3" aria-busy="true" aria-live="polite">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="aspect-[4/3] w-full rounded-[20px] bg-lavender/50" />
            <Skeleton className="h-4 w-32 bg-lavender/40" />
            <Skeleton className="h-8 w-full bg-lavender/40" />
          </div>
        ))}
      </div>
    )
  }

  if (kind === "error") {
    return (
      <div className="flex min-h-[200px] flex-col items-start justify-center gap-4 rounded-[20px] bg-white px-8 py-10">
        <p className="font-display text-[32px] leading-[38px] text-indigo">Não foi possível carregar a listagem.</p>
        <p className="max-w-xl text-lg leading-[29px]">Tente de novo. Se o filtro estiver estreito demais, limpe e recomece.</p>
        <BrandButton type="button" onClick={onRetry}>
          Tentar de novo
        </BrandButton>
      </div>
    )
  }

  return (
    <div className="flex min-h-[200px] flex-col items-start justify-center gap-4 rounded-[20px] bg-white px-8 py-10">
      <p className="font-display text-[32px] leading-[38px] text-indigo">Nada encontrado com esses filtros.</p>
      <p className="max-w-xl text-lg leading-[29px]">Troque o tema, o tipo ou o texto da busca.</p>
      <BrandButton type="button" tone="outline" onClick={onClear}>
        Limpar filtros
      </BrandButton>
    </div>
  )
}

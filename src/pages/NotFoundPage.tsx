import { Link, useNavigate } from "react-router"
import face from "@/assets/carinha-404.svg"
import { BrandButton } from "@/components/brand/BrandButton"
import { Seo } from "@/components/seo/Seo"

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="mr-[calc(env(safe-area-inset-right)*-1)] ml-[calc(env(safe-area-inset-left)*-1)] flex min-h-dvh flex-col items-center justify-center bg-indigo px-[max(1.5rem,env(safe-area-inset-left))] pt-[max(6rem,env(safe-area-inset-top))] pr-[max(1.5rem,env(safe-area-inset-right))] pb-[max(6rem,env(safe-area-inset-bottom))] text-center text-white">
      <Seo title="Página não encontrada" noindex pathname="/404" />
      <img src={face} alt="" className="h-56 w-72 object-contain" />
      <h1 className="mt-10 font-display text-5xl leading-[56px] font-medium">Página não encontrada.</h1>
      <p className="mt-6 max-w-xl text-lg leading-7 text-white/70">
        O endereço pode ter mudado ou a página não existe mais.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <BrandButton asChild>
          <Link to="/">Voltar para a Home</Link>
        </BrandButton>
        <BrandButton
          tone="outline-light"
          type="button"
          onClick={() => navigate("/", { state: { openSearch: true } })}
        >
          Buscar no site
        </BrandButton>
      </div>
    </div>
  )
}

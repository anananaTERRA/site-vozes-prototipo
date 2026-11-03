import { Link, useNavigate } from "react-router"
import face from "@/assets/carinha-404.svg"
import { BrandButton } from "@/components/brand/BrandButton"

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-indigo px-6 py-24 text-center text-white">
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

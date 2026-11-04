import { Link } from "react-router"
import peca1 from "@/assets/peca-1.svg"
import peca2 from "@/assets/peca-2.svg"
import peca3 from "@/assets/peca-3.svg"
import peca4 from "@/assets/peca-4.svg"
import peca5 from "@/assets/peca-5.svg"
import { MorphPillButton } from "@/components/brand/MorphPillButton"

type HomeFinalCtaProps = {
  className?: string
}

export function HomeFinalCta({ className = "" }: HomeFinalCtaProps) {
  return (
    <section className={`bg-paper px-6 pb-24 md:px-20 ${className}`}>
      <div className="relative mx-auto flex min-h-[320px] w-full max-w-[1280px] items-center overflow-hidden rounded-[40px] bg-indigo px-8 py-12 md:min-h-[360px] md:px-16">
        <div className="relative z-10 max-w-[480px] text-white">
          <p className="text-[13px] font-extrabold tracking-[1.5px] text-lime uppercase">Vamos conversar</p>
          <h2 className="mt-4 font-display text-4xl leading-[48px] font-medium">Pronto para ouvir sua rede?</h2>
          <p className="mt-4 max-w-md text-base leading-6 font-normal text-white/90">
            Conte o desafio que está na mesa — desenhamos juntos uma resposta à altura do contexto.
          </p>
          <MorphPillButton to="/contato#inicio" surface="dark" pill="orange" className="mt-6" />
          <Link to="/o-que-fazemos" className="mt-4 inline-block text-[15px] font-extrabold text-lime hover:underline">
            Ver nossos serviços →
          </Link>
        </div>
        <div className="pointer-events-none absolute top-0 right-0 hidden h-full w-[420px] lg:block">
          <img src={peca1} alt="" className="absolute top-6 left-2 w-40" />
          <img src={peca2} alt="" className="absolute top-0 left-32 w-36" />
          <img src={peca3} alt="" className="absolute top-24 right-6 w-32" />
          <img src={peca4} alt="" className="absolute bottom-8 left-8 w-36" />
          <img src={peca5} alt="" className="absolute right-12 bottom-10 w-24" />
        </div>
      </div>
    </section>
  )
}

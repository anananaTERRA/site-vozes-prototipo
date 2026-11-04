import { useSiteContent } from "@/content/provider"

export function PartnerStrip() {
  const { partners } = useSiteContent()
  return (
    <div>
      <p className="text-[13px] font-extrabold tracking-[1.04px]">CLIENTES E PARCEIROS</p>
      <ul className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-4">
        {partners.map((partner) => (
          <li key={partner.name} className="flex h-[72px] items-center">
            <img
              src={partner.src}
              alt={partner.name}
              className={`h-14 w-auto object-contain ${partner.invertOnDark ? "dark:brightness-0 dark:invert" : ""}`}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

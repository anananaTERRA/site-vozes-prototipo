import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState, type ReactNode } from "react"
import { Controller, useForm } from "react-hook-form"
import { useSearchParams } from "react-router"
import { z } from "zod"
import photo from "@/assets/photo-quem-somos.png"
import peca1 from "@/assets/peca-1.svg"
import peca2 from "@/assets/peca-2.svg"
import peca3 from "@/assets/peca-3.svg"
import { BrandButton } from "@/components/brand/BrandButton"
import { MorphPillButton } from "@/components/brand/MorphPillButton"
import { ContactRouteCards } from "@/components/contato/ContactRouteCards"
import { useSiteContent } from "@/content/provider"
import { subjects } from "@/content/institutional"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const schema = z.object({
  nome: z.string().min(2, "Informe seu nome"),
  email: z.string().email("Informe um e-mail válido"),
  instituicao: z.string().optional(),
  whatsapp: z.string().optional(),
  assunto: z.string().min(1, "Escolha um assunto"),
  mensagem: z.string().min(10, "Conte um pouco mais").max(500, "Máximo de 500 caracteres"),
  lgpd: z.boolean().refine((value) => value, "É preciso aceitar para enviar"),
})

type FormValues = z.infer<typeof schema>

export function ContatoPage() {
  const { faq } = useSiteContent()
  const [params] = useSearchParams()
  const [sent, setSent] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
      instituicao: "",
      whatsapp: "",
      assunto: params.get("assunto") ?? (params.get("servico") ? "parceria" : ""),
      mensagem: params.get("servico") ? `Quero conversar sobre ${params.get("servico")}.` : "",
      lgpd: false,
    },
  })

  useEffect(() => {
    const assunto = params.get("assunto")
    const servico = params.get("servico")
    if (assunto) form.setValue("assunto", assunto)
    else if (servico) form.setValue("assunto", "parceria")
    if (servico) form.setValue("mensagem", `Quero conversar sobre ${servico}.`)
  }, [params, form])

  const mensagem = form.watch("mensagem")

  return (
    <div>
      <section id="inicio" className="scroll-mt-28 bg-indigo text-white">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-10 px-6 py-16 lg:grid-cols-[380px_480px_420px] lg:px-16">
          <div>
            <p className="text-[13px] font-extrabold tracking-[1.5px] text-lime">CONTATO</p>
            <h1 className="mt-6 font-display text-4xl leading-[52px] font-medium md:text-[44px]">
              Tem um desafio educacional em mente?
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-3 font-display text-4xl md:text-[44px]">
              Vamos <span className="rounded-3xl bg-lime px-4 py-1 font-sans text-[30px] font-extrabold text-green">conversar</span>.
            </p>
            <p className="mt-6 text-lg leading-7 text-white/90">
              Conte o que sua Instituição está enfrentando. A partir daí, construímos juntos a melhor resposta.
            </p>
            <p className="mt-6 text-[15px] font-medium text-lime">contato@…</p>
            <p className="text-[15px] font-medium">(11) 94629-2212 · WhatsApp</p>
          </div>
          <div className="relative hidden h-[520px] lg:block">
            <img src={peca1} alt="" className="absolute top-0 right-6 w-36" />
            <img src={peca2} alt="" className="absolute bottom-6 left-0 w-40" />
            <img src={peca3} alt="" className="absolute top-24 right-0 w-24" />
            <img src={photo} alt="" className="absolute top-10 left-10 h-[440px] w-[320px] rounded-[20px] object-cover" />
          </div>
          <div className="rounded-[28px] bg-surface p-6 text-ink">
            {sent ? (
              <div className="flex min-h-[480px] flex-col justify-center">
                <p className="text-[13px] font-extrabold tracking-[1.04px] text-violet uppercase">Mensagem enviada</p>
                <h2 className="mt-4 font-display text-4xl leading-[48px]">Vamos retornar em breve.</h2>
                <p className="mt-4 text-lg leading-[29px]">Este protótipo não envia a mensagem para um servidor. O estado de sucesso mostra o que a pessoa vê depois do envio.</p>
                <BrandButton type="button" className="mt-8" onClick={() => { setSent(false); form.reset() }}>
                  Enviar outra
                </BrandButton>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(() => setSent(true))}
                noValidate
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nome*" error={form.formState.errors.nome?.message}>
                    <Input aria-invalid={Boolean(form.formState.errors.nome)} className="h-14 rounded-2xl border-2" {...form.register("nome")} />
                  </Field>
                  <Field label="E-mail*" error={form.formState.errors.email?.message}>
                    <Input type="email" aria-invalid={Boolean(form.formState.errors.email)} className="h-14 rounded-2xl border-2" {...form.register("email")} />
                  </Field>
                </div>
                <Field label="Instituição" error={form.formState.errors.instituicao?.message}>
                  <Input className="h-14 rounded-2xl border-2" {...form.register("instituicao")} />
                </Field>
                <Field label="WhatsApp (opcional)">
                  <Input className="h-14 rounded-2xl border-2" {...form.register("whatsapp")} />
                </Field>
                <Field label="Assunto*" error={form.formState.errors.assunto?.message}>
                  <Controller
                    control={form.control}
                    name="assunto"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger aria-invalid={Boolean(form.formState.errors.assunto)} className="h-14 w-full rounded-2xl border-2">
                          <SelectValue placeholder="Escolha" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject.value} value={subject.value}>
                              {subject.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
                <Field label="Mensagem*" error={form.formState.errors.mensagem?.message}>
                  <Textarea aria-invalid={Boolean(form.formState.errors.mensagem)} className="min-h-40 rounded-2xl border-2" {...form.register("mensagem")} />
                  <p className="text-right text-[13px] text-violet">{mensagem.length}/500</p>
                </Field>
                <div className="flex items-start gap-3">
                  <Controller
                    control={form.control}
                    name="lgpd"
                    render={({ field }) => (
                      <Checkbox checked={field.value} onCheckedChange={(value) => field.onChange(value === true)} aria-invalid={Boolean(form.formState.errors.lgpd)} />
                    )}
                  />
                  <Label className="text-sm leading-5 font-medium">
                    Aceito o uso desses dados para retorno do contato, conforme a LGPD.
                  </Label>
                </div>
                {form.formState.errors.lgpd ? <p className="text-sm text-destructive">{form.formState.errors.lgpd.message}</p> : null}
                <BrandButton type="submit">Enviar</BrandButton>
              </form>
            )}
          </div>
        </div>
      </section>
      <ContactRouteCards />
      <section id="faq" className="scroll-mt-28 mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-20 md:grid-cols-[400px_1fr] md:px-20">
        <div>
          <h2 className="font-display text-5xl leading-[54px]">Perguntas frequentes</h2>
          <MorphPillButton to="/contato#inicio" className="mt-4" />
        </div>
        <Accordion type="single" collapsible defaultValue="item-0">
          {faq.map((item, index) => (
            <AccordionItem key={item.q} value={`item-${index}`}>
              <AccordionTrigger className="py-5 text-lg font-extrabold hover:no-underline">{item.q}</AccordionTrigger>
              <AccordionContent className="text-lg leading-[29px]">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-extrabold tracking-[0.4px]">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-sm text-destructive">{error}</span> : null}
    </label>
  )
}

import { useState, type SubmitEvent } from 'react'
import { formatPhoneBR, submitLead, validateLead, type Lead } from '../lib/leads'
import { trackLead } from '../lib/metaPixel'
import WhatsAppButton from './WhatsAppButton'

type LeadFormProps = {
  // Economia anual da simulação, enviada junto com o lead (null se ainda não calculou).
  savingsPerYear?: number | null
  ref?: React.Ref<HTMLElement>
}

type TextFieldKey = keyof Lead

const TEXT_FIELDS: { key: TextFieldKey; label: string; placeholder: string; type?: string }[] = [
  { key: 'name', label: 'Nome', placeholder: 'Seu nome completo' },
  { key: 'empresa', label: 'Empresa', placeholder: 'Nome da empresa' },
  { key: 'whatsapp', label: 'WhatsApp', placeholder: '(67) 99999-9999', type: 'tel' },
]

const EMPTY: Lead = {
  name: '',
  empresa: '',
  whatsapp: '',
}

// O que a pessoa recebe ao deixar o contato: concreto, com prazo e sem custo.
const OFFER = [
  'Conversa de 20 minutos com um especialista',
  'Sem custo, olhando os dados da sua operação',
  'Os comportamentos que mais pesam no consumo da sua frota',
]

const inputClass =
  'h-13 w-full rounded-xl border border-field-line bg-field px-4 text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-muted/70 focus:border-brand'

const whatsappClass =
  'h-14 rounded-xl bg-[#1f9d55] px-6 text-[13px] tracking-[0.12em] text-white uppercase transition-shadow duration-200 hover:shadow-[0_12px_24px_-10px_rgba(31,157,85,0.6)]'

function LeadForm({ savingsPerYear = null, ref }: LeadFormProps) {
  const [lead, setLead] = useState<Lead>(EMPTY)
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  function update(key: TextFieldKey, value: string) {
    setLead((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const message = validateLead(lead)
    setError(message)
    if (message) return

    setSending(true)
    try {
      await submitLead({ ...lead, consent: true, savingsPerYear, data: new Date().toISOString() })
      // Só conta como Lead para a Meta depois que a planilha confirmou a gravação.
      trackLead(savingsPerYear)
      setSent(true)
    } catch {
      setError('Não foi possível enviar agora. Tente novamente ou chame no WhatsApp.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <section
        ref={ref}
        id="contato"
        className="w-full scroll-mt-6 bg-surface px-[clamp(16px,5vw,72px)] pb-[clamp(48px,7vw,100px)] font-display"
        aria-live="polite"
      >
        <div className="mx-auto max-w-325 rounded-3xl border border-card-line bg-card px-[clamp(24px,4vw,72px)] py-[clamp(40px,5vw,72px)] text-center">
          <span
            className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-[#dcf3e5] text-2xl text-[#2f7d52]"
            aria-hidden="true"
          >
            ✓
          </span>

          <h2 className="mb-4 text-[clamp(28px,3.6vw,48px)] leading-[1.08] font-extrabold tracking-[-0.04em] text-ink">
            Recebemos.
          </h2>

          <p className="mx-auto mb-8 max-w-[32em] text-[clamp(15px,1.2vw,18px)] leading-[1.55] text-muted">
            Vamos te chamar no WhatsApp em até 1 dia útil para agendar a conversa.
            Se preferir não esperar, chame a gente agora.
          </p>

          <WhatsAppButton origin="sucesso" className={whatsappClass}>
            Chamar no WhatsApp agora
          </WhatsAppButton>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      id="contato"
      className="w-full scroll-mt-6 bg-surface px-[clamp(16px,5vw,72px)] pb-[clamp(48px,7vw,100px)] font-display"
    >
      <div className="mx-auto grid max-w-325 grid-cols-2 items-center gap-[clamp(32px,6vw,100px)] max-[960px]:grid-cols-1">
        <div>
          <span
            className="mb-6 grid size-8.5 place-items-center rounded-full border border-field-line text-[11px] font-bold text-brand"
            aria-hidden="true"
          >
            03
          </span>

          <h2 className="mb-5 text-[clamp(30px,4.2vw,56px)] leading-[1.06] font-extrabold tracking-[-0.04em] text-ink">
            Descubra o que está por trás desse número.
          </h2>

          <ul className="flex flex-col gap-3">
            {OFFER.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[clamp(15px,1.2vw,18px)] leading-[1.45] text-ink"
              >
                <span className="mt-px font-bold text-brand" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <form
            className="rounded-3xl border border-card-line bg-card p-[clamp(24px,3vw,40px)] shadow-[0_30px_60px_-30px_rgba(74,65,144,0.28),0_12px_24px_-12px_rgba(22,19,31,0.08)]"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="mb-6 grid grid-cols-1 gap-y-5">
              {TEXT_FIELDS.map((field) => (
                <label key={field.key} className="flex flex-col gap-2">
                  <span className="text-[13px] font-bold text-ink">{field.label}</span>
                  <input
                    className={inputClass}
                    type={field.type ?? 'text'}
                    inputMode={field.key === 'whatsapp' ? 'tel' : undefined}
                    autoComplete={field.key === 'whatsapp' ? 'tel' : field.key === 'name' ? 'name' : 'organization'}
                    placeholder={field.placeholder}
                    value={lead[field.key]}
                    onChange={(e) =>
                      update(
                        field.key,
                        field.key === 'whatsapp' ? formatPhoneBR(e.target.value) : e.target.value,
                      )
                    }
                  />
                </label>
              ))}
            </div>

            {error && (
              <p className="-mt-2 mb-4 text-sm font-semibold text-[#d64545]" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="group flex h-14 w-full cursor-pointer items-center justify-center gap-4.5 rounded-xl bg-linear-to-r from-brand to-brand-2 text-[13px] font-bold tracking-[0.16em] text-white uppercase transition-shadow duration-200 hover:shadow-[0_12px_24px_-10px_rgba(74,65,144,0.6)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-70 max-[520px]:gap-3 max-[520px]:tracking-[0.08em]"
            >
              {sending ? 'Enviando…' : 'Quero minha análise gratuita'}
              <span
                className="text-lg tracking-normal transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </button>

            <p className="mt-4 text-center text-xs leading-normal text-muted">
              Ao enviar, você concorda em ser contatado pela Game Truck sobre esta simulação.
            </p>
          </form>

          {/* Segundo caminho: muito gestor prefere chamar a preencher formulário */}
          <div className="mt-5 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-muted">Prefere conversar agora?</p>
            <WhatsAppButton origin="formulario" className={`w-full ${whatsappClass}`}>
              Chamar no WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LeadForm

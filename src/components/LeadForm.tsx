import { useState, type SubmitEvent } from 'react'
import { EFFICIENCY_GAIN, formatBRL } from '../lib/calculator'
import {
  formatPhoneBR,
  submitLead,
  UFS,
  validateLead,
  type Lead,
} from '../lib/leads'

type LeadFormProps = {
  // Economia anual da simulação, enviada junto com o lead (null se ainda não calculou).
  savingsPerYear?: number | null
  ref?: React.Ref<HTMLElement>
}

type TextFieldKey = 'name' | 'company' | 'role' | 'whatsapp' | 'email'

const TEXT_FIELDS: { key: TextFieldKey; label: string; placeholder: string; type?: string }[] = [
  { key: 'name', label: 'Nome', placeholder: 'Seu nome completo' },
  { key: 'company', label: 'Empresa', placeholder: 'Nome da empresa' },
  { key: 'role', label: 'Cargo', placeholder: 'Seu cargo' },
  { key: 'whatsapp', label: 'WhatsApp', placeholder: '(67) 99999-9999', type: 'tel' },
  { key: 'email', label: 'E-mail corporativo', placeholder: 'voce@empresa.com.br', type: 'email' },
]

const EMPTY: Lead = {
  name: '',
  company: '',
  role: '',
  whatsapp: '',
  email: '',
  state: '',
  consent: false,
}

const inputClass =
  'h-13 w-full rounded-xl border border-field-line bg-field px-4 text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-muted/70 focus:border-brand'

function LeadForm({ savingsPerYear = null, ref }: LeadFormProps) {
  const [lead, setLead] = useState<Lead>(EMPTY)
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  function update<K extends keyof Lead>(key: K, value: Lead[K]) {
    setLead((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const message = validateLead(lead)
    setError(message)
    if (message) return

    setSending(true)
    try {
      await submitLead({ ...lead, savingsPerYear, submittedAt: new Date().toISOString() })
      setSent(true)
    } catch {
      setError('Não foi possível enviar agora. Tente novamente.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <section
        ref={ref}
        id="contato"
        className="w-full scroll-mt-6 bg-surface px-[clamp(16px,5vw,72px)] py-[clamp(64px,9vw,140px)] font-display"
        aria-live="polite"
      >
        <div className="mx-auto max-w-[46em] text-center">
          <span
            className="mx-auto mb-7 grid size-18 place-items-center rounded-full bg-[#dcf3e5] text-2xl text-[#2f7d52]"
            aria-hidden="true"
          >
            ✓
          </span>

          <p className="mb-6 text-[13px] font-bold tracking-[0.2em] text-brand uppercase">
            Solicitação recebida
          </p>

          <h2 className="mb-7 text-[clamp(32px,4.2vw,62px)] leading-[1.06] font-extrabold tracking-[-0.04em] text-ink">
            Agora, os números ganham contexto.
          </h2>

          <p className="mx-auto mb-9 max-w-[38em] text-[clamp(15px,1.2vw,18px)] leading-[1.55] text-muted">
            Nosso time recebeu as informações da sua operação e poderá mostrar
            como o Game Truck utiliza Inteligência Comportamental Operacional
            para identificar oportunidades de desenvolvimento na condução.
          </p>

          <a
            href="#"
            className="group inline-flex items-center gap-3 border-b-2 border-brand pb-1.5 text-[13px] font-bold tracking-[0.16em] text-brand uppercase no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            Conhecer o Game Truck
            <span
              className="text-lg tracking-normal transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={ref}
      id="contato"
      className="w-full scroll-mt-6 bg-surface px-[clamp(16px,5vw,72px)] py-[clamp(48px,7vw,100px)] font-display"
    >
      <div className="mx-auto grid max-w-325 grid-cols-2 items-center gap-[clamp(40px,6vw,100px)] max-[960px]:grid-cols-1">
        <div>
          <span
            className="mb-8 grid size-8.5 place-items-center rounded-full border border-field-line text-[11px] font-bold text-brand"
            aria-hidden="true"
          >
            04
          </span>

          <h2 className="mb-6 text-[clamp(34px,4.2vw,62px)] leading-[1.04] font-extrabold tracking-[-0.04em] text-ink">
            Vamos entender melhor a sua operação.
          </h2>

          <p className="max-w-[30em] text-[clamp(15px,1.2vw,18px)] leading-[1.55] text-muted">
            Preencha seus dados para que nosso time possa analisar o cenário
            apresentado na simulação.
          </p>

          {savingsPerYear !== null && (
            <div className="mt-10 max-w-142.5 rounded-2xl bg-[#2b2352] p-7 text-white">
              <p className="mb-2 text-sm text-white/70">
                Seu cenário de {Math.round(EFFICIENCY_GAIN * 100)}%
              </p>
              <p className="mb-2 text-[clamp(32px,4vw,44px)] leading-none font-extrabold tracking-[-0.03em] text-[#c98bff]">
                {formatBRL(savingsPerYear)}
              </p>
              <p className="text-sm text-white/70">de impacto anual estimado</p>
            </div>
          )}
        </div>

        <form
          className="rounded-3xl border border-card-line bg-card p-[clamp(24px,3vw,40px)] shadow-[0_30px_60px_-30px_rgba(74,65,144,0.28),0_12px_24px_-12px_rgba(22,19,31,0.08)]"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="mb-6 grid grid-cols-2 gap-x-5 gap-y-5 max-[520px]:grid-cols-1">
            {TEXT_FIELDS.map((field) => (
              <label key={field.key} className="flex flex-col gap-2">
                <span className="text-[13px] font-bold text-ink">{field.label}</span>
                <input
                  className={inputClass}
                  type={field.type ?? 'text'}
                  inputMode={field.key === 'whatsapp' ? 'tel' : undefined}
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

            <label className="flex flex-col gap-2">
              <span className="text-[13px] font-bold text-ink">Estado</span>
              <select
                className={`${inputClass} cursor-pointer`}
                value={lead.state}
                onChange={(e) => update('state', e.target.value)}
              >
                <option value="">Selecione</option>
                {UFS.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="mb-7 flex cursor-pointer items-start gap-3 text-[14px] text-muted">
            <input
              className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand"
              type="checkbox"
              checked={lead.consent}
              onChange={(e) => update('consent', e.target.checked)}
            />
            Concordo em receber contato do time Game Truck sobre esta simulação.
          </label>

          {error && (
            <p className="-mt-4 mb-4 text-sm font-semibold text-[#d64545]" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="group flex h-14 w-full cursor-pointer items-center justify-center gap-4.5 rounded-xl bg-linear-to-r from-brand to-brand-2 text-[13px] font-bold tracking-[0.16em] text-white uppercase transition-shadow duration-200 hover:shadow-[0_12px_24px_-10px_rgba(74,65,144,0.6)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-70"
          >
            {sending ? 'Enviando…' : 'Quero analisar minha operação'}
            <span
              className="text-lg tracking-normal transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </form>
      </div>
    </section>
  )
}

export default LeadForm

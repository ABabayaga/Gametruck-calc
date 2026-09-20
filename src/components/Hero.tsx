import { useState, type SubmitEvent } from 'react'
import { validateFleet } from '../lib/calculator'

export type FleetData = {
  vehicles: number
  kmPerVehicle: number
  consumption: number
  dieselPrice: number
}

type HeroProps = {
  onCalculate?: (data: FleetData) => void
}

type FieldKey = keyof FleetData

type Field = {
  key: FieldKey
  label: string
  suffix: string
  prefix?: string
  hint?: string
}

const FIELDS: Field[] = [
  { key: 'vehicles', label: 'Quantidade de veículos', suffix: 'veículos' },
  { key: 'kmPerVehicle', label: 'KM por veículo / mês', suffix: 'km' },
  { key: 'consumption', label: 'Média de consumo', suffix: 'km/l' },
  {
    key: 'dieselPrice',
    label: 'Preço médio do diesel',
    suffix: '/ litro',
    prefix: 'R$',
    hint: 'Variável de mercado',
  },
]

const DEFAULTS: Record<FieldKey, string> = {
  vehicles: '100',
  kmPerVehicle: '10.000',
  consumption: '2,5',
  dieselPrice: '7,00',
}

// Converte "10.000" / "2,5" (pt-BR) em número.
function parseBR(value: string): number {
  return Number(value.replace(/\./g, '').replace(',', '.')) || 0
}

function Hero({ onCalculate }: HeroProps) {
  const [values, setValues] = useState(DEFAULTS)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const data: FleetData = {
      vehicles: parseBR(values.vehicles),
      kmPerVehicle: parseBR(values.kmPerVehicle),
      consumption: parseBR(values.consumption),
      dieselPrice: parseBR(values.dieselPrice),
    }
    const message = validateFleet(data)
    setError(message)
    if (!message) onCalculate?.(data)
  }

  return (
    <section className="relative w-full overflow-hidden bg-surface text-left font-display">
      <div className="hero-dots pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-325 grid-cols-[minmax(0,1fr)_minmax(0,570px)] items-center gap-[clamp(40px,6vw,100px)] px-[clamp(16px,5vw,72px)] py-[clamp(48px,7vw,100px)] max-[960px]:grid-cols-1">
        <div>
          <p className="mb-7 flex items-center gap-3.5 text-[13px] font-bold tracking-[0.2em] text-brand uppercase before:h-0.5 before:w-7 before:rounded-xs before:bg-[#9b3bf0]">
            Simulação gratuita
          </p>

          <h1 className="mb-10 text-[clamp(44px,5.4vw,78px)] leading-[1.02] font-extrabold tracking-[-0.045em] text-ink max-[520px]:mb-7">
            Quanto{' '}
            <span className="relative inline-block whitespace-nowrap text-brand">
              3%
              {/* Traço manual sob o número */}
              <svg
                className="absolute bottom-[-0.14em] left-[-0.04em] h-[0.2em] w-[108%] text-brand-2"
                viewBox="0 0 120 16"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M3 11c22-6 55-9 80-7 12 1 22 3 34 6M20 13c18-3 42-4 64-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            de eficiência representam na sua frota?
          </h1>

          <p className="mb-10 max-w-[34em] text-[clamp(16px,1.3vw,19px)] leading-[1.55] text-muted">
            O preço do diesel está fora do seu controle. Mas pequenas melhorias
            na eficiência da operação podem representar milhares de reais ao
            longo do ano.
          </p>

          <p className="flex items-end gap-3 text-base font-semibold text-ink">
            Faça uma simulação com os dados da sua frota.
            {/* Seta desenhada à mão apontando para o formulário (para baixo no mobile) */}
            <svg
              className="mb-1 h-7 w-14 shrink-0 text-brand max-[960px]:h-10 max-[960px]:w-7 max-[960px]:rotate-90"
              viewBox="0 0 56 28"
              aria-hidden="true"
            >
              <path
                d="M2 22c10 4 22 2 32-6 5-4 9-8 16-10M42 3l8 3-4 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        </div>

        <form
          className="rounded-3xl border border-card-line bg-card p-[clamp(24px,3vw,40px)] shadow-[0_30px_60px_-30px_rgba(74,65,144,0.28),0_12px_24px_-12px_rgba(22,19,31,0.08)] max-[960px]:max-w-142.5"
          onSubmit={handleSubmit}
        >
          <div className="mb-9 flex items-start gap-4">
            <span
              className="grid size-8.5 shrink-0 place-items-center rounded-full border border-field-line text-[11px] font-bold text-brand"
              aria-hidden="true"
            >
              01
            </span>
            <div>
              <h2 className="mb-1.5 text-[21px] leading-[1.2] font-bold tracking-[-0.01em] text-ink">
                Dados da sua operação
              </h2>
              <p className="text-sm text-muted">Leva menos de um minuto.</p>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-3 gap-x-5 gap-y-7 max-[520px]:grid-cols-1">
            {FIELDS.map((field) =>
              field.prefix ? (
                // Campo com prefixo: box destacado, ocupa a linha inteira
                <label
                  key={field.key}
                  className="col-span-full flex items-center gap-4 rounded-2xl bg-soft p-4 pl-5 transition-shadow duration-200 focus-within:ring-2 focus-within:ring-brand max-[520px]:flex-col max-[520px]:items-stretch max-[520px]:gap-2.5"
                >
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span className="text-[13px] font-bold text-ink">{field.label}</span>
                    {field.hint && <span className="text-xs text-muted">{field.hint}</span>}
                  </span>
                  <span className="flex h-12 w-50 items-center gap-2 rounded-lg border border-field-line bg-card px-3 max-[520px]:w-full">
                    <span className="text-sm font-extrabold text-brand">{field.prefix}</span>
                    <input
                      className="min-w-0 flex-1 bg-transparent p-0 text-lg font-bold text-ink tabular-nums outline-none"
                      type="text"
                      inputMode="decimal"
                      value={values[field.key]}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                    />
                    <span className="shrink-0 text-xs text-muted">{field.suffix}</span>
                  </span>
                </label>
              ) : (
                // Campos numéricos: estilo sublinhado, número em evidência
                <label key={field.key} className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-muted">{field.label}</span>
                  <span className="flex items-baseline gap-1.5 border-b-2 border-field-line pb-1.5 transition-colors duration-200 focus-within:border-brand">
                    <input
                      className="min-w-0 flex-1 bg-transparent p-0 text-2xl font-bold tracking-[-0.02em] text-ink tabular-nums outline-none"
                      type="text"
                      inputMode="decimal"
                      value={values[field.key]}
                      onChange={(e) =>
                        setValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                    />
                    <span className="shrink-0 text-xs font-medium text-muted">{field.suffix}</span>
                  </span>
                </label>
              ),
            )}
          </div>

          {error && (
            <p className="-mt-3 mb-4 text-sm font-semibold text-[#d64545]" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="group flex h-14 w-full cursor-pointer items-center justify-center gap-4.5 rounded-xl bg-linear-to-r from-brand to-brand-2 text-[13px] font-bold tracking-[0.16em] text-white uppercase transition-shadow duration-200 hover:shadow-[0_12px_24px_-10px_rgba(74,65,144,0.6)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
          >
            Calcular impacto
            <span
              className="text-lg tracking-normal transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>

          <p className="mt-4.5 flex justify-center gap-1.5 text-xs text-muted">
            <span className="font-bold text-[#2f9e6b]" aria-hidden="true">
              ✓
            </span>
            Nenhum dado pessoal é solicitado nesta etapa.
          </p>
        </form>
      </div>
    </section>
  )
}

export default Hero

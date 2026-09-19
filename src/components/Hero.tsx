import { useState, type SubmitEvent } from 'react'

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
}

const FIELDS: Field[] = [
  { key: 'vehicles', label: 'Quantidade de veículos', suffix: 'veículos' },
  { key: 'kmPerVehicle', label: 'KM por veículo / mês', suffix: 'km' },
  { key: 'consumption', label: 'Média de consumo', suffix: 'km/l' },
  { key: 'dieselPrice', label: 'Preço médio do diesel', suffix: '/ litro', prefix: 'R$' },
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

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    onCalculate?.({
      vehicles: parseBR(values.vehicles),
      kmPerVehicle: parseBR(values.kmPerVehicle),
      consumption: parseBR(values.consumption),
      dieselPrice: parseBR(values.dieselPrice),
    })
  }

  return (
    <section className="relative w-full overflow-hidden bg-surface text-left font-display">
      <span
        className="pointer-events-none absolute bottom-[-0.32em] left-[clamp(-20px,6vw,110px)] text-[clamp(200px,26vw,400px)] leading-none font-extrabold tracking-[-0.04em] text-watermark select-none"
        aria-hidden="true"
      >
        03%
      </span>

      <div className="relative mx-auto grid max-w-325 grid-cols-[minmax(0,1fr)_minmax(0,570px)] items-center gap-[clamp(40px,6vw,100px)] px-[clamp(16px,5vw,72px)] py-[clamp(48px,7vw,100px)] max-[960px]:grid-cols-1">
        <div>
          <p className="mb-7 flex items-center gap-3.5 text-[13px] font-bold tracking-[0.2em] text-brand uppercase before:h-0.5 before:w-7 before:rounded-xs before:bg-[#9b3bf0]">
            Simulação gratuita
          </p>

          <h1 className="mb-10 text-[clamp(44px,5.4vw,78px)] leading-[1.02] font-extrabold tracking-[-0.045em] text-ink max-[520px]:mb-7">
            Quanto <span className="text-brand">3% de eficiência</span>{' '}
            representam na sua frota?
          </h1>

          <p className="mb-10 max-w-[34em] text-[clamp(16px,1.3vw,19px)] leading-[1.55] text-muted">
            O preço do diesel está fora do seu controle. Mas pequenas melhorias
            na eficiência da operação podem representar milhares de reais ao
            longo do ano.
          </p>

          <p className="flex items-center gap-4 text-base font-semibold text-ink">
            <span
              className="grid size-8.5 shrink-0 place-items-center rounded-full bg-soft text-brand"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M6 18 18 6M9 6h9v9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Faça uma simulação com os dados da sua frota.
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

          <div className="mb-7 grid grid-cols-2 gap-x-4 gap-y-6.5 max-[520px]:grid-cols-1">
            {FIELDS.map((field) => (
              <label key={field.key} className="flex flex-col gap-2.5">
                <span className="text-[13px] font-bold text-ink">{field.label}</span>
                <span className="flex h-13.5 items-center gap-2 rounded-xl border border-field-line bg-field px-3.5 transition-[border-color,box-shadow] duration-200 focus-within:border-brand focus-within:ring-3 focus-within:ring-soft">
                  {field.prefix && (
                    <span className="text-xs font-bold text-brand">{field.prefix}</span>
                  )}
                  <input
                    className="min-w-0 flex-1 bg-transparent p-0 text-[17px] font-medium text-ink outline-none"
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
            ))}
          </div>

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

import type { Ref } from 'react'
import {
  EFFICIENCY_GAIN,
  formatBRL,
  formatNumber,
  type ImpactResult,
} from '../lib/calculator'

type ResultsProps = {
  result: ImpactResult
  ref?: Ref<HTMLElement>
}

function Results({ result, ref }: ResultsProps) {
  const gainPct = `${Math.round(EFFICIENCY_GAIN * 100)}%`

  const details = [
    { label: 'Consumo mensal da frota', value: `${formatNumber(result.litersPerMonth)} L` },
    { label: 'Gasto mensal com diesel', value: formatBRL(result.costPerMonth) },
    { label: 'Gasto anual com diesel', value: formatBRL(result.costPerYear) },
    {
      label: `Litros economizados / mês (${gainPct})`,
      value: `${formatNumber(result.litersSavedPerMonth)} L`,
    },
  ]

  return (
    <section
      ref={ref}
      className="w-full scroll-mt-6 bg-surface px-[clamp(16px,5vw,72px)] pb-[clamp(48px,7vw,100px)] font-display"
      aria-live="polite"
    >
      <div className="mx-auto max-w-325 rounded-3xl border border-card-line bg-card p-[clamp(24px,3vw,40px)] shadow-[0_30px_60px_-30px_rgba(74,65,144,0.28),0_12px_24px_-12px_rgba(22,19,31,0.08)]">
        <div className="mb-9 flex items-start gap-4">
          <span
            className="grid size-8.5 shrink-0 place-items-center rounded-full border border-field-line text-[11px] font-bold text-brand"
            aria-hidden="true"
          >
            02
          </span>
          <div>
            <h2 className="mb-1.5 text-[21px] leading-[1.2] font-bold tracking-[-0.01em] text-ink">
              O impacto de {gainPct} de eficiência
            </h2>
            <p className="text-sm text-muted">Estimativa com base nos dados informados.</p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-4 max-[640px]:grid-cols-1">
          <div className="rounded-2xl bg-linear-to-r from-brand to-brand-2 p-6 text-white">
            <p className="mb-2 text-xs font-bold tracking-[0.16em] uppercase opacity-80">
              Economia por ano
            </p>
            <p className="text-[clamp(32px,4vw,48px)] leading-none font-extrabold tracking-[-0.03em]">
              {formatBRL(result.savingsPerYear)}
            </p>
          </div>
          <div className="rounded-2xl border border-field-line bg-field p-6">
            <p className="mb-2 text-xs font-bold tracking-[0.16em] text-brand uppercase">
              Economia por mês
            </p>
            <p className="text-[clamp(32px,4vw,48px)] leading-none font-extrabold tracking-[-0.03em] text-ink">
              {formatBRL(result.savingsPerMonth)}
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-4 gap-x-4 gap-y-6 max-[960px]:grid-cols-2 max-[520px]:grid-cols-1">
          {details.map((item) => (
            <div key={item.label} className="flex flex-col gap-1.5">
              <dt className="text-[13px] text-muted">{item.label}</dt>
              <dd className="text-lg font-bold text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Results

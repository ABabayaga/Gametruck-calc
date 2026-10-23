import WhatsAppButton from './WhatsAppButton'

type HeaderProps = {
  step?: 1 | 2
}

const STEPS = ['Dados da frota', 'Impacto'] as const

function Header({ step = 1 }: HeaderProps) {
  return (
    <header className="w-full border-b border-brand/20 bg-surface">
      <div className="mx-auto flex min-h-19 max-w-325 items-center gap-6 px-[clamp(16px,5vw,72px)] max-[600px]:min-h-15 max-[600px]:gap-3">
        {/* Sem link: no celular o toque no logo recarregava a página e perdia a simulação */}
        <img src="/LogoGameTruck.png" alt="Game Truck" className="h-11 w-auto shrink-0 max-[600px]:h-9" />

        <span className="h-7 w-px shrink-0 bg-line max-[720px]:hidden" aria-hidden="true" />

        {/* Breadcrumb de etapas: acompanha o progresso da simulação */}
        <nav aria-label="Etapas da simulação" className="max-[720px]:hidden">
          <ol className="flex items-center gap-2.5 text-[13px] font-semibold">
            <li className="text-ink">Calculadora de eficiência</li>
            {STEPS.map((label, index) => {
              const current = step === index + 1
              const done = step > index + 1
              return (
                <li key={label} className="flex items-center gap-2.5">
                  <span className="text-field-line" aria-hidden="true">
                    /
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 ${
                      current ? 'text-brand' : done ? 'text-ink' : 'text-muted'
                    }`}
                    aria-current={current ? 'step' : undefined}
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        current ? 'bg-brand' : done ? 'bg-ink' : 'bg-field-line'
                      }`}
                      aria-hidden="true"
                    />
                    {label}
                  </span>
                </li>
              )
            })}
          </ol>
        </nav>

        {/* Página de campanha: o único caminho para fora é a conversa no WhatsApp */}
        <WhatsAppButton
          origin="header"
          className="ml-auto h-10 shrink-0 rounded-lg border border-brand px-4 text-[13px] text-brand transition-colors duration-200 hover:bg-brand hover:text-white max-[600px]:h-9 max-[600px]:px-3 max-[600px]:text-xs"
        >
          Falar com especialista
        </WhatsAppButton>
      </div>
    </header>
  )
}

export default Header

type HeaderProps = {
  step?: 1 | 2
}

const STEPS = ['Dados da frota', 'Impacto'] as const

function Header({ step = 1 }: HeaderProps) {
  return (
    <header className="w-full border-b border-brand/20 bg-surface dark:bg-[#1a1a22]">
      <div className="mx-auto flex min-h-19 max-w-325 items-center gap-6 px-[clamp(16px,5vw,72px)] max-[600px]:min-h-16 max-[600px]:gap-4">
        <a
          href="/"
          className="inline-flex shrink-0 items-center no-underline focus-visible:rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          aria-label="Game Truck — início"
        >
          <img src="/LogoGameTruck.png" alt="" className="h-11 w-auto max-[600px]:h-9" />
        </a>

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

        <a
          href="#contato"
          className="ml-auto inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-brand px-4 text-[13px] font-bold text-brand no-underline transition-colors duration-200 hover:bg-brand hover:text-white focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand max-[600px]:h-9 max-[600px]:px-3 max-[600px]:text-xs"
        >
          Falar com especialista
        </a>
      </div>
    </header>
  )
}

export default Header

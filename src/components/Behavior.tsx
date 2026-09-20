// Comportamentos que pressionam a eficiência: posicionados em volta do núcleo.
const BEHAVIORS = [
  { label: 'Aceleração brusca', position: 'top-[22%] left-[4%]' },
  { label: 'Excesso de velocidade', position: 'top-[16%] right-[2%]' },
  { label: 'Frenagem', position: 'bottom-[22%] left-[8%]' },
  { label: 'Rotação elevada', position: 'bottom-[16%] right-[4%]' },
]

function Behavior() {
  return (
    <section className="w-full bg-surface px-[clamp(16px,5vw,72px)] pb-[clamp(48px,7vw,100px)] font-display">
      <div className="mx-auto grid max-w-325 grid-cols-2 items-center gap-[clamp(40px,6vw,100px)] max-[960px]:grid-cols-1">
        {/* Diagrama: comportamento no centro, pressionando a eficiência */}
        <div className="relative aspect-square w-full rounded-3xl bg-soft/60 max-[520px]:aspect-4/5">
          <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
            <span className="absolute size-[86%] rounded-full border border-brand/10" />
            <span className="absolute size-[66%] rounded-full border border-brand/10" />
            <span className="absolute size-[46%] rounded-full border border-brand/10" />

            <div className="grid size-[38%] place-items-center rounded-full bg-[#2b2352] text-center text-white">
              <div>
                <p className="text-[clamp(9px,1vw,11px)] font-semibold tracking-[0.16em] uppercase opacity-80">
                  Comportamento
                </p>
                <p className="my-1 text-xl leading-none text-brand-2">↓</p>
                <p className="text-[clamp(13px,1.6vw,20px)] font-bold tracking-[0.02em] uppercase">
                  Eficiência
                </p>
              </div>
            </div>
          </div>

          {BEHAVIORS.map((item) => (
            <span
              key={item.label}
              className={`absolute ${item.position} rounded-lg bg-card px-4 py-2.5 text-[clamp(11px,1.1vw,14px)] font-bold whitespace-nowrap text-ink shadow-[0_12px_24px_-12px_rgba(22,19,31,0.25)]`}
            >
              {item.label}
            </span>
          ))}
        </div>

        <div>
          <p className="mb-7 flex items-center gap-3.5 text-[13px] font-bold tracking-[0.2em] text-brand uppercase before:h-0.5 before:w-7 before:rounded-xs before:bg-[#9b3bf0]">
            Agora vem a pergunta mais importante
          </p>

          <h2 className="mb-9 text-[clamp(34px,4.2vw,62px)] leading-[1.04] font-extrabold tracking-[-0.04em] text-ink">
            Existem comportamentos na sua operação pressionando essa eficiência?
          </h2>

          <p className="mb-5 max-w-[34em] text-[clamp(15px,1.2vw,18px)] leading-[1.55] text-muted">
            Excesso de velocidade, acelerações bruscas, frenagens e outros
            comportamentos operacionais podem influenciar a eficiência da
            condução.
          </p>

          <p className="mb-9 max-w-[34em] text-[clamp(15px,1.2vw,18px)] leading-[1.55] text-muted">
            O Game Truck transforma dados da operação em{' '}
            <strong className="font-bold text-ink">
              Inteligência Comportamental Operacional
            </strong>
            , ajudando a identificar prioridades e desenvolver melhores
            comportamentos ao longo do tempo.
          </p>

          <div className="border-l-[3px] border-[#9b3bf0] bg-soft/70 px-6 py-5">
            <p className="mb-2 text-[15px] text-muted">
              O Game Truck não controla o preço do diesel.
            </p>
            <p className="text-[15px] leading-[1.5] font-bold text-ink">
              Ele atua sobre uma variável que sua operação pode controlar: o
              comportamento.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Behavior

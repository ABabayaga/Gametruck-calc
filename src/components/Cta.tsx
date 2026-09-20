type CtaProps = {
  // Abre o formulário de contato (que fica oculto até o visitante pedir).
  onRequest: () => void
}

function Cta({ onRequest }: CtaProps) {
  return (
    <section className="w-full bg-surface px-[clamp(16px,5vw,72px)] pb-[clamp(48px,7vw,100px)] font-display">
      <div className="mx-auto grid max-w-325 grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] items-center gap-[clamp(32px,5vw,80px)] rounded-3xl bg-brand p-[clamp(28px,4vw,72px)] text-white max-[860px]:grid-cols-1">
        <div>
          <span
            className="mb-8 grid size-8.5 place-items-center rounded-full border border-white/40 text-[11px] font-bold"
            aria-hidden="true"
          >
            03
          </span>

          <h2 className="mb-6 text-[clamp(30px,3.8vw,56px)] leading-[1.05] font-extrabold tracking-[-0.04em]">
            Descubra o que está acontecendo por trás desses números.
          </h2>

          <p className="max-w-[34em] text-[clamp(14px,1.1vw,17px)] leading-[1.55] text-white/80">
            Converse com nosso time sobre os comportamentos que podem estar
            influenciando a eficiência da sua operação.
          </p>
        </div>

        <div className="justify-self-end max-[860px]:justify-self-start">
          <button
            type="button"
            onClick={onRequest}
            className="group inline-flex h-16 cursor-pointer items-center gap-4.5 rounded-xl bg-card px-8 text-[13px] font-bold tracking-[0.16em] text-brand uppercase transition-shadow duration-200 hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.45)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white max-[520px]:h-14 max-[520px]:px-5 max-[520px]:text-[11px]"
          >
            Solicitar diagnóstico comportamental
            <span
              className="text-lg tracking-normal transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Cta

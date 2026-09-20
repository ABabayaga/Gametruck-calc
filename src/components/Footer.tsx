function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-glow w-full font-display text-[#c9c6d6]">
      <div className="h-px w-full bg-linear-to-r from-transparent via-brand-2/60 to-transparent" aria-hidden="true" />

      <div className="mx-auto flex max-w-325 flex-wrap items-center justify-between gap-6 px-[clamp(16px,5vw,72px)] pt-8 pb-6">
        <a
          href="/"
          className="inline-flex no-underline focus-visible:rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5b50b0]"
          aria-label="Game Truck — início"
        >
          {/* margem negativa: o logo cresce sem empurrar a altura do rodapé */}
          <img src="/Logo-Game-Truck-Branca.png" alt="" className="-my-6 h-30 w-auto" />
        </a>

        <p className="max-w-[34em] text-sm leading-relaxed max-[640px]:max-w-none">
          Engajamos motoristas com metas e reconhecimento para reduzir o consumo de
          diesel da frota.
        </p>
      </div>

      <div className="mx-auto flex max-w-325 flex-wrap items-center justify-between gap-3 border-t border-white/10 px-[clamp(16px,5vw,72px)] py-6 text-[13px] text-[#7c7891]">
        <p>© {year} Game Truck. Todos os direitos reservados.</p>
        <p>Valores da simulação são estimativas.</p>
      </div>
    </footer>
  )
}

export default Footer

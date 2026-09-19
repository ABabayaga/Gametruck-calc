function Header() {
  return (
    <header className="w-full border-b border-line bg-surface dark:bg-[#1a1a22]">
      <div className="flex min-h-21 items-center justify-between gap-4 px-[clamp(16px,5vw,72px)] max-[600px]:min-h-16">
        <a
          href="/"
          className="inline-flex items-center gap-3 no-underline focus-visible:rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          aria-label="Game Truck — início"
        >
          <img src="/LogoGameTruck.png" alt="" className="h-12 w-auto max-[600px]:h-9" />
        </a>

        <p className="text-[13px] font-medium tracking-[0.2em] text-muted uppercase max-[600px]:text-right max-[600px]:text-[11px] max-[600px]:tracking-[0.14em]">
          Calculadora de eficiência
        </p>
      </div>
    </header>
  )
}

export default Header

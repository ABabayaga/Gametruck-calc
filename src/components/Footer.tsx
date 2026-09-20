// TODO: substituir os "#" pelos endereços reais.
const COLUMNS = [
  {
    title: 'Game Truck',
    links: [
      { label: 'Sobre', href: '#' },
      { label: 'Como funciona', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Termos de uso', href: '#' },
      { label: 'Política de privacidade', href: '#' },
    ],
  },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-glow w-full font-display text-[#c9c6d6]">
      <div className="h-px w-full bg-linear-to-r from-transparent via-brand-2/60 to-transparent" aria-hidden="true" />

      <div className="mx-auto grid max-w-325 grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] gap-10 px-[clamp(16px,5vw,72px)] pt-14 pb-10 max-[860px]:grid-cols-2 max-[520px]:grid-cols-1">
        <div className="max-[860px]:col-span-full">
          <a
            href="/"
            className="mb-5 inline-flex no-underline focus-visible:rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5b50b0]"
            aria-label="Game Truck — início"
          >
            <img src="/Logo-Game-Truck-Branca.png" alt="" className="h-14 w-auto" />
          </a>
          <p className="max-w-[26em] text-sm leading-relaxed">
            Engajamos motoristas com metas e reconhecimento para reduzir o consumo de
            diesel da frota.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="mb-4 text-xs font-bold tracking-[0.16em] text-white uppercase">
              {column.title}
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="no-underline transition-colors duration-200 hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5b50b0]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div id="contato" className="scroll-mt-6">
          <h2 className="mb-4 text-xs font-bold tracking-[0.16em] text-white uppercase">
            Contato
          </h2>
          <p className="mb-4 text-sm leading-relaxed">
            Quer entender o impacto na sua operação? Fale com um especialista.
          </p>
          <a
            href="#"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-white/10 px-4 text-[13px] font-bold text-white no-underline ring-1 ring-white/15 transition-colors duration-200 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#5b50b0]"
          >
            Falar com especialista
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-325 flex-wrap items-center justify-between gap-3 border-t border-white/10 px-[clamp(16px,5vw,72px)] py-6 text-[13px] text-[#7c7891]">
        <p>© {year} Game Truck. Todos os direitos reservados.</p>
        <p>Valores da simulação são estimativas.</p>
      </div>
    </footer>
  )
}

export default Footer

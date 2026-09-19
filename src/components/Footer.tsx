function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#16132a]">
      <div className="grid min-h-27 grid-cols-[1fr_auto_1fr] items-center gap-4 px-[clamp(16px,5vw,72px)] max-[720px]:grid-cols-1 max-[720px]:justify-items-center max-[720px]:gap-3 max-[720px]:py-7">
        <a
          href="/"
          className="inline-flex items-center gap-3 justify-self-start no-underline focus-visible:rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5b50b0] max-[720px]:justify-self-center"
          aria-label="Game Truck — início"
        >
          <img src="Logo-Game-Truck-Branca.png" alt="" className="h-30 w-auto max-[600px]:h-9"/> 
          
        </a>

        <p className="m-0 text-center text-[13px] font-normal text-[#c9c6d6]">
          Inteligência Comportamental Operacional
        </p>

        <p className="m-0 justify-self-end text-[13px] text-[#7c7891] max-[720px]:justify-self-center">
          © {year} Game Truck
        </p>
      </div>
    </footer>
  )
}

export default Footer

import { useEffect, useRef, useState } from 'react'
import Behavior from './components/Behavior'
import Cta from './components/Cta'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero, { type FleetData } from './components/Hero'
import LeadForm from './components/LeadForm'
import Results from './components/Results'
import { calculateImpact, type ImpactResult } from './lib/calculator'

function App() {
  const [result, setResult] = useState<ImpactResult | null>(null)
  // O formulário só aparece quando o visitante pede contato.
  const [showLeadForm, setShowLeadForm] = useState(false)
  const resultsRef = useRef<HTMLElement>(null)
  const leadFormRef = useRef<HTMLElement>(null)

  function handleCalculate(data: FleetData) {
    setResult(calculateImpact(data))
  }

  function handleRequestContact() {
    setShowLeadForm(true)
    // Se já estava aberto, o efeito abaixo não dispara: rola aqui mesmo.
    leadFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    if (result) resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [result])

  useEffect(() => {
    if (showLeadForm) leadFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [showLeadForm])

  return (
    <div className="flex min-h-svh flex-col">
      <Header step={result ? 2 : 1} onContact={handleRequestContact} />
      <main className="flex-1">
        <Hero onCalculate={handleCalculate} />
        {result && (
          <>
            <Results ref={resultsRef} result={result} />
            <Behavior />
            <Cta onRequest={handleRequestContact} />
          </>
        )}
        {showLeadForm && (
          <LeadForm ref={leadFormRef} savingsPerYear={result?.savingsPerYear ?? null} />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App

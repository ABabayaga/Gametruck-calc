import { useEffect, useRef, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero, { type FleetData } from './components/Hero'
import Results from './components/Results'
import { calculateImpact, type ImpactResult } from './lib/calculator'

function App() {
  const [result, setResult] = useState<ImpactResult | null>(null)
  const resultsRef = useRef<HTMLElement>(null)

  function handleCalculate(data: FleetData) {
    setResult(calculateImpact(data))
  }

  useEffect(() => {
    if (result) resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [result])

  return (
    <div className="flex min-h-svh flex-col">
      <Header step={result ? 2 : 1} />
      <main className="flex-1">
        <Hero onCalculate={handleCalculate} />
        {result && <Results ref={resultsRef} result={result} />}
      </main>
      <Footer />
    </div>
  )
}

export default App

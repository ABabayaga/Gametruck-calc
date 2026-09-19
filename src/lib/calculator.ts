import type { FleetData } from '../components/Hero'

export const EFFICIENCY_GAIN = 0.03

export type ImpactResult = {
  litersPerMonth: number
  costPerMonth: number
  costPerYear: number
  litersSavedPerMonth: number
  savingsPerMonth: number
  savingsPerYear: number
}

// Custo = (veículos × km ÷ km/l) × preço; economia = custo × ganho de eficiência.
export function calculateImpact(
  { vehicles, kmPerVehicle, consumption, dieselPrice }: FleetData,
  gain = EFFICIENCY_GAIN,
): ImpactResult {
  const litersPerMonth = consumption > 0 ? (vehicles * kmPerVehicle) / consumption : 0
  const costPerMonth = litersPerMonth * dieselPrice
  const savingsPerMonth = costPerMonth * gain

  return {
    litersPerMonth,
    costPerMonth,
    costPerYear: costPerMonth * 12,
    litersSavedPerMonth: litersPerMonth * gain,
    savingsPerMonth,
    savingsPerYear: savingsPerMonth * 12,
  }
}

// Retorna a mensagem de erro do primeiro campo inválido, ou null.
export function validateFleet(data: FleetData): string | null {
  if (data.vehicles <= 0) return 'Informe a quantidade de veículos.'
  if (data.kmPerVehicle <= 0) return 'Informe os KM por veículo.'
  if (data.consumption <= 0) return 'Informe a média de consumo.'
  if (data.dieselPrice <= 0) return 'Informe o preço do diesel.'
  return null
}

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})
const num = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 })

export const formatBRL = (value: number) => brl.format(value)
export const formatNumber = (value: number) => num.format(value)

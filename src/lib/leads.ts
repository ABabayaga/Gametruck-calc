export type Lead = {
  name: string
  company: string
  role: string
  whatsapp: string
  email: string
  state: string
  consent: boolean
}

export const UFS = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const

// Aplica a máscara (67) 99999-9999 conforme o usuário digita.
export function formatPhoneBR(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

// Retorna a mensagem de erro do primeiro campo inválido, ou null.
export function validateLead(lead: Lead): string | null {
  if (!lead.name.trim()) return 'Informe seu nome completo.'
  if (!lead.company.trim()) return 'Informe o nome da empresa.'
  if (!lead.role.trim()) return 'Informe seu cargo.'
  if (lead.whatsapp.replace(/\D/g, '').length < 10) return 'Informe um WhatsApp válido.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return 'Informe um e-mail válido.'
  if (!lead.state) return 'Selecione o estado.'
  if (!lead.consent) return 'É preciso concordar em receber o contato.'
  return null
}

export type LeadPayload = Lead & {
  // Cenário simulado, enviado junto para dar contexto ao time comercial.
  savingsPerYear: number | null
  submittedAt: string
}

// TODO: integrar com o Google Sheets (Apps Script / API) — por ora só registra o envio.
export async function submitLead(payload: LeadPayload): Promise<void> {
  console.info('lead', payload)
}

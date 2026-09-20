export type Lead = {
  name: string
  empresa: string
  cargo: string
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
  if (!lead.empresa.trim()) return 'Informe o nome da empresa.'
  if (!lead.cargo.trim()) return 'Informe seu cargo.'
  if (lead.whatsapp.replace(/\D/g, '').length < 10) return 'Informe um WhatsApp válido.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return 'Informe um e-mail válido.'
  if (!lead.state) return 'Selecione o estado.'
  if (!lead.consent) return 'É preciso concordar em receber o contato.'
  return null
}

export type LeadPayload = Lead & {
  // Cenário simulado, enviado junto para dar contexto ao time comercial.
  savingsPerYear: number | null
  data: string
}

const LEADS_ENDPOINT = import.meta.env.VITE_LEADS_ENDPOINT
const LEADS_TOKEN = import.meta.env.VITE_LEADS_TOKEN

// Envia o lead para a planilha através do App da Web do Apps Script.
// O corpo vai como text/plain de propósito: o Apps Script não responde ao
// preflight OPTIONS, e text/plain evita que o navegador dispare o preflight.
// O conteúdo continua sendo JSON e é lido em e.postData.contents.
export async function submitLead(payload: LeadPayload): Promise<void> {
  if (!LEADS_ENDPOINT) {
    // Sem endpoint configurado (dev sem .env.local) o envio não pode ser silencioso.
    throw new Error('VITE_LEADS_ENDPOINT não configurado.')
  }

  const response = await fetch(LEADS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ ...payload, token: LEADS_TOKEN }),
    redirect: 'follow',
  })

  if (!response.ok) throw new Error(`Falha ao enviar o lead (HTTP ${response.status}).`)

  const result = (await response.json()) as { ok?: boolean; error?: string }
  if (!result.ok) throw new Error(result.error ?? 'Falha ao gravar o lead.')
}

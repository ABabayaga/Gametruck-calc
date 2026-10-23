import { track } from '@vercel/analytics'
import { trackContact } from './metaPixel'

// WhatsApp do comercial (só dígitos, com DDI e DDD, ex.: 5511999999999).
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')

// Sem número configurado os botões de WhatsApp não aparecem.
export const HAS_WHATSAPP = WHATSAPP_NUMBER.length > 0

export const WHATSAPP_MESSAGE = 'Fiz a simulação e quero entender o resultado'

export function whatsappUrl(message = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// Conta o clique como conversão na Meta e na Vercel, informando de onde veio.
export function trackWhatsappClick(origin: string) {
  trackContact()
  track('whatsapp_click', { origin })
}

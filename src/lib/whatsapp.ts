import { track } from '@vercel/analytics'
import { trackContact } from './metaPixel'

// WhatsApp do comercial que recebe as conversas vindas da calculadora.
const WHATSAPP_NUMBER = '5511945330585'

export const WHATSAPP_MESSAGE = 'Fiz a simulação e quero entender o resultado'

export function whatsappUrl(message = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

// Conta o clique como conversão na Meta e na Vercel, informando de onde veio.
export function trackWhatsappClick(origin: string) {
  trackContact()
  track('whatsapp_click', { origin })
}

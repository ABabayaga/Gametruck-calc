import { track } from '@vercel/analytics'
import { trackContact } from './metaPixel'

// WhatsApp do comercial (só dígitos, com DDI e DDD, ex.: 5511999999999).
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D/g, '')

// Sem número configurado os botões de WhatsApp não aparecem.
export const HAS_WHATSAPP = WHATSAPP_NUMBER.length > 0

// Botão de onde partiu a conversa.
export type WhatsappOrigin = 'header' | 'formulario' | 'sucesso'

// Mensagem pré-preenchida por botão: sempre cita a calculadora para o
// comercial reconhecer que o contato veio do site.
const WHATSAPP_MESSAGES: Record<WhatsappOrigin, string> = {
  header: 'Olá! Vim pela calculadora de economia da Game Truck e quero falar com um especialista.',
  formulario: 'Olá! Fiz a simulação na calculadora de economia da Game Truck e quero entender o resultado.',
  sucesso: 'Olá! Acabei de enviar meus dados na calculadora de economia da Game Truck e quero adiantar a conversa.',
}

export function whatsappUrl(origin: WhatsappOrigin): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGES[origin])}`
}

// Conta o clique como conversão na Meta e na Vercel, informando de onde veio.
export function trackWhatsappClick(origin: WhatsappOrigin) {
  trackContact()
  track('whatsapp_click', { origin })
}

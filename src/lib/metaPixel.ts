// O snippet base do Pixel (init + PageView) fica no index.html.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

// Dispara o evento Lead. Chamar só depois que o lead foi gravado com sucesso.
export function trackLead(savingsPerYear: number | null) {
  window.fbq?.(
    'track',
    'Lead',
    savingsPerYear !== null ? { value: Math.round(savingsPerYear), currency: 'BRL' } : {},
  )
}

// Dispara o evento Contact no clique para abrir o WhatsApp.
export function trackContact() {
  window.fbq?.('track', 'Contact')
}

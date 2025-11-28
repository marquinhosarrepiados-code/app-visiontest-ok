// Configuração do Mercado Pago
export const MERCADO_PAGO_PUBLIC_KEY = 'TEST-6610391484416487-112619-580f2b2993d3ee44c80feb7a39cd4c81-77615316'

// Tipos do Mercado Pago
export interface PaymentData {
  amount: number
  description: string
  payerEmail?: string
}

export interface MercadoPagoInstance {
  checkout: (options: any) => void
  bricks: () => any
}

declare global {
  interface Window {
    MercadoPago: new (publicKey: string) => MercadoPagoInstance
  }
}

// Inicializar Mercado Pago
export const initMercadoPago = (): MercadoPagoInstance | null => {
  if (typeof window === 'undefined' || !window.MercadoPago) {
    return null
  }
  
  return new window.MercadoPago(MERCADO_PAGO_PUBLIC_KEY)
}

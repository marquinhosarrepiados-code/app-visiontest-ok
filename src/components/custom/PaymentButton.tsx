'use client'

import { useState } from 'react'
import { CreditCard, Loader2, ShoppingCart, DollarSign } from 'lucide-react'

interface PaymentButtonProps {
  title: string
  amount: number
  description?: string
  paymentLink?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function PaymentButton({ 
  title, 
  amount, 
  description,
  paymentLink = 'https://mpago.la/1XzXNX2',
  onSuccess,
  onError 
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)

    try {
      // Redirecionar diretamente para o link de pagamento do Mercado Pago
      window.location.href = paymentLink
      onSuccess?.()
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
      onError?.(error instanceof Error ? error.message : 'Erro ao processar pagamento')
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-3 min-w-[200px]"
    >
      {loading ? (
        <>
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Processando...</span>
        </>
      ) : (
        <>
          <CreditCard className="w-6 h-6" />
          <span>Pagar R$ {amount.toFixed(2)}</span>
        </>
      )}
    </button>
  )
}

// Componente de exemplo de produto com pagamento
export function ProductCard({ 
  name, 
  price, 
  description, 
  image,
  paymentLink = 'https://mpago.la/1XzXNX2'
}: { 
  name: string
  price: number
  description: string
  image?: string
  paymentLink?: string
}) {
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden hover:shadow-2xl transition-all duration-300">
      {image && (
        <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
          <ShoppingCart className="w-16 h-16 text-blue-600 dark:text-blue-400" />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              R$ {price.toFixed(2)}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </div>
        )}

        {showSuccess && (
          <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <p className="text-emerald-700 dark:text-emerald-300 text-sm">
              Pagamento iniciado com sucesso!
            </p>
          </div>
        )}

        <PaymentButton
          title={name}
          amount={price}
          description={description}
          paymentLink={paymentLink}
          onSuccess={() => setShowSuccess(true)}
          onError={(err) => setError(err)}
        />
      </div>
    </div>
  )
}

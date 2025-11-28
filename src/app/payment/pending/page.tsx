'use client'

import { useRouter } from 'next/navigation'
import { Clock } from 'lucide-react'

export default function PaymentPending() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-12 text-center border border-gray-100 dark:border-slate-700">
        <div className="w-24 h-24 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Clock className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Pagamento Pendente
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Seu pagamento está sendo processado. Você receberá uma confirmação em breve.
        </p>
        <button
          onClick={() => router.push('/')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Voltar para o Início
        </button>
      </div>
    </div>
  )
}

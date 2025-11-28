'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

export default function PaymentSuccess() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Salvar status de pagamento no localStorage
    localStorage.setItem('visiotest_payment_status', 'approved')
    
    // Redirecionar para a página principal após 3 segundos
    const timer = setTimeout(() => {
      router.push('/')
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-12 text-center border border-gray-100 dark:border-slate-700">
        <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Pagamento Aprovado! 🎉
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Seu pagamento foi confirmado com sucesso. Agora você tem acesso completo ao VisioTest+!
        </p>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
          <p className="text-emerald-800 dark:text-emerald-200 font-semibold">
            Redirecionando para a página inicial...
          </p>
        </div>
      </div>
    </div>
  )
}

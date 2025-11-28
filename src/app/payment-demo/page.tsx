'use client'

import { CreditCard, ShoppingBag, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ProductCard } from '@/components/custom/PaymentButton'

export default function PaymentDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Pagamentos
              </h1>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <ShoppingBag className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
            Integração Mercado Pago
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Sistema de pagamentos completo integrado com Mercado Pago. 
            Aceite pagamentos com cartão, Pix, boleto e muito mais!
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-12">
          <div className="flex items-start space-x-4">
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2 text-lg">
                Modo de Teste Ativado
              </h3>
              <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                Você está usando credenciais de teste do Mercado Pago. 
                Use os <a href="https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/test-cards" target="_blank" rel="noopener noreferrer" className="underline font-semibold">cartões de teste</a> para simular pagamentos.
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ProductCard
            name="Plano Básico"
            price={29.90}
            description="Acesso completo aos testes de visão por 1 mês"
          />
          
          <ProductCard
            name="Plano Premium"
            price={49.90}
            description="Todos os testes + relatórios detalhados por 3 meses"
          />
          
          <ProductCard
            name="Plano Anual"
            price={199.90}
            description="Acesso ilimitado por 1 ano com suporte prioritário"
          />
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Formas de Pagamento Aceitas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
              <CreditCard className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Cartão de Crédito</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Visa, Mastercard, Elo e mais
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Pix</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Pagamento instantâneo
              </p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Boleto</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Compensação em até 2 dias
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Voltar ao Início
          </Link>
        </div>
      </main>
    </div>
  )
}

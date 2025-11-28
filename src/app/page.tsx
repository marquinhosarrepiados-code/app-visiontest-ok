'use client'

import { useState, useEffect } from 'react'
import { Eye, User, BarChart3, Settings, Moon, Sun, Share2, AlertTriangle, Palette, Download, TrendingUp, Phone, MapPin, Clock, CheckCircle, XCircle, Activity, Shield, Users, Target, Award, CreditCard, Lock } from 'lucide-react'
import Link from 'next/link'

// Firebase Mock (substituir por configuração real)
const mockFirestore = {
  collection: (name: string) => ({
    add: async (data: any) => {
      console.log(`Salvando em ${name}:`, data)
      return { id: Date.now().toString() }
    },
    doc: (id: string) => ({
      get: async () => ({ exists: true, data: () => ({}) }),
      set: async (data: any) => console.log(`Atualizando ${id}:`, data)
    })
  })
}

// Tipos de dados expandidos
interface UserProfile {
  id?: string
  name: string
  age: number
  phone: string
  city: string
  gender: 'masculino' | 'feminino' | 'outro'
  usesGlasses: boolean
  lensType?: 'para_perto' | 'para_longe' | 'multifocal' | 'bifocal'
  visualDifficulties: string[]
  healthHistory: string[]
  createdAt?: Date
  hasPaid?: boolean
}

interface TestResult {
  id?: string
  userId: string
  testType: 'acuidade' | 'contraste' | 'cores'
  testSubtype?: string
  score: number
  level: number
  duration: number
  date: Date
  details: any
  errors: number
  errorMessages: string[]
}

// Componente de Cadastro Detalhado
function UserRegistration({ onComplete }: { onComplete: (profile: UserProfile) => void }) {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 0,
    phone: '',
    city: '',
    gender: 'masculino',
    usesGlasses: false,
    visualDifficulties: [],
    healthHistory: []
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (profile.name && profile.age > 0 && profile.phone && profile.city) {
      onComplete(profile)
    }
  }

  const toggleDifficulty = (difficulty: string) => {
    setProfile(prev => ({
      ...prev,
      visualDifficulties: prev.visualDifficulties.includes(difficulty)
        ? prev.visualDifficulties.filter(d => d !== difficulty)
        : [...prev.visualDifficulties, difficulty]
    }))
  }

  const toggleHealthHistory = (condition: string) => {
    setProfile(prev => ({
      ...prev,
      healthHistory: prev.healthHistory.includes(condition)
        ? prev.healthHistory.filter(h => h !== condition)
        : [...prev.healthHistory, condition]
    }))
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Cadastro Personalizado</h2>
          <p className="text-blue-100">Preencha seus dados para testes personalizados</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Dados Pessoais */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 border border-gray-200 dark:border-slate-600">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                <User className="w-4 h-4 text-white" />
              </div>
              Dados Pessoais
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-slate-500"
                  placeholder="Digite seu nome completo"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Idade *
                </label>
                <input
                  type="number"
                  value={profile.age || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-slate-500"
                  placeholder="Sua idade"
                  min="1"
                  max="120"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Telefone *
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-slate-500"
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Cidade *
                </label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-slate-500"
                  placeholder="Sua cidade"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Gênero
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value as any }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white transition-all duration-200 hover:border-gray-300 dark:hover:border-slate-500"
                >
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>
          </div>

          {/* Informações Visuais */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 border border-purple-200 dark:border-slate-600">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                <Eye className="w-4 h-4 text-white" />
              </div>
              Informações Visuais
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-purple-100 dark:border-slate-600">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.usesGlasses}
                    onChange={(e) => setProfile(prev => ({ ...prev, usesGlasses: e.target.checked }))}
                    className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Uso óculos ou lentes de contato
                  </span>
                </label>
              </div>

              {profile.usesGlasses && (
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Tipo de Lente
                  </label>
                  <select
                    value={profile.lensType || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, lensType: e.target.value as any }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-slate-700 dark:text-white transition-all duration-200"
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="para_perto">Para Perto</option>
                    <option value="para_longe">Para Longe</option>
                    <option value="multifocal">Multifocal</option>
                    <option value="bifocal">Bifocal</option>
                  </select>
                </div>
              )}

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Dificuldades Visuais (selecione todas que se aplicam)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Visão noturna',
                    'Leitura de perto',
                    'Leitura de longe',
                    'Distinção de cores',
                    'Sensibilidade à luz',
                    'Visão periférica',
                    'Visão dupla',
                    'Halos ao redor das luzes'
                  ].map((difficulty) => (
                    <label key={difficulty} className="flex items-center space-x-3 bg-white dark:bg-slate-800 p-3 rounded-lg border border-purple-100 dark:border-slate-600 cursor-pointer hover:bg-purple-50 dark:hover:bg-slate-700 transition-colors duration-200">
                      <input
                        type="checkbox"
                        checked={profile.visualDifficulties.includes(difficulty)}
                        onChange={() => toggleDifficulty(difficulty)}
                        className="w-4 h-4 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{difficulty}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Histórico de Saúde */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 border border-emerald-200 dark:border-slate-600">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              Histórico de Saúde
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Diabetes',
                'Hipertensão',
                'Glaucoma',
                'Catarata',
                'Degeneração macular',
                'Histórico familiar de problemas oculares',
                'Cirurgia ocular prévia',
                'Uso de medicamentos que afetam a visão'
              ].map((condition) => (
                <label key={condition} className="flex items-center space-x-3 bg-white dark:bg-slate-800 p-3 rounded-lg border border-emerald-100 dark:border-slate-600 cursor-pointer hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors duration-200">
                  <input
                    type="checkbox"
                    checked={profile.healthHistory.includes(condition)}
                    onChange={() => toggleHealthHistory(condition)}
                    className="w-4 h-4 text-emerald-600 border-2 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{condition}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Continuar para Pagamento
          </button>
        </form>
      </div>
    </div>
  )
}

// Componente de Pagamento
function PaymentScreen({ userProfile, onPaymentComplete }: { userProfile: UserProfile, onPaymentComplete: () => void }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePayment = async () => {
    setIsProcessing(true)
    setError(null)

    try {
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userProfile.id || Date.now().toString(),
          userName: userProfile.name
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao criar pagamento')
      }

      const data = await response.json()
      
      // Redirecionar para o Mercado Pago
      window.location.href = data.initPoint
    } catch (err) {
      console.error('Erro ao processar pagamento:', err)
      setError('Erro ao processar pagamento. Tente novamente.')
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Acesso Completo</h2>
          <p className="text-emerald-100">Libere todos os testes de visão</p>
        </div>

        <div className="p-8">
          {/* Informações do Usuário */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 mb-8 border border-gray-200 dark:border-slate-600">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Seus Dados</h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p><strong>Nome:</strong> {userProfile.name}</p>
              <p><strong>Idade:</strong> {userProfile.age} anos</p>
              <p><strong>Cidade:</strong> {userProfile.city}</p>
            </div>
          </div>

          {/* Detalhes do Produto */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-4">
              VisioTest+ - Acesso Completo
            </h3>
            <ul className="space-y-3 text-emerald-700 dark:text-emerald-300 mb-6">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>9 testes de acuidade visual diferentes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>Teste de sensibilidade ao contraste</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>Teste de percepção de cores</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>Resultados detalhados e personalizados</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>Recomendações de saúde visual</span>
              </li>
            </ul>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-800 dark:text-emerald-200">
                R$ 15,00
              </div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                Pagamento único - Acesso imediato
              </p>
            </div>
          </div>

          {/* Erro */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6">
              <p className="text-red-800 dark:text-red-200 text-center">{error}</p>
            </div>
          )}

          {/* Botão de Pagamento */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
          >
            {isProcessing ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processando...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-6 h-6" />
                <span>Pagar com Mercado Pago</span>
              </>
            )}
          </button>

          {/* Segurança */}
          <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Lock className="w-4 h-4" />
            <span>Pagamento 100% seguro via Mercado Pago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 9 Testes de Acuidade Visual
function AcuityTestSelector({ onTestSelect }: { onTestSelect: (testType: string) => void }) {
  const acuityTests = [
    { id: 'snellen', name: 'Tabela de Snellen', description: 'Teste clássico com letras', color: 'from-blue-500 to-indigo-600' },
    { id: 'landolt', name: 'Anéis de Landolt', description: 'Anéis com aberturas', color: 'from-purple-500 to-pink-600' },
    { id: 'tumbling_e', name: 'E Rotativo', description: 'Letra E em diferentes direções', color: 'from-emerald-500 to-teal-600' },
    { id: 'numbers', name: 'Números', description: 'Reconhecimento de números', color: 'from-orange-500 to-red-600' },
    { id: 'symbols', name: 'Símbolos', description: 'Símbolos geométricos', color: 'from-cyan-500 to-blue-600' },
    { id: 'pediatric', name: 'Pediátrico', description: 'Figuras para crianças', color: 'from-pink-500 to-rose-600' },
    { id: 'contrast_letters', name: 'Letras com Contraste', description: 'Letras com baixo contraste', color: 'from-violet-500 to-purple-600' },
    { id: 'distance', name: 'Visão de Longe', description: 'Teste específico para distância', color: 'from-amber-500 to-orange-600' },
    { id: 'near', name: 'Visão de Perto', description: 'Teste específico para perto', color: 'from-lime-500 to-green-600' }
  ]

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Eye className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Testes de Acuidade Visual
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Escolha um dos 9 testes de acuidade disponíveis
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {acuityTests.map((test) => (
          <button
            key={test.id}
            onClick={() => onTestSelect(test.id)}
            className="group bg-white dark:bg-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-left overflow-hidden border border-gray-100 dark:border-slate-700"
          >
            <div className={`bg-gradient-to-r ${test.color} p-6`}>
              <Eye className="w-12 h-12 text-white mb-4" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                {test.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {test.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// Teste de Acuidade Específico com continuação após erro e mensagens de dica
function SpecificAcuityTest({ testType, onComplete }: { testType: string, onComplete: (result: Omit<TestResult, 'id' | 'userId' | 'date'>) => void }) {
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [errors, setErrors] = useState(0)
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  const [currentSymbol, setCurrentSymbol] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [startTime] = useState(Date.now())
  const [showResult, setShowResult] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [currentErrorMessage, setCurrentErrorMessage] = useState('')

  const getTestSymbols = (type: string, level: number) => {
    const baseSize = Math.max(60 - (level * 5), 12)
    
    switch (type) {
      case 'snellen':
        return { symbols: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], size: baseSize }
      case 'landolt':
        return { symbols: ['⊃', '⊂', '∩', '∪'], size: baseSize }
      case 'tumbling_e':
        return { symbols: ['E', 'Ǝ', 'M', 'W'], size: baseSize }
      case 'numbers':
        return { symbols: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], size: baseSize }
      case 'symbols':
        return { symbols: ['○', '□', '△', '◇'], size: baseSize }
      default:
        return { symbols: ['A', 'B', 'C', 'D', 'E'], size: baseSize }
    }
  }

  const getVisualCareTips = () => {
    const tips = [
      "💡 Dica: Mantenha uma distância adequada da tela (aproximadamente 60cm)",
      "👀 Dica: Pisque com frequência para manter os olhos hidratados",
      "💡 Dica: Ajuste o brilho da tela para um nível confortável",
      "🔍 Dica: Se usar óculos, certifique-se de que estão limpos",
      "⏰ Dica: Faça pausas regulares ao usar dispositivos digitais"
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  useEffect(() => {
    generateNewSymbol()
  }, [level, testType])

  const generateNewSymbol = () => {
    const { symbols } = getTestSymbols(testType, level)
    const symbol = symbols[Math.floor(Math.random() * symbols.length)]
    setCurrentSymbol(symbol)
    
    // Gerar opções (símbolo correto + 3 incorretos)
    const incorrectOptions = symbols.filter(s => s !== symbol).slice(0, 3)
    const allOptions = [symbol, ...incorrectOptions].sort(() => Math.random() - 0.5)
    setOptions(allOptions)
  }

  const handleAnswer = (answer: string) => {
    if (answer === currentSymbol) {
      setScore(prev => prev + 1)
      if (level < 10) {
        setLevel(prev => prev + 1)
        generateNewSymbol()
      } else {
        completeTest()
      }
    } else {
      // Incrementar erros e mostrar mensagem de dica
      setErrors(prev => prev + 1)
      const tip = getVisualCareTips()
      setErrorMessages(prev => [...prev, tip])
      setCurrentErrorMessage(tip)
      setShowErrorMessage(true)
      
      // Esconder mensagem após 3 segundos e continuar o teste
      setTimeout(() => {
        setShowErrorMessage(false)
        if (level < 10) {
          setLevel(prev => prev + 1)
          generateNewSymbol()
        } else {
          completeTest()
        }
      }, 3000)
    }
  }

  const completeTest = () => {
    const duration = Date.now() - startTime
    const result = {
      testType: 'acuidade' as const,
      testSubtype: testType,
      score,
      level,
      duration,
      errors,
      errorMessages,
      details: { testType, maxLevel: level, correctAnswers: score, totalErrors: errors }
    }
    setShowResult(true)
    setTimeout(() => onComplete(result), 2000)
  }

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-12 text-center border border-gray-100 dark:border-slate-700">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Teste Concluído!</h3>
          <div className="space-y-2 text-lg">
            <p className="text-gray-600 dark:text-gray-300">Acertos: <span className="font-bold text-emerald-600">{score}/10</span></p>
            <p className="text-gray-600 dark:text-gray-300">Erros: <span className="font-bold text-red-500">{errors}</span></p>
            <p className="text-gray-600 dark:text-gray-300">Nível alcançado: <span className="font-bold text-blue-600">{level}</span></p>
          </div>
        </div>
      </div>
    )
  }

  if (showErrorMessage) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Resposta Incorreta</h2>
            <p className="text-orange-100 text-lg">Continue praticando! Aqui vai uma dica:</p>
          </div>

          <div className="p-8 text-center">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-8 mb-8">
              <p className="text-xl text-amber-800 dark:text-amber-200 font-semibold leading-relaxed">
                {currentErrorMessage}
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-3 text-gray-600 dark:text-gray-300">
              <Clock className="w-6 h-6" />
              <span className="text-lg">Continuando em alguns segundos...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { size } = getTestSymbols(testType, level)

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        {/* Header com progresso */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            {testType.replace('_', ' ').toUpperCase()}
          </h2>
          <p className="text-blue-100 text-lg">Nível {level}/10</p>
          <div className="flex justify-center space-x-6 mt-4 text-blue-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Acertos: {score}</span>
            </div>
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5" />
              <span>Erros: {errors}</span>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 mt-6">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(level / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-12">
            <div 
              className="inline-block p-12 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-3xl border-2 border-gray-200 dark:border-slate-600 shadow-inner"
              style={{ fontSize: `${size}px`, fontWeight: 'bold' }}
            >
              {currentSymbol}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/30 dark:hover:to-indigo-800/30 rounded-2xl border-2 border-blue-200 dark:border-blue-700 transition-all duration-200 text-3xl font-bold hover:scale-105 hover:shadow-lg"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Teste de Contraste com continuação após erro e mensagens de dica
function ContrastTest({ onComplete }: { onComplete: (result: Omit<TestResult, 'id' | 'userId' | 'date'>) => void }) {
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [errors, setErrors] = useState(0)
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  const [currentPattern, setCurrentPattern] = useState<'left' | 'right'>('left')
  const [startTime] = useState(Date.now())
  const [showResult, setShowResult] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [currentErrorMessage, setCurrentErrorMessage] = useState('')

  const getVisualCareTips = () => {
    const tips = [
      "💡 Dica: Ajuste o brilho da tela para melhor visualização do contraste",
      "👀 Dica: Observe atentamente as diferenças sutis entre as áreas",
      "🔍 Dica: Concentre-se nas bordas para identificar padrões",
      "⚡ Dica: Pisque algumas vezes para relaxar os olhos",
      "🌟 Dica: Mantenha boa iluminação ambiente, mas evite reflexos na tela"
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  useEffect(() => {
    generateNewPattern()
  }, [level])

  const generateNewPattern = () => {
    setCurrentPattern(Math.random() > 0.5 ? 'left' : 'right')
  }

  const handleAnswer = (answer: 'left' | 'right') => {
    if (answer === currentPattern) {
      setScore(prev => prev + 1)
      if (level < 10) {
        setLevel(prev => prev + 1)
        generateNewPattern()
      } else {
        completeTest()
      }
    } else {
      // Incrementar erros e mostrar mensagem de dica
      setErrors(prev => prev + 1)
      const tip = getVisualCareTips()
      setErrorMessages(prev => [...prev, tip])
      setCurrentErrorMessage(tip)
      setShowErrorMessage(true)
      
      // Esconder mensagem após 3 segundos e continuar o teste
      setTimeout(() => {
        setShowErrorMessage(false)
        if (level < 10) {
          setLevel(prev => prev + 1)
          generateNewPattern()
        } else {
          completeTest()
        }
      }, 3000)
    }
  }

  const completeTest = () => {
    const duration = Date.now() - startTime
    const result = {
      testType: 'contraste' as const,
      score,
      level,
      duration,
      errors,
      errorMessages,
      details: { maxLevel: level, correctAnswers: score, totalErrors: errors }
    }
    setShowResult(true)
    setTimeout(() => onComplete(result), 2000)
  }

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-12 text-center border border-gray-100 dark:border-slate-700">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <BarChart3 className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Teste Concluído!</h3>
          <div className="space-y-2 text-lg">
            <p className="text-gray-600 dark:text-gray-300">Acertos: <span className="font-bold text-emerald-600">{score}/10</span></p>
            <p className="text-gray-600 dark:text-gray-300">Erros: <span className="font-bold text-red-500">{errors}</span></p>
            <p className="text-gray-600 dark:text-gray-300">Nível alcançado: <span className="font-bold text-blue-600">{level}</span></p>
          </div>
        </div>
      </div>
    )
  }

  if (showErrorMessage) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Resposta Incorreta</h2>
            <p className="text-orange-100 text-lg">Continue praticando! Aqui vai uma dica:</p>
          </div>

          <div className="p-8 text-center">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-8 mb-8">
              <p className="text-xl text-amber-800 dark:text-amber-200 font-semibold leading-relaxed">
                {currentErrorMessage}
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-3 text-gray-600 dark:text-gray-300">
              <Clock className="w-6 h-6" />
              <span className="text-lg">Continuando em alguns segundos...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const contrastLevel = Math.max(0.9 - (level * 0.08), 0.1)

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        {/* Header com progresso */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Teste de Contraste</h2>
          <p className="text-purple-100 text-lg">Nível {level}/10 - Identifique onde estão as listras</p>
          <div className="flex justify-center space-x-6 mt-4 text-purple-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Acertos: {score}</span>
            </div>
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5" />
              <span>Erros: {errors}</span>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 mt-6">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(level / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex justify-center mb-12">
            <div className="flex border-4 border-gray-300 dark:border-slate-600 rounded-2xl overflow-hidden shadow-lg">
              <div 
                className="w-40 h-40 flex items-center justify-center"
                style={{ 
                  background: currentPattern === 'left' 
                    ? `repeating-linear-gradient(90deg, rgba(0,0,0,${contrastLevel}) 0px, rgba(0,0,0,${contrastLevel}) 4px, transparent 4px, transparent 8px)`
                    : '#f5f5f5'
                }}
              >
              </div>
              <div 
                className="w-40 h-40 flex items-center justify-center"
                style={{ 
                  background: currentPattern === 'right' 
                    ? `repeating-linear-gradient(90deg, rgba(0,0,0,${contrastLevel}) 0px, rgba(0,0,0,${contrastLevel}) 4px, transparent 4px, transparent 8px)`
                    : '#f5f5f5'
                }}
              >
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => handleAnswer('left')}
              className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-800/30 dark:hover:to-pink-800/30 rounded-2xl border-2 border-purple-200 dark:border-purple-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                Esquerda
              </span>
            </button>
            <button
              onClick={() => handleAnswer('right')}
              className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-800/30 dark:hover:to-pink-800/30 rounded-2xl border-2 border-purple-200 dark:border-purple-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                Direita
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Teste de Cores com continuação após erro e mensagens de dica
function ColorTest({ onComplete }: { onComplete: (result: Omit<TestResult, 'id' | 'userId' | 'date'>) => void }) {
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [errors, setErrors] = useState(0)
  const [errorMessages, setErrorMessages] = useState<string[]>([])
  const [currentColor, setCurrentColor] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [startTime] = useState(Date.now())
  const [showResult, setShowResult] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const [currentErrorMessage, setCurrentErrorMessage] = useState('')

  const colorSets = [
    { name: 'Vermelho', color: '#FF0000', similar: ['#FF3333', '#CC0000', '#FF6666'] },
    { name: 'Verde', color: '#00FF00', similar: ['#33FF33', '#00CC00', '#66FF66'] },
    { name: 'Azul', color: '#0000FF', similar: ['#3333FF', '#0000CC', '#6666FF'] },
    { name: 'Amarelo', color: '#FFFF00', similar: ['#FFFF33', '#CCCC00', '#FFFF66'] },
    { name: 'Roxo', color: '#800080', similar: ['#9933CC', '#660066', '#AA44DD'] },
    { name: 'Laranja', color: '#FFA500', similar: ['#FFB833', '#CC8400', '#FFCC66'] }
  ]

  const getVisualCareTips = () => {
    const tips = [
      "🌈 Dica: Observe as nuances sutis entre as cores similares",
      "💡 Dica: Ajuste o brilho da tela para melhor percepção das cores",
      "👀 Dica: Se tiver daltonismo, isso é normal - continue o teste",
      "🔍 Dica: Concentre-se no tom principal da cor apresentada",
      "⚡ Dica: Pisque algumas vezes para descansar os olhos"
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  useEffect(() => {
    generateNewColor()
  }, [level])

  const generateNewColor = () => {
    const colorSet = colorSets[Math.floor(Math.random() * colorSets.length)]
    setCurrentColor(colorSet.name)
    
    // Gerar opções mais difíceis conforme o nível aumenta
    const difficulty = Math.min(level, 6)
    const similarColors = colorSet.similar.slice(0, difficulty - 1)
    const otherColors = colorSets.filter(c => c.name !== colorSet.name).slice(0, 4 - difficulty)
    
    const allOptions = [colorSet.name, ...similarColors.map(() => 'Cor Similar'), ...otherColors.map(c => c.name)]
      .slice(0, 4)
      .sort(() => Math.random() - 0.5)
    
    setOptions(allOptions)
  }

  const handleAnswer = (answer: string) => {
    if (answer === currentColor) {
      setScore(prev => prev + 1)
      if (level < 10) {
        setLevel(prev => prev + 1)
        generateNewColor()
      } else {
        completeTest()
      }
    } else {
      // Incrementar erros e mostrar mensagem de dica
      setErrors(prev => prev + 1)
      const tip = getVisualCareTips()
      setErrorMessages(prev => [...prev, tip])
      setCurrentErrorMessage(tip)
      setShowErrorMessage(true)
      
      // Esconder mensagem após 3 segundos e continuar o teste
      setTimeout(() => {
        setShowErrorMessage(false)
        if (level < 10) {
          setLevel(prev => prev + 1)
          generateNewColor()
        } else {
          completeTest()
        }
      }, 3000)
    }
  }

  const completeTest = () => {
    const duration = Date.now() - startTime
    const result = {
      testType: 'cores' as const,
      score,
      level,
      duration,
      errors,
      errorMessages,
      details: { maxLevel: level, correctAnswers: score, totalErrors: errors }
    }
    setShowResult(true)
    setTimeout(() => onComplete(result), 2000)
  }

  if (showResult) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-12 text-center border border-gray-100 dark:border-slate-700">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Palette className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Teste Concluído!</h3>
          <div className="space-y-2 text-lg">
            <p className="text-gray-600 dark:text-gray-300">Acertos: <span className="font-bold text-emerald-600">{score}/10</span></p>
            <p className="text-gray-600 dark:text-gray-300">Erros: <span className="font-bold text-red-500">{errors}</span></p>
            <p className="text-gray-600 dark:text-gray-300">Nível alcançado: <span className="font-bold text-blue-600">{level}</span></p>
          </div>
        </div>
      </div>
    )
  }

  if (showErrorMessage) {
    return (
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Resposta Incorreta</h2>
            <p className="text-orange-100 text-lg">Continue praticando! Aqui vai uma dica:</p>
          </div>

          <div className="p-8 text-center">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-8 mb-8">
              <p className="text-xl text-amber-800 dark:text-amber-200 font-semibold leading-relaxed">
                {currentErrorMessage}
              </p>
            </div>
            
            <div className="flex items-center justify-center space-x-3 text-gray-600 dark:text-gray-300">
              <Clock className="w-6 h-6" />
              <span className="text-lg">Continuando em alguns segundos...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentColorSet = colorSets.find(c => c.name === currentColor)

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        {/* Header com progresso */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Teste de Cores</h2>
          <p className="text-orange-100 text-lg">Nível {level}/10 - Identifique a cor</p>
          <div className="flex justify-center space-x-6 mt-4 text-orange-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Acertos: {score}</span>
            </div>
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5" />
              <span>Erros: {errors}</span>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 mt-6">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(level / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-12">
            <div 
              className="w-40 h-40 rounded-3xl mx-auto border-4 border-gray-300 dark:border-slate-600 shadow-lg"
              style={{ backgroundColor: currentColorSet?.color }}
            ></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="p-6 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 hover:from-orange-100 hover:to-pink-100 dark:hover:from-orange-800/30 dark:hover:to-pink-800/30 rounded-2xl border-2 border-orange-200 dark:border-orange-700 transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <span className="text-xl font-bold text-gray-700 dark:text-gray-300">
                  {option}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente de Gráfico Circular para Resultados
function CircularChart({ score, maxScore, label, color }: { score: number, maxScore: number, label: string, color: string }) {
  const percentage = (score / maxScore) * 100
  const circumference = 2 * Math.PI * 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`${color} transition-all duration-1000 ease-out`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {score}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              /{maxScore}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
        {label}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {percentage.toFixed(0)}%
      </p>
    </div>
  )
}

// Componente de Resultados Melhorado com Gráficos e Diagnóstico Detalhado
function Results({ profile, results, onRestart }: { 
  profile: UserProfile
  results: TestResult[]
  onRestart: () => void 
}) {
  const shareResults = async () => {
    const text = `Meus resultados do VisioTest+:\n${results.map(r => 
      `${r.testType}: ${r.score}/10 (Nível ${r.level})`
    ).join('\n')}\n\nBaixe o app: [Link do app]`
    
    try {
      // Tentar API nativa de compartilhamento primeiro
      if (navigator.share && navigator.canShare && navigator.canShare({ text })) {
        await navigator.share({
          title: 'Resultados VisioTest+',
          text: text
        })
        return
      }
      
      // Fallback para clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
        alert('Resultados copiados para a área de transferência!')
        return
      }
      
      // Fallback final para seleção manual
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
        alert('Resultados copiados para a área de transferência!')
      } catch (err) {
        console.warn('Fallback de cópia falhou:', err)
        alert('Não foi possível compartilhar automaticamente. Copie manualmente:\n\n' + text)
      } finally {
        document.body.removeChild(textArea)
      }
    } catch (error) {
      console.warn('Compartilhamento não disponível:', error instanceof Error ? error.message : 'Erro desconhecido')
      // Último recurso - mostrar o texto para cópia manual
      alert('Compartilhamento não disponível. Copie manualmente:\n\n' + text)
    }
  }

  const exportResults = async () => {
    const data = {
      usuario: profile.name,
      idade: profile.age,
      telefone: profile.phone,
      cidade: profile.city,
      data: new Date().toLocaleDateString('pt-BR'),
      resultados: results.map(r => ({
        teste: r.testType,
        subtipo: r.testSubtype || '',
        pontuacao: `${r.score}/10`,
        nivel: r.level,
        duracao: `${Math.round(r.duration / 1000)}s`,
        erros: r.errors || 0
      }))
    }
    
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `visiotest-${profile.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erro ao exportar:', error)
      alert('Erro ao exportar resultados. Tente novamente.')
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-emerald-600 dark:text-emerald-400'
    if (score >= 6) return 'text-amber-600 dark:text-amber-400'
    return 'text-red-500 dark:text-red-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excelente'
    if (score >= 6) return 'Bom'
    if (score >= 4) return 'Regular'
    return 'Atenção'
  }

  const getScoreBg = (score: number) => {
    if (score >= 8) return 'from-emerald-500 to-teal-600'
    if (score >= 6) return 'from-amber-500 to-orange-600'
    return 'from-red-500 to-pink-600'
  }

  const getChartColor = (score: number) => {
    if (score >= 8) return 'text-emerald-500'
    if (score >= 6) return 'text-amber-500'
    return 'text-red-500'
  }

  const getDiagnosisLevel = () => {
    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length
    const totalErrors = results.reduce((sum, r) => sum + (r.errors || 0), 0)
    
    if (avgScore >= 8 && totalErrors <= 5) return 'excellent'
    if (avgScore >= 6 && totalErrors <= 10) return 'good'
    if (avgScore >= 4 && totalErrors <= 15) return 'regular'
    return 'attention'
  }

  const getDiagnosisInfo = (level: string) => {
    switch (level) {
      case 'excellent':
        return {
          title: '🌟 Visão Excelente',
          description: 'Seus resultados indicam uma visão muito boa em todos os aspectos testados.',
          recommendations: [
            'Continue mantendo hábitos saudáveis para os olhos',
            'Realize exames oftalmológicos anuais preventivos',
            'Mantenha proteção UV adequada'
          ],
          color: 'emerald'
        }
      case 'good':
        return {
          title: '✅ Visão Boa',
          description: 'Sua visão está em bom estado, com algumas áreas que podem ser monitoradas.',
          recommendations: [
            'Mantenha consultas regulares com oftalmologista',
            'Pratique exercícios visuais regularmente',
            'Cuide da iluminação ao ler ou usar dispositivos'
          ],
          color: 'amber'
        }
      case 'regular':
        return {
          title: '⚠️ Visão Regular',
          description: 'Alguns aspectos da sua visão podem precisar de atenção especializada.',
          recommendations: [
            'Agende uma consulta oftalmológica em breve',
            'Evite fadiga visual excessiva',
            'Considere pausas frequentes em atividades visuais'
          ],
          color: 'orange'
        }
      default:
        return {
          title: '🚨 Atenção Necessária',
          description: 'Seus resultados sugerem que uma avaliação oftalmológica é recomendada.',
          recommendations: [
            'Agende uma consulta oftalmológica o quanto antes',
            'Evite dirigir à noite se tiver dificuldades',
            'Use iluminação adequada para leitura'
          ],
          color: 'red'
        }
    }
  }

  const diagnosisLevel = getDiagnosisLevel()
  const diagnosisInfo = getDiagnosisInfo(diagnosisLevel)

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
        {/* Header com gradiente */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-center">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <TrendingUp className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Seus Resultados</h2>
          <p className="text-blue-100 text-xl">Olá, {profile.name}! Aqui estão seus resultados personalizados.</p>
        </div>

        <div className="p-8">
          {/* Gráficos Circulares */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-slate-600">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center flex items-center justify-center">
              <Activity className="w-8 h-8 mr-3" />
              Gráfico de Desempenho
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {results.map((result, index) => (
                <CircularChart
                  key={index}
                  score={result.score}
                  maxScore={10}
                  label={result.testType === 'acuidade' ? 'Acuidade Visual' : 
                         result.testType === 'contraste' ? 'Contraste' : 'Cores'}
                  color={getChartColor(result.score)}
                />
              ))}
            </div>
          </div>

          {/* Diagnóstico Detalhado */}
          <div className={`bg-gradient-to-br from-${diagnosisInfo.color}-50 to-${diagnosisInfo.color}-100 dark:from-${diagnosisInfo.color}-900/20 dark:to-${diagnosisInfo.color}-800/20 border-2 border-${diagnosisInfo.color}-200 dark:border-${diagnosisInfo.color}-800 rounded-2xl p-8 mb-8`}>
            <h3 className={`text-2xl font-bold text-${diagnosisInfo.color}-800 dark:text-${diagnosisInfo.color}-200 mb-4`}>
              {diagnosisInfo.title}
            </h3>
            <p className={`text-${diagnosisInfo.color}-700 dark:text-${diagnosisInfo.color}-300 text-lg mb-6 leading-relaxed`}>
              {diagnosisInfo.description}
            </p>
            <div className={`bg-white dark:bg-slate-800 rounded-xl p-6 border border-${diagnosisInfo.color}-200 dark:border-${diagnosisInfo.color}-700`}>
              <h4 className={`font-bold text-${diagnosisInfo.color}-800 dark:text-${diagnosisInfo.color}-200 mb-4 text-lg`}>
                Recomendações:
              </h4>
              <ul className="space-y-2">
                {diagnosisInfo.recommendations.map((rec, index) => (
                  <li key={index} className={`text-${diagnosisInfo.color}-700 dark:text-${diagnosisInfo.color}-300 flex items-start`}>
                    <span className="mr-2">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resultados Detalhados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {results.map((result, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 text-center border border-gray-200 dark:border-slate-600 hover:shadow-lg transition-shadow duration-300">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${getScoreBg(result.score)} rounded-full flex items-center justify-center shadow-lg`}>
                  {result.testType === 'acuidade' && <Eye className="w-8 h-8 text-white" />}
                  {result.testType === 'contraste' && <BarChart3 className="w-8 h-8 text-white" />}
                  {result.testType === 'cores' && <Palette className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
                  {result.testType === 'acuidade' && 'Acuidade Visual'}
                  {result.testType === 'contraste' && 'Sensibilidade ao Contraste'}
                  {result.testType === 'cores' && 'Percepção de Cores'}
                </h3>
                {result.testSubtype && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 bg-white dark:bg-slate-800 rounded-lg px-3 py-1">
                    {result.testSubtype.replace('_', ' ').toUpperCase()}
                  </p>
                )}
                <div className={`text-4xl font-bold mb-3 ${getScoreColor(result.score)}`}>
                  {result.score}/10
                </div>
                <p className={`text-lg font-semibold mb-3 ${getScoreColor(result.score)}`}>
                  {getScoreLabel(result.score)}
                </p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p>Nível: {result.level} • Tempo: {Math.round(result.duration / 1000)}s</p>
                  {result.errors !== undefined && (
                    <p className="text-red-500 dark:text-red-400">
                      Erros: {result.errors}
                    </p>
                  )}
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-3 mt-4">
                  <div 
                    className={`bg-gradient-to-r ${getScoreBg(result.score)} h-3 rounded-full transition-all duration-500 shadow-sm`}
                    style={{ width: `${(result.score / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Análise Personalizada */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-8">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-4 flex items-center text-xl">
              <Eye className="w-6 h-6 mr-3" />
              Análise Personalizada
            </h4>
            <div className="text-blue-700 dark:text-blue-300 space-y-3 leading-relaxed">
              {profile.age > 40 && (
                <p>• Considerando sua idade ({profile.age} anos), é normal haver mudanças na visão de perto.</p>
              )}
              {profile.usesGlasses && (
                <p>• Como você usa {profile.lensType ? profile.lensType.replace('_', ' ') : 'correção visual'}, mantenha consultas regulares.</p>
              )}
              {profile.visualDifficulties.includes('Distinção de cores') && results.some(r => r.testType === 'cores' && r.score < 6) && (
                <p>• Seus resultados confirmam dificuldades com cores. Considere avaliação especializada.</p>
              )}
              {results.some(r => r.score < 5) && (
                <p>• Alguns resultados indicam necessidade de avaliação oftalmológica mais detalhada.</p>
              )}
              {profile.healthHistory.length > 0 && (
                <p>• Considerando seu histórico de saúde, recomendamos acompanhamento médico regular.</p>
              )}
              {results.some(r => (r.errors || 0) > 5) && (
                <p>• Observe as dicas de cuidado visual que apareceram durante os testes para melhorar seu desempenho.</p>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2 text-lg">
                  Disclaimer Médico
                </h4>
                <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
                  Este aplicativo é apenas para fins educacionais e de triagem básica. 
                  Os resultados NÃO substituem uma consulta oftalmológica profissional. 
                  Para diagnóstico preciso e tratamento, consulte sempre um oftalmologista qualificado.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={shareResults}
              className="flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Share2 className="w-6 h-6" />
              <span>Compartilhar</span>
            </button>
            <button
              onClick={exportResults}
              className="flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Download className="w-6 h-6" />
              <span>Exportar</span>
            </button>
            <button
              onClick={onRestart}
              className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Eye className="w-6 h-6" />
              <span>Novos Testes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente Principal
export default function VisioTestApp() {
  const [darkMode, setDarkMode] = useState(false)
  const [currentStep, setCurrentStep] = useState<'welcome' | 'register' | 'payment' | 'test-menu' | 'acuity-selector' | 'acuity-test' | 'contrast' | 'colors' | 'results'>('welcome')
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [selectedAcuityTest, setSelectedAcuityTest] = useState<string>('')
  const [hasPaid, setHasPaid] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    // Verificar se o usuário já pagou
    const paymentStatus = localStorage.getItem('visiotest_payment_status')
    if (paymentStatus === 'approved') {
      setHasPaid(true)
    }
  }, [])

  const handleRegistrationComplete = (profile: UserProfile) => {
    setUserProfile(profile)
    // Se já pagou, vai direto para os testes
    if (hasPaid) {
      setCurrentStep('test-menu')
    } else {
      setCurrentStep('payment')
    }
  }

  const handlePaymentComplete = () => {
    setHasPaid(true)
    setCurrentStep('test-menu')
  }

  const handleTestComplete = async (result: Omit<TestResult, 'id' | 'userId' | 'date'>) => {
    const newResult: TestResult = {
      ...result,
      id: Date.now().toString(),
      userId: userProfile?.id || 'temp',
      date: new Date()
    }
    
    setTestResults(prev => [...prev, newResult])
    
    // Salvar resultado no Firebase
    try {
      await mockFirestore.collection('test_results').add(newResult)
    } catch (error) {
      console.error('Erro ao salvar resultado:', error)
    }
    
    setCurrentStep('test-menu')
  }

  const handleAcuityTestSelect = (testType: string) => {
    setSelectedAcuityTest(testType)
    setCurrentStep('acuity-test')
  }

  const resetApp = () => {
    setCurrentStep('welcome')
    setUserProfile(null)
    setTestResults([])
    setSelectedAcuityTest('')
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Header */}
        <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50 dark:border-slate-700/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  VisioTest+
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-3 rounded-2xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {darkMode ? (
                    <Sun className="w-6 h-6 text-amber-500" />
                  ) : (
                    <Moon className="w-6 h-6 text-slate-600" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentStep === 'welcome' && (
            <div className="text-center max-w-5xl mx-auto">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl">
                <Eye className="w-16 h-16 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-8">
                VisioTest+
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                Realize testes rápidos e personalizados de visão com tecnologia avançada. 
                Monitore sua saúde visual de forma prática e profissional.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-slate-700">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">9 Testes de Acuidade</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Avalie a nitidez da sua visão com diferentes métodos profissionais</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-slate-700">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Teste de Contraste</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Meça a sensibilidade ao contraste com precisão</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-slate-700">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Teste de Cores</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">Avalie a percepção de cores detalhadamente</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 mb-12 max-w-md mx-auto">
                <p className="text-emerald-800 dark:text-emerald-200 font-bold text-lg">
                  💳 Acesso completo por apenas R$ 15,00
                </p>
              </div>
              <button
                onClick={() => setCurrentStep('register')}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-6 px-12 rounded-3xl text-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                Começar Agora
              </button>
            </div>
          )}

          {currentStep === 'register' && (
            <UserRegistration onComplete={handleRegistrationComplete} />
          )}

          {currentStep === 'payment' && userProfile && (
            <PaymentScreen userProfile={userProfile} onPaymentComplete={handlePaymentComplete} />
          )}

          {currentStep === 'test-menu' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Escolha um Teste
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Olá, {userProfile?.name}! Selecione o teste que deseja realizar.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <button
                  onClick={() => setCurrentStep('acuity-selector')}
                  className="group bg-white dark:bg-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-left overflow-hidden border border-gray-100 dark:border-slate-700"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8">
                    <Eye className="w-16 h-16 text-white mb-4" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      Acuidade Visual
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      9 tipos diferentes de testes de acuidade
                    </p>
                    <span className="text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg">
                      {testResults.filter(r => r.testType === 'acuidade').length} de 9 concluídos
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => setCurrentStep('contrast')}
                  className="group bg-white dark:bg-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-left overflow-hidden border border-gray-100 dark:border-slate-700"
                  disabled={testResults.some(r => r.testType === 'contraste')}
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-8">
                    <BarChart3 className="w-16 h-16 text-white mb-4" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                      Sensibilidade ao Contraste
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      Meça sua sensibilidade ao contraste
                    </p>
                    {testResults.some(r => r.testType === 'contraste') && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-lg">
                        ✓ Concluído
                      </span>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setCurrentStep('colors')}
                  className="group bg-white dark:bg-slate-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-left overflow-hidden border border-gray-100 dark:border-slate-700"
                  disabled={testResults.some(r => r.testType === 'cores')}
                >
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-8">
                    <Palette className="w-16 h-16 text-white mb-4" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                      Percepção de Cores
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      Avalie sua capacidade de distinguir cores
                    </p>
                    {testResults.some(r => r.testType === 'cores') && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-lg">
                        ✓ Concluído
                      </span>
                    )}
                  </div>
                </button>
              </div>

              {testResults.length > 0 && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setCurrentStep('results')}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Ver Resultados ({testResults.length} teste{testResults.length > 1 ? 's' : ''} concluído{testResults.length > 1 ? 's' : ''})
                  </button>
                </div>
              )}
            </div>
          )}

          {currentStep === 'acuity-selector' && (
            <AcuityTestSelector onTestSelect={handleAcuityTestSelect} />
          )}

          {currentStep === 'acuity-test' && selectedAcuityTest && (
            <SpecificAcuityTest testType={selectedAcuityTest} onComplete={handleTestComplete} />
          )}

          {currentStep === 'contrast' && (
            <ContrastTest onComplete={handleTestComplete} />
          )}

          {currentStep === 'colors' && (
            <ColorTest onComplete={handleTestComplete} />
          )}

          {currentStep === 'results' && userProfile && (
            <Results 
              profile={userProfile} 
              results={testResults} 
              onRestart={resetApp}
            />
          )}
        </main>

        {/* Footer Expandido com Informações da Imagem */}
        <footer className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-slate-700/50 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Seção Principal do VisioTest+ */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  VisioTest+
                </h2>
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Plataforma avançada de testes visuais com tecnologia de ponta, oferecendo resultados personalizados 
                e análises detalhadas para cuidar da sua saúde visual com precisão e acessibilidade.
              </p>
            </div>

            {/* Estatísticas e Recursos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">100%</div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">Seguro</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">9</div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">Tipos de Teste</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">10k+</div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">Usuários</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">95%</div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">Precisão</div>
              </div>
            </div>

            {/* Recursos e Benefícios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Dados Seguros</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Informações protegidas e criptografadas</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                <Eye className="w-12 h-12 mx-auto mb-4 text-emerald-600 dark:text-emerald-400" />
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Privacidade Total</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Seus dados são completamente privados</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
                <Target className="w-12 h-12 mx-auto mb-4 text-purple-600 dark:text-purple-400" />
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Resultados Precisos</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Análises detalhadas e confiáveis</p>
              </div>
              
              <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border border-amber-200 dark:border-amber-800">
                <Award className="w-12 h-12 mx-auto mb-4 text-amber-600 dark:text-amber-400" />
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Recomendações Personalizadas</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Orientações específicas para você</p>
              </div>
            </div>

            {/* Disclaimer Médico Destacado */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-8 mb-12">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-10 h-10 text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-3 text-xl">
                    ⚠️ Importante - Disclaimer Médico
                  </h4>
                  <p className="text-amber-700 dark:text-amber-300 leading-relaxed text-lg">
                    O VisioTest+ é uma ferramenta de triagem e educação visual, <strong>NÃO substituindo consultas médicas profissionais</strong>. 
                    Os resultados servem como orientação inicial. Para diagnósticos precisos, tratamentos e acompanhamento da sua saúde visual, 
                    consulte sempre um oftalmologista qualificado.
                  </p>
                </div>
              </div>
            </div>

            {/* Rodapé Final */}
            <div className="text-center border-t border-gray-200 dark:border-slate-700 pt-8">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2 font-semibold">
                VisioTest+ - Tecnologia avançada para cuidar da sua visão
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                © 2024 VisioTest+. Desenvolvido com tecnologia de ponta para sua saúde visual.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

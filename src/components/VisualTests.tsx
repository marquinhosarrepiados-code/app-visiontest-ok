// Componentes de testes visuais para VisioTest+
'use client'

import { useState, useEffect } from 'react'
import { Eye, BarChart3, Palette } from 'lucide-react'

export interface TestResult {
  id?: string
  userId: string
  testType: 'acuidade' | 'contraste' | 'cores'
  score: number
  level: number
  duration: number
  date: Date
  details: any
}

// Componente de Teste de Cores
export function ColorTest({ onComplete }: { onComplete: (result: Omit<TestResult, 'id' | 'userId' | 'date'>) => void }) {
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [currentColors, setCurrentColors] = useState<{ target: string; options: string[] }>({ target: '', options: [] })
  const [startTime] = useState(Date.now())
  const [showResult, setShowResult] = useState(false)

  const colorSets = [
    // Nível 1-3: Cores básicas bem distintas
    { target: '#FF0000', options: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'] },
    { target: '#00FF00', options: ['#FF0000', '#00FF00', '#0000FF', '#FF00FF'] },
    { target: '#0000FF', options: ['#FF0000', '#00FFFF', '#0000FF', '#FFFF00'] },
    
    // Nível 4-6: Tons similares
    { target: '#FF6B6B', options: ['#FF6B6B', '#FF8E8E', '#FFB3B3', '#FF4444'] },
    { target: '#4ECDC4', options: ['#4ECDC4', '#6ED5CE', '#8EDDD8', '#2EC5BC'] },
    { target: '#45B7D1', options: ['#45B7D1', '#67C5D9', '#89D3E1', '#23A9C9'] },
    
    // Nível 7-10: Tons muito próximos (daltonismo)
    { target: '#8B4513', options: ['#8B4513', '#A0522D', '#CD853F', '#D2691E'] },
    { target: '#228B22', options: ['#228B22', '#32CD32', '#90EE90', '#00FF00'] },
    { target: '#4169E1', options: ['#4169E1', '#6495ED', '#87CEEB', '#1E90FF'] },
    { target: '#DC143C', options: ['#DC143C', '#B22222', '#CD5C5C', '#F08080'] }
  ]

  useEffect(() => {
    generateNewColorSet()
  }, [level])

  const generateNewColorSet = () => {
    const colorSet = colorSets[Math.min(level - 1, colorSets.length - 1)]
    const shuffledOptions = [...colorSet.options].sort(() => Math.random() - 0.5)
    setCurrentColors({
      target: colorSet.target,
      options: shuffledOptions
    })
  }

  const handleAnswer = (selectedColor: string) => {
    if (selectedColor === currentColors.target) {
      setScore(prev => prev + 1)
      if (level < 10) {
        setLevel(prev => prev + 1)
        generateNewColorSet()
      } else {
        completeTest()
      }
    } else {
      completeTest()
    }
  }

  const completeTest = () => {
    const duration = Date.now() - startTime
    const result = {
      testType: 'cores' as const,
      score,
      level,
      duration,
      details: { maxLevel: level, correctAnswers: score }
    }
    setShowResult(true)
    setTimeout(() => onComplete(result), 2000)
  }

  if (showResult) {
    return (
      <div className="text-center p-8">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Palette className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Teste Concluído!</h3>
        <p className="text-gray-600 dark:text-gray-300">Pontuação: {score}/10</p>
        <p className="text-gray-600 dark:text-gray-300">Nível alcançado: {level}</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Teste de Percepção de Cores</h2>
        <p className="text-gray-600 dark:text-gray-300">Nível {level}/10 - Identifique a cor correspondente</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(level / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
          Encontre esta cor:
        </p>
        <div 
          className="w-24 h-24 rounded-full mx-auto border-4 border-gray-300 dark:border-gray-600 shadow-lg"
          style={{ backgroundColor: currentColors.target }}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {currentColors.options.map((color, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(color)}
            className="p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg border-2 border-gray-200 dark:border-gray-600 transition-all duration-200 hover:scale-105"
          >
            <div 
              className="w-16 h-16 rounded-full mx-auto border-2 border-gray-300 dark:border-gray-500"
              style={{ backgroundColor: color }}
            ></div>
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Dica: Observe cuidadosamente as diferenças sutis entre as cores
        </p>
      </div>
    </div>
  )
}

// Componente de Teste de Acuidade Melhorado
export function EnhancedAcuityTest({ onComplete }: { onComplete: (result: Omit<TestResult, 'id' | 'userId' | 'date'>) => void }) {
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [currentDirection, setCurrentDirection] = useState<'up' | 'down' | 'left' | 'right'>('right')
  const [startTime] = useState(Date.now())
  const [showResult, setShowResult] = useState(false)

  const directions = ['up', 'down', 'left', 'right'] as const

  useEffect(() => {
    generateNewDirection()
  }, [level])

  const generateNewDirection = () => {
    const randomDirection = directions[Math.floor(Math.random() * directions.length)]
    setCurrentDirection(randomDirection)
  }

  const handleAnswer = (answer: typeof currentDirection) => {
    if (answer === currentDirection) {
      setScore(prev => prev + 1)
      if (level < 10) {
        setLevel(prev => prev + 1)
        generateNewDirection()
      } else {
        completeTest()
      }
    } else {
      completeTest()
    }
  }

  const completeTest = () => {
    const duration = Date.now() - startTime
    const result = {
      testType: 'acuidade' as const,
      score,
      level,
      duration,
      details: { maxLevel: level, correctAnswers: score }
    }
    setShowResult(true)
    setTimeout(() => onComplete(result), 2000)
  }

  if (showResult) {
    return (
      <div className="text-center p-8">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Teste Concluído!</h3>
        <p className="text-gray-600 dark:text-gray-300">Pontuação: {score}/10</p>
        <p className="text-gray-600 dark:text-gray-300">Nível alcançado: {level}</p>
      </div>
    )
  }

  // Calcular tamanho da letra E baseado no nível
  const fontSize = Math.max(200 - (level * 15), 24)
  
  // Rotação baseada na direção
  const getRotation = () => {
    switch (currentDirection) {
      case 'up': return 'rotate(-90deg)'
      case 'down': return 'rotate(90deg)'
      case 'left': return 'rotate(180deg)'
      case 'right': return 'rotate(0deg)'
      default: return 'rotate(0deg)'
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Teste de Acuidade Visual</h2>
        <p className="text-gray-600 dark:text-gray-300">Nível {level}/10 - Identifique a direção da abertura da letra E</p>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(level / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="text-center mb-8 py-12">
        <div 
          className="inline-block text-black font-mono font-bold transition-all duration-500"
          style={{ 
            fontSize: `${fontSize}px`,
            transform: getRotation(),
            lineHeight: 1
          }}
        >
          E
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { direction: 'up' as const, icon: '↑', label: 'Para Cima' },
          { direction: 'down' as const, icon: '↓', label: 'Para Baixo' },
          { direction: 'left' as const, icon: '←', label: 'Para Esquerda' },
          { direction: 'right' as const, icon: '→', label: 'Para Direita' }
        ].map(({ direction, icon, label }) => (
          <button
            key={direction}
            onClick={() => handleAnswer(direction)}
            className="p-6 bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg border-2 border-blue-200 dark:border-blue-700 transition-all duration-200 hover:scale-105"
          >
            <div className="text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Mantenha-se a aproximadamente 3 metros da tela para melhor precisão
        </p>
      </div>
    </div>
  )
}
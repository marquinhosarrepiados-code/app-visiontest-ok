// Firebase Configuration for VisioTest+
// Este é um mock para desenvolvimento - substitua pelas configurações reais do Firebase

export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

// Mock Firebase para desenvolvimento
export const mockFirestore = {
  collection: (name: string) => ({
    add: async (data: any) => {
      console.log(`[Firebase Mock] Salvando em ${name}:`, data)
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 500))
      return { id: Date.now().toString() }
    },
    doc: (id: string) => ({
      get: async () => {
        console.log(`[Firebase Mock] Buscando documento ${id}`)
        return { 
          exists: true, 
          data: () => ({ id, createdAt: new Date() })
        }
      },
      set: async (data: any) => {
        console.log(`[Firebase Mock] Atualizando ${id}:`, data)
        await new Promise(resolve => setTimeout(resolve, 300))
      },
      update: async (data: any) => {
        console.log(`[Firebase Mock] Atualizando parcialmente ${id}:`, data)
        await new Promise(resolve => setTimeout(resolve, 300))
      }
    }),
    where: (field: string, operator: string, value: any) => ({
      get: async () => {
        console.log(`[Firebase Mock] Query: ${field} ${operator} ${value}`)
        return {
          docs: [],
          forEach: (callback: any) => {}
        }
      }
    }),
    orderBy: (field: string, direction?: 'asc' | 'desc') => ({
      limit: (count: number) => ({
        get: async () => {
          console.log(`[Firebase Mock] Query ordenada: ${field} ${direction} limit ${count}`)
          return {
            docs: [],
            forEach: (callback: any) => {}
          }
        }
      })
    })
  })
}

// Webhook para envio de dados
export const sendWebhook = async (data: any, endpoint: string = 'https://webhook.site/your-endpoint') => {
  try {
    console.log('[Webhook] Enviando dados:', data)
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'VisioTest+ App'
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        app: 'VisioTest+',
        version: '1.0.0',
        ...data
      })
    })
    
    if (response.ok) {
      console.log('[Webhook] Dados enviados com sucesso')
    } else {
      console.warn('[Webhook] Resposta não OK:', response.status)
    }
  } catch (error) {
    console.error('[Webhook] Erro ao enviar dados:', error)
    // Em produção, você pode implementar retry logic aqui
  }
}

// Configuração real do Firebase (descomentado quando configurar)
/*
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
*/

// Tipos para TypeScript
export interface UserProfile {
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
  paymentStatus: 'pending' | 'paid' | 'failed'
}

export interface TestResult {
  id?: string
  userId: string
  testType: 'acuidade' | 'contraste' | 'cores'
  testSubtype?: string
  score: number
  level: number
  duration: number
  date: Date
  details: any
}

// Utilitários para Firebase
export const saveUserProfile = async (profile: UserProfile) => {
  try {
    const result = await mockFirestore.collection('users').add(profile)
    await sendWebhook({ type: 'user_profile_saved', data: profile })
    return result
  } catch (error) {
    console.error('Erro ao salvar perfil do usuário:', error)
    throw error
  }
}

export const saveTestResult = async (result: TestResult) => {
  try {
    const saved = await mockFirestore.collection('test_results').add(result)
    await sendWebhook({ type: 'test_result_saved', data: result })
    return saved
  } catch (error) {
    console.error('Erro ao salvar resultado do teste:', error)
    throw error
  }
}

export const getUserHistory = async (userId: string) => {
  try {
    const results = await mockFirestore.collection('test_results')
      .where('userId', '==', userId)
      .orderBy('date', 'desc')
      .get()
    
    return results.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Erro ao buscar histórico do usuário:', error)
    throw error
  }
}

// Configurações para exportação AAB (Android App Bundle)
export const aabConfig = {
  appName: 'VisioTest+',
  packageName: 'com.visiotest.plus',
  versionCode: 1,
  versionName: '1.0.0',
  minSdkVersion: 21,
  targetSdkVersion: 34,
  permissions: [
    'android.permission.INTERNET',
    'android.permission.ACCESS_NETWORK_STATE',
    'android.permission.CAMERA', // Para futuros recursos de câmera
    'android.permission.WRITE_EXTERNAL_STORAGE' // Para exportar resultados
  ],
  features: [
    'android.hardware.camera',
    'android.hardware.camera.autofocus'
  ]
}

export default mockFirestore
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Aqui você pode processar as notificações do Mercado Pago
    // Por exemplo: atualizar status do pedido no banco de dados
    
    console.log('Webhook recebido:', body)
    
    // Retornar 200 para confirmar recebimento
    return NextResponse.json({ received: true }, { status: 200 })
    
  } catch (error) {
    console.error('Erro ao processar webhook:', error)
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Mercado Pago pode fazer GET para validar a URL
  return NextResponse.json({ status: 'ok' }, { status: 200 })
}

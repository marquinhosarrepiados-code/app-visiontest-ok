import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log('Webhook Mercado Pago recebido:', body)

    // Verificar se é uma notificação de pagamento
    if (body.type === 'payment') {
      const paymentId = body.data.id
      const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

      // Buscar detalhes do pagamento
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      const payment = await response.json()

      // Verificar se o pagamento foi aprovado
      if (payment.status === 'approved') {
        const userId = payment.external_reference
        
        // Aqui você pode salvar no banco de dados que o usuário pagou
        console.log(`Pagamento aprovado para usuário: ${userId}`)
        
        // TODO: Atualizar status do usuário no banco de dados
        // await updateUserPaymentStatus(userId, true)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Erro ao processar webhook:', error)
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    )
  }
}

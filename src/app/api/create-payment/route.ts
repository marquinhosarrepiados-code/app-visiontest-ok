import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, userName } = body

    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

    if (!accessToken) {
      console.error('Access token não configurado')
      return NextResponse.json(
        { error: 'Credenciais do Mercado Pago não configuradas' },
        { status: 500 }
      )
    }

    // Criar preferência de pagamento
    const preference = {
      items: [
        {
          title: 'VisioTest+ - Acesso Completo',
          description: 'Acesso completo aos testes de visão do VisioTest+',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 15.0
        }
      ],
      payer: {
        name: userName,
        email: `user_${userId}@visiotest.com`
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/failure`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment/pending`
      },
      auto_return: 'approved',
      external_reference: userId.toString(),
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/webhook/mercadopago`
    }

    console.log('Criando preferência com:', JSON.stringify(preference, null, 2))

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(preference)
    })

    const responseText = await response.text()
    console.log('Resposta do Mercado Pago (status):', response.status)
    console.log('Resposta do Mercado Pago (body):', responseText)

    if (!response.ok) {
      let errorData
      try {
        errorData = JSON.parse(responseText)
      } catch {
        errorData = { message: responseText }
      }
      console.error('Erro do Mercado Pago:', errorData)
      return NextResponse.json(
        { 
          error: 'Erro ao criar preferência de pagamento',
          details: errorData 
        },
        { status: response.status }
      )
    }

    const data = JSON.parse(responseText)
    console.log('Preferência criada com sucesso:', data.id)

    return NextResponse.json({
      preferenceId: data.id,
      initPoint: data.init_point
    })
  } catch (error) {
    console.error('Erro ao processar pagamento:', error)
    return NextResponse.json(
      { 
        error: 'Erro interno ao processar pagamento',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}

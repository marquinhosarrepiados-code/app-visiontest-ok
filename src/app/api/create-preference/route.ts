import { NextRequest, NextResponse } from 'next/server'

const MERCADO_PAGO_ACCESS_TOKEN = 'TEST-6610391484416487-112619-580f2b2993d3ee44c80feb7a39cd4c81-77615316'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, quantity, unit_price } = body

    // Criar preferência de pagamento
    const preference = {
      items: [
        {
          title: title || 'Produto',
          quantity: quantity || 1,
          unit_price: unit_price || 100,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/pending`
      },
      auto_return: 'approved' as const,
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/webhook`
    }

    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`
      },
      body: JSON.stringify(preference)
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erro do Mercado Pago:', errorData)
      return NextResponse.json(
        { error: 'Erro ao criar preferência de pagamento', details: errorData },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json({ 
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point
    })

  } catch (error) {
    console.error('Erro ao processar pagamento:', error)
    return NextResponse.json(
      { error: 'Erro interno ao processar pagamento' },
      { status: 500 }
    )
  }
}

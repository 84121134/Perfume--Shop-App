import http from 'node:http'
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'

const port = Number(process.env.API_PORT || 3001)
const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
const publicUrl = (process.env.PUBLIC_URL || `http://localhost:${process.env.PORT || 8443}`).replace(/\/$/, '')

const client = new MercadoPagoConfig({ accessToken: accessToken || '' })
const preference = new Preference(client)
const payment = new Payment(client)
const ordersByReference = new Map()
const ordersByPaymentId = new Map()

function saveOrderStatus(paymentDetails, source = 'webhook') {
  const externalReference = paymentDetails.external_reference || String(paymentDetails.id)
  const order = {
    paymentId: paymentDetails.id,
    externalReference,
    status: paymentDetails.status,
    statusDetail: paymentDetails.status_detail,
    amount: paymentDetails.transaction_amount ?? paymentDetails.total_amount ?? null,
    source,
    updatedAt: new Date().toISOString(),
  }

  ordersByReference.set(externalReference, order)
  ordersByPaymentId.set(String(paymentDetails.id), order)

  return order
}

const products = {
  1: { title: 'Eudora - maracujá', price: 29.9 },
  2: { title: 'Natura - Especiarias', price: 134.9 },
  3: { title: 'Natura - Homem', price: 134.9 },
  4: { title: 'Luna - Fascinante', price: 94.9 },
  5: { title: 'Pula Pula - Água de colônia', price: 64 },
  6: { title: 'Pique Pega - Água de colônia', price: 64.9 },
  7: { title: 'Natura - Todo Dia cada', price: 61.9 },
  8: { title: 'Natura - kaiak cada', price: 39.9 },
  9: { title: 'Natuara - Todo Dia a Caixa 5', price: 31.9 },
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
  })
  response.end(JSON.stringify(body))
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''
    request.on('data', chunk => {
      body += chunk
      if (body.length > 100_000) reject(new Error('Payload muito grande'))
    })
    request.on('end', () => {
      try {
        resolve(JSON.parse(body))
      } catch {
        reject(new Error('JSON inválido'))
      }
    })
    request.on('error', reject)
  })
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    })
    response.end()
    return
  }

  if (!accessToken) {
    sendJson(response, 500, { error: 'MERCADOPAGO_ACCESS_TOKEN não configurado no servidor' })
    return
  }

  if (request.method === 'GET' && request.url.startsWith('/api/mercadopago/status')) {
    try {
      const url = new URL(request.url, 'http://localhost')
      const externalReference = url.searchParams.get('externalReference') || url.searchParams.get('external_reference')
      const paymentId = url.searchParams.get('paymentId')

      const order = externalReference
        ? ordersByReference.get(externalReference)
        : paymentId
          ? ordersByPaymentId.get(paymentId)
          : null

      if (!order) {
        sendJson(response, 404, { error: 'Pedido não encontrado' })
        return
      }

      sendJson(response, 200, { order })
    } catch (error) {
      sendJson(response, 400, { error: error instanceof Error ? error.message : 'Consulta inválida' })
    }

    return
  }

  if (request.method === 'POST' && request.url === '/api/mercadopago/webhook') {
    try {
      const payload = await readBody(request)
      const paymentId = payload?.data?.id ?? payload?.id

      if (!paymentId) {
        sendJson(response, 400, { error: 'Evento do Mercado Pago sem identificador de pagamento' })
        return
      }

      const paymentDetails = await payment.get({ id: paymentId })
      const order = saveOrderStatus(paymentDetails, 'webhook')

      console.log('Mercado Pago webhook recebido:', JSON.stringify({
        paymentId,
        status: order.status,
        externalReference: order.externalReference,
        eventType: payload.type,
      }))

      sendJson(response, 200, {
        received: true,
        paymentId,
        status: order.status,
        externalReference: order.externalReference,
      })
    } catch (error) {
      console.error('Erro no webhook do Mercado Pago:', error)
      sendJson(response, 400, { error: error instanceof Error ? error.message : 'Webhook inválido' })
    }

    return
  }

  if (request.method !== 'POST' || request.url !== '/api/mercadopago/preference') {
    sendJson(response, 404, { error: 'Rota não encontrada' })
    return
  }

  try {
    const payload = await readBody(request)
    const items = Array.isArray(payload.items) ? payload.items : []
    const preferenceItems = items.map(item => {
      const product = products[Number(item.id)]
      const quantity = Number(item.quantity)
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) throw new Error('Carrinho inválido')
      return { title: product.title, quantity, unit_price: product.price, currency_id: 'BRL' }
    })

    if (preferenceItems.length === 0 || preferenceItems.length > 50) throw new Error('Carrinho inválido')

    const externalReference = `carol-presentes-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    ordersByReference.set(externalReference, {
      externalReference,
      status: 'pending',
      source: 'preference-created',
      updatedAt: new Date().toISOString(),
    })

    const result = await preference.create({
      body: {
        items: preferenceItems,
        back_urls: {
          success: `${publicUrl}/?checkout=success`,
          pending: `${publicUrl}/?checkout=pending`,
          failure: `${publicUrl}/?checkout=failure`,
        },
        notification_url: process.env.MERCADOPAGO_NOTIFICATION_URL || undefined,
        external_reference: externalReference,
      },
    })

    sendJson(response, 200, {
      initPoint: result.init_point,
      sandboxInitPoint: result.sandbox_init_point,
      externalReference,
    })
  } catch (error) {
    sendJson(response, 400, { error: error instanceof Error ? error.message : 'Requisição inválida' })
  }
})

server.listen(port, () => console.log(`API do Mercado Pago em http://localhost:${port}`))
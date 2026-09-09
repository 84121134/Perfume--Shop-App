import { MercadoPagoConfig, Payment, Preference } from 'mercadopago'

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' })
const preference = new Preference(client)
const payment = new Payment(client)

const ordersByReference = new Map()
const ordersByPaymentId = new Map()

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

function sendJson(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.end(JSON.stringify(body))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''

    req.on('data', chunk => {
      body += chunk
      if (body.length > 100_000) {
        reject(new Error('Payload muito grande'))
      }
    })

    req.on('end', () => {
      if (!body) {
        resolve({})
        return
      }

      try {
        resolve(JSON.parse(body))
      } catch {
        reject(new Error('JSON inválido'))
      }
    })

    req.on('error', reject)
  })
}

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

function resolvePublicUrl(req) {
  if (process.env.PUBLIC_URL) {
    return process.env.PUBLIC_URL.replace(/\/$/, '')
  }

  const proto = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:8443'

  return `${proto}://${host}`.replace(/\/$/, '')
}

export default async function handler(req, res) {
  const url = new URL(req.url, 'https://example.com')
  const pathParts = url.pathname.split('/').filter(Boolean)
  const slug = pathParts.slice(2)
  const route = slug[0]

  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {})
    return
  }

  if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
    sendJson(res, 500, { error: 'MERCADOPAGO_ACCESS_TOKEN não configurado no servidor' })
    return
  }

  if (req.method === 'GET' && route === 'status') {
    try {
      const externalReference = url.searchParams.get('externalReference') || url.searchParams.get('external_reference')
      const paymentId = url.searchParams.get('paymentId')

      const order = externalReference
        ? ordersByReference.get(externalReference)
        : paymentId
          ? ordersByPaymentId.get(paymentId)
          : null

      if (!order) {
        sendJson(res, 404, { error: 'Pedido não encontrado' })
        return
      }

      sendJson(res, 200, { order })
    } catch (error) {
      sendJson(res, 400, { error: error instanceof Error ? error.message : 'Consulta inválida' })
    }

    return
  }

  if (req.method === 'POST' && route === 'webhook') {
    try {
      const payload = await readBody(req)
      const paymentId = payload?.data?.id ?? payload?.id

      if (!paymentId) {
        sendJson(res, 400, { error: 'Evento do Mercado Pago sem identificador de pagamento' })
        return
      }

      const paymentDetails = await payment.get({ id: paymentId })
      const order = saveOrderStatus(paymentDetails, 'webhook')

      sendJson(res, 200, {
        received: true,
        paymentId,
        status: order.status,
        externalReference: order.externalReference,
      })
    } catch (error) {
      sendJson(res, 400, { error: error instanceof Error ? error.message : 'Webhook inválido' })
    }

    return
  }

  if (req.method !== 'POST' || route !== 'preference') {
    sendJson(res, 404, { error: 'Rota não encontrada' })
    return
  }

  try {
    const payload = await readBody(req)
    const items = Array.isArray(payload.items) ? payload.items : []

    const preferenceItems = items.map(item => {
      const product = products[Number(item.id)]
      const quantity = Number(item.quantity)

      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        throw new Error('Carrinho inválido')
      }

      return {
        title: product.title,
        quantity,
        unit_price: product.price,
        currency_id: 'BRL',
      }
    })

    if (preferenceItems.length === 0 || preferenceItems.length > 50) {
      throw new Error('Carrinho inválido')
    }

    const externalReference = `carol-presentes-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    ordersByReference.set(externalReference, {
      externalReference,
      status: 'pending',
      source: 'preference-created',
      updatedAt: new Date().toISOString(),
    })

    const publicUrl = resolvePublicUrl(req)
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

    sendJson(res, 200, {
      initPoint: result.init_point,
      sandboxInitPoint: result.sandbox_init_point,
      externalReference,
    })
  } catch (error) {
    sendJson(res, 400, { error: error instanceof Error ? error.message : 'Requisição inválida' })
  }
}

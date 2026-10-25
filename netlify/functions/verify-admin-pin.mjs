import { timingSafeEqual } from 'node:crypto'

function matches(candidate, expected) {
  const a = Buffer.from(candidate)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export default async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Método no permitido.' }, { status: 405 })
  }

  const expected = (Netlify.env.get('ADMIN_PIN') ?? Netlify.env.get('VITE_ADMIN_PIN') ?? '').trim()
  if (!expected) {
    return Response.json(
      { error: 'El PIN de administración no está configurado en el servidor.' },
      { status: 503 },
    )
  }

  let pin = ''
  try {
    const body = await req.json()
    pin = typeof body?.pin === 'string' ? body.pin.trim() : ''
  } catch {
    /* cuerpo inválido: se trata como PIN vacío */
  }

  if (!matches(pin, expected)) {
    return Response.json({ error: 'PIN incorrecto. Inténtalo de nuevo.' }, { status: 401 })
  }

  return Response.json({ ok: true })
}

export const config = {
  path: '/api/verify-admin-pin',
}

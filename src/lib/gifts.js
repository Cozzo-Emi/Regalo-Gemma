import { get, onValue, push, ref, runTransaction, set } from 'firebase/database'
import { db, isDemoMode } from './firebase'
import { addDemoGift, reserveDemoGift, resetDemoGifts, subscribeDemoGifts } from './demo'

function normalize(gifts) {
  if (!gifts) return []

  return Object.entries(gifts)
    .map(([id, gift]) => ({
      id,
      producto: gift?.producto ?? '',
      precio: gift?.precio ?? '',
      link: gift?.link ?? '',
      imagen: gift?.imagen ?? '',
      reservado: Boolean(gift?.reservado),
      regala_nombre: gift?.regala_nombre ?? '',
    }))
    .sort((a, b) => a.id.localeCompare(b.id))
}

export function subscribeToGifts(onData, onError) {
  if (isDemoMode) {
    return subscribeDemoGifts((gifts) => onData(normalize(gifts)))
  }

  return onValue(
    ref(db, 'regalos'),
    (snapshot) => onData(normalize(snapshot.val())),
    (error) => onError?.(error),
  )
}

export async function reserveGift(id, rawName) {
  const nombre = rawName.trim().replace(/\s+/g, ' ')
  if (nombre.length < 2) throw new Error('Escribe tu nombre para reservar.')

  if (isDemoMode) {
    reserveDemoGift(id, nombre)
    return
  }

  const giftRef = ref(db, `regalos/${id}`)
  const current = await get(giftRef)

  if (!current.exists()) throw new Error('Ese regalo ya no está disponible.')
  if (current.val().reservado) throw new Error('Ese regalo ya fue reservado por otra persona.')

  const result = await runTransaction(giftRef, (gift) => {
    if (!gift || gift.reservado) return undefined
    return { ...gift, reservado: true, regala_nombre: nombre }
  })

  if (!result.committed || result.snapshot.val()?.regala_nombre !== nombre) {
    throw new Error('Ese regalo acaba de ser reservado por otra persona.')
  }
}

export async function addGift({ producto, precio, link, imagen }) {
  const payload = {
    producto: producto.trim(),
    precio: precio.trim(),
    link: link.trim(),
    imagen: imagen.trim(),
    reservado: false,
    regala_nombre: '',
  }

  if (isDemoMode) {
    addDemoGift(payload)
    return
  }

  await set(push(ref(db, 'regalos')), payload)
}

export function resetDemoData() {
  if (isDemoMode) resetDemoGifts()
}

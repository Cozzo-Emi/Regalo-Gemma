const STORAGE_KEY = 'regalo-gemma:regalos'

const SEED = {
  'g-001': {
    producto: 'Cuna de madera convertible',
    precio: '$850.000',
    link: 'https://example.com/producto/cuna',
    imagen: '',
    reservado: false,
    regala_nombre: '',
  },
  'g-002': {
    producto: 'Cochecito para bebé',
    precio: '$1.200.000',
    link: 'https://example.com/producto/cochecito',
    imagen: '',
    reservado: true,
    regala_nombre: 'Tía Marcela',
  },
  'g-003': {
    producto: 'Set de sábanas y cobijas',
    precio: '$180.000',
    link: 'https://example.com/producto/sabanas',
    imagen: '',
    reservado: false,
    regala_nombre: '',
  },
  'g-004': {
    producto: 'Bañera portátil',
    precio: '$120.000',
    link: 'https://example.com/producto/banera',
    imagen: '',
    reservado: false,
    regala_nombre: '',
  },
  'g-005': {
    producto: 'Mochila pañalera',
    precio: '$220.000',
    link: 'https://example.com/producto/mochila',
    imagen: '',
    reservado: true,
    regala_nombre: 'Familia Rodríguez',
  },
  'g-006': {
    producto: 'Silla alta para comer',
    precio: '$350.000',
    link: 'https://example.com/producto/silla',
    imagen: '',
    reservado: false,
    regala_nombre: '',
  },
  'g-007': {
    producto: 'Monitor de bebé',
    precio: '$450.000',
    link: 'https://example.com/producto/monitor',
    imagen: '',
    reservado: false,
    regala_nombre: '',
  },
  'g-008': {
    producto: 'Kit de biberones anti cólicos',
    precio: '$95.000',
    link: 'https://example.com/producto/biberones',
    imagen: '',
    reservado: false,
    regala_nombre: '',
  },
}

const listeners = new Set()
let cache = null

const clone = (value) => JSON.parse(JSON.stringify(value))

function read() {
  if (cache) return cache

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    cache = raw ? JSON.parse(raw) : clone(SEED)
  } catch {
    cache = clone(SEED)
  }

  if (!localStorage.getItem(STORAGE_KEY)) {
    persist()
  }

  return cache
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache))
  } catch {
    /* el modo demo sigue funcionando en memoria */
  }
  listeners.forEach((listener) => listener(clone(cache)))
}

export function subscribeDemoGifts(onData) {
  read()
  listeners.add(onData)
  queueMicrotask(() => onData(clone(cache)))

  const onStorage = (event) => {
    if (event.key !== STORAGE_KEY) return
    cache = event.newValue ? JSON.parse(event.newValue) : clone(SEED)
    onData(clone(cache))
  }

  window.addEventListener('storage', onStorage)

  return () => {
    listeners.delete(onData)
    window.removeEventListener('storage', onStorage)
  }
}

export function reserveDemoGift(id, nombre) {
  read()
  const gift = cache[id]
  if (!gift) throw new Error('Ese regalo ya no está disponible.')
  if (gift.reservado) throw new Error('Ese regalo ya fue reservado por otra persona.')

  cache[id] = { ...gift, reservado: true, regala_nombre: nombre }
  persist()
  return cache[id]
}

export function addDemoGift(gift) {
  read()
  const id = `g-${Date.now()}`
  cache[id] = gift
  persist()
  return id
}

export function resetDemoGifts() {
  cache = clone(SEED)
  persist()
}

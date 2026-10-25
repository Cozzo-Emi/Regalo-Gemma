import { useCallback, useEffect, useMemo, useState } from 'react'
import AdminPanel from './components/AdminPanel'
import ConfirmationModal from './components/ConfirmationModal'
import GiftCards from './components/GiftCards'
import GiftTable from './components/GiftTable'
import Header from './components/Header'
import StatsBar from './components/StatsBar'
import Toast from './components/Toast'
import { GiftIcon } from './components/icons'
import { isDemoMode } from './lib/firebase'
import { addGift, reserveGift, resetDemoData, subscribeToGifts } from './lib/gifts'

function GiftSkeleton() {
  return (
    <div className="card animate-pulse space-y-5 p-6" aria-hidden="true">
      {[0, 1, 2].map((row) => (
        <div key={row} className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-pink-100/80" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-1/3 rounded-full bg-pink-100/80" />
            <div className="h-3 w-1/4 rounded-full bg-pink-50" />
          </div>
          <div className="h-8 w-24 rounded-xl bg-pink-50" />
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="card animate-rise-in px-6 py-14 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pink-50 text-pink-300">
        <GiftIcon className="h-8 w-8" />
      </div>
      <h2 className="mt-4 font-display text-xl font-bold text-ink">Aún no hay regalos en la lista</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
        Abre la zona de administración para agregar el primer regalo de Gemma Sofía.
      </p>
      <a href="#admin" className="btn-primary mt-6">
        Agregar un regalo
      </a>
    </div>
  )
}

export default function App() {
  const [gifts, setGifts] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [confirmation, setConfirmation] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    let active = true

    const unsubscribe = subscribeToGifts(
      (data) => {
        if (active) setGifts(data)
      },
      (error) => {
        if (!active) return
        setLoadError(error?.message || 'Error de conexión con la base de datos.')
        setGifts([])
      },
    )

    return () => {
      active = false
      unsubscribe?.()
    }
  }, [])

  useEffect(() => {
    if (!toast) return

    const timer = setTimeout(() => setToast(null), 4500)
    return () => clearTimeout(timer)
  }, [toast])

  const handleReserve = useCallback(async (gift, name) => {
    await reserveGift(gift.id, name)
    setConfirmation({ producto: gift.producto, regala_nombre: name })
  }, [])

  const handleAddGift = useCallback(async (data) => {
    await addGift(data)
    setToast({
      type: 'success',
      message: `“${data.producto.trim()}” se agregó a la lista.`,
    })
  }, [])

  const handleResetDemo = useCallback(() => {
    resetDemoData()
    setToast({ type: 'success', message: 'Datos de prueba restaurados.' })
  }, [])

  const closeConfirmation = useCallback(() => setConfirmation(null), [])

  const reservedCount = useMemo(
    () => (gifts ?? []).filter((gift) => gift.reservado).length,
    [gifts],
  )

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute top-40 -right-32 h-96 w-96 rounded-full bg-rose-100/70 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-100/50 blur-3xl" />
      </div>

      <main className="relative mx-auto w-full max-w-6xl px-4 pt-10 pb-14 sm:px-6 sm:pt-14 lg:px-8">
        <Header isDemo={isDemoMode} />

        {gifts !== null && <StatsBar total={gifts.length} reserved={reservedCount} />}

        {loadError && (
          <p
            role="alert"
            className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
          >
            No se pudo conectar con la base de datos. {loadError}
          </p>
        )}

        <section className="mt-6" aria-label="Lista de regalos">
          {gifts === null ? (
            <GiftSkeleton />
          ) : gifts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="hidden lg:block">
                <GiftTable gifts={gifts} onReserve={handleReserve} />
              </div>
              <div className="lg:hidden">
                <GiftCards gifts={gifts} onReserve={handleReserve} />
              </div>
            </>
          )}
        </section>

        <AdminPanel onAddGift={handleAddGift} onResetDemo={handleResetDemo} />

        <footer className="mt-12 text-center text-xs text-slate-400">
          Hecho con cariño para Gemma Sofía · {new Date().getFullYear()}
        </footer>
      </main>

      <ConfirmationModal confirmation={confirmation} onClose={closeConfirmation} />
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  )
}

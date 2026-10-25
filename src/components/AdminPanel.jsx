import { useId, useState } from 'react'
import { isDemoMode } from '../lib/firebase'
import { ChevronIcon, LockIcon, PlusIcon } from './icons'

// El PIN se valida en el servidor (función de Netlify) para no incluirlo en el bundle.
const PIN_REQUIRED = !isDemoMode
const SESSION_KEY = 'regalo-gemma:admin-unlocked'
const EMPTY_FORM = { producto: '', precio: '', link: '', imagen: '' }

function readUnlocked() {
  if (!PIN_REQUIRED) return false

  try {
    return sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export default function AdminPanel({ onAddGift, onResetDemo }) {
  const pinId = useId()
  const [open, setOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(readUnlocked)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [checkingPin, setCheckingPin] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [resetConfirm, setResetConfirm] = useState(false)

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    if (error) setError('')
  }

  async function handleUnlock(event) {
    event.preventDefault()
    if (checkingPin) return

    setCheckingPin(true)
    setPinError('')

    try {
      const response = await fetch('/api/verify-admin-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pin.trim() }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        setPinError(data?.error || 'PIN incorrecto. Inténtalo de nuevo.')
        setPin('')
        return
      }
    } catch {
      setPinError('No se pudo verificar el PIN. Revisa tu conexión e inténtalo de nuevo.')
      return
    } finally {
      setCheckingPin(false)
    }

    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {
      /* el desbloqueo dura solo esta vista si no hay sessionStorage */
    }

    setUnlocked(true)
    setPin('')
    setPinError('')
  }

  function handleLock() {
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      /* sin sessionStorage no hay nada que limpiar */
    }

    setUnlocked(false)
    setForm(EMPTY_FORM)
    setError('')
    setResetConfirm(false)
  }

  function handleReset() {
    onResetDemo?.()
    setResetConfirm(false)
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!form.producto.trim() || !form.precio.trim() || !form.link.trim()) {
      setError('Completa el producto, el precio y el enlace de la tienda.')
      return
    }

    setBusy(true)
    setError('')

    try {
      await onAddGift(form)
      setForm(EMPTY_FORM)
    } catch (err) {
      setError(err?.message || 'No se pudo agregar el regalo. Intenta de nuevo.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section id="admin" className="animate-rise-in mt-10">
      <div className="card overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="admin-panel"
          className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left transition hover:bg-pink-50/40 focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-100 sm:p-6"
        >
          <div>
            <h2 className="font-display text-base font-bold text-ink">Zona de administración</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Agrega nuevos regalos a la lista para los invitados.
            </p>
          </div>
          <ChevronIcon
            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div id="admin-panel" className="border-t border-pink-50">
            {PIN_REQUIRED && !unlocked ? (
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-primary-dark">
                    <LockIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-ink">Acceso restringido</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                      Ingresa el PIN para administrar la lista de regalos.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleUnlock} className="mt-4 flex max-w-sm gap-2">
                  <label htmlFor={pinId} className="sr-only">
                    PIN de administración
                  </label>
                  <input
                    id={pinId}
                    type="password"
                    value={pin}
                    onChange={(event) => {
                      setPin(event.target.value)
                      if (pinError) setPinError('')
                    }}
                    placeholder="PIN"
                    autoComplete="current-password"
                    maxLength={40}
                    aria-invalid={Boolean(pinError)}
                    aria-describedby={pinError ? `${pinId}-error` : undefined}
                    className="field"
                  />
                  <button type="submit" className="btn-primary" disabled={checkingPin}>
                    Desbloquear
                  </button>
                </form>

                {pinError && (
                  <p
                    id={`${pinId}-error`}
                    role="alert"
                    className="mt-2 text-xs font-medium text-rose-500"
                  >
                    {pinError}
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="admin-producto"
                    className="mb-1.5 block text-xs font-semibold text-ink"
                  >
                    Nombre del producto
                  </label>
                  <input
                    id="admin-producto"
                    name="producto"
                    type="text"
                    value={form.producto}
                    onChange={updateField}
                    placeholder="Cuna de madera"
                    maxLength={120}
                    required
                    disabled={busy}
                    className="field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-precio"
                    className="mb-1.5 block text-xs font-semibold text-ink"
                  >
                    Precio
                  </label>
                  <input
                    id="admin-precio"
                    name="precio"
                    type="text"
                    value={form.precio}
                    onChange={updateField}
                    placeholder="$150.000"
                    maxLength={40}
                    required
                    disabled={busy}
                    className="field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="admin-link"
                    className="mb-1.5 block text-xs font-semibold text-ink"
                  >
                    Enlace de la tienda
                  </label>
                  <input
                    id="admin-link"
                    name="link"
                    type="url"
                    value={form.link}
                    onChange={updateField}
                    placeholder="https://tienda.com/producto"
                    required
                    disabled={busy}
                    className="field"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="admin-imagen"
                    className="mb-1.5 block text-xs font-semibold text-ink"
                  >
                    Imagen del producto{' '}
                    <span className="font-normal text-slate-400">(opcional)</span>
                  </label>
                  <input
                    id="admin-imagen"
                    name="imagen"
                    type="url"
                    value={form.imagen}
                    onChange={updateField}
                    placeholder="https://tienda.com/imagen.jpg"
                    disabled={busy}
                    className="field"
                  />
                </div>

                {error && (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-600 sm:col-span-2"
                  >
                    {error}
                  </p>
                )}

                <div className="flex flex-col gap-3 border-t border-pink-50 pt-4 sm:col-span-2">
                  <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <p className="text-xs text-slate-400">
                        El regalo aparecerá al instante para todos.
                      </p>

                      {isDemoMode &&
                        (resetConfirm ? (
                          <span className="inline-flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            ¿Restaurar datos?
                            <button
                              type="button"
                              onClick={handleReset}
                              className="cursor-pointer font-semibold text-rose-500 hover:underline"
                            >
                              Sí, restaurar
                            </button>
                            <button
                              type="button"
                              onClick={() => setResetConfirm(false)}
                              className="cursor-pointer text-slate-400 hover:underline"
                            >
                              Cancelar
                            </button>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setResetConfirm(true)}
                            className="cursor-pointer text-xs text-slate-400 underline decoration-slate-200 underline-offset-2 transition hover:text-rose-500"
                          >
                            Reiniciar datos de prueba
                          </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                      {PIN_REQUIRED && (
                        <button type="button" onClick={handleLock} className="btn-ghost">
                          <LockIcon className="h-4 w-4" />
                          Bloquear
                        </button>
                      )}
                      <button type="submit" className="btn-primary flex-1 sm:flex-none" disabled={busy}>
                        <PlusIcon className="h-4 w-4" />
                        {busy ? 'Agregando…' : 'Agregar regalo'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

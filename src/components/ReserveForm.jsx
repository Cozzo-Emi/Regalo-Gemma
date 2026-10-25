import { useId, useState } from 'react'

export default function ReserveForm({ onReserve }) {
  const inputId = useId()
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const clean = name.trim()

    if (clean.length < 2) {
      setError('Escribe tu nombre para reservar.')
      return
    }

    setBusy(true)
    setError('')

    try {
      await onReserve(clean)
    } catch (err) {
      setError(err?.message || 'No se pudo reservar. Intenta de nuevo.')
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full min-w-[240px] max-w-[320px]">
      <div className="flex gap-2">
        <label htmlFor={inputId} className="sr-only">
          Tu nombre
        </label>
        <input
          id={inputId}
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
            if (error) setError('')
          }}
          placeholder="Tu nombre"
          autoComplete="name"
          maxLength={60}
          disabled={busy}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className="field px-3 py-2 text-sm"
        />
        <button type="submit" className="btn-primary px-3.5 py-2 text-xs" disabled={busy}>
          {busy ? 'Reservando…' : 'Reservar'}
        </button>
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs font-medium text-rose-500">
          {error}
        </p>
      )}
    </form>
  )
}

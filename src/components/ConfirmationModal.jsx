import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CheckIcon, CloseIcon } from './icons'

export default function ConfirmationModal({ confirmation, onClose }) {
  const open = Boolean(confirmation)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        onClick={(event) => event.stopPropagation()}
        className="animate-pop-in relative w-full max-w-md rounded-3xl bg-white p-7 text-center shadow-2xl shadow-pink-900/20 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 cursor-pointer rounded-full p-1.5 text-slate-400 transition hover:bg-pink-50 hover:text-ink focus:outline-none focus-visible:ring-4 focus-visible:ring-pink-100"
        >
          <CloseIcon />
        </button>

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint/60 text-mint-deep">
          <CheckIcon className="h-8 w-8" />
        </div>

        <h2
          id="confirmation-title"
          className="mt-5 font-display text-2xl leading-snug font-bold text-ink"
        >
          ¡Muchas gracias por tu regalo para Gemma Sofía!
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          <strong className="font-semibold text-ink">
            {confirmation?.regala_nombre || 'Tu regalo'}
          </strong>{' '}
          reservó{' '}
          <strong className="font-semibold text-ink">{confirmation?.producto}</strong>. Nadie más
          podrá elegirlo.
        </p>

        <button type="button" onClick={onClose} autoFocus className="btn-primary mt-6 w-full">
          Volver a la lista
        </button>
      </div>
    </div>,
    document.body,
  )
}

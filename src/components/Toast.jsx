import { CheckIcon, CloseIcon } from './icons'

export default function Toast({ toast, onClose }) {
  if (!toast) return null

  const isSuccess = toast.type === 'success'

  return (
    <div
      role="status"
      aria-live="polite"
      className={`animate-pop-in fixed bottom-5 left-1/2 z-[60] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-2xl border px-4 py-3 shadow-xl ${
        isSuccess
          ? 'border-mint/70 bg-white text-mint-deep'
          : 'border-red-200 bg-white text-red-600'
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isSuccess ? 'bg-mint/60' : 'bg-red-50'
        }`}
      >
        {isSuccess ? <CheckIcon className="h-4 w-4" /> : <CloseIcon className="h-4 w-4" />}
      </span>
      <p className="flex-1 text-xs leading-relaxed font-medium">{toast.message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar aviso"
        className="cursor-pointer rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-200"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  )
}

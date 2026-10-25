import { SparkleIcon } from './icons'

export default function Header({ isDemo }) {
  return (
    <header className="text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-primary-dark uppercase shadow-sm backdrop-blur">
        <SparkleIcon className="h-3.5 w-3.5" />
        Baby Shower de Gemma Sofía
      </span>

      <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
        Regalos para <span className="text-primary">Gemma Sofía</span>
      </h1>

      <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
        Elige un regalo, reserva con tu nombre y deja que los demás invitados sepan qué ya
        está cubierto. Tu reserva se guarda al instante.
      </p>

      {isDemo && (
        <p className="mx-auto mt-5 inline-block max-w-xl rounded-2xl border border-amber-200/70 bg-amber-50 px-4 py-2 text-xs leading-relaxed text-amber-700">
          <strong className="font-semibold">Modo demostración.</strong> Los datos se guardan
          solo en este navegador. Agrega las credenciales de Firebase para activar la nube.
        </p>
      )}
    </header>
  )
}

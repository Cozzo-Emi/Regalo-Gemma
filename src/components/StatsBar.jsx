export default function StatsBar({ total, reserved }) {
  const available = total - reserved
  const percent = total > 0 ? Math.round((reserved / total) * 100) : 0

  return (
    <section className="card animate-rise-in mt-8 p-5 sm:p-6" aria-label="Resumen de regalos">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold text-ink">
            {reserved} de {total} regalos reservados
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {total === 0
              ? 'Agrega el primer regalo para comenzar.'
              : available > 0
                ? `Todavía quedan ${available} ${available === 1 ? 'opción disponible' : 'opciones disponibles'}.`
                : '¡Todos los regalos ya tienen padrinos!'}
          </p>
        </div>
        <span className="rounded-full bg-mint/50 px-3.5 py-1.5 text-xs font-semibold text-mint-deep">
          {percent}% completo
        </span>
      </div>

      <div
        className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-pink-100/70"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={percent}
        aria-label="Progreso de regalos reservados"
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-primary to-primary-dark transition-[width] duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </section>
  )
}

import GiftThumb from './GiftThumb'
import ReserveForm from './ReserveForm'
import ReservedBadge from './ReservedBadge'
import { ExternalIcon } from './icons'

export default function GiftCards({ gifts, onReserve }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {gifts.map((gift, index) => (
        <article
          key={gift.id}
          className="card animate-rise-in flex flex-col p-3"
          style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
        >
          <GiftThumb
            imagen={gift.imagen}
            producto={gift.producto}
            className="h-36 w-full rounded-2xl"
          />

          <div className="flex flex-1 flex-col px-2 pt-4 pb-2">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-base leading-snug font-bold text-ink">
                {gift.producto}
              </h3>
              {gift.reservado ? (
                <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full bg-mint/60 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-mint-deep uppercase">
                  Reservado
                </span>
              ) : (
                <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full bg-pink-50 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-primary-dark uppercase">
                  Libre
                </span>
              )}
            </div>

            <p className="mt-1.5 text-sm font-semibold text-primary-dark">{gift.precio || '—'}</p>

            <div className="mt-4">
              {gift.link ? (
                <a
                  href={gift.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full py-2 text-xs"
                >
                  Ver en la tienda
                  <ExternalIcon className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="text-xs text-slate-300">Sin enlace de compra</span>
              )}
            </div>

            <div className="mt-auto pt-4">
              {gift.reservado ? (
                <div className="rounded-2xl bg-mint/25 px-3.5 py-3">
                  <p className="text-[10px] font-semibold tracking-[0.12em] text-mint-deep uppercase">
                    Lo regala
                  </p>
                  <div className="mt-1.5">
                    <ReservedBadge name={gift.regala_nombre} />
                  </div>
                </div>
              ) : (
                <ReserveForm onReserve={(name) => onReserve(gift, name)} />
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

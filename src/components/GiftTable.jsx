import GiftThumb from './GiftThumb'
import ReserveForm from './ReserveForm'
import ReservedBadge from './ReservedBadge'
import { ExternalIcon } from './icons'

export default function GiftTable({ gifts, onReserve }) {
  return (
    <div className="card animate-rise-in overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="bg-pink-50/70 text-[11px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
              <th scope="col" className="px-6 py-4 font-semibold">
                Regalo
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Precio
              </th>
              <th scope="col" className="px-4 py-4 font-semibold">
                Tienda
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Reserva
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pink-50">
            {gifts.map((gift) => (
              <tr
                key={gift.id}
                className={`transition-colors ${gift.reservado ? 'bg-mint/5' : 'hover:bg-pink-50/40'}`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3.5">
                    <GiftThumb imagen={gift.imagen} producto={gift.producto} className="h-12 w-12" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{gift.producto}</p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {gift.reservado ? 'Ya tiene padrino' : 'Disponible para regalar'}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <span className="text-sm font-semibold text-primary-dark">{gift.precio || '—'}</span>
                </td>

                <td className="px-4 py-4">
                  {gift.link ? (
                    <a
                      href={gift.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost px-3 py-1.5 text-xs"
                    >
                      Ver regalo
                      <ExternalIcon className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs text-slate-300">Sin enlace</span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {gift.reservado ? (
                    <div>
                      <ReservedBadge name={gift.regala_nombre} />
                      <p className="mt-1.5 text-[11px] text-slate-400">Reservado</p>
                    </div>
                  ) : (
                    <ReserveForm onReserve={(name) => onReserve(gift, name)} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

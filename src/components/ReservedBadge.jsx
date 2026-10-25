import { CheckIcon } from './icons'

export default function ReservedBadge({ name }) {
  return (
    <span
      title={name || 'Reservado'}
      className="inline-flex max-w-[220px] items-center gap-1.5 rounded-full bg-mint/60 px-3 py-1.5 text-xs font-semibold text-mint-deep"
    >
      <CheckIcon className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">{name || 'Reservado'}</span>
    </span>
  )
}

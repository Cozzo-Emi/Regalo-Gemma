export function GiftIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <path d="M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 7h20v5H2z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7v14" strokeLinecap="round" />
      <path d="M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ExternalIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M14 3h7v7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 14 21 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CheckIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={className} aria-hidden="true">
      <path d="m4 12.5 5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CloseIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  )
}

export function PlusIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  )
}

export function ChevronIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LockIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2.5" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" strokeLinecap="round" />
    </svg>
  )
}

export function SparkleIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.5c.4 3.9 1.6 5.1 5.5 5.5-3.9.4-5.1 1.6-5.5 5.5-.4-3.9-1.6-5.1-5.5-5.5 3.9-.4 5.1-1.6 5.5-5.5Z" />
      <path d="M18.5 14c.22 2.1.86 2.74 2.96 2.96-2.1.22-2.74.86-2.96 2.96-.22-2.1-.86-2.74-2.96-2.96 2.1-.22 2.74-.86 2.96-2.96Z" />
    </svg>
  )
}

import { SITE } from '../data/content'

/** Google Business Profile (GMB) profile link */
export const GMB_URL = SITE.social?.gmb || 'https://share.google/eW8mqyNEjn8Ke8QPs'

export function GmbIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
    </svg>
  )
}

/**
 * @param {{ className?: string, variant?: 'button' | 'ghost' | 'onDark' | 'text', label?: string }} props
 */
export default function GmbLink({
  className = '',
  variant = 'ghost',
  label = 'Find us on Google',
}) {
  const btnClass =
    variant === 'button'
      ? 'btn btn--orange'
      : variant === 'onDark'
        ? 'btn btn--onDark'
        : variant === 'text'
          ? 'gmb-link-text'
          : 'btn btn--ghost'

  return (
    <a
      className={`${btnClass} ${className}`.trim()}
      href={GMB_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open TEB Enterprises Google Business Profile"
    >
      <GmbIcon />
      <span>{label}</span>
    </a>
  )
}

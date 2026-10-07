import { useEffect, useRef, useState } from 'react'
import { getGmbProfile, mediaUrl } from '../api'
import { useReveal } from '../hooks'
import { GMB_URL } from './GmbLink'
import { SITE } from '../data/content'

const FALLBACK_IMG = '/gmb-office.png'

/** Public site assets stay on the website origin; API uploads/photos use the backend. */
function resolveGmbImage(path) {
  if (!path) return FALLBACK_IMG
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  if (path.startsWith('/api/') || path.startsWith('/uploads/')) return mediaUrl(path)
  return path
}

function GoogleWord() {
  return (
    <span className="gmb-google-word" aria-label="Google">
      <span style={{ color: '#4285F4' }}>G</span>
      <span style={{ color: '#EA4335' }}>o</span>
      <span style={{ color: '#FBBC05' }}>o</span>
      <span style={{ color: '#4285F4' }}>g</span>
      <span style={{ color: '#34A853' }}>l</span>
      <span style={{ color: '#EA4335' }}>e</span>
    </span>
  )
}

function GoogleMark({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.02l-2.2 2.19z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 11h-4V7h2v4h2v2z" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm6.9 6h-3.2a15.4 15.4 0 0 0-1.4-3.6A8.03 8.03 0 0 1 18.9 8zM12 4c.9 1.2 1.6 2.7 2 4H10c.4-1.3 1.1-2.8 2-4zM4.2 14a8.1 8.1 0 0 1 0-4h3.5a18 18 0 0 0 0 4H4.2zM10 18c-.4-1.3-1.1-2.8-2-4h4c-.4 1.3-1.1 2.8-2 4zm0-6a16 16 0 0 1 0-4h4a16 16 0 0 1 0 4h-4zm2 8c-.9-1.2-1.6-2.7-2-4h4c-.4 1.3-1.1 2.8-2 4zm2.7-1.4A15.4 15.4 0 0 0 16.1 16h3.2a8.03 8.03 0 0 1-4.6 2.6zM16.3 14c.2-1.3.3-2.6.3-4h3.5a8.1 8.1 0 0 1 0 4h-3.8zM5.1 8h3.2A15.4 15.4 0 0 1 9.7 4.4 8.03 8.03 0 0 0 5.1 8z" />
    </svg>
  )
}

function Stars({ count = 5, value }) {
  const filled = value != null ? Math.round(Number(value)) : count
  return (
    <span className="gmb-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`gmb-star${i < filled ? '' : ' gmb-star--empty'}`}>
          ★
        </span>
      ))}
    </span>
  )
}

function Avatar({ review }) {
  if (review.profile_photo_url) {
    return (
      <img
        className="gmb-review-card__avatar"
        src={review.profile_photo_url}
        alt=""
        width={40}
        height={40}
      />
    )
  }
  const letter = (review.initial || review.author || '?').toString().charAt(0).toUpperCase()
  return (
    <span
      className="gmb-review-card__avatar gmb-review-card__avatar--letter"
      style={{ background: review.color || '#1A73E8' }}
      aria-hidden="true"
    >
      {letter}
    </span>
  )
}

function ReviewCard({ review, profileUrl }) {
  return (
    <a
      className="gmb-review-card"
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Google review by ${review.author}`}
    >
      <div className="gmb-review-card__top">
        <Avatar review={review} />
        <div className="gmb-review-card__who">
          <strong>{review.author}</strong>
          <span>{review.meta || review.date}</span>
        </div>
      </div>
      <div className="gmb-review-card__rating">
        <Stars value={review.rating || 5} />
        <span>{review.date}</span>
      </div>
      <p>{review.text}</p>
      <span className="gmb-review-card__link">
        Read on Google <span className="arw">→</span>
      </span>
    </a>
  )
}

function ReviewsCarousel({ profile }) {
  const trackRef = useRef(null)
  const reviews = Array.isArray(profile.reviews) && profile.reviews.length ? profile.reviews : []
  const loop = reviews.length ? [...reviews, ...reviews] : []
  const profileUrl = profile.profile_url || GMB_URL

  useEffect(() => {
    const track = trackRef.current
    if (!track || reviews.length === 0) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    let raf = 0
    let x = 0
    let paused = false
    const speed = 0.45

    const onEnter = () => {
      paused = true
    }
    const onLeave = () => {
      paused = false
    }
    track.addEventListener('pointerenter', onEnter)
    track.addEventListener('pointerleave', onLeave)

    const tick = () => {
      if (!paused) {
        x += speed
        const half = track.scrollWidth / 2
        if (half > 0 && x >= half) x = 0
        track.style.transform = `translate3d(${-x}px,0,0)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      track.removeEventListener('pointerenter', onEnter)
      track.removeEventListener('pointerleave', onLeave)
    }
  }, [reviews.length])

  if (!reviews.length) return null

  return (
    <div className="gmb-reviews-row">
      <div className="gmb-reviews-row__head">
        <div className="gmb-reviews-row__score">
          <GoogleMark size={22} />
          <strong>{profile.rating}</strong>
          <Stars value={profile.rating} />
          <span>({profile.review_count}) Google reviews</span>
        </div>
        <a className="btn btn--ghost" href={profileUrl} target="_blank" rel="noopener noreferrer">
          <GoogleMark size={16} />
          <span>All reviews on Google</span>
        </a>
      </div>

      <div className="gmb-carousel" aria-label="Google reviews carousel">
        <div className="gmb-carousel__viewport">
          <div className="gmb-carousel__track" ref={trackRef}>
            {loop.map((review, i) => (
              <ReviewCard
                key={`${review.author}-${review.date}-${i}`}
                review={review}
                profileUrl={profileUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Find Us on Google — profile from /api/gmb/profile
 * @param {{ variant?: 'home' | 'about' }} props
 */
export default function GmbSection({ variant = 'home' }) {
  const isAbout = variant === 'about'
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    getGmbProfile(true)
      .then((data) => {
        if (!cancelled) setProfile(data)
      })
      .catch(() => {
        if (!cancelled) setError('Unable to load Google Business Profile right now.')
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Re-run reveal after async profile mounts (Home + About)
  useReveal(!!profile)

  const profileUrl = profile?.profile_url || GMB_URL
  const photoSrc = resolveGmbImage(profile?.photo_url)
  const websiteHref = profile?.website || 'https://tebpestcontrol.in'
  const websiteLabel = profile?.website_label || 'tebpestcontrol.in'

  return (
    <section id="gmb" className={`gmb-sec gmb-sec--${variant}`} aria-labelledby="gmb-heading">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">{isAbout ? 'Visit our office' : 'Our location'}</p>
          <h2 id="gmb-heading">
            Find Us on <GoogleWord />
          </h2>
          <p className="lede">
            {isAbout
              ? 'We are happy to welcome you. Check our Google Business Profile for location, photos, customer reviews and more.'
              : 'Visit our Google Business Profile to know more about our location, reviews and services.'}
          </p>
        </div>

        {error && !profile && (
          <p className="lede rv" style={{ color: 'var(--muted)' }}>
            {error}{' '}
            <a href={GMB_URL} target="_blank" rel="noopener noreferrer">
              Open Google Business Profile →
            </a>
          </p>
        )}

        {!profile && !error && (
          <p className="lede rv" style={{ color: 'var(--muted)' }}>
            Loading Google Business Profile…
          </p>
        )}

        {profile && (
          <>
            <div className="gmb-row gmb-row--info rv">
              <div className="gmb-office-media">
                <img
                  className="gmb-office-img"
                  src={photoSrc}
                  alt={`${profile.name} service technician`}
                />
              </div>
              <div className="gmb-address-panel">
                <div className="gmb-address-panel__brand">
                  <GoogleMark size={28} />
                  <div>
                    <h3>{profile.name}</h3>
                    <p className="gmb-tagline">{profile.category}</p>
                  </div>
                </div>

                <div className="gmb-reviews__score" style={{ marginBottom: 18 }}>
                  <strong style={{ color: 'var(--ink)', fontSize: '1.35rem' }}>{profile.rating}</strong>
                  <Stars value={profile.rating} />
                  <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                    ({profile.review_count})
                  </a>
                </div>

                <ul className="gmb-contact-list">
                  <li>
                    <span className="gmb-ico" aria-hidden="true">
                      <PinIcon />
                    </span>
                    <div>
                      <strong>Address</strong>
                      <p>{profile.address}</p>
                    </div>
                  </li>
                  <li>
                    <span className="gmb-ico" aria-hidden="true">
                      <ClockIcon />
                    </span>
                    <div>
                      <strong>Hours</strong>
                      <p className={profile.open_now ? 'gmb-open' : undefined}>{profile.hours_text}</p>
                    </div>
                  </li>
                  <li>
                    <span className="gmb-ico" aria-hidden="true">
                      <GlobeIcon />
                    </span>
                    <div>
                      <strong>Website</strong>
                      <p>
                        <a href={websiteHref} target="_blank" rel="noopener noreferrer">
                          {websiteLabel}
                        </a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="gmb-ico" aria-hidden="true">
                      <PhoneIcon />
                    </span>
                    <div>
                      <strong>Phone</strong>
                      <p>
                        <a href={profile.phone_href || SITE.phoneHref}>{profile.phone}</a>
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="gmb-address-panel__actions">
                  <a className="btn btn--orange" href={profileUrl} target="_blank" rel="noopener noreferrer">
                    <GoogleMark size={16} />
                    <span>View on Google</span>
                    <span className="arw">→</span>
                  </a>
                  <a
                    className="btn btn--ghost"
                    href={profile.map_directions_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Directions
                  </a>
                </div>
              </div>
            </div>

            <div className="gmb-row gmb-row--map rv">
              <div className="gmb-map gmb-map--full">
                <iframe
                  title={`${profile.name} on Google Maps`}
                  src={profile.map_embed_url}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="gmb-row gmb-row--reviews rv">
              <ReviewsCarousel profile={profile} />
            </div>
          </>
        )}
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { SITE } from '../data/content'

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '70vh',
        display: 'grid',
        placeItems: 'center',
        padding: 'clamp(48px,8vw,100px) 0',
      }}
    >
      <div className="wrap" style={{ textAlign: 'center', maxWidth: 560 }}>
        <p className="eyebrow" style={{ justifyContent: 'center' }}>
          Error 404
        </p>
        <h1 style={{ fontSize: 'clamp(2.4rem,5vw,3.6rem)', marginBottom: 16 }}>
          Page not found.
        </h1>
        <p className="lede" style={{ marginInline: 'auto', marginBottom: 28 }}>
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Try the homepage,
          services list, or call us for help.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link className="btn btn--orange" to="/">
            Back to home <span className="arw">→</span>
          </Link>
          <Link className="btn btn--ghost" to="/services">
            View services
          </Link>
          <a className="btn btn--ghost" href={SITE.phoneHref}>
            Call {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  )
}

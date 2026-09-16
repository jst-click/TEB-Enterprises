import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPublicServices } from '../api'
import { B2B_SERVICES, B2C_SERVICES } from '../data/content'

function Card({ code, title, text, featured, to }) {
  const inner = (
    <>
      {code && <span className="num" style={featured ? { color: '#FFA45C' } : undefined}>{code}</span>}
      <h3>{title}</h3>
      <p style={featured ? { color: 'rgba(255,255,255,.72)' } : undefined}>{text}</p>
      {to && (
        <span
          style={{
            display: 'inline-block',
            marginTop: 14,
            color: featured ? '#FFA45C' : 'var(--orange)',
            fontWeight: 600,
            fontSize: '.9rem',
          }}
        >
          View details →
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        className="card"
        style={{
          textDecoration: 'none',
          display: 'block',
          cursor: 'pointer',
          ...(featured ? { background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' } : {}),
        }}
      >
        {inner}
      </Link>
    )
  }

  return (
    <div
      className="card"
      style={featured ? { background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' } : undefined}
    >
      {inner}
    </div>
  )
}

export default function Services() {
  const [tab, setTab] = useState('b2c')
  const [b2c, setB2c] = useState([])
  const [b2b, setB2b] = useState([])

  useEffect(() => {
    Promise.all([
      getPublicServices({ audience: 'b2c', grid: true }),
      getPublicServices({ audience: 'b2b', grid: true }),
    ])
      .then(([home, biz]) => {
        setB2c(home)
        setB2b(biz)
      })
      .catch(() => {
        setB2c([])
        setB2b([])
      })
  }, [])

  const fallbackB2c = B2C_SERVICES.map((s) => ({
    code: s.num,
    title: s.title,
    summary: s.text,
    is_featured: false,
    slug: null,
  }))
  const fallbackB2b = B2B_SERVICES.map((s) => ({
    code: s.num,
    title: s.title,
    summary: s.text,
    is_featured: false,
    slug: null,
  }))

  const list = tab === 'b2c'
    ? (b2c.length ? b2c : fallbackB2c)
    : (b2b.length ? b2b : fallbackB2b)

  return (
    <section id="services">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">Services</p>
          <h2>Built for your home. Built for your business.</h2>
          <p className="lede">
            One-time treatments, scheduled programmes and annual contracts — matched to your
            property, occupancy and pest risk.
          </p>
        </div>

        <div
          className="rv"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
            marginBottom: 28,
          }}
        >
          <div className="seg" role="tablist" style={{ margin: 0 }}>
            <button type="button" className={tab === 'b2c' ? 'active' : ''} onClick={() => setTab('b2c')}>
              For homes (B2C)
            </button>
            <button type="button" className={tab === 'b2b' ? 'active' : ''} onClick={() => setTab('b2b')}>
              For businesses (B2B)
            </button>
          </div>
          <Link className="btn btn--ghost" to="/services">
            View all services <span className="arw">→</span>
          </Link>
        </div>

        <div className="svc">
          {list.map((s) => (
            <Card
              key={s.id || `${s.code}-${s.title}`}
              code={s.code}
              title={s.title}
              text={s.summary || s.text}
              featured={!!s.is_featured}
              to={s.slug ? `/${s.slug}` : null}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

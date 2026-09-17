import { SITE } from '../data/content'
import { useHomeSection } from '../context/HomeContent'
import Html from './Html'

const HERO_FALLBACK = {
  eyebrow: 'Pest control in Bengaluru · B2B & B2C',
  title_line1: 'Safe spaces.',
  title_line2: 'Expert protection.',
  title_line3: 'Lasting results.',
  lede:
    "We don't just spray. Every job starts with an inspection — finding where pests enter, where they breed, and what keeps bringing them back. Then we treat, monitor and prevent.",
  primary_cta: 'Get a free site inspection',
  pills: [
    'Homes & apartments',
    'Offices & IT parks',
    'Hotels & kitchens',
    'Factories & warehouses',
    'Hospitals & schools',
  ],
  nodes: ['Inspect & identify', 'Targeted treatment', 'Monitor & prevent'],
  core_label: 'Perimeter protected',
}

export function Hero() {
  const { data } = useHomeSection('hero', HERO_FALLBACK)
  const nodes = data.nodes?.length ? data.nodes : HERO_FALLBACK.nodes

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div>
          <p className="eyebrow">{data.eyebrow}</p>
          <h1>
            {data.title_line1}
            <br />
            <span className="l2">{data.title_line2}</span>
            <br />
            <span className="l3">{data.title_line3}</span>
          </h1>
          <Html as="div" className="lede" html={data.lede} />
          <div className="hero-cta">
            <a className="btn btn--orange" href="#contact">
              {data.primary_cta} <span className="arw">→</span>
            </a>
            <a className="btn btn--ghost" href={SITE.phoneHref}>
              Call {SITE.phone}
            </a>
          </div>
          <div className="pill-row">
            {(data.pills || []).map((pill) => (
              <span className="pill" key={pill}>{pill}</span>
            ))}
          </div>
        </div>

        <div className="perimeter" aria-hidden="true">
          <svg viewBox="0 0 400 400">
            <g className="spin-slow">
              <circle cx="200" cy="200" r="188" fill="none" stroke="#FF6A00" strokeWidth="2" strokeDasharray="3 12" opacity=".8" />
            </g>
            <g className="spin-rev">
              <circle cx="200" cy="200" r="160" fill="none" stroke="#1B47C4" strokeWidth="1.5" strokeDasharray="40 18" opacity=".55" />
            </g>
            <circle cx="200" cy="200" r="132" fill="none" stroke="#0E5132" strokeWidth="1" opacity=".35" />
            <circle cx="200" cy="200" r="104" fill="none" stroke="rgba(10,22,38,.12)" strokeWidth="1" />
          </svg>
          <div className="perimeter-core">
            <img src="/logo.png" alt="TEB Enterprises" />
            <div className="st">{data.core_label}</div>
          </div>
          {nodes[0] && <div className="node n1"><i>01</i> {nodes[0]}</div>}
          {nodes[1] && <div className="node n2"><i>02</i> {nodes[1]}</div>}
          {nodes[2] && <div className="node n3"><i>03</i> {nodes[2]}</div>}
        </div>
      </div>
    </section>
  )
}

export function Ticker() {
  const { data } = useHomeSection('ticker', { items: [] })
  const base = data.items?.length ? data.items : ['Inspection-based treatment', 'Bengaluru-wide coverage']
  const items = [...base, ...base]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {items.map((t, i) => (
          <span key={`${t}-${i}`}>{t}</span>
        ))}
      </div>
    </div>
  )
}

export function Stats() {
  const { data } = useHomeSection('stats', { items: [] })
  const items = data.items?.length
    ? data.items
    : [
        { value: 20, label: 'Pest programmes' },
        { value: 13, label: 'Sectors served' },
        { value: 27, label: 'Bengaluru zones covered' },
        { value: 8, label: 'Step service process' },
      ]

  return (
    <section style={{ paddingTop: 'clamp(48px,6vw,80px)' }}>
      <div className="wrap">
        <div className="stats rv">
          {items.map((s) => (
            <div className="stat" key={s.label}>
              <b data-count={s.value}>0</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

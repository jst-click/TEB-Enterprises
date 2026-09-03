import { SITE, TICKER, STATS } from '../data/content'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div>
          <p className="eyebrow">Pest control in Bengaluru · B2B &amp; B2C</p>
          <h1>
            Safe spaces.
            <br />
            <span className="l2">Expert protection.</span>
            <br />
            <span className="l3">Lasting results.</span>
          </h1>
          <p className="lede">
            We don&apos;t just spray. Every job starts with an inspection — finding where pests enter,
            where they breed, and what keeps bringing them back. Then we treat, monitor and prevent.
          </p>
          <div className="hero-cta">
            <a className="btn btn--orange" href="#contact">
              Get a free site inspection <span className="arw">→</span>
            </a>
            <a className="btn btn--ghost" href={SITE.phoneHref}>
              Call {SITE.phone}
            </a>
          </div>
          <div className="pill-row">
            <span className="pill">Homes &amp; apartments</span>
            <span className="pill">Offices &amp; IT parks</span>
            <span className="pill">Hotels &amp; kitchens</span>
            <span className="pill">Factories &amp; warehouses</span>
            <span className="pill">Hospitals &amp; schools</span>
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
            <div className="st">Perimeter protected</div>
          </div>
          <div className="node n1"><i>01</i> Inspect &amp; identify</div>
          <div className="node n2"><i>02</i> Targeted treatment</div>
          <div className="node n3"><i>03</i> Monitor &amp; prevent</div>
        </div>
      </div>
    </section>
  )
}

export function Ticker() {
  const items = [...TICKER, ...TICKER]
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
  return (
    <section style={{ paddingTop: 'clamp(48px,6vw,80px)' }}>
      <div className="wrap">
        <div className="stats rv">
          {STATS.map((s) => (
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

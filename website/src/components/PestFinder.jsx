import { useMemo, useState } from 'react'
import { PESTS } from '../data/content'

const FILTERS = [
  ['all', 'All pests'],
  ['crawling', 'Crawling'],
  ['flying', 'Flying'],
  ['wood', 'Wood-destroying'],
  ['rodent', 'Rodents'],
  ['stored', 'Stored product'],
]

export default function PestFinder() {
  const [group, setGroup] = useState('all')
  const [active, setActive] = useState(null)

  const list = useMemo(
    () => PESTS.filter((p) => group === 'all' || p.g === group),
    [group],
  )

  return (
    <section className="finder" id="pests">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">Pest finder</p>
          <h2>Tell us what you&apos;re seeing. We&apos;ll tell you what it takes.</h2>
          <p className="lede">
            Pick the pest you&apos;re dealing with to see the warning signs and how we treat it. Not
            sure? Send us a photo and our team will identify it for you.
          </p>
        </div>

        <div className="filters rv">
          {FILTERS.map(([g, label]) => (
            <button
              key={g}
              type="button"
              className={`chip${group === g ? ' active' : ''}`}
              onClick={() => {
                setGroup(g)
                setActive(null)
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="detail-wrap">
          {active && (
            <div className="detail show" role="region" aria-live="polite">
              <button className="close" aria-label="Close" type="button" onClick={() => setActive(null)}>
                ×
              </button>
              <p className="eyebrow on-dark">{active.c} · Treatment brief</p>
              <h3>{active.n}</h3>
              <p style={{ color: 'rgba(255,255,255,.72)', maxWidth: '60ch', margin: 0 }}>{active.t}</p>
              <div className="cols">
                <div>
                  <h4>What you might notice</h4>
                  <ul>
                    {active.signs.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>How we treat it</h4>
                  <ul>
                    {active.treat.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <a className="btn btn--orange" href="#contact" style={{ marginTop: 26 }}>
                Book an inspection for {active.n} <span className="arw">→</span>
              </a>
            </div>
          )}
        </div>

        <div className="pests rv">
          {list.map((p) => (
            <button
              key={p.c}
              type="button"
              className={`pest${active?.c === p.c ? ' active' : ''}`}
              onClick={() => setActive(p)}
            >
              <span className="code">{p.c}</span>
              <h3>{p.n}</h3>
              <p className="t">{p.t}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

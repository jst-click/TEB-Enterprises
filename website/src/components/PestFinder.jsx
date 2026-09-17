import { useMemo, useState } from 'react'
import { PESTS } from '../data/content'
import { useHomeSection } from '../context/HomeContent'
import Html from './Html'

function plain(html = '') {
  return String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

const FALLBACK = {
  eyebrow: 'Pest finder',
  title: "Tell us what you're seeing. We'll tell you what it takes.",
  lede: "Pick the pest you're dealing with to see the warning signs and how we treat it. Not sure? Send us a photo and our team will identify it for you.",
  filters: [
    { id: 'all', label: 'All pests' },
    { id: 'crawling', label: 'Crawling' },
    { id: 'flying', label: 'Flying' },
    { id: 'wood', label: 'Wood-destroying' },
    { id: 'rodent', label: 'Rodents' },
    { id: 'stored', label: 'Stored product' },
  ],
  items: PESTS.map((p) => ({ ...p, t: `<p>${p.t}</p>` })),
}

export default function PestFinder() {
  const { data } = useHomeSection('pests', FALLBACK)
  const [group, setGroup] = useState('all')
  const [active, setActive] = useState(null)

  const filters = data.filters?.length ? data.filters : FALLBACK.filters
  const pests = data.items?.length ? data.items : FALLBACK.items

  const list = useMemo(
    () => pests.filter((p) => group === 'all' || p.g === group),
    [group, pests],
  )

  return (
    <section className="finder" id="pests">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">{data.eyebrow}</p>
          <h2>{data.title}</h2>
          <Html as="div" className="lede" html={data.lede} />
        </div>

        <div className="filters rv">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`chip${group === f.id ? ' active' : ''}`}
              onClick={() => {
                setGroup(f.id)
                setActive(null)
              }}
            >
              {f.label}
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
              <Html as="div" html={active.t} style={{ color: 'rgba(255,255,255,.72)', maxWidth: '60ch' }} />
              <div className="cols">
                <div>
                  <h4>What you might notice</h4>
                  <ul>
                    {(active.signs || []).map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>How we treat it</h4>
                  <ul>
                    {(active.treat || []).map((s) => (
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
              <p className="t">{plain(p.t)}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

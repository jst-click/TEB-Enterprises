import { useState } from 'react'
import { AMC_TAGS, AMC_WHY, IPM_STEPS, PROCESS, SAFETY, SECTORS } from '../data/content'
import { useHomeSection } from '../context/HomeContent'
import Html from './Html'

export function Sectors() {
  const { data } = useHomeSection('sectors', {
    eyebrow: 'Sectors',
    title: 'Pest control for every kind of building.',
    lede: '',
    cta_kicker: 'YOUR FACILITY',
    cta_title: "Not on the list? Most buildings aren't so different underneath.",
    cta_label: 'Tell us about your site',
    items: SECTORS.map(([code, title, text]) => ({ code, title, text: `<p>${text}</p>` })),
  })

  return (
    <section className="dark" id="sectors">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow on-dark">{data.eyebrow}</p>
          <h2>{data.title}</h2>
          <Html as="div" className="lede" html={data.lede} />
        </div>
        <div className="sectors rv">
          {(data.items || []).map((item) => (
            <div className="sector" key={item.code || item.title}>
              <span className="k">{item.code}</span>
              <h3>{item.title}</h3>
              <Html as="div" html={item.text} />
            </div>
          ))}
          <div className="sector sector--cta">
            <span className="k">{data.cta_kicker}</span>
            <h3>{data.cta_title}</h3>
            <a className="btn btn--orange" href="#contact">
              {data.cta_label} <span className="arw">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function IPM() {
  const { data } = useHomeSection('ipm', {
    eyebrow: 'Integrated Pest Management',
    title: 'Fewer chemicals. Better questions.',
    lede: '',
    cta_label: 'Discuss an IPM programme',
    items: IPM_STEPS.map(([label, title, text]) => ({ label, title, text: `<p>${text}</p>` })),
  })

  return (
    <section id="ipm">
      <div className="wrap ipm">
        <div className="rv">
          <p className="eyebrow">{data.eyebrow}</p>
          <h2>{data.title}</h2>
          <Html as="div" className="lede" html={data.lede} style={{ marginTop: 18 }} />
          <a className="btn" href="#contact" style={{ marginTop: 12 }}>
            {data.cta_label} <span className="arw">→</span>
          </a>
        </div>
        <div className="ipm-list rv">
          {(data.items || []).map((item) => (
            <div className="ipm-item" key={item.label}>
              <span className="k">{item.label}</span>
              <div>
                <strong>{item.title}</strong>
                <Html as="div" html={item.text} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Process() {
  const { data } = useHomeSection('process', {
    eyebrow: 'How we work',
    title: 'Eight steps, in this order, every time.',
    items: PROCESS.map(([step, title, text]) => ({ step, title, text: `<p>${text}</p>` })),
  })

  return (
    <section id="process" style={{ background: 'var(--paper-2)' }}>
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">{data.eyebrow}</p>
          <h2>{data.title}</h2>
          {data.lede ? <Html as="div" className="lede" html={data.lede} /> : null}
        </div>
        <div className="steps rv">
          {(data.items || []).map((item) => (
            <div className="step" key={item.step}>
              <span className="n">{item.step}</span>
              <h3>{item.title}</h3>
              <Html as="div" html={item.text} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AMC() {
  const { data } = useHomeSection('amc', {
    eyebrow: 'Annual Maintenance Contracts',
    title: 'Catch it early, or clear it later.',
    lede: '',
    box_title: 'What an AMC can include',
    why_title: 'Why clients keep them',
    tags: AMC_TAGS,
    why: AMC_WHY,
  })

  return (
    <section id="amc">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">{data.eyebrow}</p>
          <h2>{data.title}</h2>
          <Html as="div" className="lede" html={data.lede} />
        </div>
        <div className="amc rv">
          <div className="amc-box">
            <h3>{data.box_title}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '.95rem', marginTop: 10 }}>
              Choose the frequency and the pest scope — we&apos;ll write the plan around it.
            </p>
            <div className="tags">
              {(data.tags || []).map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="amc-box dark-box">
            <h3>{data.why_title}</h3>
            <ul className="checks">
              {(data.why || []).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Safety() {
  const { data } = useHomeSection('safety', {
    eyebrow: 'Safety & responsible service',
    title: 'What we need from you, and what you can expect from us.',
    lede: '',
    tabs: ['Before service', 'After service', 'Tell us in advance'],
    pre: SAFETY.pre,
    post: SAFETY.post,
    tell: SAFETY.tell,
  })
  const [tab, setTab] = useState('pre')
  const labels = [
    ['pre', data.tabs?.[0] || 'Before service'],
    ['post', data.tabs?.[1] || 'After service'],
    ['tell', data.tabs?.[2] || 'Tell us in advance'],
  ]
  const groups = data[tab] || []

  return (
    <section className="dark" id="safety">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow on-dark">{data.eyebrow}</p>
          <h2>{data.title}</h2>
          <Html as="div" className="lede" html={data.lede} />
        </div>

        <div className="seg rv dark-seg" role="tablist">
          {labels.map(([k, label]) => (
            <button
              key={k}
              type="button"
              className={tab === k ? 'active' : ''}
              onClick={() => setTab(k)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid-3">
          {groups.map((group, i) => (
            <div className="amc-box dark-box" key={i}>
              <ul className="checks">
                {(group || []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

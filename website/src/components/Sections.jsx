import { AMC_TAGS, AMC_WHY, IPM_STEPS, PROCESS, SAFETY, SECTORS } from '../data/content'
import { useState } from 'react'

export function Sectors() {
  return (
    <section className="dark" id="sectors">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow on-dark">Sectors</p>
          <h2>Pest control for every kind of building.</h2>
          <p className="lede">
            A restaurant kitchen and a record room don&apos;t have the same pest risk — or the same
            tolerance for disruption. We plan the programme around the building, not the other way
            round.
          </p>
        </div>
        <div className="sectors rv">
          {SECTORS.map(([k, title, text]) => (
            <div className="sector" key={k}>
              <span className="k">{k}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
          <div className="sector sector--cta">
            <span className="k">YOUR FACILITY</span>
            <h3>Not on the list? Most buildings aren&apos;t so different underneath.</h3>
            <a className="btn btn--orange" href="#contact">
              Tell us about your site <span className="arw">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function IPM() {
  return (
    <section id="ipm">
      <div className="wrap ipm">
        <div className="rv">
          <p className="eyebrow">Integrated Pest Management</p>
          <h2>Fewer chemicals. Better questions.</h2>
          <p className="lede" style={{ marginTop: 18 }}>
            Repeated spraying treats what you can see. IPM asks why pests are entering, where
            they&apos;re breeding, what conditions support them — and how those conditions can be
            corrected.
          </p>
          <a className="btn" href="#contact" style={{ marginTop: 12 }}>
            Discuss an IPM programme <span className="arw">→</span>
          </a>
        </div>
        <div className="ipm-list rv">
          {IPM_STEPS.map(([k, title, text]) => (
            <div className="ipm-item" key={k}>
              <span className="k">{k}</span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section id="process" style={{ background: 'var(--paper-2)' }}>
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">How we work</p>
          <h2>Eight steps, in this order, every time.</h2>
        </div>
        <div className="steps rv">
          {PROCESS.map(([n, title, text]) => (
            <div className="step" key={n}>
              <span className="n">{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function AMC() {
  return (
    <section id="amc">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">Annual Maintenance Contracts</p>
          <h2>Catch it early, or clear it later.</h2>
          <p className="lede">
            Regular service finds pest activity while it&apos;s still small. AMCs are built around
            your property size, pest risk, service frequency and business requirements.
          </p>
        </div>
        <div className="amc rv">
          <div className="amc-box">
            <h3>What an AMC can include</h3>
            <p style={{ color: 'var(--muted)', fontSize: '.95rem', marginTop: 10 }}>
              Choose the frequency and the pest scope — we&apos;ll write the plan around it.
            </p>
            <div className="tags">
              {AMC_TAGS.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="amc-box dark-box">
            <h3>Why clients keep them</h3>
            <ul className="checks">
              {AMC_WHY.map((t) => (
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
  const [tab, setTab] = useState('pre')
  const labels = [
    ['pre', 'Before service'],
    ['post', 'After service'],
    ['tell', 'Tell us in advance'],
  ]

  return (
    <section className="dark" id="safety">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow on-dark">Safety &amp; responsible service</p>
          <h2>What we need from you, and what you can expect from us.</h2>
          <p className="lede">
            Before service starts, our team explains preparation, access, re-entry, cleaning,
            food-storage, pet-safety and operational instructions relevant to your treatment.
          </p>
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
          {SAFETY[tab].map((group, i) => (
            <div className="amc-box dark-box" key={i}>
              <ul className="checks">
                {group.map((item) => (
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

import { useState } from 'react'
import { B2B_SERVICES, B2C_SERVICES } from '../data/content'

export default function Services() {
  const [tab, setTab] = useState('b2c')

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

        <div className="seg rv" role="tablist">
          <button type="button" className={tab === 'b2c' ? 'active' : ''} onClick={() => setTab('b2c')}>
            For homes (B2C)
          </button>
          <button type="button" className={tab === 'b2b' ? 'active' : ''} onClick={() => setTab('b2b')}>
            For businesses (B2B)
          </button>
        </div>

        {tab === 'b2c' ? (
          <div className="svc">
            {B2C_SERVICES.map((s) => (
              <div className="card" key={s.num}>
                <span className="num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
            <div className="card" style={{ background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' }}>
              <span className="num" style={{ color: '#FFA45C' }}>WHERE WE WORK</span>
              <h3>Every kind of home</h3>
              <p style={{ color: 'rgba(255,255,255,.72)' }}>
                Independent houses, apartments, villas, gated communities, rentals, PGs, hostels, new
                builds and vacant properties.
              </p>
            </div>
          </div>
        ) : (
          <div className="svc">
            {B2B_SERVICES.map((s) => (
              <div className="card" key={s.num}>
                <span className="num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
            <div className="card" style={{ background: 'var(--ink)', color: '#fff', borderColor: 'var(--ink)' }}>
              <span className="num" style={{ color: '#FFA45C' }}>WHO WE WORK WITH</span>
              <h3>Your whole team</h3>
              <p style={{ color: 'rgba(255,255,255,.72)' }}>
                Facility managers, apartment associations, procurement, administration, housekeeping,
                engineering and EHS.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

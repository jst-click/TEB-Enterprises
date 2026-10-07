import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import GmbLink, { GMB_URL } from '../components/GmbLink'
import GmbSection from '../components/GmbSection'
import { useEnquiry } from '../context/EnquiryContext'
import { PROCESS, SITE } from '../data/content'
import { useReveal } from '../hooks'

const VALUES = [
  ['01', 'Inspection first', 'Every job starts with finding where pests enter, breed and hide — before we treat.'],
  ['02', 'Homes & businesses', 'Programmes for apartments, offices, hotels, warehouses, hospitals and IT parks.'],
  ['03', 'IPM mindset', 'Monitoring, sanitation guidance, exclusion and targeted treatment — not spray-and-go.'],
  ['04', 'Clear documentation', 'Commercial clients receive reports, observations and recommendations when required.'],
]

const HERO_IMG =
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=70'

export default function AboutPage() {
  const { openEnquiry } = useEnquiry()
  useReveal()

  useEffect(() => {
    document.title = 'About Us | TEB Enterprises — Pest Control Bangalore'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'About TEB Enterprises — Team Experts Bangalore. Inspection-based pest control for homes and businesses across Bengaluru.',
      )
    }
  }, [])

  return (
    <>
      <section
        style={{
          padding: 'clamp(56px,8vw,100px) 0 clamp(48px,6vw,80px)',
          background: `linear-gradient(135deg, rgba(10,22,38,.92), rgba(18,39,64,.78)), url(${HERO_IMG}) center/cover`,
          color: '#fff',
        }}
      >
        <div className="wrap">
          <p className="eyebrow on-dark">About us</p>
          <h1 style={{ fontSize: 'clamp(2.2rem,4.5vw,3.4rem)', color: '#fff', marginBottom: 16, maxWidth: '16ch' }}>
            TEB Enterprises — Team Experts Bangalore
          </h1>
          <p style={{ color: 'rgba(255,255,255,.78)', maxWidth: '58ch', margin: '0 0 28px', fontSize: '1.08rem', lineHeight: 1.65 }}>
            We provide inspection-based pest control for homes and businesses across Bengaluru —
            from one-time treatments to long-term AMC programmes.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" className="btn btn--orange" onClick={() => openEnquiry()}>
              Book an inspection <span className="arw">→</span>
            </button>
            <Link className="btn btn--onDark" to="/contact-us">
              Contact us
            </Link>
            <GmbLink variant="onDark" label="Google Business Profile" />
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,6vw,88px) 0', background: '#fff' }}>
        <div className="wrap">
          <div className="rv about-split">
            <div>
              <p className="eyebrow">Who we are</p>
              <h2 style={{ marginBottom: 18 }}>Built around inspection, not just spray</h2>
              <p style={{ color: 'var(--muted)', fontSize: '1.02rem', lineHeight: 1.72, marginBottom: 16 }}>
                TEB Enterprises (Team Experts Bangalore) delivers complete pest-control solutions for
                residential and commercial properties. Every programme starts with understanding pest
                activity, entry points, breeding sources and site conditions.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '1.02rem', lineHeight: 1.72, marginBottom: 16 }}>
                Whether you need cockroach control, termite treatment, bed bug management, rodent
                control, mosquito programmes or an annual maintenance contract, we match the method to
                your property — homes, apartments, offices, hotels, restaurants, factories, warehouses
                and institutions across Bengaluru.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '1.02rem', lineHeight: 1.72, marginBottom: 20 }}>
                Find our verified Google Business Profile for directions, hours, photos and customer reviews.
              </p>
              <GmbLink label="Open Google Business Profile" />
            </div>
            <img
              src={HERO_IMG}
              alt="TEB Enterprises pest control team"
              style={{ width: '100%', borderRadius: 14, aspectRatio: '4/3', objectFit: 'cover', boxShadow: 'var(--shadow)' }}
            />
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,6vw,88px) 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="sec-head rv" style={{ marginBottom: 28 }}>
            <p className="eyebrow">What we stand for</p>
            <h2>Why property owners choose TEB</h2>
          </div>
          <div className="rv about-values">
            {VALUES.map(([n, t, d]) => (
              <div key={n} className="card" style={{ padding: '22px 20px' }}>
                <span className="num">{n}</span>
                <h3 style={{ fontSize: '1.05rem', margin: '10px 0 8px' }}>{t}</h3>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '.92rem', lineHeight: 1.55 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,6vw,88px) 0', background: '#fff' }}>
        <div className="wrap">
          <div className="sec-head rv" style={{ marginBottom: 28 }}>
            <p className="eyebrow">How we work</p>
            <h2>A clear path from enquiry to prevention</h2>
          </div>
          <div className="steps rv">
            {PROCESS.slice(0, 4).map(([n, title, text]) => (
              <div className="step" key={n}>
                <span className="n">{n}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GmbSection variant="about" />

      <section style={{ padding: 'clamp(48px,6vw,80px) 0', background: 'var(--ink)', color: '#fff' }}>
        <div className="wrap">
          <div className="sec-head rv" style={{ marginBottom: 20 }}>
            <p className="eyebrow on-dark">Talk to us</p>
            <h2 style={{ color: '#fff' }}>Ready to protect your property?</h2>
            <p style={{ color: 'rgba(255,255,255,.7)', maxWidth: '52ch', marginTop: 12 }}>
              Call {SITE.contactPerson} on {SITE.phone}, or send an enquiry — we cover major Bengaluru localities.
            </p>
          </div>
          <div className="rv" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" className="btn btn--orange" onClick={() => openEnquiry()}>
              Book an inspection
            </button>
            <Link className="btn btn--onDark" to="/contact-us">
              Go to contact page
            </Link>
            <GmbLink
              variant="onDark"
              label="Find us on Google"
            />
            <a className="btn" href={SITE.phoneHref} style={{ background: 'transparent', borderColor: 'rgba(255,255,255,.45)', color: '#fff' }}>
              Call {SITE.phone}
            </a>
          </div>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '.88rem', margin: '18px 0 0' }}>
            Profile:{' '}
            <a href={GMB_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,.85)' }}>
              share.google/eW8mqyNEjn8Ke8QPs
            </a>
          </p>
        </div>
      </section>

      <style>{`
        .about-split {
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          gap: clamp(28px, 4vw, 56px);
          align-items: center;
        }
        .about-values { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        @media (max-width: 900px) {
          .about-split { grid-template-columns: 1fr; }
          .about-values { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 620px) {
          .about-values { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  )
}

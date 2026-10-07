import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Areas, Contact, FAQ } from '../components/Contact'
import { HomeContentProvider } from '../context/HomeContent'
import { SITE } from '../data/content'
import { useReveal } from '../hooks'

function ContactPageInner() {
  useReveal()

  useEffect(() => {
    document.title = 'Contact Us | Pest Control Bangalore | TEB Enterprises'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Contact TEB Enterprises for pest control in Bangalore. Book a site inspection, WhatsApp us, or call for a quotation.',
      )
    }
  }, [])

  return (
    <>
      <section
        style={{
          padding: 'clamp(48px,7vw,90px) 0 clamp(36px,5vw,56px)',
          background: 'linear-gradient(135deg, var(--ink), var(--ink-2))',
          color: '#fff',
        }}
      >
        <div className="wrap">
          <p className="eyebrow on-dark">Contact us</p>
          <h1 style={{ fontSize: 'clamp(2.1rem,4.2vw,3.2rem)', color: '#fff', marginBottom: 14, maxWidth: '16ch' }}>
            Get in touch with TEB Enterprises
          </h1>
          <p style={{ color: 'rgba(255,255,255,.75)', maxWidth: '56ch', margin: '0 0 24px', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Tell us the pest problem, property type and locality — we&apos;ll confirm coverage and share a quotation.
            Serving homes and businesses across Bengaluru.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a className="btn btn--orange" href={SITE.phoneHref}>
              Call {SITE.phone}
            </a>
            <a
              className="btn btn--onDark"
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
            <Link className="btn" to="/about-us" style={{ background: 'transparent', borderColor: 'rgba(255,255,255,.45)', color: '#fff' }}>
              About TEB
            </Link>
          </div>
        </div>
      </section>

      <Contact />
      <FAQ />
      <Areas />
    </>
  )
}

export default function ContactPage() {
  return (
    <HomeContentProvider>
      <ContactPageInner />
    </HomeContentProvider>
  )
}

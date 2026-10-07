import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPublicAmcPage, mediaUrl } from '../api'
import Html from '../components/Html'
import { useEnquiry } from '../context/EnquiryContext'
import { AMC_TAGS, AMC_WHY, AREAS, PROCESS, SITE } from '../data/content'
import { useReveal } from '../hooks'
import JsonLd from '../seo/JsonLd'
import SeoHead from '../seo/SeoHead'
import { buildArticleSchema, buildFaqSchema } from '../seo/faqSchema'
import { AMC_SEO } from '../seo/servicePages/pest-control-amc-bangalore'

const FALLBACK = {
  hero: {
    eyebrow: 'Annual Maintenance Contracts',
    title: 'Pest Control AMC in Bangalore',
    lede: '<p>Catch it early, or clear it later. Regular service finds pest activity while it\'s still small. AMCs are built around your property type, risk level and operating schedule.</p>',
    primary_cta: 'Request an AMC quote',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=70',
  },
  include: {
    eyebrow: 'Annual Maintenance Contracts',
    title: 'Catch it early, or clear it later.',
    lede: '<p>Regular service finds pest activity while it\'s still small. AMCs are built around your property type, risk level and operating schedule.</p>',
    box_title: 'What an AMC can include',
    box_intro: 'Choose the frequency and the pest scope — we\'ll write the plan around it.',
    frequency_label: 'Frequency',
    frequencies: AMC_TAGS.slice(0, 5),
    scope_label: 'Scope & extras',
    scopes: AMC_TAGS.slice(5),
    why_title: 'Why clients choose an AMC',
    why: AMC_WHY,
  },
  who: {
    eyebrow: "Who it's for",
    title: 'Homes, workplaces and high-risk sites across Bengaluru',
    lede: '<p>One contract model — tuned for residential comfort or commercial compliance.</p>',
    items: [
      { title: 'Homes & apartments', text: 'Scheduled protection for kitchens, bedrooms, drains and common-area pests without waiting for a crisis.' },
      { title: 'Offices & IT parks', text: 'Discreet preventive visits that fit working hours, with reports when your facilities team needs them.' },
      { title: 'Hotels & restaurants', text: 'Kitchen, F&B and guest-area programmes with documentation suited to hospitality standards.' },
      { title: 'Factories & warehouses', text: 'Rodent, fly and crawling-pest programmes matched to layout, shifts and audit requirements.' },
      { title: 'Hospitals & clinics', text: 'Sensitive-site methods with clear prep, vacancy and re-entry guidance for care environments.' },
      { title: 'Retail & institutions', text: 'Stores, schools and campuses covered on a fixed calendar with priority call-out support.' },
    ],
  },
  process: {
    eyebrow: 'How an AMC works',
    title: 'From inspection to a fixed service calendar',
    steps: PROCESS.slice(0, 5).map(([step, title, text]) => ({ step, title, text })),
  },
  about: {
    eyebrow: 'About TEB AMC',
    title: 'Inspection-based contracts, not spray-and-go visits',
    content:
      '<p>Every AMC starts with understanding where pests breed, enter and hide — kitchens, drains, false ceilings, loading bays, landscaping and waste areas. We then set frequency, methods and monitoring to match that risk.</p><p>TEB Enterprises — Team Experts Bangalore — serves homes and businesses across Bengaluru with scheduled preventive treatment, documentation and priority support when something comes up between visits.</p>',
    primary_cta: 'Get a free AMC quote',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=70',
    badge_label: 'Bengaluru-wide',
    badge_text: 'Weekly to quarterly plans with priority call-outs',
  },
  coverage: {
    eyebrow: 'Coverage',
    title: 'AMC service across Bengaluru localities',
    lede: '<p>Whitefield, HSR, Electronic City, Sarjapur, Peenya and more — confirm availability for your site.</p>',
    areas: AREAS.slice(0, 18),
  },
  faq: {
    eyebrow: 'Common questions',
    title: 'AMC FAQs',
    items: AMC_SEO.faqs.map((f) => ({ question: f.q, answer: f.a })),
  },
  cta: {
    title: 'Ready for a pest control AMC in Bangalore?',
    lede: '<p>Tell us your property type and locality — we\'ll propose frequency, scope and a clear quotation.</p>',
    primary_cta: 'Request a site inspection',
  },
  seo: {
    meta_title: AMC_SEO.title,
    meta_description: AMC_SEO.description,
  },
}

function section(sections, key) {
  const data = sections[key]
  return data && typeof data === 'object' ? { ...FALLBACK[key], ...data } : FALLBACK[key]
}

function imgSrc(src) {
  if (!src) return FALLBACK.hero.image
  if (src.startsWith('http')) return src
  return mediaUrl(src)
}

export default function AmcPage() {
  const { openEnquiry } = useEnquiry()
  const [sections, setSections] = useState({})
  const [ready, setReady] = useState(false)
  useReveal(ready)

  useEffect(() => {
    getPublicAmcPage()
      .then((data) => setSections(data.sections || {}))
      .catch(() => setSections({}))
      .finally(() => setReady(true))
  }, [])

  const hero = section(sections, 'hero')
  const include = section(sections, 'include')
  const who = section(sections, 'who')
  const process = section(sections, 'process')
  const about = section(sections, 'about')
  const coverage = section(sections, 'coverage')
  const faq = section(sections, 'faq')
  const cta = section(sections, 'cta')
  const seo = section(sections, 'seo')

  const faqItems = useMemo(() => {
    const cms = faq.items || []
    if (cms.length >= AMC_SEO.faqs.length) {
      return cms.map((item) => ({
        question: item.question || item.q,
        answer: item.answer || item.a,
      }))
    }
    return AMC_SEO.faqs.map((f) => ({ question: f.q, answer: f.a }))
  }, [faq.items])

  const schemas = useMemo(
    () => [
      buildArticleSchema({
        url: `https://tebpestcontrol.com${AMC_SEO.path}`,
        headline: AMC_SEO.articleHeadline,
        description: AMC_SEO.articleDescription,
        image: AMC_SEO.image,
        datePublished: AMC_SEO.datePublished,
        dateModified: AMC_SEO.dateModified,
      }),
      buildFaqSchema(faqItems.map((f) => ({ q: f.question, a: f.answer }))),
    ],
    [faqItems],
  )

  const openAmcEnquiry = () =>
    openEnquiry({ serviceTitle: 'Pest Control AMC Bangalore', pest: 'Annual maintenance contract' })

  if (!ready) {
    return (
      <section style={{ paddingTop: 72 }}>
        <div className="wrap"><p className="lede">Loading…</p></div>
      </section>
    )
  }

  return (
    <>
      <SeoHead
        title={AMC_SEO.title || seo.meta_title}
        description={AMC_SEO.description || seo.meta_description}
        path={AMC_SEO.path}
        image={AMC_SEO.image}
        keywords={AMC_SEO.keywords}
      />
      <JsonLd id="amc-seo-ld" data={schemas} />

      <section
        style={{
          padding: 'clamp(56px,8vw,100px) 0 clamp(48px,6vw,80px)',
          background: `linear-gradient(135deg, rgba(10,22,38,.92), rgba(18,39,64,.78)), url(${imgSrc(hero.image)}) center/cover`,
          color: '#fff',
        }}
      >
        <div className="wrap">
          <Link
            to="/services"
            style={{ color: 'rgba(255,255,255,.65)', textDecoration: 'none', fontSize: '.88rem', marginBottom: 18, display: 'inline-block' }}
          >
            ← All services
          </Link>
          <p className="eyebrow on-dark">{hero.eyebrow}</p>
          <h1 style={{ fontSize: 'clamp(2.2rem,4.5vw,3.5rem)', color: '#fff', marginBottom: 16, maxWidth: '16ch' }}>
            {hero.title}
          </h1>
          <Html
            html={hero.lede}
            style={{ color: 'rgba(255,255,255,.78)', maxWidth: '58ch', margin: '0 0 28px', fontSize: '1.08rem', lineHeight: 1.65 }}
          />
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button type="button" className="btn btn--orange" onClick={openAmcEnquiry}>
              {hero.primary_cta || 'Request an AMC quote'} <span className="arw">→</span>
            </button>
            <a className="btn btn--onDark" href={SITE.phoneHref}>
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,6vw,88px) 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div className="sec-head rv" style={{ marginBottom: 28 }}>
            <p className="eyebrow">{include.eyebrow}</p>
            <h2>{include.title}</h2>
            <Html as="div" className="lede" html={include.lede} />
          </div>
          <div className="amc rv">
            <div className="amc-box">
              <h3>{include.box_title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '.95rem', marginTop: 10 }}>{include.box_intro}</p>
              <p
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '.66rem',
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  margin: '22px 0 10px',
                }}
              >
                {include.frequency_label || 'Frequency'}
              </p>
              <div className="tags" style={{ marginTop: 0 }}>
                {(include.frequencies || []).map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
              <p
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '.66rem',
                  letterSpacing: '.14em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  margin: '22px 0 10px',
                }}
              >
                {include.scope_label || 'Scope & extras'}
              </p>
              <div className="tags" style={{ marginTop: 0 }}>
                {(include.scopes || []).map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
            <div className="amc-box dark-box">
              <h3>{include.why_title}</h3>
              <ul className="checks">
                {(include.why || []).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,6vw,88px) 0', background: '#fff' }}>
        <div className="wrap">
          <div className="sec-head rv" style={{ marginBottom: 28 }}>
            <p className="eyebrow">{who.eyebrow}</p>
            <h2>{who.title}</h2>
            <Html as="div" className="lede" html={who.lede} />
          </div>
          <div className="rv amc-who-grid">
            {(who.items || []).map((item, i) => (
              <div key={`${item.title}-${i}`} className="card" style={{ padding: '22px 20px' }}>
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ fontSize: '1.05rem', margin: '10px 0 8px' }}>{item.title}</h3>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '.92rem', lineHeight: 1.55 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,6vw,88px) 0', background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="sec-head rv" style={{ marginBottom: 28 }}>
            <p className="eyebrow">{process.eyebrow}</p>
            <h2>{process.title}</h2>
          </div>
          <div className="steps rv">
            {(process.steps || []).map((item) => (
              <div className="step" key={`${item.step}-${item.title}`}>
                <span className="n">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,6vw,88px) 0', background: '#fff' }}>
        <div className="wrap">
          <div className="rv amc-about-split">
            <div>
              <p className="eyebrow">{about.eyebrow}</p>
              <h2 style={{ marginBottom: 18 }}>{about.title}</h2>
              <Html html={about.content} style={{ color: 'var(--muted)', fontSize: '1.02rem', lineHeight: 1.72 }} />
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
                <button type="button" className="btn btn--orange" onClick={openAmcEnquiry}>
                  {about.primary_cta || 'Get a free AMC quote'}
                </button>
                <a
                  className="btn btn--ghost"
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp us
                </a>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <img
                src={imgSrc(about.image)}
                alt={about.title || 'Pest control AMC Bangalore'}
                style={{ width: '100%', borderRadius: 14, aspectRatio: '4/3', objectFit: 'cover', boxShadow: 'var(--shadow)' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: -16,
                  left: -16,
                  background: 'var(--ink)',
                  color: '#fff',
                  borderRadius: 12,
                  padding: '16px 20px',
                  maxWidth: 240,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--mono)',
                    fontSize: '.68rem',
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: '#FFA45C',
                  }}
                >
                  {about.badge_label}
                </p>
                <p style={{ margin: '6px 0 0', fontWeight: 700, fontSize: '.95rem' }}>{about.badge_text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,6vw,80px) 0', background: 'var(--ink)', color: '#fff' }}>
        <div className="wrap">
          <div className="sec-head rv" style={{ marginBottom: 24 }}>
            <p className="eyebrow on-dark">{coverage.eyebrow}</p>
            <h2 style={{ color: '#fff' }}>{coverage.title}</h2>
            <Html
              html={coverage.lede}
              style={{ color: 'rgba(255,255,255,.7)', maxWidth: '52ch', marginTop: 12 }}
            />
          </div>
          <div className="rv" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {(coverage.areas || []).map((a) => (
              <span
                key={a}
                style={{
                  border: '1px solid rgba(255,255,255,.22)',
                  borderRadius: 100,
                  padding: '8px 14px',
                  fontSize: '.85rem',
                  color: 'rgba(255,255,255,.85)',
                }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,6vw,88px) 0', background: '#fff', borderBlock: '1px solid var(--line-soft)' }}>
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div className="sec-head rv" style={{ marginBottom: 28 }}>
            <p className="eyebrow">{faq.eyebrow}</p>
            <h2>{faq.title}</h2>
          </div>
          <div className="acc rv">
            {faqItems.map((item) => (
              <details key={item.question} className="acc-item" style={{ borderBottom: '1px solid var(--line-soft)' }}>
                <summary
                  className="acc-q"
                  style={{
                    listStyle: 'none',
                    cursor: 'pointer',
                    padding: '18px 0',
                    fontWeight: 600,
                    fontSize: '1.02rem',
                  }}
                >
                  {item.question}
                </summary>
                <div style={{ padding: '0 0 18px' }}>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.65 }}>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>{cta.title}</h2>
          <Html html={cta.lede} />
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 22 }}>
            <button type="button" className="btn btn--onDark" onClick={openAmcEnquiry}>
              {cta.primary_cta || 'Request a site inspection'}
            </button>
            <a
              className="btn"
              href={SITE.phoneHref}
              style={{ background: 'transparent', borderColor: 'rgba(255,255,255,.6)', color: '#fff' }}
            >
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .amc-who-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .amc-about-split {
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          gap: clamp(28px, 4vw, 56px);
          align-items: center;
        }
        @media (max-width: 900px) {
          .amc-who-grid { grid-template-columns: 1fr 1fr; }
          .amc-about-split { grid-template-columns: 1fr; }
        }
        @media (max-width: 620px) {
          .amc-who-grid { grid-template-columns: 1fr; }
        }
        .acc-item summary::-webkit-details-marker { display: none; }
      `}</style>
    </>
  )
}

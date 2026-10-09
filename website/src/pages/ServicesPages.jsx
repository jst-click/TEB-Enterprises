import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getPublicService, getPublicServices, mediaUrl } from '../api'
import { useEnquiry } from '../context/EnquiryContext'
import { AREAS, PROCESS, SITE } from '../data/content'
import { useReveal } from '../hooks'
import JsonLd from '../seo/JsonLd'
import SeoHead from '../seo/SeoHead'
import {
  buildServiceSchemas,
  resolveServiceFaqPairs,
  resolveServiceMeta,
} from '../seo/servicePageSeo'
import NotFound from './NotFound'

function highlightsList(text) {
  if (!text) return []
  return text.split('\n').map((l) => l.trim()).filter(Boolean)
}

function pipePairs(text) {
  if (!text) return []
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [a, ...rest] = line.split('|')
      return [a.trim(), rest.join('|').trim()]
    })
    .filter(([a]) => a)
}

function galleryList(text, fallbacks = []) {
  const fromAdmin = highlightsList(text)
  if (fromAdmin.length) return fromAdmin
  return fallbacks.filter(Boolean)
}

function gallerySrc(src) {
  if (!src) return ''
  if (src.startsWith('http')) return src
  return mediaUrl(src)
}

const CATEGORY_LABELS = {
  pest: 'Pest services',
  residential: 'Residential',
  commercial: 'Commercial',
  amc: 'AMC',
  location: 'Locations',
  package_b2c: 'Home packages',
  package_b2b: 'Business scopes',
}

/** Per-category H1 + meta title for /services?category=… (client SEO docs). */
const CATEGORY_PAGE_SEO = {
  all: {
    h1: 'Pest control services in Bangalore',
    title: 'Pest Control Services in Bangalore | TEB Pest Control',
    description:
      'Inspection-based pest control in Bangalore for homes and businesses — cockroach, termite, bed bug, rodent, mosquito, ant control and more.',
    path: '/services',
  },
  location: {
    h1: 'Pest Control Services Across Bangalore Locations',
    title: 'Explore Our Service Areas | TEB Pest Control',
    description:
      'Explore TEB pest control service areas across Bangalore — Whitefield, HSR, Electronic City, Sarjapur, Marathahalli and more localities.',
    path: '/services?category=location',
  },
  pest: {
    h1: 'Pest Control Treatments for Different Pests in Bangalore',
    title: 'Pest Control by Pest Type in Bangalore | TEB',
    description:
      'Pest control treatments by pest type in Bangalore — cockroach, termite, bed bug, rodent, mosquito, ant and more from TEB Pest Control.',
    path: '/services?category=pest',
  },
  residential: {
    h1: 'Home Pest Control Solutions for Healthy Living',
    title: 'Home Protection Options | TEB Pest Control',
    description:
      'Home pest control solutions for healthy living in Bangalore — residential treatments and protection options from TEB Pest Control.',
    path: '/services?category=residential',
  },
  commercial: {
    h1: 'Commercial Pest Control Solutions for Businesses',
    title: 'Business Protection Options | TEB Pest Control',
    description:
      'Commercial pest control solutions for businesses in Bangalore — offices, hotels, restaurants, warehouses and more with TEB Pest Control.',
    path: '/services?category=commercial',
  },
  amc: {
    h1: 'Annual Pest Control Contracts & Maintenance Plans',
    title: 'Preventive Maintenance Plans | TEB Pest Control',
    description:
      'Annual pest control contracts and preventive maintenance plans (AMC) in Bangalore from TEB Pest Control.',
    path: '/services?category=amc',
  },
}

const DEFAULT_IMAGES = {
  pest: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=70',
  residential: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=70',
  commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=70',
  amc: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=70',
  location: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=70',
  package_b2c: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=70',
  package_b2b: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=70',
}

/** Unique defaults by slug when cover_image is empty (service-name matched). */
const SLUG_IMAGES = {
  'general-pest-control-home': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=70',
  'kitchen-pest-control': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=70',
  'bedbug-treatment-home': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=70',
  'termite-treatment-home': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=70',
  'mosquito-management-home': 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1200&q=70',
  'rodent-control-home': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=70',
  'move-in-pest-control': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=70',
  'annual-home-protection': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=70',
  'where-we-work-homes': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70',
  'cockroach-control-bangalore': 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=70',
  'termite-control-bangalore': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=70',
  'bed-bug-control-bangalore': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=70',
  'rodent-control-bangalore': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=70',
  'mosquito-control-bangalore': 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1200&q=70',
  'ant-control-bangalore': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=70',
  'residential-pest-control-bangalore': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70',
  'commercial-pest-control-bangalore': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=70',
  'pest-control-amc-bangalore': 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=70',
  'pest-control-whitefield': 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=70',
  'pest-control-marathahalli': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=70',
  'pest-control-sarjapur-road': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=70',
  'pest-control-bellandur': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1200&q=70',
  'pest-control-brookefield': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=70',
  'pest-control-hoodi': 'https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1200&q=70',
  'pest-control-kr-puram': 'https://images.unsplash.com/photo-1467269204591-fc0da825e6b7?auto=format&fit=crop&w=1200&q=70',
  'pest-control-electronic-city': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=70',
  'pest-control-hsr-layout': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=70',
}

function imageFromName(s) {
  const hay = `${s.slug || ''} ${s.title || ''}`.toLowerCase()
  if (hay.includes('cockroach')) return SLUG_IMAGES['cockroach-control-bangalore']
  if (hay.includes('termite')) return SLUG_IMAGES['termite-control-bangalore']
  if (hay.includes('bed')) return SLUG_IMAGES['bed-bug-control-bangalore']
  if (hay.includes('rodent') || hay.includes('rat')) return SLUG_IMAGES['rodent-control-bangalore']
  if (hay.includes('mosquito')) return SLUG_IMAGES['mosquito-control-bangalore']
  if (hay.includes('ant')) return SLUG_IMAGES['ant-control-bangalore']
  if (hay.includes('kitchen')) return SLUG_IMAGES['kitchen-pest-control']
  if (hay.includes('amc') || hay.includes('annual')) return SLUG_IMAGES['pest-control-amc-bangalore']
  return null
}

function serviceImage(s) {
  if (s.cover_image) return mediaUrl(s.cover_image)
  if (s.slug && SLUG_IMAGES[s.slug]) return SLUG_IMAGES[s.slug]
  const byName = imageFromName(s)
  if (byName) return byName
  return DEFAULT_IMAGES[s.category] || DEFAULT_IMAGES.pest
}

export function ServicesIndexPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState('all')
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') || 'all'
  const category = ['all', 'pest', 'residential', 'commercial', 'amc', 'location'].includes(categoryParam)
    ? categoryParam
    : 'all'
  const { openEnquiry } = useEnquiry()
  useReveal()

  const setCategory = (value) => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === 'all') next.delete('category')
    else next.set('category', value)
    setSearchParams(next, { replace: true })
  }

  useEffect(() => {
    getPublicServices()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  const locations = useMemo(
    () => items.filter((i) => i.category === 'location').sort((a, b) => a.title.localeCompare(b.title)),
    [items],
  )

  const listing = useMemo(() => {
    let list = items.filter((i) => !['package_b2c', 'package_b2b'].includes(i.category))
    if (category !== 'all') list = list.filter((i) => i.category === category)
    if (location !== 'all') {
      const selected = locations.find((l) => l.slug === location)
      if (selected) {
        // show selected location + non-location services
        list = list.filter((i) => i.category !== 'location' || i.slug === location)
      }
    }
    return list
  }, [items, category, location, locations])

  const selectedLocation = locations.find((l) => l.slug === location)
  const pageSeo = CATEGORY_PAGE_SEO[category] || CATEGORY_PAGE_SEO.all

  return (
    <>
      <SeoHead
        title={pageSeo.title}
        description={pageSeo.description}
        path={pageSeo.path}
      />
      <section
        style={{
          padding: 'clamp(48px,7vw,90px) 0',
          background:
            'linear-gradient(135deg, rgba(10,22,38,.92), rgba(18,39,64,.85)), url(https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1600&q=70) center/cover',
          color: '#fff',
        }}
      >
        <div className="wrap">
          <p className="eyebrow on-dark">Services</p>
          <h1 style={{ fontSize: 'clamp(2.2rem,4.5vw,3.6rem)', maxWidth: '18ch', color: '#fff' }}>
            {pageSeo.h1}
          </h1>
          <p className="lede" style={{ marginTop: 16, color: 'rgba(255,255,255,.78)', maxWidth: '58ch' }}>
            Inspection-based treatment for homes and businesses — cockroach, termite, bed bug, rodent,
            mosquito, ant control and more across Bengaluru.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <button type="button" className="btn btn--orange" onClick={() => openEnquiry()}>
              Book an inspection <span className="arw">→</span>
            </button>
            <a className="btn btn--onDark" href={SITE.phoneHref}>Call {SITE.phone}</a>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(40px,6vw,72px) 0', background: 'var(--paper)' }}>
        <div className="wrap">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 14,
              alignItems: 'end',
              justifyContent: 'space-between',
              marginBottom: 28,
            }}
          >
            <div>
              <p className="eyebrow">All services</p>
              <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>Choose a service</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <label style={{ display: 'grid', gap: 6 }}>
                <span className="font-[family-name:var(--mono)]" style={{ fontSize: '.66rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  Category
                </span>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: 100,
                    padding: '11px 18px',
                    background: '#fff',
                    minWidth: 180,
                  }}
                >
                  <option value="all">All categories</option>
                  <option value="pest">Pest services</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="amc">AMC</option>
                  <option value="location">Locations</option>
                </select>
              </label>
              <label style={{ display: 'grid', gap: 6 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '.66rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                  Location
                </span>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: 100,
                    padding: '11px 18px',
                    background: '#fff',
                    minWidth: 200,
                  }}
                >
                  <option value="all">All Bangalore areas</option>
                  {locations.map((l) => (
                    <option key={l.slug} value={l.slug}>{l.title.replace('Pest Control in ', '')}</option>
                  ))}
                  {AREAS.filter((a) => !locations.some((l) => l.title.toLowerCase().includes(a.toLowerCase()))).map((a) => (
                    <option key={a} value={`area-${a}`} disabled>
                      {a} (coming soon)
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {selectedLocation && location !== 'all' && (
            <div className="card" style={{ marginBottom: 24, display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
              <img
                src={serviceImage(selectedLocation)}
                alt={selectedLocation.title || 'Pest control service area in Bangalore'}
                style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 12 }}
              />
              <div style={{ flex: 1, minWidth: 220 }}>
                <h3 style={{ marginBottom: 6 }}>{selectedLocation.title}</h3>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '.92rem' }}>{selectedLocation.summary}</p>
              </div>
              <Link className="btn btn--orange" to={`/${selectedLocation.slug}`}>
                View area page <span className="arw">→</span>
              </Link>
            </div>
          )}

          {loading ? (
            <p className="lede">Loading services…</p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
              }}
              className="services-grid-4"
            >
              {listing.map((s) => (
                <Link
                  key={s.id}
                  to={`/${s.slug}`}
                  className="card"
                  style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
                >
                  <img
                    src={serviceImage(s)}
                    alt={s.title || 'Pest control service in Bangalore'}
                    style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover' }}
                  />
                  <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span className="num">{CATEGORY_LABELS[s.category] || s.category}</span>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ margin: 0, flex: 1 }}>{s.summary}</p>
                    <span style={{ marginTop: 14, color: 'var(--orange)', fontWeight: 600, fontSize: '.9rem' }}>
                      Learn more →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && !listing.length && (
            <p className="lede" style={{ marginTop: 20 }}>No services match this filter.</p>
          )}
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,6vw,80px) 0', background: '#fff' }}>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">Why TEB</p>
            <h2>Built around inspection, not just spray.</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 16,
            }}
            className="services-grid-4"
          >
            {[
              ['01', 'Inspect first', 'We find entry points, breeding sources and risks before treatment.'],
              ['02', 'Targeted methods', 'Treatment matched to pest type, property and occupancy sensitivity.'],
              ['03', 'Homes & business', 'Residential packages and commercial programmes with documentation.'],
              ['04', 'Bengaluru coverage', 'Whitefield, HSR, Electronic City, Sarjapur and more zones.'],
            ].map(([n, t, d]) => (
              <div key={n} className="card">
                <span className="num">{n}</span>
                <h3 style={{ marginBottom: 8 }}>{t}</h3>
                <p style={{ margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(48px,6vw,80px) 0', background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="sec-head">
            <p className="eyebrow">How we work</p>
            <h2>Clear steps from enquiry to prevention.</h2>
          </div>
          <div className="steps">
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

      <section
        style={{
          padding: 'clamp(48px,6vw,80px) 0',
          display: 'grid',
          gridTemplateColumns: '1.05fr .95fr',
          gap: 0,
          background: 'var(--ink)',
          color: '#fff',
        }}
        className="services-split"
      >
        <div style={{ padding: 'clamp(32px,5vw,64px)', order: 1 }}>
          <p className="eyebrow on-dark">Coverage</p>
          <h2 style={{ color: '#fff', marginBottom: 14 }}>Across Bengaluru localities</h2>
          <p style={{ color: 'rgba(255,255,255,.72)', maxWidth: '48ch', marginBottom: 22 }}>
            Pick your area from the dropdown above, or browse dedicated location pages for Whitefield,
            Marathahalli, HSR Layout, Electronic City and more.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {locations.slice(0, 8).map((l) => (
              <Link
                key={l.id}
                to={`/${l.slug}`}
                style={{
                  textDecoration: 'none',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,.25)',
                  borderRadius: 100,
                  padding: '8px 14px',
                  fontSize: '.85rem',
                }}
              >
                {l.title.replace('Pest Control in ', '')}
              </Link>
            ))}
          </div>
        </div>
        <div
          style={{
            minHeight: 320,
            background:
              'url(https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=70) center/cover',
          }}
        />
      </section>

      <section className="band">
        <div className="wrap">
          <h2>Ready for a site inspection?</h2>
          <p>Tell us the pest and locality — we will confirm coverage and share a quotation.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn--onDark" onClick={() => openEnquiry()}>
              Get a free inspection
            </button>
            <a className="btn" href={SITE.phoneHref} style={{ background: 'transparent', borderColor: 'rgba(255,255,255,.6)', color: '#fff' }}>
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1100px) {
          .services-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .services-split { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 620px) {
          .services-grid-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

export function ServiceDetailPage() {
  const { slug } = useParams()
  const [item, setItem] = useState(null)
  const [related, setRelated] = useState([])
  const [error, setError] = useState('')
  const [faqOpen, setFaqOpen] = useState(0)
  const { openEnquiry } = useEnquiry()
  useReveal()

  useEffect(() => {
    setError('')
    setItem(null)
    setFaqOpen(0)
    getPublicService(slug)
      .then((data) => {
        setItem(data)
        return getPublicServices({ category: data.category }).then((list) =>
          setRelated(list.filter((s) => s.slug !== data.slug).slice(0, 4)),
        )
      })
      .catch(() => setError('Service page not found.'))
  }, [slug])

  const seoMeta = useMemo(
    () => (item ? resolveServiceMeta(slug, item) : null),
    [slug, item],
  )

  const faqItems = useMemo(() => {
    if (!item) return []
    return resolveServiceFaqPairs(slug, pipePairs(item.faq_items))
  }, [slug, item])

  const schemas = useMemo(() => {
    if (!item) return []
    return buildServiceSchemas(slug, item, faqItems)
  }, [slug, item, faqItems])

  if (error) {
    return <NotFound />
  }

  if (!item || !seoMeta) {
    return (
      <section style={{ paddingTop: 72 }}>
        <div className="wrap"><p className="lede">Loading…</p></div>
      </section>
    )
  }

  const points = highlightsList(item.highlights)
  const paragraphs = (item.content || '').split('\n\n').filter(Boolean)
  const img = serviceImage(item)
  const aboutImg = item.about_image ? mediaUrl(item.about_image) : img
  const whyItems = pipePairs(item.why_items)
  const processItems = pipePairs(item.process_items)
  const galleryImgs = galleryList(item.gallery_images, [
    img,
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=70',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=70',
  ]).slice(0, 6)

  const defaultWhy = [
    ['Inspect first', 'Every job starts with a site inspection — we find the source before we treat.'],
    ['Targeted methods', 'Treatment matched to pest type, property sensitivity and infestation level.'],
    ['Follow-up included', 'Follow-up visits scheduled based on pest type and agreed service plan.'],
    ['Bengaluru-wide', 'Serving homes, apartments, offices, hotels, restaurants and warehouses across the city.'],
  ]
  const whyCards = whyItems.length ? whyItems : defaultWhy
  const processCards = processItems.length
    ? processItems.map(([t, d], i) => [String(i + 1).padStart(2, '0'), t, d])
    : PROCESS.slice(0, 4)

  const displayFaqs =
    faqItems.length > 0
      ? faqItems
      : points.slice(0, 5).map((p) => [
          `Do you provide ${p.toLowerCase()}?`,
          `Yes. TEB Enterprises provides ${p.toLowerCase()} as part of our ${item.title.toLowerCase()} programme across Bengaluru. Contact us for a free site inspection and quotation.`,
        ])

  return (
    <>
      <SeoHead
        title={seoMeta.title}
        description={seoMeta.description}
        path={seoMeta.path}
        image={seoMeta.image}
        keywords={seoMeta.keywords}
      />
      <JsonLd id={`service-seo-${slug}`} data={schemas} />

      {/* Hero */}
      <section
        style={{
          padding: 'clamp(56px,8vw,100px) 0 clamp(48px,6vw,72px)',
          background: `linear-gradient(135deg, rgba(10,22,38,.92), rgba(18,39,64,.78)), url(${img}) center/cover`,
          color: '#fff',
        }}
      >
        <div className="wrap">
          <Link to="/services" style={{ color: 'rgba(255,255,255,.65)', textDecoration: 'none', fontSize: '.88rem', marginBottom: 18, display: 'inline-block' }}>
            ← All services
          </Link>
          <p className="eyebrow on-dark">{CATEGORY_LABELS[item.category] || item.category}</p>
          <h1 style={{ fontSize: 'clamp(2.2rem,4.5vw,3.4rem)', color: '#fff', marginBottom: 16, maxWidth: '18ch' }}>
            {item.title}
          </h1>
          {item.summary && (
            <p style={{ color: 'rgba(255,255,255,.78)', maxWidth: '58ch', margin: '0 0 28px', fontSize: '1.08rem' }}>
              {item.summary}
            </p>
          )}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn--orange"
              onClick={() => openEnquiry({ serviceTitle: item.title })}
            >
              Book an inspection <span className="arw">→</span>
            </button>
            <a className="btn btn--onDark" href={SITE.phoneHref}>Call {SITE.phone}</a>
          </div>
        </div>
      </section>

      {/* What we cover */}
      {points.length > 0 && (
        <section style={{ padding: 'clamp(40px,6vw,72px) 0', background: 'var(--paper)' }}>
          <div className="wrap">
            <div className="sec-head" style={{ marginBottom: 28 }}>
              <p className="eyebrow">What we cover</p>
              <h2>{item.scope_title || 'Scope of this service'}</h2>
            </div>
            <div className="services-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {points.map((p, i) => (
                <div key={p} className="card" style={{ padding: '22px 20px' }}>
                  <span className="num" style={{ marginBottom: 12 }}>{String(i + 1).padStart(2, '0')}</span>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '.98rem', lineHeight: 1.45 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About */}
      {(paragraphs.length > 0 || item.about_title) && (
        <section style={{ padding: 'clamp(48px,6vw,80px) 0', background: '#fff' }}>
          <div className="wrap">
            <div className="service-detail-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(28px,4vw,56px)', alignItems: 'center' }}>
              <div>
                <p className="eyebrow">{item.about_eyebrow || 'About this service'}</p>
                <h2 style={{ marginBottom: 18 }}>{item.about_title || 'Inspection-based treatment across Bengaluru'}</h2>
                {paragraphs.map((para, i) => (
                  <p key={i} style={{ color: 'var(--muted)', fontSize: '1.02rem', lineHeight: 1.72, marginBottom: 16 }}>
                    {para}
                  </p>
                ))}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 }}>
                  <button
                    type="button"
                    className="btn btn--orange"
                    onClick={() => openEnquiry({ serviceTitle: item.title })}
                  >
                    Get a free quote
                  </button>
                  <a className="btn btn--ghost" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    WhatsApp us
                  </a>
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <img
                  src={aboutImg}
                  alt={item.title || 'Pest control service in Bangalore'}
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
                    maxWidth: 220,
                  }}
                >
                  <p style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: '.68rem', letterSpacing: '.14em', textTransform: 'uppercase', color: '#FFA45C' }}>
                    TEB Enterprises
                  </p>
                  <p style={{ margin: '6px 0 0', fontWeight: 700, fontSize: '.95rem' }}>Free site inspection before every job</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why choose TEB */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 0', background: 'var(--paper-2)' }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 28 }}>
            <p className="eyebrow">{item.why_eyebrow || 'Why TEB'}</p>
            <h2>{item.why_title || `Why choose us for ${item.title.toLowerCase()}?`}</h2>
          </div>
          <div className="services-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {whyCards.map(([t, d], i) => (
              <div key={`${t}-${i}`} className="card">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ marginBottom: 8, fontSize: '1.05rem' }}>{t}</h3>
                <p style={{ margin: 0, fontSize: '.92rem', color: 'var(--muted)' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 0', background: '#fff' }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: 28 }}>
            <p className="eyebrow">{item.process_eyebrow || 'How we work'}</p>
            <h2>{item.process_title || 'Our process for every service'}</h2>
          </div>
          <div className="steps">
            {processCards.map((row) => {
              const n = row[0]
              const title = row[1]
              const text = row[2] || ''
              return (
                <div className="step" key={`${n}-${title}`}>
                  <span className="n">{n}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {galleryImgs.length > 0 && (
        <section style={{ padding: 0, background: 'var(--ink)' }}>
          <div
            style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(galleryImgs.length, 3)}, 1fr)`, gap: 2 }}
            className="service-gallery-strip"
          >
            {galleryImgs.map((src, i) => (
              <div
                key={`${src}-${i}`}
                style={{
                  aspectRatio: '16/9',
                  background: `url(${gallerySrc(src)}) center/cover`,
                  opacity: i === 0 ? 1 : 0.8,
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section style={{ padding: 'clamp(48px,6vw,80px) 0', background: 'var(--paper)' }}>
          <div className="wrap">
            <div className="sec-head" style={{ marginBottom: 28 }}>
              <p className="eyebrow">{item.related_eyebrow || 'Related services'}</p>
              <h2>{item.related_title || 'You may also need'}</h2>
            </div>
            <div className="services-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {related.map((s) => (
                <Link
                  key={s.id}
                  to={`/${s.slug}`}
                  className="card"
                  style={{ textDecoration: 'none', display: 'block', padding: 0, overflow: 'hidden' }}
                >
                  <img
                    src={serviceImage(s)}
                    alt={s.title || 'Pest control service in Bangalore'}
                    style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover' }}
                  />
                  <div style={{ padding: 18 }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: 6 }}>{s.title}</h3>
                    <p style={{ margin: 0, fontSize: '.88rem', color: 'var(--muted)' }}>{s.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {displayFaqs.length > 0 && (
        <section style={{ padding: 'clamp(48px,6vw,80px) 0', background: '#fff', borderBlock: '1px solid var(--line-soft)' }}>
          <div className="wrap" style={{ maxWidth: 780 }}>
            <div className="sec-head" style={{ marginBottom: 28 }}>
              <p className="eyebrow">{item.faq_eyebrow || 'Common questions'}</p>
              <h2>{item.faq_title || 'What to expect'}</h2>
            </div>
            <div className="acc">
              {displayFaqs.map(([q, a], i) => {
                const isOpen = faqOpen === i
                return (
                  <div key={q} className={`acc-item${isOpen ? ' open' : ''}`}>
                    <button
                      className="acc-q"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setFaqOpen(isOpen ? null : i)}
                    >
                      {q}
                    </button>
                    <div className="acc-a" style={{ maxHeight: isOpen ? 600 : 0 }}>
                      <p>{a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="band">
        <div className="wrap">
          <h2>{item.cta_title || `Book ${item.title.toLowerCase()} today`}</h2>
          <p>
            {item.cta_text ||
              'TEB Enterprises — Team Experts Bangalore — inspection-based pest control for homes and businesses across Bengaluru.'}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn--onDark"
              onClick={() => openEnquiry({ serviceTitle: item.title })}
            >
              Request a site inspection
            </button>
            <a className="btn" href={SITE.phoneHref} style={{ background: 'transparent', borderColor: 'rgba(255,255,255,.6)', color: '#fff' }}>
              Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1100px) {
          .services-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .service-detail-split { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 620px) {
          .services-grid-4 { grid-template-columns: 1fr !important; }
          .service-gallery-strip { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

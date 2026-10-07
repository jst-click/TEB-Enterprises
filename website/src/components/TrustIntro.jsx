import { useEnquiry } from '../context/EnquiryContext'
import { useHomeSection } from '../context/HomeContent'
import GmbLink from './GmbLink'
import Html from './Html'

const FALLBACK = {
  eyebrow: 'Trusted pest control',
  title: 'Trusted Pest Control Company in Bangalore for Homes & Businesses',
  lede:
    '<p>Pest problems are different for every property. A kitchen, apartment, office, restaurant and warehouse all require a different inspection approach and treatment plan.</p>' +
    '<p>TEB provides reliable pest control Bangalore solutions using inspection-based treatment, Integrated Pest Management and preventive service programmes with inspection-based solutions for residential and commercial properties. Our team identifies pest activity, entry points, breeding areas and risk factors before recommending the right treatment.</p>' +
    '<p>Whether you need one-time pest control, termite protection, mosquito management or a long-term AMC programme, we build the service around your property requirements.</p>',
  audiences_label: 'Who we serve',
  audiences: [
    'Homes & apartments',
    'Corporate offices',
    'Restaurants & hotels',
    'Factories & warehouses',
    'Hospitals & institutions',
    'IT parks & commercial buildings',
  ],
  primary_cta: 'Book an inspection',
}

export default function TrustIntro() {
  const { data } = useHomeSection('trust', FALLBACK)
  const { openEnquiry } = useEnquiry()
  const audiences = data.audiences?.length ? data.audiences : FALLBACK.audiences
  const lede =
    data.lede ||
    (data.paragraphs?.length ? data.paragraphs.join('') : FALLBACK.lede)

  return (
    <section className="trust-intro" id="trusted">
      <div className="wrap">
        <div className="trust-intro__grid rv">
          <div className="trust-intro__copy">
            <p className="eyebrow">{data.eyebrow || FALLBACK.eyebrow}</p>
            <h2>{data.title || FALLBACK.title}</h2>
            <Html as="div" className="trust-intro__body" html={lede} />
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <button type="button" className="btn btn--orange" onClick={() => openEnquiry()}>
                {data.primary_cta || FALLBACK.primary_cta} <span className="arw">→</span>
              </button>
              <GmbLink label="Google Business Profile" />
            </div>
          </div>

          <div className="trust-intro__aside">
            <p className="trust-intro__aside-label">{data.audiences_label || FALLBACK.audiences_label}</p>
            <ul className="trust-intro__list">
              {audiences.map((item, i) => (
                <li key={`${item}-${i}`}>
                  <span className="trust-intro__num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

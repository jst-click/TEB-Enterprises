import { useHomeSection } from '../context/HomeContent'
import { SITE } from '../data/content'
import Html from './Html'

const FALLBACK = {
  eyebrow: 'Pricing guide',
  title: 'Common Pest Control Bangalore Price Range',
  lede: '<p>Pest control Bangalore price range depends on the pest type, property size, infestation level, and treatment required. Get a customized quote from our experts after understanding your specific requirement.</p>',
  columns: ['Pest Control Service', 'Pricing Information', 'Get Quote'],
  rows: [
    { service: 'Cockroach Control', pricing: 'Customized Pricing Based on Inspection', quote_label: 'WhatsApp Us' },
    { service: 'General Pest Control', pricing: 'Depends on Property Size & Treatment Required', quote_label: 'WhatsApp Us' },
    { service: 'Bed Bug Treatment', pricing: 'Quote Based on Infestation Level', quote_label: 'WhatsApp Us' },
    { service: 'Rodent Control', pricing: 'Project-Based Pricing', quote_label: 'WhatsApp Us' },
    { service: 'Mosquito Control', pricing: 'Depends on Area Coverage & Requirement', quote_label: 'WhatsApp Us' },
    { service: 'Termite Treatment', pricing: 'Inspection Required for Accurate Pricing', quote_label: 'WhatsApp Us' },
  ],
  cta_title: 'Get Your Pest Control Quote in Bangalore',
  cta_text:
    '<p>Looking for reliable pest control services near you? Send us your <strong>pest problem, property type, property size, and Bangalore location</strong> on WhatsApp. Our team will provide the right treatment plan and quotation.</p>',
  cta_label: 'Get Instant Quote on WhatsApp',
  whatsapp_message:
    'Hi TEB Enterprises, I need a pest control quote in Bangalore. Pest problem: , Property type: , Size: , Location: ',
}

function waLink(message) {
  const text = encodeURIComponent(message || FALLBACK.whatsapp_message)
  return `https://wa.me/${SITE.whatsapp}?text=${text}`
}

export default function PricingRange() {
  const { data } = useHomeSection('pricing', FALLBACK)
  const rows = data.rows?.length ? data.rows : FALLBACK.rows
  const cols = data.columns?.length === 3 ? data.columns : FALLBACK.columns
  const message = data.whatsapp_message || FALLBACK.whatsapp_message

  return (
    <section className="pricing-range" id="pricing">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">{data.eyebrow || FALLBACK.eyebrow}</p>
          <h2>{data.title || FALLBACK.title}</h2>
          <Html as="div" className="lede" html={data.lede || FALLBACK.lede} />
        </div>

        <div className="pricing-range__table rv" role="table" aria-label="Pest control price range guide">
          <div className="pricing-range__head" role="row">
            <div role="columnheader">{cols[0]}</div>
            <div role="columnheader">{cols[1]}</div>
            <div role="columnheader">{cols[2]}</div>
          </div>
          {rows.map((row) => (
            <div className="pricing-range__row" role="row" key={row.service}>
              <div role="cell" data-label={cols[0]}>
                <strong>{row.service}</strong>
              </div>
              <div role="cell" data-label={cols[1]}>
                {row.pricing}
              </div>
              <div role="cell" data-label={cols[2]}>
                <a
                  className="pricing-range__wa"
                  href={waLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {row.quote_label || 'WhatsApp Us'} <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="pricing-range__cta rv">
          <h3>{data.cta_title || FALLBACK.cta_title}</h3>
          <Html as="div" className="pricing-range__cta-text" html={data.cta_text || FALLBACK.cta_text} />
          <a
            className="btn btn--orange"
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.cta_label || FALLBACK.cta_label} <span className="arw">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

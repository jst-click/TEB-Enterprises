import { useHomeSection } from '../context/HomeContent'
import Html from './Html'

const FALLBACK = {
  eyebrow: 'Why TEB',
  title: 'Why Choose TEB as the Best Pest Control Bangalore Company?',
  lede:
    '<p>Finding the <strong>best pest control provider in Bangalore</strong> requires more than temporary spraying.</p>' +
    '<p>TEB Pest Control follows an inspection-first approach to deliver reliable pest management solutions.</p>',
  items: [
    {
      title: 'Inspection before treatment',
      text: 'We identify pest activity, hiding locations, entry points and contributing conditions before selecting treatment methods.',
    },
    {
      title: 'Solutions for homes and businesses',
      text: 'From apartments and villas to factories, warehouses and IT parks, our programmes are designed for different property environments.',
    },
    {
      title: 'Integrated Pest Management approach',
      text: 'We focus on reducing pest sources through monitoring, sanitation recommendations, exclusion and targeted treatments.',
    },
    {
      title: 'Documentation for commercial clients',
      text: 'Businesses receive service reports, observations, treatment details and recommendations where required.',
    },
    {
      title: 'Bangalore-wide service coverage',
      text: 'Our team supports residential and commercial properties across major Bengaluru locations.',
    },
  ],
  closing:
    '<p>For customers searching for the <strong>best pest control near me</strong>, our team provides reliable pest management support across Bengaluru.</p>',
}

export default function WhyChoose() {
  const { data } = useHomeSection('why_choose', FALLBACK)
  const items = data.items?.length ? data.items : FALLBACK.items

  return (
    <section className="why-choose" id="why-teb">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">{data.eyebrow || FALLBACK.eyebrow}</p>
          <h2>{data.title || FALLBACK.title}</h2>
          <Html as="div" className="lede" html={data.lede || FALLBACK.lede} />
        </div>

        <div className="why-choose__grid rv">
          {items.map((item, i) => (
            <article className="why-choose__card" key={`${item.title}-${i}`}>
              <span className="why-choose__num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        {(data.closing || FALLBACK.closing) && (
          <Html as="div" className="why-choose__closing rv" html={data.closing || FALLBACK.closing} />
        )}
      </div>
    </section>
  )
}

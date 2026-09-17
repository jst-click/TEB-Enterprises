import { useEffect, useMemo, useState } from 'react'
import { getPublicSettings, submitContact } from '../api'
import { AREAS, FAQS, PEST_OPTIONS, PROPERTY_TYPES, SITE } from '../data/content'
import { useHomeSection } from '../context/HomeContent'
import Html from './Html'

export function Areas() {
  const { data } = useHomeSection('areas', {
    eyebrow: 'Service areas',
    title: 'Across Bengaluru.',
    lede: '',
    items: AREAS,
    other_label: 'Other Bengaluru locations',
  })
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    const base = [...(data.items || AREAS), data.other_label || 'Other Bengaluru locations']
    if (!query) return base
    return base.filter((a) => a.toLowerCase().includes(query))
  }, [q, data.items, data.other_label])

  return (
    <section id="areas">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">{data.eyebrow}</p>
          <h2>{data.title}</h2>
          <Html as="div" className="lede" html={data.lede} />
        </div>
        <div className="search rv">
          <input
            type="search"
            placeholder="Type your area — Whitefield, HSR, Peenya…"
            aria-label="Search service areas"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <span className="n">
            {filtered.length} {filtered.length === 1 ? 'area' : 'areas'}
          </span>
        </div>
        <div className="areas rv">
          {filtered.map((a) => (
            <span className="area" key={a}>{a}</span>
          ))}
        </div>
        {!filtered.length && (
          <p className="empty" style={{ marginTop: 18 }}>
            No match in the list — we may still cover it. Call {SITE.phone} to confirm.
          </p>
        )}
      </div>
    </section>
  )
}

export function FAQ() {
  const { data } = useHomeSection('faq', {
    eyebrow: 'Questions',
    title: 'Straight answers.',
    items: FAQS.map(([q, a]) => ({ q, a: `<p>${a}</p>` })),
  })
  const [open, setOpen] = useState(null)
  const items = data.items?.length ? data.items : FAQS.map(([q, a]) => ({ q, a }))

  return (
    <section id="faq" style={{ background: 'var(--white)', borderBlock: '1px solid var(--line-soft)' }}>
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">{data.eyebrow}</p>
          <h2>{data.title}</h2>
        </div>
        <div className="acc rv">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <div className={`acc-item${isOpen ? ' open' : ''}`} key={item.q}>
                <button
                  className="acc-q"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  {item.q}
                </button>
                <div className="acc-a" style={{ maxHeight: isOpen ? 500 : 0 }}>
                  <Html as="div" html={item.a} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const { data: copy } = useHomeSection('contact', {
    eyebrow: 'Get started',
    title: 'Book an inspection and get a quotation.',
    lede: '',
    aside_title: 'Talk to us directly',
    aside_text: '',
    property_types: PROPERTY_TYPES,
    pest_options: PEST_OPTIONS,
  })
  const propertyTypes = copy.property_types?.length ? copy.property_types : PROPERTY_TYPES
  const pestOptions = copy.pest_options?.length ? copy.pest_options : PEST_OPTIONS

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    loc: '',
    type: PROPERTY_TYPES[0],
    size: '',
    pest: PEST_OPTIONS[0],
    date: '',
    msg: '',
  })
  const [channels, setChannels] = useState({
    whatsapp_number: SITE.whatsapp,
    contact_email: SITE.salesEmail,
  })
  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (propertyTypes[0] && !propertyTypes.includes(form.type)) {
      setForm((f) => ({ ...f, type: propertyTypes[0] }))
    }
  }, [propertyTypes, form.type])

  useEffect(() => {
    if (pestOptions[0] && !pestOptions.includes(form.pest)) {
      setForm((f) => ({ ...f, pest: pestOptions[0] }))
    }
  }, [pestOptions, form.pest])

  useEffect(() => {
    getPublicSettings()
      .then((data) =>
        setChannels({
          whatsapp_number: data.whatsapp_number || SITE.whatsapp,
          contact_email: data.contact_email || SITE.salesEmail,
        }),
      )
      .catch(() => {})
  }, [])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const buildMsg = () => {
    const lines = [
      'New pest control enquiry — TEB Enterprises',
      '',
      `Name: ${form.name || '—'}`,
      `Mobile: ${form.mobile || '—'}`,
      `Email: ${form.email || '—'}`,
      `Location: ${form.loc || '—'}`,
      `Property type: ${form.type}`,
      `Approx. size: ${form.size || '—'}`,
      `Pest problem: ${form.pest}`,
      `Preferred inspection date: ${form.date || '—'}`,
      `Notes: ${form.msg || '—'}`,
    ]
    return lines.join('\n')
  }

  const validate = () => {
    if (!form.name.trim() || !form.mobile.trim()) {
      alert('Add your name and mobile number so we can call you back.')
      return false
    }
    return true
  }

  const saveEnquiry = async (channel) => {
    await submitContact({
      name: form.name.trim(),
      mobile: form.mobile.trim(),
      email: form.email.trim() || null,
      location: form.loc.trim() || null,
      property_type: form.type,
      approx_size: form.size.trim() || null,
      pest_problem: form.pest,
      preferred_date: form.date || null,
      notes: form.msg.trim() || null,
      channel,
    })
  }

  const sendWa = async () => {
    if (!validate()) return
    setSending(true)
    try {
      await saveEnquiry('whatsapp')
      const wa = String(channels.whatsapp_number || SITE.whatsapp).replace(/\D/g, '')
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(buildMsg())}`, '_blank')
    } catch (err) {
      alert(err.message || 'Could not submit enquiry. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const sendMail = async () => {
    if (!validate()) return
    setSending(true)
    try {
      await saveEnquiry('email')
      const to = channels.contact_email || SITE.salesEmail
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(`Pest control enquiry — ${form.name}`)}&body=${encodeURIComponent(buildMsg())}`
    } catch (err) {
      alert(err.message || 'Could not submit enquiry. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="contact-sec">
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow on-dark">{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <Html as="div" className="lede" html={copy.lede} />
        </div>

        <div className="contact-grid">
          <div className="rv">
            <h3>{copy.aside_title}</h3>
            <Html as="div" className="contact-sec__hint" html={copy.aside_text} />
            <div className="cinfo">
              <div><span>Contact person</span><p>{SITE.contactPerson}</p></div>
              <div>
                <span>Mobile</span>
                <p>
                  <a href={SITE.phoneHref}>{SITE.phone}</a>
                  {' · '}
                  <a href={SITE.phone2Href}>{SITE.phone2}</a>
                </p>
              </div>
              <div>
                <span>Sales email</span>
                <p>
                  <a href={`mailto:${channels.contact_email || SITE.salesEmail}`}>
                    {channels.contact_email || SITE.salesEmail}
                  </a>
                </p>
              </div>
              <div>
                <span>Office email</span>
                <p><a href={`mailto:${SITE.officeEmail}`}>{SITE.officeEmail}</a></p>
              </div>
              <div>
                <span>Website</span>
                <p>
                  <a href={SITE.website} target="_blank" rel="noopener noreferrer">
                    www.teamcleaningexperts.in
                  </a>
                </p>
              </div>
              <div><span>GSTIN</span><p>{SITE.gstin}</p></div>
            </div>
          </div>

          <div className="form rv">
            <div className="f2">
              <div className="field">
                <label htmlFor="f-name">Your name</label>
                <input id="f-name" placeholder="Full name" value={form.name} onChange={set('name')} />
              </div>
              <div className="field">
                <label htmlFor="f-mobile">Mobile number</label>
                <input id="f-mobile" type="tel" placeholder="10-digit mobile" value={form.mobile} onChange={set('mobile')} />
              </div>
            </div>
            <div className="f2">
              <div className="field">
                <label htmlFor="f-email">Email</label>
                <input id="f-email" type="email" placeholder="name@company.com" value={form.email} onChange={set('email')} />
              </div>
              <div className="field">
                <label htmlFor="f-loc">Property location</label>
                <input id="f-loc" placeholder="Area in Bengaluru" value={form.loc} onChange={set('loc')} />
              </div>
            </div>
            <div className="f2">
              <div className="field">
                <label htmlFor="f-type">Property type</label>
                <select id="f-type" value={form.type} onChange={set('type')}>
                  {propertyTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-size">Approximate size</label>
                <input id="f-size" placeholder="e.g. 1,200 sq ft / 2 BHK" value={form.size} onChange={set('size')} />
              </div>
            </div>
            <div className="f2">
              <div className="field">
                <label htmlFor="f-pest">Pest problem</label>
                <select id="f-pest" value={form.pest} onChange={set('pest')}>
                  {pestOptions.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="f-date">Preferred inspection date</label>
                <input id="f-date" type="date" value={form.date} onChange={set('date')} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="f-msg">Anything else we should know</label>
              <textarea
                id="f-msg"
                rows="3"
                placeholder="How long has it been going on? Previous treatments? Children, pets, allergies?"
                value={form.msg}
                onChange={set('msg')}
              />
            </div>
            <button className="btn btn--orange" type="button" onClick={sendWa} disabled={sending}>
              {sending ? 'Sending…' : 'Send enquiry on WhatsApp'} <span className="arw">→</span>
            </button>
            <button
              className="btn btn--ghost"
              type="button"
              onClick={sendMail}
              disabled={sending}
              style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}
            >
              Send by email instead
            </button>
            <p className="note">
              Your enquiry is saved for our team, then opens in WhatsApp or your email app. We reply
              during working hours, {SITE.hours}.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Band() {
  const { data } = useHomeSection('band', {
    title: 'Keep your property protected from pests.',
    lede: 'From homes and apartments to offices, factories, hospitals, hotels, restaurants and warehouses — customised pest-control solutions for every environment.',
    secondary_cta: 'Request a site inspection',
  })

  return (
    <section className="band">
      <div className="wrap rv">
        <h2>{data.title}</h2>
        <Html as="div" html={data.lede} />
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 30 }}>
          <a className="btn btn--onDark" href={SITE.phoneHref}>
            Call now: {SITE.phone}
          </a>
          <a
            className="btn"
            href="#contact"
            style={{ background: 'transparent', borderColor: 'rgba(255,255,255,.6)', color: '#fff' }}
          >
            {data.secondary_cta}
          </a>
        </div>
      </div>
    </section>
  )
}

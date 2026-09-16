import { useEffect, useState } from 'react'
import { getPublicSettings, submitContact } from '../api'
import { useEnquiry } from '../context/EnquiryContext'
import { PEST_OPTIONS, PROPERTY_TYPES, SITE } from '../data/content'

function guessPest(serviceTitle = '', pestHint = '') {
  const hay = `${pestHint} ${serviceTitle}`.toLowerCase()
  const match = PEST_OPTIONS.find((p) => hay.includes(p.toLowerCase().replace(/s$/, '')) || hay.includes(p.toLowerCase()))
  return match || PEST_OPTIONS[0]
}

export default function EnquiryModal() {
  const { open, defaults, closeEnquiry } = useEnquiry()
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
  const [done, setDone] = useState(false)

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

  useEffect(() => {
    if (!open) return
    setDone(false)
    setForm((f) => ({
      ...f,
      pest: guessPest(defaults.serviceTitle, defaults.pest),
      msg: defaults.serviceTitle
        ? `Enquiry for: ${defaults.serviceTitle}`
        : f.msg.startsWith('Enquiry for:')
          ? ''
          : f.msg,
    }))
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') closeEnquiry()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, defaults.serviceTitle, defaults.pest, closeEnquiry])

  if (!open) return null

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const buildMsg = () => {
    const lines = [
      'New pest control enquiry — TEB Enterprises',
      defaults.serviceTitle ? `Service: ${defaults.serviceTitle}` : null,
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
    ].filter((l) => l !== null)
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
      notes: [defaults.serviceTitle ? `Service: ${defaults.serviceTitle}` : '', form.msg.trim()]
        .filter(Boolean)
        .join('\n') || null,
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
      setDone(true)
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
      setDone(true)
    } catch (err) {
      alert(err.message || 'Could not submit enquiry. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
      <button type="button" className="enquiry-modal__backdrop" aria-label="Close" onClick={closeEnquiry} />
      <div className="enquiry-modal__panel">
        <div className="enquiry-modal__head">
          <div>
            <p className="eyebrow" style={{ marginBottom: 8 }}>Book an inspection</p>
            <h2 id="enquiry-title" style={{ margin: 0, fontSize: 'clamp(1.35rem,2.5vw,1.75rem)' }}>
              {defaults.serviceTitle || 'Request a site inspection'}
            </h2>
            <p style={{ margin: '8px 0 0', color: 'var(--muted)', fontSize: '.92rem' }}>
              Fill the form — we will confirm coverage and share a quotation.
            </p>
          </div>
          <button type="button" className="enquiry-modal__close" onClick={closeEnquiry} aria-label="Close form">
            ×
          </button>
        </div>

        {done ? (
          <div className="enquiry-modal__body" style={{ textAlign: 'center', padding: '36px 20px' }}>
            <p style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 10 }}>Enquiry sent</p>
            <p style={{ color: 'var(--muted)', marginBottom: 24 }}>
              Thank you. Our team will get back during {SITE.hours}.
            </p>
            <button type="button" className="btn btn--orange" onClick={closeEnquiry}>
              Close
            </button>
          </div>
        ) : (
          <div className="enquiry-modal__body form">
            <div className="f2">
              <div className="field">
                <label htmlFor="eq-name">Your name *</label>
                <input id="eq-name" placeholder="Full name" value={form.name} onChange={set('name')} autoFocus />
              </div>
              <div className="field">
                <label htmlFor="eq-mobile">Mobile number *</label>
                <input id="eq-mobile" type="tel" placeholder="10-digit mobile" value={form.mobile} onChange={set('mobile')} />
              </div>
            </div>
            <div className="f2">
              <div className="field">
                <label htmlFor="eq-email">Email</label>
                <input id="eq-email" type="email" placeholder="name@company.com" value={form.email} onChange={set('email')} />
              </div>
              <div className="field">
                <label htmlFor="eq-loc">Property location</label>
                <input id="eq-loc" placeholder="Area in Bengaluru" value={form.loc} onChange={set('loc')} />
              </div>
            </div>
            <div className="f2">
              <div className="field">
                <label htmlFor="eq-type">Property type</label>
                <select id="eq-type" value={form.type} onChange={set('type')}>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="eq-size">Approximate size</label>
                <input id="eq-size" placeholder="e.g. 1,200 sq ft / 2 BHK" value={form.size} onChange={set('size')} />
              </div>
            </div>
            <div className="f2">
              <div className="field">
                <label htmlFor="eq-pest">Pest problem</label>
                <select id="eq-pest" value={form.pest} onChange={set('pest')}>
                  {PEST_OPTIONS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="eq-date">Preferred inspection date</label>
                <input id="eq-date" type="date" value={form.date} onChange={set('date')} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="eq-msg">Anything else we should know</label>
              <textarea
                id="eq-msg"
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
            <p className="note" style={{ marginTop: 14, marginBottom: 0 }}>
              Your enquiry is saved for our team, then opens in WhatsApp or your email app.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

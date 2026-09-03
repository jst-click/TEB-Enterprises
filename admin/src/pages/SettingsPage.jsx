import { useEffect, useState } from 'react'
import { api } from '../api'

export default function SettingsPage() {
  const [form, setForm] = useState({ whatsapp_number: '', contact_email: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.settings
      .get()
      .then((data) =>
        setForm({
          whatsapp_number: data.whatsapp_number || '',
          contact_email: data.contact_email || '',
        }),
      )
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const data = await api.settings.update({
        whatsapp_number: form.whatsapp_number,
        contact_email: form.contact_email,
      })
      setForm({
        whatsapp_number: data.whatsapp_number,
        contact_email: data.contact_email,
      })
      setMessage('Settings saved. Website contact form will use these values.')
    } catch (err) {
      setError(err.message || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <p className="font-[family-name:var(--mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--orange)] mb-3">
        Settings
      </p>
      <h1 className="text-4xl font-extrabold mb-2">Contact channels</h1>
      <p className="text-[var(--muted)] mb-8">
        WhatsApp number and email used when visitors submit the website enquiry form.
      </p>

      {loading ? (
        <p className="text-[var(--muted)]">Loading settings…</p>
      ) : (
        <form onSubmit={onSubmit} className="rounded-2xl bg-white border border-black/8 p-6 grid gap-5">
          <div>
            <label className="block font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--muted)] mb-2">
              WhatsApp number
            </label>
            <input
              className="w-full rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3 outline-none focus:border-[var(--ink)]"
              placeholder="917996688885"
              value={form.whatsapp_number}
              onChange={(e) => setForm({ ...form, whatsapp_number: e.target.value })}
              required
            />
            <p className="text-xs text-[var(--muted)] mt-2 m-0">
              Digits only with country code (example: 917996688885). No + or spaces needed.
            </p>
          </div>

          <div>
            <label className="block font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--muted)] mb-2">
              Contact email
            </label>
            <input
              type="email"
              className="w-full rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3 outline-none focus:border-[var(--ink)]"
              placeholder="sales@teamcleaningexperts.in"
              value={form.contact_email}
              onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
              required
            />
            <p className="text-xs text-[var(--muted)] mt-2 m-0">
              Used for the “Send by email instead” button on the website form.
            </p>
          </div>

          {error && <p className="text-red-600 text-sm m-0">{error}</p>}
          {message && <p className="text-[var(--green)] text-sm m-0">{message}</p>}

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-[var(--orange)] text-white font-semibold px-5 py-3 w-fit hover:bg-[#e85f00] disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save settings'}
          </button>
        </form>
      )}
    </div>
  )
}

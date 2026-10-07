import { useEffect, useState } from 'react'
import { api } from '../api'

const SITE = 'https://tebpestcontrol.com'

export default function SettingsPage() {
  const [form, setForm] = useState({
    whatsapp_number: '',
    contact_email: '',
    sitemap_urls: [],
  })
  const [blogSitemapUrls, setBlogSitemapUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.settings
      .get()
      .then((data) => {
        setForm({
          whatsapp_number: data.whatsapp_number || '',
          contact_email: data.contact_email || '',
          sitemap_urls: Array.isArray(data.sitemap_urls) ? data.sitemap_urls : [],
        })
        setBlogSitemapUrls(Array.isArray(data.blog_sitemap_urls) ? data.blog_sitemap_urls : [])
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const setUrl = (index, value) => {
    setForm((prev) => {
      const next = [...prev.sitemap_urls]
      next[index] = value
      return { ...prev, sitemap_urls: next }
    })
  }

  const addUrl = () => {
    setForm((prev) => ({
      ...prev,
      sitemap_urls: [...prev.sitemap_urls, `${SITE}/`],
    }))
  }

  const removeUrl = (index) => {
    setForm((prev) => ({
      ...prev,
      sitemap_urls: prev.sitemap_urls.filter((_, i) => i !== index),
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const cleaned = form.sitemap_urls.map((u) => String(u || '').trim()).filter(Boolean)
      const data = await api.settings.update({
        whatsapp_number: form.whatsapp_number,
        contact_email: form.contact_email,
        sitemap_urls: cleaned,
      })
      setForm({
        whatsapp_number: data.whatsapp_number,
        contact_email: data.contact_email,
        sitemap_urls: Array.isArray(data.sitemap_urls) ? data.sitemap_urls : cleaned,
      })
      setBlogSitemapUrls(Array.isArray(data.blog_sitemap_urls) ? data.blog_sitemap_urls : [])
      setMessage('Settings saved. Sitemap URLs are live on /sitemap.xml.')
    } catch (err) {
      setError(err.message || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <p className="font-[family-name:var(--mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--orange)] mb-3">
        Settings
      </p>
      <h1 className="text-4xl font-extrabold mb-2">Site settings</h1>
      <p className="text-[var(--muted)] mb-8">
        Contact channels and sitemap URLs for Google indexing.
      </p>

      {loading ? (
        <p className="text-[var(--muted)]">Loading settings…</p>
      ) : (
        <form onSubmit={onSubmit} className="grid gap-8">
          <section className="rounded-2xl bg-white border border-black/8 p-6 grid gap-5">
            <div>
              <h2 className="text-xl font-bold m-0 mb-1">Contact channels</h2>
              <p className="text-sm text-[var(--muted)] m-0">
                WhatsApp number and email used when visitors submit the website enquiry form.
              </p>
            </div>

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
          </section>

          <section className="rounded-2xl bg-white border border-black/8 p-6 grid gap-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold m-0 mb-1">Sitemap</h2>
                <p className="text-sm text-[var(--muted)] m-0">
                  These URLs are written one-by-one into{' '}
                  <a
                    href={`${SITE}/sitemap.xml`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--orange)] underline-offset-2 hover:underline"
                  >
                    /sitemap.xml
                  </a>{' '}
                  for fast indexing. Core pages (home, services, gallery, blogs) are always included.
                </p>
              </div>
              <button
                type="button"
                onClick={addUrl}
                className="rounded-full border border-black/15 bg-[var(--paper)] px-4 py-2 text-sm font-semibold hover:border-[var(--ink)]"
              >
                + Add URL
              </button>
            </div>

            <div className="grid gap-3">
              <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--muted)] m-0">
                Service & area URLs (editable)
              </p>
              {form.sitemap_urls.length === 0 && (
                <p className="text-sm text-[var(--muted)] m-0">
                  No custom URLs yet. Click “Add URL” to start.
                </p>
              )}
              {form.sitemap_urls.map((url, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <span className="font-[family-name:var(--mono)] text-[10px] text-[var(--muted)] w-6 shrink-0">
                    {index + 1}.
                  </span>
                  <input
                    className="flex-1 rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-2.5 outline-none focus:border-[var(--ink)] text-sm"
                    placeholder={`${SITE}/your-page-slug`}
                    value={url}
                    onChange={(e) => setUrl(index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeUrl(index)}
                    className="shrink-0 rounded-full border border-black/10 px-3 py-2 text-xs text-red-700 hover:bg-red-50"
                    aria-label={`Remove URL ${index + 1}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-dashed border-black/12 bg-[var(--paper)] p-4 grid gap-3">
              <div>
                <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--orange)] m-0 mb-1">
                  Blog category — automatic
                </p>
                <p className="text-sm text-[var(--muted)] m-0">
                  All published blogs (old and new) are generated under{' '}
                  <a
                    href={`${SITE}/blogs`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--orange)] underline-offset-2 hover:underline"
                  >
                    {SITE}/blogs
                  </a>{' '}
                  as <code className="text-xs">{SITE}/blogs/&#123;slug&#125;</code>. No manual add needed —
                  create or publish a post in Blogs and it appears in sitemap.xml immediately.
                </p>
              </div>
              {blogSitemapUrls.length === 0 ? (
                <p className="text-sm text-[var(--muted)] m-0">No published blog posts yet.</p>
              ) : (
                <ul className="m-0 pl-5 grid gap-1.5 text-sm">
                  <li>
                    <a href={`${SITE}/blogs`} target="_blank" rel="noreferrer" className="text-[var(--ink)]">
                      {SITE}/blogs
                    </a>
                    <span className="text-[var(--muted)]"> (index)</span>
                  </li>
                  {blogSitemapUrls.map((url) => (
                    <li key={url}>
                      <a href={url} target="_blank" rel="noreferrer" className="text-[var(--ink)] break-all">
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

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

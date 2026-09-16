import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api, mediaUrl } from '../api'

const EMPTY = {
  title: '',
  slug: '',
  category: 'pest',
  code: '',
  summary: '',
  content: '',
  highlights: '',
  keywords: '',
  meta_title: '',
  meta_description: '',
  audience: 'both',
  show_in_grid: false,
  is_featured: false,
  is_published: true,
  cover_image: '',
  scope_title: '',
  about_eyebrow: '',
  about_title: '',
  about_image: '',
  why_eyebrow: '',
  why_title: '',
  why_items: '',
  process_eyebrow: '',
  process_title: '',
  process_items: '',
  gallery_images: '',
  related_eyebrow: '',
  related_title: '',
  faq_eyebrow: '',
  faq_title: '',
  faq_items: '',
  cta_title: '',
  cta_text: '',
  sort_order: 0,
}

const CATEGORIES = [
  ['package_b2c', 'Home package (B2C)'],
  ['package_b2b', 'Business scope (B2B)'],
  ['pest', 'Pest SEO page'],
  ['residential', 'Residential'],
  ['commercial', 'Commercial'],
  ['amc', 'AMC'],
  ['location', 'Location page'],
]

const SECTIONS = [
  { id: 'basics', label: '1. Basics' },
  { id: 'hero', label: '2. Hero' },
  { id: 'scope', label: '3. What we cover' },
  { id: 'about', label: '4. About' },
  { id: 'why', label: '5. Why TEB' },
  { id: 'process', label: '6. Process' },
  { id: 'gallery', label: '7. Gallery images' },
  { id: 'related', label: '8. Related' },
  { id: 'faq', label: '9. FAQ' },
  { id: 'cta', label: '10. CTA' },
  { id: 'seo', label: '11. SEO' },
]

function fieldClass() {
  return 'w-full rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3 text-sm outline-none focus:border-[var(--orange)]'
}

function labelClass() {
  return 'block text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1.5'
}

function SectionCard({ id, title, hint, children }) {
  return (
    <section id={id} className="rounded-2xl bg-white border border-black/8 p-6 scroll-mt-24">
      <div className="mb-5 pb-4 border-b border-black/8">
        <h2 className="text-xl font-extrabold m-0">{title}</h2>
        {hint && <p className="text-sm text-[var(--muted)] m-0 mt-1">{hint}</p>}
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  )
}

function ImageField({ label, value, onChange, uploading, setUploading, setError }) {
  return (
    <div>
      <label className={labelClass()}>{label}</label>
      <div className="flex flex-wrap gap-3 items-center">
        <label className="rounded-full bg-[var(--ink)] text-white px-4 py-2 text-sm cursor-pointer shrink-0">
          {uploading ? 'Uploading…' : 'Upload image'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              setUploading(true)
              try {
                const data = await api.upload(file)
                onChange(data.url)
              } catch (err) {
                setError(err.message)
              } finally {
                setUploading(false)
                e.target.value = ''
              }
            }}
          />
        </label>
        <input
          className={`${fieldClass()} flex-1 min-w-[200px]`}
          placeholder="Image URL or upload"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button type="button" className="text-xs text-red-600 font-semibold" onClick={() => onChange('')}>
            Remove
          </button>
        )}
      </div>
      {value && (
        <img src={mediaUrl(value)} alt="" className="mt-3 w-56 h-32 object-cover rounded-xl border border-black/8" />
      )}
    </div>
  )
}

function GalleryImagesField({ value, onChange, uploading, setUploading, setError }) {
  const urls = (value || '').split('\n').map((l) => l.trim()).filter(Boolean)

  const setUrlAt = (idx, url) => {
    const next = [...urls]
    next[idx] = url
    onChange(next.filter(Boolean).join('\n'))
  }

  const removeAt = (idx) => {
    onChange(urls.filter((_, i) => i !== idx).join('\n'))
  }

  const addUpload = async (file) => {
    setUploading(true)
    try {
      const data = await api.upload(file)
      onChange([...urls, data.url].join('\n'))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className={labelClass()}>Gallery images (shown as strip on detail page)</label>
      <div className="flex flex-wrap gap-3 mb-3">
        {urls.map((url, i) => (
          <div key={`${url}-${i}`} className="relative w-36">
            <img src={mediaUrl(url)} alt="" className="w-36 h-24 object-cover rounded-xl border border-black/8" />
            <button
              type="button"
              className="absolute top-1 right-1 rounded-full bg-white/95 text-red-600 text-xs font-bold px-2 py-0.5"
              onClick={() => removeAt(i)}
            >
              ×
            </button>
            <input
              className="mt-1 w-full text-[10px] rounded-lg border border-black/10 px-2 py-1"
              value={url}
              onChange={(e) => setUrlAt(i, e.target.value)}
            />
          </div>
        ))}
        <label className="w-36 h-24 rounded-xl border-2 border-dashed border-black/15 flex items-center justify-center text-xs text-[var(--muted)] cursor-pointer hover:border-[var(--orange)]">
          {uploading ? '…' : '+ Add'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (file) await addUpload(file)
              e.target.value = ''
            }}
          />
        </label>
      </div>
      <textarea
        className={fieldClass()}
        rows={3}
        placeholder="Or paste image URLs — one per line"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

function parseFaqItems(text) {
  if (!text) return []
  return text.split('\n').map((line) => {
    const [q, ...rest] = line.split('|')
    return { question: (q || '').trim(), answer: rest.join('|').trim() }
  })
}

function serializeFaqItems(items, { keepEmpty = true } = {}) {
  const list = keepEmpty
    ? items
    : items.filter((i) => i.question.trim() || i.answer.trim())
  return list.map((i) => `${i.question.trim()} | ${i.answer.trim()}`).join('\n')
}

function FaqItemsField({ value, onChange }) {
  const items = parseFaqItems(value)
  const rows = items.length ? items : [{ question: '', answer: '' }]

  const update = (next) => onChange(serializeFaqItems(next))

  const setField = (idx, key, val) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, [key]: val } : r))
    update(next)
  }

  const addRow = () => {
    update([...rows, { question: '', answer: '' }])
  }

  const removeRow = (idx) => {
    const next = rows.filter((_, i) => i !== idx)
    update(next.length ? next : [{ question: '', answer: '' }])
  }

  return (
    <div>
      <label className={labelClass()}>Questions & answers</label>
      <div className="grid gap-3">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-black/10 bg-[var(--paper)] p-4 grid gap-3"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--orange)]">
                FAQ {String(idx + 1).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="text-xs font-semibold text-red-600 hover:underline"
                onClick={() => removeRow(idx)}
                disabled={rows.length === 1 && !row.question && !row.answer}
              >
                Remove
              </button>
            </div>
            <div>
              <label className={labelClass()}>Question</label>
              <input
                className={fieldClass()}
                placeholder="e.g. How long does treatment take?"
                value={row.question}
                onChange={(e) => setField(idx, 'question', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass()}>Answer</label>
              <textarea
                className={fieldClass()}
                rows={3}
                placeholder="e.g. Most visits take 45–90 minutes depending on property size."
                value={row.answer}
                onChange={(e) => setField(idx, 'answer', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addRow}
        className="mt-3 rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold hover:border-[var(--orange)]"
      >
        + Add question
      </button>
    </div>
  )
}

export function ServicesListPage() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const load = () =>
    api.services
      .list()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return items.filter((i) => {
      if (filter !== 'all' && i.category !== filter) return false
      if (!q) return true
      return [i.title, i.slug, i.code, i.summary, i.keywords].filter(Boolean).join(' ').toLowerCase().includes(q)
    })
  }, [items, filter, search])

  return (
    <div className="max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="font-[family-name:var(--mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--orange)] mb-3">
            Services
          </p>
          <h1 className="text-4xl font-extrabold mb-2">Services & SEO pages</h1>
          <p className="text-[var(--muted)] m-0">
            Open a service to edit each page section (hero, about, gallery, FAQ…). {items.length} total.
          </p>
        </div>
        <Link
          to="/services/new"
          className="rounded-full bg-[var(--orange)] text-white font-semibold px-5 py-2.5 hover:bg-[#e85f00] no-underline"
        >
          + Add service
        </Link>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search title, slug, keywords…"
          className="flex-1 min-w-[220px] rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm outline-none"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>
      )}

      <section className="rounded-2xl bg-white border border-black/8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--paper)] text-left">
                {['Image', 'Code', 'Title', 'Category', 'Audience', 'Grid', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 font-[family-name:var(--mono)] text-[10px] tracking-[0.12em] uppercase text-[var(--muted)] border-b border-black/8">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-[var(--muted)]">Loading…</td></tr>
              ) : !filtered.length ? (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-[var(--muted)]">No services found.</td></tr>
              ) : (
                filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-black/5 hover:bg-[var(--paper)]/60 cursor-pointer"
                    onClick={() => navigate(`/services/${item.id}/edit`)}
                  >
                    <td className="px-4 py-3">
                      {item.cover_image ? (
                        <img src={mediaUrl(item.cover_image)} alt="" className="w-14 h-10 object-cover rounded-lg" />
                      ) : (
                        <div className="w-14 h-10 rounded-lg bg-[var(--paper)]" />
                      )}
                    </td>
                    <td className="px-4 py-3 font-[family-name:var(--mono)] text-xs text-[var(--blue)] whitespace-nowrap">{item.code || '—'}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold m-0">{item.title}</p>
                      <p className="text-xs text-[var(--muted)] m-0 mt-0.5">/{item.slug}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.category}</td>
                    <td className="px-4 py-3 uppercase text-xs tracking-wide">{item.audience}</td>
                    <td className="px-4 py-3">{item.show_in_grid ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-[family-name:var(--mono)] uppercase ${item.is_published ? 'bg-[var(--green)]/10 text-[var(--green)]' : 'bg-black/5 text-[var(--muted)]'}`}>
                        {item.is_published ? 'Live' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex gap-2">
                        <Link
                          to={`/services/${item.id}/edit`}
                          className="rounded-full border px-3 py-1.5 text-xs font-semibold no-underline text-[var(--ink)]"
                        >
                          Edit page
                        </Link>
                        <button
                          type="button"
                          className="rounded-full border border-red-200 text-red-700 px-3 py-1.5 text-xs font-semibold"
                          onClick={async () => {
                            if (!confirm('Delete this service?')) return
                            await api.services.remove(item.id)
                            load()
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export function ServiceEditPage() {
  const { id } = useParams()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(!isNew)
  const [uploading, setUploading] = useState(false)
  const [activeSection, setActiveSection] = useState('basics')

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  useEffect(() => {
    if (isNew) {
      setForm(EMPTY)
      setLoading(false)
      return
    }
    setLoading(true)
    api.services
      .get(id)
      .then((item) => {
        setForm({
          ...EMPTY,
          ...Object.fromEntries(
            Object.keys(EMPTY).map((k) => [k, item[k] ?? EMPTY[k]]),
          ),
          show_in_grid: !!item.show_in_grid,
          is_featured: !!item.is_featured,
          is_published: !!item.is_published,
          sort_order: item.sort_order || 0,
        })
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [id, isNew])

  useEffect(() => {
    const onScroll = () => {
      let current = SECTIONS[0].id
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= 140) current = s.id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = {
        ...form,
        code: form.code || null,
        cover_image: form.cover_image || null,
        about_image: form.about_image || null,
        faq_items: serializeFaqItems(parseFaqItems(form.faq_items), { keepEmpty: false }) || null,
        slug: form.slug || undefined,
        sort_order: Number(form.sort_order) || 0,
      }
      if (isNew) {
        const created = await api.services.create(payload)
        navigate(`/services/${created.id}/edit`, { replace: true })
      } else {
        await api.services.update(id, payload)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-[var(--muted)]">Loading service…</p>
  }

  return (
    <div className="max-w-[1100px]">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6 sticky top-0 z-20 bg-[var(--paper)] py-3 -mx-1 px-1 border-b border-black/5">
        <div>
          <Link to="/services" className="text-sm text-[var(--muted)] no-underline hover:text-[var(--ink)]">
            ← Back to list
          </Link>
          <h1 className="text-3xl font-extrabold mt-2 mb-1">
            {isNew ? 'Add service page' : 'Edit service page'}
          </h1>
          <p className="text-sm text-[var(--muted)] m-0">
            {isNew ? 'Fill each section below.' : form.title || 'Untitled'} — manage content section by section.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {!isNew && form.slug && (
            <a
              href={`${import.meta.env.VITE_WEBSITE_URL || 'http://localhost:5173'}/${form.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-black/15 px-4 py-2.5 text-sm font-semibold no-underline text-[var(--ink)]"
            >
              Preview →
            </a>
          )}
          <button
            type="submit"
            form="service-edit-form"
            disabled={saving}
            className="rounded-full bg-[var(--orange)] text-white font-semibold px-5 py-2.5 disabled:opacity-60"
          >
            {saving ? 'Saving…' : isNew ? 'Create service' : 'Save changes'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">{error}</div>
      )}

      <div className="flex gap-6 items-start">
        <nav className="hidden lg:flex flex-col gap-1 sticky top-28 w-44 shrink-0">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`rounded-full px-3 py-2 text-xs font-semibold no-underline transition ${
                activeSection === s.id
                  ? 'bg-[var(--ink)] text-white'
                  : 'text-[var(--muted)] hover:bg-black/5'
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <form id="service-edit-form" onSubmit={submit} className="flex-1 grid gap-5 min-w-0">
          <SectionCard id="basics" title="1. Basics" hint="Page identity, category and visibility flags.">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass()}>Title *</label>
                <input className={fieldClass()} value={form.title} onChange={(e) => set('title', e.target.value)} required />
              </div>
              <div>
                <label className={labelClass()}>Slug</label>
                <input className={fieldClass()} placeholder="auto from title if empty" value={form.slug} onChange={(e) => set('slug', e.target.value)} />
              </div>
              <div>
                <label className={labelClass()}>Category</label>
                <select className={fieldClass()} value={form.category} onChange={(e) => set('category', e.target.value)}>
                  {CATEGORIES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass()}>Code</label>
                <input className={fieldClass()} placeholder="PACKAGE 01 / SCOPE 01" value={form.code} onChange={(e) => set('code', e.target.value)} />
              </div>
              <div>
                <label className={labelClass()}>Audience</label>
                <select className={fieldClass()} value={form.audience} onChange={(e) => set('audience', e.target.value)}>
                  <option value="b2c">Homes (B2C)</option>
                  <option value="b2b">Business (B2B)</option>
                  <option value="both">Both</option>
                  <option value="none">SEO page only</option>
                </select>
              </div>
              <div>
                <label className={labelClass()}>Sort order</label>
                <input type="number" className={fieldClass()} value={form.sort_order} onChange={(e) => set('sort_order', e.target.value)} />
              </div>
            </div>
            <div className="flex flex-wrap gap-5 text-sm pt-1">
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.show_in_grid} onChange={(e) => set('show_in_grid', e.target.checked)} /> Homepage services grid</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_featured} onChange={(e) => set('is_featured', e.target.checked)} /> Featured on /services</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_published} onChange={(e) => set('is_published', e.target.checked)} /> Published</label>
            </div>
          </SectionCard>

          <SectionCard id="hero" title="2. Hero section" hint="Top banner: title comes from Basics. Add summary + cover image here.">
            <div>
              <label className={labelClass()}>Hero summary</label>
              <textarea className={fieldClass()} rows={3} placeholder="Short intro under the title" value={form.summary} onChange={(e) => set('summary', e.target.value)} />
            </div>
            <ImageField
              label="Hero / cover image"
              value={form.cover_image}
              onChange={(v) => set('cover_image', v)}
              uploading={uploading}
              setUploading={setUploading}
              setError={setError}
            />
          </SectionCard>

          <SectionCard id="scope" title="3. What we cover" hint="Highlight cards under the hero (one item per line).">
            <div>
              <label className={labelClass()}>Section title</label>
              <input className={fieldClass()} placeholder="Scope of this service" value={form.scope_title} onChange={(e) => set('scope_title', e.target.value)} />
            </div>
            <div>
              <label className={labelClass()}>Coverage items (one per line)</label>
              <textarea className={fieldClass()} rows={6} placeholder={'Kitchen cockroach treatment\nHome cockroach control\nApartment cockroach control'} value={form.highlights} onChange={(e) => set('highlights', e.target.value)} />
            </div>
          </SectionCard>

          <SectionCard id="about" title="4. About this service" hint="Main content block with side image.">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass()}>Eyebrow label</label>
                <input className={fieldClass()} placeholder="About this service" value={form.about_eyebrow} onChange={(e) => set('about_eyebrow', e.target.value)} />
              </div>
              <div>
                <label className={labelClass()}>Section heading</label>
                <input className={fieldClass()} placeholder="Inspection-based treatment across Bengaluru" value={form.about_title} onChange={(e) => set('about_title', e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelClass()}>Body content (paragraphs separated by blank line)</label>
              <textarea className={fieldClass()} rows={8} value={form.content} onChange={(e) => set('content', e.target.value)} />
            </div>
            <ImageField
              label="About section image"
              value={form.about_image}
              onChange={(v) => set('about_image', v)}
              uploading={uploading}
              setUploading={setUploading}
              setError={setError}
            />
          </SectionCard>

          <SectionCard id="why" title="5. Why choose TEB" hint="Benefit cards. Format each line as: Title | Description">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass()}>Eyebrow</label>
                <input className={fieldClass()} placeholder="Why TEB" value={form.why_eyebrow} onChange={(e) => set('why_eyebrow', e.target.value)} />
              </div>
              <div>
                <label className={labelClass()}>Section heading</label>
                <input className={fieldClass()} placeholder="Why choose us for this service?" value={form.why_title} onChange={(e) => set('why_title', e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelClass()}>Benefit items</label>
              <textarea
                className={fieldClass()}
                rows={6}
                placeholder={'Inspect first | Every job starts with a site inspection.\nTargeted methods | Treatment matched to pest type.'}
                value={form.why_items}
                onChange={(e) => set('why_items', e.target.value)}
              />
            </div>
          </SectionCard>

          <SectionCard id="process" title="6. How we work" hint="Process steps. Format: Title | Description. Leave empty to use site defaults.">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass()}>Eyebrow</label>
                <input className={fieldClass()} placeholder="How we work" value={form.process_eyebrow} onChange={(e) => set('process_eyebrow', e.target.value)} />
              </div>
              <div>
                <label className={labelClass()}>Section heading</label>
                <input className={fieldClass()} placeholder="Our process for every service" value={form.process_title} onChange={(e) => set('process_title', e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelClass()}>Process steps</label>
              <textarea
                className={fieldClass()}
                rows={5}
                placeholder={'Inspect | Free site survey and risk map.\nTreat | Targeted application plan.'}
                value={form.process_items}
                onChange={(e) => set('process_items', e.target.value)}
              />
            </div>
          </SectionCard>

          <SectionCard id="gallery" title="7. Gallery images" hint="Photo strip on the detail page. Upload multiple images.">
            <GalleryImagesField
              value={form.gallery_images}
              onChange={(v) => set('gallery_images', v)}
              uploading={uploading}
              setUploading={setUploading}
              setError={setError}
            />
          </SectionCard>

          <SectionCard id="related" title="8. Related services" hint="Heading for the related-services block (items auto from same category).">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass()}>Eyebrow</label>
                <input className={fieldClass()} placeholder="Related services" value={form.related_eyebrow} onChange={(e) => set('related_eyebrow', e.target.value)} />
              </div>
              <div>
                <label className={labelClass()}>Section heading</label>
                <input className={fieldClass()} placeholder="You may also need" value={form.related_title} onChange={(e) => set('related_title', e.target.value)} />
              </div>
            </div>
          </SectionCard>

          <SectionCard id="faq" title="9. FAQ / What to expect" hint="Add each question and answer one by one.">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass()}>Eyebrow</label>
                <input className={fieldClass()} placeholder="Common questions" value={form.faq_eyebrow} onChange={(e) => set('faq_eyebrow', e.target.value)} />
              </div>
              <div>
                <label className={labelClass()}>Section heading</label>
                <input className={fieldClass()} placeholder="What to expect" value={form.faq_title} onChange={(e) => set('faq_title', e.target.value)} />
              </div>
            </div>
            <FaqItemsField value={form.faq_items} onChange={(v) => set('faq_items', v)} />
          </SectionCard>

          <SectionCard id="cta" title="10. Bottom CTA band" hint="Final call-to-action section.">
            <div>
              <label className={labelClass()}>CTA heading</label>
              <input className={fieldClass()} placeholder="Book this service today" value={form.cta_title} onChange={(e) => set('cta_title', e.target.value)} />
            </div>
            <div>
              <label className={labelClass()}>CTA text</label>
              <textarea className={fieldClass()} rows={3} placeholder="Short supporting line under the CTA heading" value={form.cta_text} onChange={(e) => set('cta_text', e.target.value)} />
            </div>
          </SectionCard>

          <SectionCard id="seo" title="11. SEO" hint="Search meta for this page.">
            <div>
              <label className={labelClass()}>Keywords</label>
              <input className={fieldClass()} placeholder="comma separated" value={form.keywords} onChange={(e) => set('keywords', e.target.value)} />
            </div>
            <div>
              <label className={labelClass()}>Meta title</label>
              <input className={fieldClass()} value={form.meta_title} onChange={(e) => set('meta_title', e.target.value)} />
            </div>
            <div>
              <label className={labelClass()}>Meta description</label>
              <textarea className={fieldClass()} rows={3} value={form.meta_description} onChange={(e) => set('meta_description', e.target.value)} />
            </div>
          </SectionCard>

          <div className="flex flex-wrap gap-3 pb-10">
            <button type="submit" disabled={saving} className="rounded-full bg-[var(--ink)] text-white font-semibold px-6 py-3 disabled:opacity-60">
              {saving ? 'Saving…' : isNew ? 'Create service' : 'Save all sections'}
            </button>
            <Link to="/services" className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold no-underline text-[var(--ink)]">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ServicesListPage

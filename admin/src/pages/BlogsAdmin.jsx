import { useEffect, useMemo, useState } from 'react'
import { api, mediaUrl } from '../api'

const empty = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image: '',
  is_published: true,
}

function formatDate(value) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return '—'
  }
}

function StatusBadge({ published }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-[family-name:var(--mono)] uppercase tracking-[0.08em] ${
        published ? 'bg-[var(--green)]/10 text-[var(--green)]' : 'bg-black/5 text-[var(--muted)]'
      }`}
    >
      {published ? 'Published' : 'Draft'}
    </span>
  )
}

export default function BlogsAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.blogs.list()
      setItems(data)
      setError('')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    if (!modalOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [modalOpen])

  const stats = useMemo(() => {
    const published = items.filter((i) => i.is_published).length
    return { total: items.length, published, draft: items.length - published }
  }, [items])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return items.filter((i) => {
      if (filter === 'published' && !i.is_published) return false
      if (filter === 'draft' && i.is_published) return false
      if (!q) return true
      const hay = [i.title, i.slug, i.excerpt].filter(Boolean).join(' ').toLowerCase()
      return hay.includes(q)
    })
  }, [items, filter, search])

  const openCreate = () => {
    setEditId(null)
    setForm(empty)
    setError('')
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditId(item.id)
    setForm({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt || '',
      content: item.content,
      cover_image: item.cover_image || '',
      is_published: item.is_published,
    })
    setError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditId(null)
    setForm(empty)
    setError('')
  }

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const data = await api.upload(file)
      setForm((f) => ({ ...f, cover_image: data.url }))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.title.trim()) {
      setError('Title is required.')
      return
    }
    if (!form.content.trim()) {
      setError('Content is required.')
      return
    }
    setSaving(true)
    try {
      const payload = { ...form, slug: form.slug || undefined }
      if (editId) await api.blogs.update(editId, payload)
      else await api.blogs.create(payload)
      setSaving(false)
      closeModal()
      await load()
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }

  const remove = async (item) => {
    if (!confirm(`Delete “${item.title}”?`)) return
    try {
      await api.blogs.remove(item.id)
      if (editId === item.id) closeModal()
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="font-[family-name:var(--mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--orange)] mb-3">
            Blogs
          </p>
          <h1 className="text-4xl font-extrabold m-0">Blog posts</h1>
          <p className="text-[var(--muted)] text-sm mt-2 m-0">
            Create and manage articles shown on the website.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-full bg-[var(--orange)] text-white px-5 py-2.5 font-semibold hover:bg-[#e85f00]"
        >
          + Add blog
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6 max-w-xl">
        {[
          ['Total', stats.total],
          ['Published', stats.published],
          ['Drafts', stats.draft],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-white border border-black/10 px-4 py-3">
            <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--muted)] m-0 mb-1">
              {label}
            </p>
            <p className="text-2xl font-extrabold m-0">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 items-center mb-4">
        <input
          type="search"
          placeholder="Search title, slug, excerpt…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[220px] rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[var(--ink)]"
        />
        <div className="inline-flex rounded-full border border-black/10 bg-white p-1 gap-1">
          {[
            ['all', 'All'],
            ['published', 'Published'],
            ['draft', 'Drafts'],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                filter === key ? 'bg-[var(--ink)] text-white' : 'text-[var(--muted)] hover:bg-black/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && !modalOpen && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white border border-black/10 rounded-2xl overflow-hidden">
        <div className="hidden md:grid grid-cols-[88px_1fr_120px_120px_160px] gap-3 px-4 py-3 border-b border-black/8 bg-[var(--paper)] text-[10px] font-[family-name:var(--mono)] uppercase tracking-[0.12em] text-[var(--muted)]">
          <span>Cover</span>
          <span>Post</span>
          <span>Status</span>
          <span>Updated</span>
          <span className="text-right">Actions</span>
        </div>

        {loading ? (
          <div className="px-4 py-16 text-center text-[var(--muted)] text-sm">Loading blogs…</div>
        ) : filtered.length === 0 ? (
          <div className="px-4 py-16 text-center">
            <p className="text-[var(--muted)] text-sm m-0 mb-4">
              {items.length === 0 ? 'No blog posts yet.' : 'No posts match your filters.'}
            </p>
            {items.length === 0 && (
              <button
                type="button"
                onClick={openCreate}
                className="rounded-full bg-[var(--orange)] text-white px-5 py-2.5 font-semibold"
              >
                + Add blog
              </button>
            )}
          </div>
        ) : (
          <ul className="m-0 p-0 list-none divide-y divide-black/8">
            {filtered.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-[88px_1fr_120px_120px_160px] gap-3 px-4 py-4 items-center hover:bg-black/[0.02]"
              >
                <div className="w-20 h-14 rounded-xl overflow-hidden bg-[var(--paper)] border border-black/8">
                  {item.cover_image ? (
                    <img
                      src={mediaUrl(item.cover_image)}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full grid place-items-center text-[10px] text-[var(--muted)] uppercase tracking-wide">
                      No image
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-base m-0 truncate">{item.title}</h3>
                  <p className="text-sm text-[var(--muted)] m-0 mt-0.5 truncate">
                    /{item.slug}
                    {item.excerpt ? ` · ${item.excerpt}` : ''}
                  </p>
                </div>
                <div>
                  <StatusBadge published={item.is_published} />
                </div>
                <div className="text-sm text-[var(--muted)]">{formatDate(item.updated_at || item.created_at)}</div>
                <div className="flex gap-2 md:justify-end">
                  <button
                    type="button"
                    className="text-sm rounded-full border border-black/15 px-3 py-1.5 hover:bg-black/5"
                    onClick={() => openEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-sm rounded-full border border-red-300 text-red-700 px-3 py-1.5 hover:bg-red-50"
                    onClick={() => remove(item)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-[rgba(10,22,38,.62)] backdrop-blur-[4px] border-0 cursor-pointer"
            aria-label="Close dialog"
            onClick={closeModal}
          />
          <div className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-auto bg-[var(--paper)] sm:rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,.35)]">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-5 py-4 border-b border-black/8 bg-white sm:rounded-t-2xl">
              <div>
                <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.16em] uppercase text-[var(--orange)] m-0 mb-1">
                  {editId ? 'Edit post' : 'New post'}
                </p>
                <h2 id="blog-modal-title" className="text-2xl font-extrabold m-0">
                  {editId ? 'Edit blog details' : 'Add blog details'}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="w-10 h-10 rounded-full border border-black/15 bg-white grid place-items-center text-xl leading-none hover:bg-[var(--paper)]"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={submit} className="p-5 grid gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1.5">
                  Title
                </label>
                <input
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--orange)]"
                  placeholder="Blog title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1.5">
                  Slug <span className="font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--orange)]"
                  placeholder="auto-generated-from-title"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1.5">
                  Excerpt
                </label>
                <input
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--orange)]"
                  placeholder="Short summary for listings"
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1.5">
                  Content
                </label>
                <textarea
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--orange)]"
                  placeholder="Write the full blog content…"
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1.5">
                  Cover image
                </label>
                <div className="flex flex-wrap gap-3 items-center">
                  <label className="rounded-full bg-[var(--ink)] text-white px-4 py-2 text-sm cursor-pointer hover:bg-[var(--ink-2)]">
                    {uploading ? 'Uploading…' : 'Upload cover'}
                    <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={uploading} />
                  </label>
                  <input
                    className="flex-1 min-w-[200px] rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--orange)]"
                    placeholder="Or paste image URL"
                    value={form.cover_image}
                    onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                  />
                </div>
                {form.cover_image && (
                  <img
                    src={mediaUrl(form.cover_image)}
                    alt=""
                    className="mt-3 w-48 h-28 object-cover rounded-xl border border-black/8"
                  />
                )}
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
                />
                Published (shows on website + navbar)
              </label>

              {error && (
                <p className="text-red-600 text-sm m-0 rounded-xl border border-red-200 bg-red-50 px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex flex-wrap gap-3 pt-1 sticky bottom-0 bg-[var(--paper)] pb-1">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="rounded-full bg-[var(--orange)] text-white px-5 py-2.5 font-semibold hover:bg-[#e85f00] disabled:opacity-60"
                >
                  {saving ? 'Saving…' : editId ? 'Update post' : 'Publish post'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-full border border-black/15 px-5 py-2.5 bg-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

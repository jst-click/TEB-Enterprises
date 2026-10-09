import { useEffect, useMemo, useState } from 'react'
import { api, mediaUrl } from '../api'
import RichTextEditor from '../components/RichTextEditor'

const SITE = 'https://tebpestcontrol.com'

const empty = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image: '',
  cover_image_alt: '',
  category: '',
  meta_title: '',
  meta_description: '',
  focus_keyword: '',
  canonical_url: '',
  schema_json: '',
  is_published: false,
}

const CATEGORY_SUGGESTIONS = [
  'Tips',
  'Guides',
  'Treatments',
  'Prevention',
  'Residential',
  'Commercial',
  'News',
]

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

function stripHtml(html) {
  if (!html) return ''
  const d = document.createElement('div')
  d.innerHTML = html
  return (d.textContent || d.innerText || '').replace(/\s+/g, ' ').trim()
}

function StatusBadge({ published }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-[family-name:var(--mono)] uppercase tracking-[0.08em] ${
        published ? 'bg-[var(--green)]/10 text-[var(--green)]' : 'bg-amber-50 text-amber-800'
      }`}
    >
      {published ? 'Published' : 'Draft'}
    </span>
  )
}

function GooglePreview({ title, description, url }) {
  const displayTitle = title || 'Page title'
  const displayDesc = description || 'Meta description will appear here in Google search results.'
  const displayUrl = url || `${SITE}/blogs/`
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--muted)] m-0 mb-3">
        Google search preview
      </p>
      <p className="text-[#1a0dab] text-lg leading-snug m-0 mb-1 line-clamp-2 hover:underline cursor-default">
        {displayTitle}
      </p>
      <p className="text-[#006621] text-sm m-0 mb-1 break-all">{displayUrl}</p>
      <p className="text-[#545454] text-sm m-0 line-clamp-2">{displayDesc}</p>
    </div>
  )
}

function keywordScore(text, keyword) {
  if (!keyword?.trim()) return null
  const hay = (text || '').toLowerCase()
  const kw = keyword.trim().toLowerCase()
  if (!hay.includes(kw)) return { ok: false, label: 'Focus keyword not found in content' }
  const count = hay.split(kw).length - 1
  return { ok: true, label: `Focus keyword found ${count}× in content` }
}

export default function BlogsAdmin() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [tab, setTab] = useState('content')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [search, setSearch] = useState('')

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))

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

  const categories = useMemo(() => {
    const setCat = new Set()
    items.forEach((i) => {
      if (i.category?.trim()) setCat.add(i.category.trim())
    })
    return [...setCat].sort()
  }, [items])

  const stats = useMemo(() => {
    const published = items.filter((i) => i.is_published).length
    return { total: items.length, published, draft: items.length - published }
  }, [items])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return items.filter((i) => {
      if (filter === 'published' && !i.is_published) return false
      if (filter === 'draft' && i.is_published) return false
      if (categoryFilter !== 'all' && (i.category || '') !== categoryFilter) return false
      if (!q) return true
      const hay = [i.title, i.slug, i.excerpt, i.category, i.focus_keyword, i.meta_title]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [items, filter, search, categoryFilter])

  const previewUrl = form.slug
    ? `${SITE}/blogs/${form.slug}`
    : `${SITE}/blogs/`
  const serpTitle = form.meta_title || form.title || 'Untitled post'
  const serpDesc =
    form.meta_description ||
    form.excerpt ||
    stripHtml(form.content).slice(0, 155) ||
    ''
  const kwCheck = keywordScore(
    `${form.title} ${form.meta_title} ${form.meta_description} ${form.excerpt} ${stripHtml(form.content)}`,
    form.focus_keyword,
  )

  const openCreate = () => {
    setEditId(null)
    setForm(empty)
    setTab('content')
    setError('')
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditId(item.id)
    setForm({
      title: item.title || '',
      slug: item.slug || '',
      excerpt: item.excerpt || '',
      content: item.content || '',
      cover_image: item.cover_image || '',
      cover_image_alt: item.cover_image_alt || '',
      category: item.category || '',
      meta_title: item.meta_title || '',
      meta_description: item.meta_description || '',
      focus_keyword: item.focus_keyword || '',
      canonical_url: item.canonical_url || '',
      schema_json: item.schema_json || '',
      is_published: !!item.is_published,
    })
    setTab('content')
    setError('')
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditId(null)
    setForm(empty)
    setError('')
    setTab('content')
  }

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const data = await api.upload(file)
      setForm((f) => ({
        ...f,
        cover_image: data.url,
        cover_image_alt: f.cover_image_alt || file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
      }))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const buildDefaultSchema = () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: form.meta_title || form.title,
      description: form.meta_description || form.excerpt || '',
      image: form.cover_image
        ? form.cover_image.startsWith('http')
          ? form.cover_image
          : `${SITE}${form.cover_image}`
        : `${SITE}/logo.png`,
      author: { '@type': 'Organization', name: 'TEB Pest Control', url: SITE },
      publisher: {
        '@type': 'Organization',
        name: 'TEB Pest Control',
        logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': form.canonical_url || previewUrl,
      },
      keywords: form.focus_keyword || undefined,
    }
    set('schema_json', JSON.stringify(schema, null, 2))
    setTab('schema')
  }

  const save = async (publishMode) => {
    setError('')
    if (!form.title.trim()) {
      setError('Title is required.')
      setTab('content')
      return
    }
    if (!stripHtml(form.content) && !form.content.includes('<img')) {
      setError('Content is required.')
      setTab('content')
      return
    }
    if (form.schema_json?.trim()) {
      try {
        JSON.parse(form.schema_json)
      } catch {
        setError('Schema JSON is invalid. Fix it under the Schema tab.')
        setTab('schema')
        return
      }
    }

    const is_published =
      publishMode === 'draft' ? false : publishMode === 'publish' ? true : form.is_published

    setSaving(true)
    try {
      const payload = {
        ...form,
        slug: form.slug || undefined,
        is_published,
        category: form.category?.trim() || null,
        meta_title: form.meta_title?.trim() || null,
        meta_description: form.meta_description?.trim() || null,
        focus_keyword: form.focus_keyword?.trim() || null,
        canonical_url: form.canonical_url?.trim() || null,
        schema_json: form.schema_json?.trim() || null,
        cover_image_alt: form.cover_image_alt?.trim() || null,
      }
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

  const field = 'w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--orange)]'
  const label = 'block text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1.5'

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="font-[family-name:var(--mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--orange)] mb-3">
            Blogs
          </p>
          <h1 className="text-4xl font-extrabold m-0">Blog posts</h1>
          <p className="text-[var(--muted)] text-sm mt-2 m-0 max-w-2xl">
            SEO meta, focus keyword, rich editor, categories, canonical, schema, draft/preview/publish.
            Published posts appear on{' '}
            <a
              href={`${SITE}/blogs`}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--orange)] underline-offset-2 hover:underline"
            >
              /blogs
            </a>{' '}
            and are added to <code className="text-xs">sitemap.xml</code> automatically.
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
        ].map(([lbl, value]) => (
          <div key={lbl} className="rounded-2xl bg-white border border-black/10 px-4 py-3">
            <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--muted)] m-0 mb-1">
              {lbl}
            </p>
            <p className="text-2xl font-extrabold m-0">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 items-center mb-4">
        <input
          type="search"
          placeholder="Search title, slug, keyword, category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[220px] rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-[var(--ink)]"
        />
        <div className="inline-flex rounded-full border border-black/10 bg-white p-1 gap-1">
          {[
            ['all', 'All'],
            ['published', 'Published'],
            ['draft', 'Drafts'],
          ].map(([key, lbl]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                filter === key ? 'bg-[var(--ink)] text-white' : 'text-[var(--muted)] hover:bg-black/5'
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>
        {categories.length > 0 && (
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-full border border-black/15 bg-white px-4 py-2.5 text-sm outline-none"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}
      </div>

      {error && !modalOpen && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <section className="bg-white border border-black/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-sm">
            <thead>
              <tr className="bg-[var(--paper)] text-left">
                {['Cover', 'Post', 'Category', 'Status', 'Updated', 'Actions'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-[family-name:var(--mono)] text-[10px] tracking-[0.12em] uppercase text-[var(--muted)] font-semibold border-b border-black/8 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center text-[var(--muted)]">
                    Loading blogs…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center">
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
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="border-b border-black/5 hover:bg-[var(--paper)]/70 transition">
                    <td className="px-4 py-3.5 w-[88px]">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-[var(--paper)] border border-black/8">
                        {item.cover_image ? (
                          <img
                            src={mediaUrl(item.cover_image)}
                            alt={item.cover_image_alt || item.title || ''}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full grid place-items-center text-[9px] text-[var(--muted)] uppercase tracking-wide">
                            None
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 min-w-[200px] max-w-[320px]">
                      <p className="font-bold m-0 truncate">{item.title}</p>
                      <p className="text-xs text-[var(--muted)] m-0 mt-0.5 truncate">
                        /blogs/{item.slug}
                        {item.focus_keyword ? ` · KW: ${item.focus_keyword}` : ''}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-[var(--muted)] whitespace-nowrap">
                      {item.category || '—'}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <StatusBadge published={item.is_published} />
                    </td>
                    <td className="px-4 py-3.5 text-[var(--muted)] whitespace-nowrap">
                      {formatDate(item.updated_at || item.created_at)}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {item.is_published && (
                          <a
                            href={`${SITE}/blogs/${item.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full border border-black/15 px-3 py-1.5 text-xs font-semibold hover:bg-black/5 no-underline text-[var(--ink)]"
                          >
                            View
                          </a>
                        )}
                        <button
                          type="button"
                          className="rounded-full border border-black/15 px-3 py-1.5 text-xs font-semibold hover:bg-black/5"
                          onClick={() => openEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-red-200 text-red-700 px-3 py-1.5 text-xs font-semibold hover:bg-red-50"
                          onClick={() => remove(item)}
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

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
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
          <div className="relative w-full sm:max-w-4xl max-h-[94vh] overflow-auto bg-[var(--paper)] sm:rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,.35)]">
            <div className="sticky top-0 z-10 px-5 py-4 border-b border-black/8 bg-white sm:rounded-t-2xl">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.16em] uppercase text-[var(--orange)] m-0 mb-1">
                    {editId ? 'Edit post' : 'New post'}
                  </p>
                  <h2 id="blog-modal-title" className="text-2xl font-extrabold m-0">
                    {editId ? form.title || 'Edit blog' : 'Add blog'}
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
              <div className="flex flex-wrap gap-1">
                {[
                  ['content', 'Content'],
                  ['seo', 'SEO'],
                  ['schema', 'Schema'],
                  ['preview', 'Preview'],
                ].map(([key, lbl]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTab(key)}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${
                      tab === key ? 'bg-[var(--ink)] text-white' : 'bg-black/5 text-[var(--muted)] hover:bg-black/10'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 grid gap-4">
              {tab === 'content' && (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={label}>Title</label>
                      <input
                        className={field}
                        placeholder="Blog title"
                        value={form.title}
                        onChange={(e) => set('title', e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className={label}>
                        Slug <span className="font-normal normal-case tracking-normal">(optional)</span>
                      </label>
                      <input
                        className={field}
                        placeholder="auto-from-title"
                        value={form.slug}
                        onChange={(e) => set('slug', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={label}>Category</label>
                      <input
                        className={field}
                        list="blog-categories"
                        placeholder="e.g. Tips, Guides"
                        value={form.category}
                        onChange={(e) => set('category', e.target.value)}
                      />
                      <datalist id="blog-categories">
                        {[...new Set([...CATEGORY_SUGGESTIONS, ...categories])].map((c) => (
                          <option key={c} value={c} />
                        ))}
                      </datalist>
                    </div>
                    <div>
                      <label className={label}>Excerpt</label>
                      <input
                        className={field}
                        placeholder="Short summary for listings"
                        value={form.excerpt}
                        onChange={(e) => set('excerpt', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={label}>Content (H1/H2/H3, tables, images, links)</label>
                    <RichTextEditor
                      value={form.content}
                      onChange={(html) => set('content', html)}
                      placeholder="Write the full blog content…"
                      minHeight={260}
                      onUploadError={setError}
                    />
                  </div>

                  <div>
                    <label className={label}>Cover image + ALT text</label>
                    <div className="flex flex-wrap gap-3 items-center mb-2">
                      <label className="rounded-full bg-[var(--ink)] text-white px-4 py-2 text-sm cursor-pointer hover:bg-[var(--ink-2)]">
                        {uploading ? 'Uploading…' : 'Upload cover'}
                        <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={uploading} />
                      </label>
                      <input
                        className={`flex-1 min-w-[200px] ${field}`}
                        placeholder="Or paste image URL"
                        value={form.cover_image}
                        onChange={(e) => set('cover_image', e.target.value)}
                      />
                    </div>
                    <input
                      className={field}
                      placeholder="Cover image ALT text (SEO + accessibility)"
                      value={form.cover_image_alt}
                      onChange={(e) => set('cover_image_alt', e.target.value)}
                    />
                    {form.cover_image && (
                      <img
                        src={mediaUrl(form.cover_image)}
                        alt={form.cover_image_alt || 'Cover preview'}
                        className="mt-3 w-48 h-28 object-cover rounded-xl border border-black/8"
                      />
                    )}
                  </div>
                </>
              )}

              {tab === 'seo' && (
                <>
                  <div>
                    <label className={label}>SEO meta title</label>
                    <input
                      className={field}
                      placeholder="Custom title for Google (50–60 chars ideal)"
                      value={form.meta_title}
                      onChange={(e) => set('meta_title', e.target.value)}
                      maxLength={70}
                    />
                    <p className="text-xs text-[var(--muted)] m-0 mt-1">
                      {(form.meta_title || form.title || '').length}/60 recommended
                    </p>
                  </div>
                  <div>
                    <label className={label}>SEO meta description</label>
                    <textarea
                      className={field}
                      rows={3}
                      placeholder="Description shown in search results (140–160 chars)"
                      value={form.meta_description}
                      onChange={(e) => set('meta_description', e.target.value)}
                      maxLength={180}
                    />
                    <p className="text-xs text-[var(--muted)] m-0 mt-1">
                      {(form.meta_description || '').length}/160 recommended
                    </p>
                  </div>
                  <div>
                    <label className={label}>Focus keyword</label>
                    <input
                      className={field}
                      placeholder="e.g. cockroach control bangalore"
                      value={form.focus_keyword}
                      onChange={(e) => set('focus_keyword', e.target.value)}
                    />
                    {kwCheck && (
                      <p
                        className={`text-xs m-0 mt-1 ${kwCheck.ok ? 'text-[var(--green)]' : 'text-amber-700'}`}
                      >
                        {kwCheck.label}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={label}>Canonical URL</label>
                    <input
                      className={field}
                      placeholder={`${SITE}/blogs/your-slug`}
                      value={form.canonical_url}
                      onChange={(e) => set('canonical_url', e.target.value)}
                    />
                    <p className="text-xs text-[var(--muted)] m-0 mt-1">
                      Leave blank to use {previewUrl}
                    </p>
                  </div>
                  <GooglePreview title={serpTitle} description={serpDesc} url={form.canonical_url || previewUrl} />
                </>
              )}

              {tab === 'schema' && (
                <>
                  <div className="flex flex-wrap gap-2 items-center justify-between">
                    <p className="text-sm text-[var(--muted)] m-0">
                      Optional custom JSON-LD. Leave empty to auto-generate Article schema on the website.
                    </p>
                    <button
                      type="button"
                      onClick={buildDefaultSchema}
                      className="rounded-full border border-black/15 px-4 py-2 text-sm bg-white hover:bg-black/5"
                    >
                      Fill Article schema
                    </button>
                  </div>
                  <textarea
                    className={`${field} font-mono text-xs`}
                    rows={16}
                    placeholder='{ "@context": "https://schema.org", "@type": "Article", ... }'
                    value={form.schema_json}
                    onChange={(e) => set('schema_json', e.target.value)}
                  />
                </>
              )}

              {tab === 'preview' && (
                <div className="grid gap-4">
                  <GooglePreview title={serpTitle} description={serpDesc} url={form.canonical_url || previewUrl} />
                  <div className="rounded-xl border border-black/10 bg-white overflow-hidden">
                    <div className="px-4 py-3 border-b border-black/8 flex flex-wrap gap-2 items-center justify-between">
                      <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--muted)] m-0">
                        Content preview
                      </p>
                      <StatusBadge published={form.is_published} />
                    </div>
                    <div className="p-5">
                      {form.category && (
                        <span className="inline-block text-[10px] uppercase tracking-wider font-semibold text-[var(--orange)] mb-2">
                          {form.category}
                        </span>
                      )}
                      <h1 className="text-2xl font-extrabold m-0 mb-3">{form.title || 'Untitled'}</h1>
                      {form.cover_image && (
                        <img
                          src={mediaUrl(form.cover_image)}
                          alt={form.cover_image_alt || form.title}
                          className="w-full max-h-56 object-cover rounded-xl mb-4"
                        />
                      )}
                      <div
                        className="prose-preview text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: form.content || '<p class="text-[var(--muted)]">No content yet.</p>',
                        }}
                      />
                    </div>
                  </div>
                  <style>{`
                    .prose-preview h1 { font-size: 1.5rem; font-weight: 800; margin: .8em 0 .4em; }
                    .prose-preview h2 { font-size: 1.25rem; font-weight: 750; margin: .7em 0 .35em; }
                    .prose-preview h3 { font-size: 1.1rem; font-weight: 700; margin: .6em 0 .3em; }
                    .prose-preview p { margin: 0 0 .7em; }
                    .prose-preview ul, .prose-preview ol { margin: 0 0 .7em; padding-left: 1.2em; }
                    .prose-preview img { max-width: 100%; height: auto; border-radius: 8px; }
                    .prose-preview table { width: 100%; border-collapse: collapse; }
                    .prose-preview th, .prose-preview td { border: 1px solid #ddd; padding: 8px; }
                  `}</style>
                  {form.is_published && form.slug && (
                    <a
                      href={`${SITE}/blogs/${form.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-[var(--orange)] underline"
                    >
                      Open live page →
                    </a>
                  )}
                </div>
              )}

              {error && (
                <p className="text-red-600 text-sm m-0 rounded-xl border border-red-200 bg-red-50 px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex flex-wrap gap-3 pt-2 sticky bottom-0 bg-[var(--paper)] pb-1 border-t border-black/8 -mx-5 px-5 py-4">
                <button
                  type="button"
                  disabled={saving || uploading}
                  onClick={() => save('draft')}
                  className="rounded-full border border-black/15 bg-white px-5 py-2.5 font-semibold hover:bg-black/5 disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Save draft'}
                </button>
                <button
                  type="button"
                  disabled={saving || uploading}
                  onClick={() => {
                    setTab('preview')
                  }}
                  className="rounded-full border border-black/15 bg-white px-5 py-2.5 font-semibold hover:bg-black/5"
                >
                  Preview
                </button>
                <button
                  type="button"
                  disabled={saving || uploading}
                  onClick={() => save('publish')}
                  className="rounded-full bg-[var(--orange)] text-white px-5 py-2.5 font-semibold hover:bg-[#e85f00] disabled:opacity-60"
                >
                  {saving ? 'Publishing…' : 'Publish'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-full border border-black/15 px-5 py-2.5 bg-white ml-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'
import { api, mediaUrl } from '../api'

const empty = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image: '',
  is_published: true,
}

export default function BlogsAdmin() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  const load = () => api.blogs.list().then(setItems).catch((e) => setError(e.message))

  useEffect(() => {
    load()
  }, [])

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const data = await api.upload(file)
      setForm((f) => ({ ...f, cover_image: data.url }))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const payload = { ...form, slug: form.slug || undefined }
      if (editId) await api.blogs.update(editId, payload)
      else await api.blogs.create(payload)
      setForm(empty)
      setEditId(null)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const startEdit = (item) => {
    setEditId(item.id)
    setForm({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt || '',
      content: item.content,
      cover_image: item.cover_image || '',
      is_published: item.is_published,
    })
  }

  return (
    <div>
      <p className="font-[family-name:var(--mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--orange)] mb-3">
        Blogs
      </p>
      <h1 className="text-4xl font-extrabold mb-6">{editId ? 'Edit blog post' : 'Write a blog post'}</h1>

      <form onSubmit={submit} className="bg-white border border-black/10 rounded-2xl p-6 mb-8 grid gap-4 max-w-3xl">
        <input
          className="rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3"
          placeholder="Slug (optional)"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />
        <input
          className="rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3"
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
        />
        <textarea
          className="rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3"
          placeholder="Content"
          rows={8}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <div className="flex flex-wrap gap-3 items-center">
          <label className="rounded-full bg-[var(--ink)] text-white px-4 py-2 text-sm cursor-pointer">
            {uploading ? 'Uploading…' : 'Upload cover'}
            <input type="file" accept="image/*" className="hidden" onChange={onFile} />
          </label>
          <input
            className="flex-1 min-w-[220px] rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3"
            placeholder="Cover image URL"
            value={form.cover_image}
            onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
          />
        </div>
        {form.cover_image && (
          <img src={mediaUrl(form.cover_image)} alt="" className="w-48 h-28 object-cover rounded-xl" />
        )}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => setForm({ ...form, is_published: e.target.checked })}
          />
          Published (shows on website + navbar)
        </label>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-3">
          <button type="submit" className="rounded-full bg-[var(--orange)] text-white px-5 py-2.5 font-semibold">
            {editId ? 'Update post' : 'Publish post'}
          </button>
          {editId && (
            <button
              type="button"
              className="rounded-full border border-black/15 px-5 py-2.5"
              onClick={() => {
                setEditId(null)
                setForm(empty)
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid gap-3 max-w-3xl">
        {items.map((item) => (
          <article key={item.id} className="bg-white border border-black/10 rounded-2xl p-4 flex gap-4 items-start">
            {item.cover_image && (
              <img src={mediaUrl(item.cover_image)} alt="" className="w-24 h-20 object-cover rounded-xl" />
            )}
            <div className="flex-1">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-sm text-[var(--muted)] mb-2">
                /{item.slug} · {item.is_published ? 'Published' : 'Draft'}
              </p>
              <div className="flex gap-2">
                <button type="button" className="text-sm rounded-full border px-3 py-1.5" onClick={() => startEdit(item)}>
                  Edit
                </button>
                <button
                  type="button"
                  className="text-sm rounded-full border border-red-300 text-red-700 px-3 py-1.5"
                  onClick={async () => {
                    if (!confirm('Delete this post?')) return
                    await api.blogs.remove(item.id)
                    load()
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

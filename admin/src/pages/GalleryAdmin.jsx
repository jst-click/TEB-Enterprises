import { useEffect, useState } from 'react'
import { api, mediaUrl } from '../api'

const empty = { title: '', description: '', image_url: '', is_published: true, sort_order: 0 }

export default function GalleryAdmin() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  const load = () => api.gallery.list().then(setItems).catch((e) => setError(e.message))

  useEffect(() => {
    load()
  }, [])

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const data = await api.upload(file)
      setForm((f) => ({ ...f, image_url: data.url }))
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
      if (editId) await api.gallery.update(editId, form)
      else await api.gallery.create(form)
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
      description: item.description || '',
      image_url: item.image_url,
      is_published: item.is_published,
      sort_order: item.sort_order || 0,
    })
  }

  return (
    <div>
      <p className="font-[family-name:var(--mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--orange)] mb-3">
        Gallery
      </p>
      <h1 className="text-4xl font-extrabold mb-6">{editId ? 'Edit gallery item' : 'Add gallery item'}</h1>

      <form onSubmit={submit} className="bg-white border border-black/10 rounded-2xl p-6 mb-8 grid gap-4 max-w-3xl">
        <input
          className="rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3"
          placeholder="Description"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className="flex flex-wrap gap-3 items-center">
          <label className="rounded-full bg-[var(--ink)] text-white px-4 py-2 text-sm cursor-pointer">
            {uploading ? 'Uploading…' : 'Upload image'}
            <input type="file" accept="image/*" className="hidden" onChange={onFile} />
          </label>
          <input
            className="flex-1 min-w-[220px] rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3"
            placeholder="Or paste image URL /uploads/…"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
            required
          />
        </div>
        {form.image_url && (
          <img src={mediaUrl(form.image_url)} alt="" className="w-40 h-28 object-cover rounded-xl" />
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
            {editId ? 'Update' : 'Add item'}
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

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {items.map((item) => (
          <article key={item.id} className="bg-white border border-black/10 rounded-2xl overflow-hidden">
            <img src={mediaUrl(item.image_url)} alt={item.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-sm text-[var(--muted)] mb-3">{item.is_published ? 'Published' : 'Draft'}</p>
              <div className="flex gap-2">
                <button type="button" className="text-sm rounded-full border px-3 py-1.5" onClick={() => startEdit(item)}>
                  Edit
                </button>
                <button
                  type="button"
                  className="text-sm rounded-full border border-red-300 text-red-700 px-3 py-1.5"
                  onClick={async () => {
                    if (!confirm('Delete this item?')) return
                    await api.gallery.remove(item.id)
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

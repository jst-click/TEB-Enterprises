const API_BASE = ''

export async function getNavFlags() {
  const res = await fetch(`${API_BASE}/api/nav-flags`)
  if (!res.ok) return { show_gallery: false, show_blogs: false, gallery_count: 0, blogs_count: 0 }
  return res.json()
}

export async function getPublicGallery() {
  const res = await fetch(`${API_BASE}/api/gallery/public`)
  if (!res.ok) throw new Error('Failed to load gallery')
  return res.json()
}

export async function getPublicBlogs() {
  const res = await fetch(`${API_BASE}/api/blogs/public`)
  if (!res.ok) throw new Error('Failed to load blogs')
  return res.json()
}

export async function getPublicBlog(slug) {
  const res = await fetch(`${API_BASE}/api/blogs/public/${slug}`)
  if (!res.ok) throw new Error('Blog not found')
  return res.json()
}

export async function getPublicSettings() {
  const res = await fetch(`${API_BASE}/api/settings/public`)
  if (!res.ok) throw new Error('Failed to load settings')
  return res.json()
}

export async function submitContact(payload) {
  const res = await fetch(`${API_BASE}/api/contacts/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.detail || 'Failed to submit enquiry')
  return data
}

export function mediaUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${API_BASE}${path}`
}

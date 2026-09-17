const TOKEN_KEY = 'teb_admin_token'
const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

async function request(path, { method = 'GET', body, formData, auth = true } = {}) {
  const headers = {}
  if (auth) {
    const token = getToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }
  if (body && !formData) headers['Content-Type'] = 'application/json'

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: formData || (body ? JSON.stringify(body) : undefined),
  })

  const data = res.status === 204 ? null : await res.json().catch(() => ({}))

  if (res.status === 401) {
    const detail = data?.detail
    const message = Array.isArray(detail)
      ? detail.map((d) => d.msg || JSON.stringify(d)).join(', ')
      : detail || 'Could not validate credentials'

    // Keep session redirect for protected routes, but preserve login error text.
    const onLoginPage = window.location.pathname.includes('/login')
    if (!onLoginPage) {
      clearToken()
      window.location.href = '/login'
    }
    throw new Error(message)
  }

  if (res.status === 204) return null
  if (!res.ok) {
    const detail = data?.detail
    const message = Array.isArray(detail)
      ? detail.map((d) => d.msg || JSON.stringify(d)).join(', ')
      : detail || 'Request failed'
    throw new Error(message)
  }
  return data
}

export const api = {
  login: (email, password) =>
    request('/api/auth/login-json', { method: 'POST', body: { email, password }, auth: false }),
  me: () => request('/api/auth/me'),
  gallery: {
    list: () => request('/api/gallery/'),
    create: (payload) => request('/api/gallery/', { method: 'POST', body: payload }),
    update: (id, payload) => request(`/api/gallery/${id}`, { method: 'PUT', body: payload }),
    remove: (id) => request(`/api/gallery/${id}`, { method: 'DELETE' }),
  },
  blogs: {
    list: () => request('/api/blogs/'),
    create: (payload) => request('/api/blogs/', { method: 'POST', body: payload }),
    update: (id, payload) => request(`/api/blogs/${id}`, { method: 'PUT', body: payload }),
    remove: (id) => request(`/api/blogs/${id}`, { method: 'DELETE' }),
  },
  services: {
    list: () => request('/api/services/'),
    get: (id) => request(`/api/services/${id}`),
    create: (payload) => request('/api/services/', { method: 'POST', body: payload }),
    update: (id, payload) => request(`/api/services/${id}`, { method: 'PUT', body: payload }),
    remove: (id) => request(`/api/services/${id}`, { method: 'DELETE' }),
  },
  contacts: {
    list: () => request('/api/contacts/'),
    markRead: (id, is_read) => request(`/api/contacts/${id}`, { method: 'PATCH', body: { is_read } }),
    remove: (id) => request(`/api/contacts/${id}`, { method: 'DELETE' }),
  },
  settings: {
    get: () => request('/api/settings/'),
    update: (payload) => request('/api/settings/', { method: 'PUT', body: payload }),
  },
  homepage: {
    list: () => request('/api/homepage/'),
    get: (key) => request(`/api/homepage/${key}`),
    update: (key, payload) => request(`/api/homepage/${key}`, { method: 'PUT', body: payload }),
  },
  upload: async (file) => {
    const fd = new FormData()
    fd.append('file', file)
    return request('/api/uploads/', { method: 'POST', formData: fd })
  },
}

export function mediaUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${API_BASE}${path}`
}

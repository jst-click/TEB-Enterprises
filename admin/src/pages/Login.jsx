import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { api, getToken, setToken } from '../api'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@tebenterprises.in')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (getToken()) return <Navigate to="/" replace />

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await api.login(email, password)
      setToken(data.access_token)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-[var(--paper)]">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white border border-black/10 rounded-2xl p-8 shadow-[0_18px_46px_-28px_rgba(10,22,38,.45)]"
      >
        <img src="/logo.png" alt="TEB" className="w-24 mb-4" />
        <h1 className="text-3xl font-extrabold mb-2">Admin login</h1>
        <p className="text-[var(--muted)] mb-6 text-sm">
          Manage gallery and blogs for TEB Enterprises.
        </p>
        <label className="block font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--muted)] mb-2">
          Email
        </label>
        <input
          className="w-full mb-4 rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3 outline-none focus:border-[var(--ink)]"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="block font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--muted)] mb-2">
          Password
        </label>
        <input
          className="w-full mb-5 rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3 outline-none focus:border-[var(--ink)]"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-[var(--orange)] text-white font-semibold py-3 hover:bg-[#e85f00] disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

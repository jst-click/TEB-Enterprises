import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { api, getToken, setToken } from '../api'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateFields(email, password) {
  const errors = {}
  const emailValue = email.trim()
  const passwordValue = password

  if (!emailValue) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_RE.test(emailValue)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!passwordValue) {
    errors.password = 'Password is required.'
  } else if (passwordValue.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  return errors
}

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState({})

  if (getToken()) return <Navigate to="/" replace />

  const showError = (name) => touched[name] && fieldErrors[name]

  const updateField = (name, value) => {
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)

    setError('')
    setFieldErrors((prev) => {
      const next = { ...prev }
      const draft = {
        email: name === 'email' ? value : email,
        password: name === 'password' ? value : password,
      }
      const checked = validateFields(draft.email, draft.password)
      if (checked[name]) next[name] = checked[name]
      else delete next[name]
      return next
    })
  }

  const onBlur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }))
    setFieldErrors(validateFields(email, password))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errors = validateFields(email, password)
    setTouched({ email: true, password: true })
    setFieldErrors(errors)
    setError('')

    if (Object.keys(errors).length) return

    setLoading(true)
    try {
      const data = await api.login(email.trim(), password)
      setToken(data.access_token)
      navigate('/')
    } catch (err) {
      const msg = (err.message || '').toLowerCase()
      if (msg.includes('email') && (msg.includes('not exist') || msg.includes('does not exist'))) {
        setFieldErrors({ email: 'Email does not exist' })
      } else if (msg.includes('password') && msg.includes('wrong')) {
        setFieldErrors({ password: 'Password is wrong' })
      } else {
        setError(err.message || 'Login failed. Check your email and password.')
      }
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (name) =>
    `w-full rounded-xl border bg-[var(--paper)] px-4 py-3 outline-none transition ${
      showError(name)
        ? 'border-red-500 focus:border-red-500'
        : 'border-black/15 focus:border-[var(--ink)]'
    }`

  return (
    <div className="min-h-screen grid place-items-center p-6 bg-[var(--paper)]">
      <form
        onSubmit={onSubmit}
        noValidate
        className="w-full max-w-md bg-white border border-black/10 rounded-2xl p-8 shadow-[0_18px_46px_-28px_rgba(10,22,38,.45)]"
      >
        <img src="/logo.png" alt="TEB" className="w-24 mb-4" />
        <h1 className="text-3xl font-extrabold mb-2">Admin login</h1>
        <p className="text-[var(--muted)] mb-6 text-sm">
          Manage gallery and blogs for TEB Enterprises.
        </p>

        <label
          htmlFor="admin-email"
          className="block font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--muted)] mb-2"
        >
          Email
        </label>
        <input
          id="admin-email"
          className={inputClass('email')}
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => updateField('email', e.target.value)}
          onBlur={() => onBlur('email')}
          aria-invalid={!!showError('email')}
          aria-describedby={showError('email') ? 'email-error' : undefined}
        />
        {showError('email') ? (
          <p id="email-error" className="text-red-600 text-sm mt-2 mb-3">
            {fieldErrors.email}
          </p>
        ) : (
          <div className="mb-4" />
        )}

        <label
          htmlFor="admin-password"
          className="block font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--muted)] mb-2"
        >
          Password
        </label>
        <input
          id="admin-password"
          className={inputClass('password')}
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => updateField('password', e.target.value)}
          onBlur={() => onBlur('password')}
          aria-invalid={!!showError('password')}
          aria-describedby={showError('password') ? 'password-error' : undefined}
        />
        {showError('password') ? (
          <p id="password-error" className="text-red-600 text-sm mt-2 mb-4">
            {fieldErrors.password}
          </p>
        ) : (
          <div className="mb-5" />
        )}

        {error && (
          <p className="text-red-600 text-sm mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2">
            {error}
          </p>
        )}

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

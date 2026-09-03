import { Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { clearToken, getToken } from '../api'

export function RequireAuth() {
  if (!getToken()) return <Navigate to="/login" replace />
  return <Outlet />
}

export function AdminShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const links = [
    ['/', 'Dashboard'],
    ['/gallery', 'Gallery'],
    ['/blogs', 'Blogs'],
    ['/contacts', 'Contacts'],
    ['/settings', 'Settings'],
  ]

  return (
    <div className="min-h-screen flex bg-[var(--paper)]">
      <aside className="w-64 shrink-0 bg-[var(--ink)] text-white p-6 flex flex-col gap-6 sticky top-0 h-screen">
        <div>
          <img src="/logo.png" alt="TEB" className="w-20 mb-3 bg-white rounded-xl p-2" />
          <div className="font-[family-name:var(--display)] text-xl font-extrabold tracking-tight">
            TEB Admin
          </div>
          <div className="font-[family-name:var(--mono)] text-[10px] tracking-[0.16em] uppercase text-white/50 mt-1">
            Content manager
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          {links.map(([to, label]) => {
            const active = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  active ? 'bg-[var(--orange)] text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto space-y-3">
          <div className="rounded-xl bg-white/5 border border-white/10 px-3 py-3">
            <p className="font-[family-name:var(--mono)] text-[9px] tracking-[0.14em] uppercase text-[#FFA45C] mb-1">
              Website
            </p>
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/80 hover:text-white no-underline"
            >
              Open public site →
            </a>
          </div>
          <button
            type="button"
            className="w-full rounded-full border border-white/20 px-4 py-2.5 text-sm text-white/80 hover:bg-white/10"
            onClick={() => {
              clearToken()
              navigate('/login')
            }}
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}

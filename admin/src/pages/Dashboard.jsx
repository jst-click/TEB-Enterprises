import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { api, mediaUrl } from '../api'

function formatDate(value) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return '—'
  }
}

function StatCard({ label, value, hint, accent = 'orange' }) {
  const accents = {
    orange: 'border-l-[var(--orange)] text-[var(--orange)]',
    blue: 'border-l-[var(--blue)] text-[var(--blue)]',
    green: 'border-l-[var(--green)] text-[var(--green)]',
    ink: 'border-l-[var(--ink)] text-[var(--ink)]',
  }

  return (
    <div className={`rounded-2xl bg-white border border-black/8 border-l-4 ${accents[accent]} p-5 shadow-[0_1px_0_rgba(10,22,38,.04)]`}>
      <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.16em] uppercase text-[var(--muted)] mb-3">
        {label}
      </p>
      <p className="font-[family-name:var(--display)] text-4xl font-extrabold tracking-tight leading-none text-[var(--ink)]">
        {value}
      </p>
      {hint && <p className="text-sm text-[var(--muted)] mt-3 m-0">{hint}</p>}
    </div>
  )
}

function ModuleCard({ to, code, title, description, total, published, drafts, cta }) {
  return (
    <div className="rounded-2xl bg-white border border-black/8 overflow-hidden shadow-[0_1px_0_rgba(10,22,38,.04)] flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.16em] uppercase text-[var(--blue)] mb-2">
              {code}
            </p>
            <h2 className="text-2xl font-extrabold m-0">{title}</h2>
          </div>
          <div className="rounded-full bg-[var(--paper)] px-3 py-1 font-[family-name:var(--mono)] text-[11px] text-[var(--muted)]">
            {total} total
          </div>
        </div>
        <p className="text-[var(--muted)] text-sm mb-5">{description}</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[var(--paper)] px-4 py-3">
            <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.12em] uppercase text-[var(--muted)] mb-1">
              Published
            </p>
            <p className="font-[family-name:var(--display)] text-2xl font-extrabold m-0 text-[var(--green)]">
              {published}
            </p>
          </div>
          <div className="rounded-xl bg-[var(--paper)] px-4 py-3">
            <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.12em] uppercase text-[var(--muted)] mb-1">
              Drafts
            </p>
            <p className="font-[family-name:var(--display)] text-2xl font-extrabold m-0 text-[var(--ink)]">
              {drafts}
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t border-black/6 bg-[var(--paper)]/60 flex items-center justify-between gap-3">
        <span className="text-xs text-[var(--muted)]">
          {published > 0 ? 'Visible in website navbar' : 'Hidden until published'}
        </span>
        <Link
          to={to}
          className="rounded-full bg-[var(--ink)] text-white text-sm font-semibold px-4 py-2 hover:bg-[var(--ink-2)] transition"
        >
          {cta}
        </Link>
      </div>
    </div>
  )
}

function EmptyRow({ text }) {
  return (
    <div className="px-5 py-8 text-center text-sm text-[var(--muted)]">{text}</div>
  )
}

export default function Dashboard() {
  const [gallery, setGallery] = useState([])
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    Promise.all([api.gallery.list(), api.blogs.list()])
      .then(([g, b]) => {
        if (!alive) return
        setGallery(g)
        setBlogs(b)
      })
      .catch((e) => {
        if (!alive) return
        setError(e.message || 'Failed to load dashboard')
      })
      .finally(() => {
        if (alive) setLoading(false)
      })
    return () => {
      alive = false
    }
  }, [])

  const stats = useMemo(() => {
    const galleryPublished = gallery.filter((i) => i.is_published).length
    const blogsPublished = blogs.filter((i) => i.is_published).length
    return {
      galleryTotal: gallery.length,
      galleryPublished,
      galleryDrafts: gallery.length - galleryPublished,
      blogsTotal: blogs.length,
      blogsPublished,
      blogsDrafts: blogs.length - blogsPublished,
      navItems: (galleryPublished > 0 ? 1 : 0) + (blogsPublished > 0 ? 1 : 0),
      publishedTotal: galleryPublished + blogsPublished,
    }
  }, [gallery, blogs])

  const recentGallery = useMemo(() => gallery.slice(0, 5), [gallery])
  const recentBlogs = useMemo(() => blogs.slice(0, 5), [blogs])

  return (
    <div className="max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="font-[family-name:var(--mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--orange)] mb-3">
            Dashboard
          </p>
          <h1 className="text-4xl font-extrabold mb-2">Content overview</h1>
          <p className="text-[var(--muted)] max-w-2xl m-0">
            Track gallery and blogs at a glance. Published items appear in the public website navbar.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/gallery"
            className="rounded-full bg-[var(--orange)] text-white text-sm font-semibold px-4 py-2.5 hover:bg-[#e85f00]"
          >
            + Gallery
          </Link>
          <Link
            to="/blogs"
            className="rounded-full bg-[var(--ink)] text-white text-sm font-semibold px-4 py-2.5 hover:bg-[var(--ink-2)]"
          >
            + Blog
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Gallery items"
          value={loading ? '—' : stats.galleryTotal}
          hint={`${stats.galleryPublished} published`}
          accent="orange"
        />
        <StatCard
          label="Blog posts"
          value={loading ? '—' : stats.blogsTotal}
          hint={`${stats.blogsPublished} published`}
          accent="blue"
        />
        <StatCard
          label="Published total"
          value={loading ? '—' : stats.publishedTotal}
          hint={`${stats.galleryDrafts + stats.blogsDrafts} drafts remaining`}
          accent="green"
        />
        <StatCard
          label="Navbar modules"
          value={loading ? '—' : stats.navItems}
          hint={stats.navItems ? 'Live on website top nav' : 'None visible yet'}
          accent="ink"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mb-8">
        <ModuleCard
          to="/gallery"
          code="Module 01"
          title="Gallery"
          description="Upload site photos, treatment work and facility moments for the public gallery page."
          total={stats.galleryTotal}
          published={stats.galleryPublished}
          drafts={stats.galleryDrafts}
          cta="Manage gallery →"
        />
        <ModuleCard
          to="/blogs"
          code="Module 02"
          title="Blogs"
          description="Publish guides and updates. Live posts show under Blogs in the website navbar."
          total={stats.blogsTotal}
          published={stats.blogsPublished}
          drafts={stats.blogsDrafts}
          cta="Manage blogs →"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <section className="rounded-2xl bg-white border border-black/8 overflow-hidden shadow-[0_1px_0_rgba(10,22,38,.04)]">
          <div className="px-5 py-4 border-b border-black/6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold m-0">Recent gallery</h3>
              <p className="text-xs text-[var(--muted)] m-0 mt-1">Latest uploaded items</p>
            </div>
            <Link to="/gallery" className="text-sm font-semibold text-[var(--orange)]">
              View all
            </Link>
          </div>
          {loading ? (
            <EmptyRow text="Loading…" />
          ) : !recentGallery.length ? (
            <EmptyRow text="No gallery items yet. Add your first photo." />
          ) : (
            <ul className="divide-y divide-black/6 m-0 p-0 list-none">
              {recentGallery.map((item) => (
                <li key={item.id} className="px-5 py-3.5 flex items-center gap-3">
                  <img
                    src={mediaUrl(item.image_url)}
                    alt=""
                    className="w-12 h-12 rounded-xl object-cover bg-[var(--paper)] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate m-0">{item.title}</p>
                    <p className="text-xs text-[var(--muted)] m-0 mt-0.5">
                      {formatDate(item.created_at)}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-[family-name:var(--mono)] tracking-[0.08em] uppercase ${
                      item.is_published
                        ? 'bg-[var(--green)]/10 text-[var(--green)]'
                        : 'bg-black/5 text-[var(--muted)]'
                    }`}
                  >
                    {item.is_published ? 'Live' : 'Draft'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl bg-white border border-black/8 overflow-hidden shadow-[0_1px_0_rgba(10,22,38,.04)]">
          <div className="px-5 py-4 border-b border-black/6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold m-0">Recent blogs</h3>
              <p className="text-xs text-[var(--muted)] m-0 mt-1">Latest written posts</p>
            </div>
            <Link to="/blogs" className="text-sm font-semibold text-[var(--orange)]">
              View all
            </Link>
          </div>
          {loading ? (
            <EmptyRow text="Loading…" />
          ) : !recentBlogs.length ? (
            <EmptyRow text="No blog posts yet. Write your first article." />
          ) : (
            <ul className="divide-y divide-black/6 m-0 p-0 list-none">
              {recentBlogs.map((post) => (
                <li key={post.id} className="px-5 py-3.5 flex items-center gap-3">
                  {post.cover_image ? (
                    <img
                      src={mediaUrl(post.cover_image)}
                      alt=""
                      className="w-12 h-12 rounded-xl object-cover bg-[var(--paper)] shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-[var(--paper)] shrink-0 grid place-items-center font-[family-name:var(--mono)] text-[10px] text-[var(--muted)]">
                      POST
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm truncate m-0">{post.title}</p>
                    <p className="text-xs text-[var(--muted)] m-0 mt-0.5 truncate">
                      /{post.slug} · {formatDate(post.created_at)}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-[family-name:var(--mono)] tracking-[0.08em] uppercase ${
                      post.is_published
                        ? 'bg-[var(--green)]/10 text-[var(--green)]'
                        : 'bg-black/5 text-[var(--muted)]'
                    }`}
                  >
                    {post.is_published ? 'Live' : 'Draft'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

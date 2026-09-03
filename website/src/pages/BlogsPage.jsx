import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPublicBlog, getPublicBlogs, mediaUrl } from '../api'
import { useReveal } from '../hooks'

export function BlogsPage() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useReveal()

  useEffect(() => {
    getPublicBlogs()
      .then(setItems)
      .catch(() => setError('Unable to load blogs right now.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section style={{ paddingTop: 'clamp(40px,6vw,72px)' }}>
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">Blog</p>
          <h2>Notes from the field.</h2>
          <p className="lede">Guides, tips and updates from TEB Enterprises.</p>
        </div>

        {loading && <p className="lede">Loading posts…</p>}
        {error && <p className="lede">{error}</p>}
        {!loading && !error && !items.length && (
          <p className="lede">No blog posts published yet.</p>
        )}

        <div className="grid-2 rv" style={{ marginBottom: 48 }}>
          {items.map((post) => (
            <Link
              key={post.id}
              to={`/blogs/${post.slug}`}
              className="card"
              style={{ textDecoration: 'none', display: 'block', padding: 0, overflow: 'hidden' }}
            >
              {post.cover_image && (
                <img
                  src={mediaUrl(post.cover_image)}
                  alt={post.title}
                  style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
                />
              )}
              <div style={{ padding: 24 }}>
                <h3 style={{ marginBottom: 10 }}>{post.title}</h3>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '.95rem' }}>
                  {post.excerpt || post.content.slice(0, 140) + '…'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BlogDetailPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  useReveal()

  useEffect(() => {
    getPublicBlog(slug)
      .then(setPost)
      .catch(() => setError('Blog not found.'))
  }, [slug])

  if (error) {
    return (
      <section style={{ paddingTop: 72 }}>
        <div className="wrap">
          <p className="lede">{error}</p>
          <Link className="btn btn--orange" to="/blogs">Back to blogs</Link>
        </div>
      </section>
    )
  }

  if (!post) {
    return (
      <section style={{ paddingTop: 72 }}>
        <div className="wrap"><p className="lede">Loading…</p></div>
      </section>
    )
  }

  return (
    <section style={{ paddingTop: 'clamp(40px,6vw,72px)', paddingBottom: 80 }}>
      <div className="wrap" style={{ maxWidth: 820 }}>
        <p className="eyebrow">Blog</p>
        <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: 18 }}>{post.title}</h1>
        {post.cover_image && (
          <img
            src={mediaUrl(post.cover_image)}
            alt={post.title}
            style={{ width: '100%', borderRadius: 14, marginBottom: 28 }}
          />
        )}
        <div
          style={{ color: 'var(--ink)', whiteSpace: 'pre-wrap', fontSize: '1.05rem', lineHeight: 1.7 }}
        >
          {post.content}
        </div>
        <Link className="btn btn--ghost" to="/blogs" style={{ marginTop: 36 }}>
          ← All posts
        </Link>
      </div>
    </section>
  )
}

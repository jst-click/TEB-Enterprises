import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getPublicBlog, getPublicBlogCategories, getPublicBlogs, mediaUrl } from '../api'
import { useReveal } from '../hooks'
import { BLOGS_META } from '../seo/blogsPageSeo'
import JsonLd from '../seo/JsonLd'
import SeoHead from '../seo/SeoHead'
import NotFound from './NotFound'

const SITE = 'https://tebpestcontrol.com'

function formatDate(value) {
  if (!value) return ''
  try {
    return new Date(value).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function stripHtml(html) {
  if (!html) return ''
  return String(html)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function excerptOf(post, len = 140) {
  const text = post.excerpt || stripHtml(post.content)
  if (!text) return ''
  return text.length > len ? `${text.slice(0, len).trim()}…` : text
}

function isHtmlContent(content) {
  return /<[a-z][\s\S]*>/i.test(content || '')
}

function buildBlogSchemas(post) {
  const url = post.canonical_url || `${SITE}/blogs/${post.slug}`
  const image = post.cover_image
    ? post.cover_image.startsWith('http')
      ? post.cover_image
      : mediaUrl(post.cover_image)
    : `${SITE}/logo.png`

  let custom = null
  if (post.schema_json?.trim()) {
    try {
      custom = JSON.parse(post.schema_json)
    } catch {
      custom = null
    }
  }

  if (custom) return [custom]

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || stripHtml(post.content).slice(0, 160),
      image,
      keywords: post.focus_keyword || undefined,
      datePublished: post.created_at,
      dateModified: post.updated_at || post.created_at,
      author: {
        '@type': 'Organization',
        name: 'TEB Pest Control',
        url: SITE,
      },
      publisher: {
        '@type': 'Organization',
        name: 'TEB Pest Control',
        logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    },
  ]
}

export function BlogsPage() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') || 'all'
  useReveal()

  useEffect(() => {
    setLoading(true)
    Promise.all([
      getPublicBlogs(category === 'all' ? undefined : category),
      getPublicBlogCategories(),
    ])
      .then(([posts, cats]) => {
        setItems(posts)
        setCategories(cats)
        setError('')
      })
      .catch(() => setError('Unable to load blogs right now.'))
      .finally(() => setLoading(false))
  }, [category])

  const setCategory = (value) => {
    const next = new URLSearchParams(searchParams)
    if (!value || value === 'all') next.delete('category')
    else next.set('category', value)
    setSearchParams(next, { replace: true })
  }

  return (
    <>
      <SeoHead
        title={BLOGS_META.title}
        description={BLOGS_META.description}
        path={category === 'all' ? BLOGS_META.path : `/blogs?category=${encodeURIComponent(category)}`}
        image={BLOGS_META.image}
      />
      <section style={{ paddingTop: 'clamp(40px,6vw,72px)', paddingBottom: 'clamp(48px,8vw,96px)' }}>
        <div className="wrap">
          <div className="sec-head rv" style={{ marginBottom: 28 }}>
            <p className="eyebrow">Blog</p>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', margin: 0 }}>
              Pest control tips & guides
            </h1>
            <p className="lede" style={{ marginTop: 12 }}>
              Expert articles from TEB Enterprises — treatments, prevention and local advice for Bangalore homes and businesses.
            </p>
          </div>

          {(categories.length > 0 || category !== 'all') && (
            <div
              className="rv"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                marginBottom: 28,
              }}
            >
              <button
                type="button"
                onClick={() => setCategory('all')}
                className="btn"
                style={{
                  borderRadius: 999,
                  padding: '8px 16px',
                  fontSize: '.85rem',
                  background: category === 'all' ? 'var(--ink)' : 'transparent',
                  color: category === 'all' ? '#fff' : 'var(--ink)',
                  border: '1px solid var(--line)',
                }}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className="btn"
                  style={{
                    borderRadius: 999,
                    padding: '8px 16px',
                    fontSize: '.85rem',
                    background: category === cat ? 'var(--ink)' : 'transparent',
                    color: category === cat ? '#fff' : 'var(--ink)',
                    border: '1px solid var(--line)',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {loading && <p className="lede">Loading posts…</p>}
          {error && <p className="lede">{error}</p>}
          {!loading && !error && !items.length && (
            <p className="lede">No blog posts published yet{category !== 'all' ? ' in this category' : ''}.</p>
          )}

          <div
            className="rv"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
              gap: 22,
            }}
          >
            {items.map((post) => (
              <Link
                key={post.id}
                to={`/blogs/${post.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--paper-2, #fff)',
                  border: '1px solid var(--line)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  transition: 'transform .2s ease, box-shadow .2s ease',
                }}
                className="blog-card"
              >
                <div
                  style={{
                    aspectRatio: '16/10',
                    background: 'var(--paper)',
                    overflow: 'hidden',
                  }}
                >
                  {post.cover_image ? (
                    <img
                      src={mediaUrl(post.cover_image)}
                      alt={post.cover_image_alt || post.title || 'TEB blog'}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--muted)',
                        fontSize: '.8rem',
                        letterSpacing: '.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      TEB Blog
                    </div>
                  )}
                </div>
                <div style={{ padding: '18px 20px 22px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                    {post.category && (
                      <span
                        style={{
                          fontSize: '.68rem',
                          letterSpacing: '.12em',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          color: 'var(--orange)',
                        }}
                      >
                        {post.category}
                      </span>
                    )}
                    {(post.updated_at || post.created_at) && (
                      <span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>
                        {formatDate(post.updated_at || post.created_at)}
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontSize: '1.15rem', margin: 0, lineHeight: 1.35 }}>{post.title}</h2>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '.92rem', lineHeight: 1.55, flex: 1 }}>
                    {excerptOf(post)}
                  </p>
                  <span
                    style={{
                      marginTop: 6,
                      fontSize: '.85rem',
                      fontWeight: 600,
                      color: 'var(--ink)',
                    }}
                  >
                    Read article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <style>{`
          .blog-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 32px rgba(10,22,38,.08);
          }
        `}</style>
      </section>
    </>
  )
}

export function BlogDetailPage() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  useReveal()

  useEffect(() => {
    setPost(null)
    setError('')
    getPublicBlog(slug)
      .then(setPost)
      .catch(() => setError('Blog not found.'))
  }, [slug])

  const schemas = useMemo(() => (post ? buildBlogSchemas(post) : []), [post])

  if (error) {
    return <NotFound />
  }

  if (!post) {
    return (
      <section style={{ paddingTop: 72 }}>
        <div className="wrap">
          <p className="lede">Loading…</p>
        </div>
      </section>
    )
  }

  const coverAlt = post.cover_image_alt || post.title || 'TEB Enterprises pest control blog'
  const html = isHtmlContent(post.content)

  return (
    <>
      <SeoHead
        title={post.meta_title || post.title}
        description={
          post.meta_description ||
          post.excerpt ||
          stripHtml(post.content).slice(0, 160)
        }
        path={`/blogs/${post.slug}`}
        canonical={post.canonical_url || undefined}
        image={
          post.cover_image
            ? post.cover_image.startsWith('http')
              ? post.cover_image
              : mediaUrl(post.cover_image)
            : `${SITE}/logo.png`
        }
        keywords={post.focus_keyword || undefined}
      />
      <JsonLd id={`blog-seo-${post.slug}`} data={schemas} />

      <section style={{ paddingTop: 'clamp(40px,6vw,72px)', paddingBottom: 80 }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <Link
            to="/blogs"
            style={{
              color: 'var(--muted)',
              textDecoration: 'none',
              fontSize: '.88rem',
              display: 'inline-block',
              marginBottom: 18,
            }}
          >
            ← All posts
          </Link>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            {post.category && (
              <Link
                to={`/blogs?category=${encodeURIComponent(post.category)}`}
                className="eyebrow"
                style={{ textDecoration: 'none' }}
              >
                {post.category}
              </Link>
            )}
            {!post.category && <p className="eyebrow" style={{ margin: 0 }}>Blog</p>}
            <span style={{ color: 'var(--muted)', fontSize: '.85rem' }}>
              {formatDate(post.updated_at || post.created_at)}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', marginBottom: 18 }}>{post.title}</h1>
          {post.excerpt && (
            <p className="lede" style={{ marginTop: 0, marginBottom: 24 }}>
              {post.excerpt}
            </p>
          )}
          {post.cover_image && (
            <img
              src={mediaUrl(post.cover_image)}
              alt={coverAlt}
              style={{ width: '100%', borderRadius: 14, marginBottom: 28 }}
            />
          )}
          {html ? (
            <div
              className="blog-body"
              style={{ color: 'var(--ink)', fontSize: '1.05rem', lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div
              style={{ color: 'var(--ink)', whiteSpace: 'pre-wrap', fontSize: '1.05rem', lineHeight: 1.7 }}
            >
              {post.content}
            </div>
          )}
          <Link className="btn btn--ghost" to="/blogs" style={{ marginTop: 36 }}>
            ← All posts
          </Link>
        </div>
        <style>{`
          .blog-body h1 { font-size: 1.75rem; margin: 1.2em 0 .5em; }
          .blog-body h2 { font-size: 1.4rem; margin: 1.1em 0 .45em; }
          .blog-body h3 { font-size: 1.15rem; margin: 1em 0 .4em; }
          .blog-body p { margin: 0 0 1em; }
          .blog-body ul, .blog-body ol { margin: 0 0 1em; padding-left: 1.25em; }
          .blog-body a { color: var(--orange); }
          .blog-body img { max-width: 100%; height: auto; border-radius: 12px; margin: 12px 0; }
          .blog-body table { width: 100%; border-collapse: collapse; margin: 16px 0; }
          .blog-body th, .blog-body td { border: 1px solid var(--line); padding: 10px; text-align: left; }
        `}</style>
      </section>
    </>
  )
}

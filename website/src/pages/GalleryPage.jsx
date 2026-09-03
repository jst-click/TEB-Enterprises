import { useEffect, useState } from 'react'
import { getPublicGallery, mediaUrl } from '../api'
import { useReveal } from '../hooks'

export default function GalleryPage() {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  useReveal()

  useEffect(() => {
    getPublicGallery()
      .then(setItems)
      .catch(() => setError('Unable to load gallery right now.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section style={{ paddingTop: 'clamp(40px,6vw,72px)' }}>
      <div className="wrap">
        <div className="sec-head rv">
          <p className="eyebrow">Gallery</p>
          <h2>Work from the field.</h2>
          <p className="lede">Photos and site moments shared by our team across Bengaluru.</p>
        </div>

        {loading && <p className="lede">Loading gallery…</p>}
        {error && <p className="lede">{error}</p>}
        {!loading && !error && !items.length && (
          <p className="lede">No gallery items published yet.</p>
        )}

        <div className="grid-3 rv" style={{ marginBottom: 40 }}>
          {items.map((item) => (
            <article className="card" key={item.id} style={{ padding: 0, overflow: 'hidden' }}>
              <img
                src={mediaUrl(item.image_url)}
                alt={item.title}
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }}
              />
              <div style={{ padding: 22 }}>
                <h3 style={{ marginBottom: 8 }}>{item.title}</h3>
                {item.description && (
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '.92rem' }}>
                    {item.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

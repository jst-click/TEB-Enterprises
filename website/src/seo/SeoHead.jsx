import { useEffect } from 'react'

const SITE_ORIGIN = 'https://tebpestcontrol.com'

function upsertMeta(attr, key, content) {
  if (content == null || content === '') return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Sets document title, description, canonical, robots, Open Graph and Twitter tags.
 * @param {{
 *   title: string,
 *   description: string,
 *   path?: string,
 *   image?: string,
 *   type?: string,
 *   robots?: string,
 *   keywords?: string,
 * }} props
 */
export default function SeoHead({
  title,
  description,
  path = '/',
  image = `${SITE_ORIGIN}/logo.png`,
  type = 'website',
  robots = 'index, follow, max-image-preview:large, max-video-preview:-1, max-snippet:-1',
  keywords,
}) {
  useEffect(() => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    const url =
      cleanPath === '/'
        ? `${SITE_ORIGIN}/`
        : `${SITE_ORIGIN}${cleanPath.replace(/\/$/, '')}`

    document.title = title
    upsertMeta('name', 'title', title)
    upsertMeta('name', 'description', description)
    if (keywords) upsertMeta('name', 'keywords', keywords)
    upsertMeta('name', 'robots', robots)

    upsertLink('canonical', url)

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta('property', 'og:site_name', 'TEB Enterprises')

    upsertMeta('property', 'twitter:card', 'summary_large_image')
    upsertMeta('property', 'twitter:url', url)
    upsertMeta('property', 'twitter:title', title)
    upsertMeta('property', 'twitter:description', description)
    upsertMeta('property', 'twitter:image', image)
  }, [title, description, path, image, type, robots, keywords])

  return null
}

export { SITE_ORIGIN }

import { useEffect } from 'react'

const GA_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim()
const GSC_CONTENT = (import.meta.env.VITE_GSC_VERIFICATION || '').trim()

/**
 * Injects Google Analytics 4 + Search Console verification meta when env vars are set.
 * Share GA/GSC property access with: dmmdoesinfo.analytics@gmail.com
 */
export default function Analytics() {
  useEffect(() => {
    if (GSC_CONTENT) {
      let meta = document.querySelector('meta[name="google-site-verification"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'google-site-verification')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', GSC_CONTENT)
    }

    if (!GA_ID || document.getElementById('ga4-src')) return undefined

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag
    gtag('js', new Date())
    gtag('config', GA_ID)

    const script = document.createElement('script')
    script.id = 'ga4-src'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`
    document.head.appendChild(script)

    return undefined
  }, [])

  return null
}

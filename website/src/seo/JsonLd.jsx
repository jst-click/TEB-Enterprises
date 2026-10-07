import { useEffect } from 'react'

/**
 * Injects one or more JSON-LD scripts into <head>. Cleans up on unmount / change.
 * @param {{ id: string, data: object | object[] }} props
 */
export default function JsonLd({ id, data }) {
  useEffect(() => {
    const scripts = Array.isArray(data) ? data : [data]
    const nodes = []

    scripts.forEach((block, i) => {
      if (!block) return
      const scriptId = `${id}-${i}`
      let el = document.getElementById(scriptId)
      if (!el) {
        el = document.createElement('script')
        el.type = 'application/ld+json'
        el.id = scriptId
        document.head.appendChild(el)
      }
      el.textContent = JSON.stringify(block)
      nodes.push(scriptId)
    })

    return () => {
      nodes.forEach((scriptId) => {
        document.getElementById(scriptId)?.remove()
      })
    }
  }, [id, data])

  return null
}

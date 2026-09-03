import { useEffect, useState } from 'react'

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.rv').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export function useCountUp() {
  useEffect(() => {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return
          cio.unobserve(en.target)
          const el = en.target
          const end = Number(el.dataset.count)
          let start = null
          const step = (t) => {
            if (!start) start = t
            const p = Math.min((t - start) / 1100, 1)
            el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + (p === 1 ? '+' : '')
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        })
      },
      { threshold: 0.6 },
    )
    document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el))
    return () => cio.disconnect()
  }, [])
}

export function useScrollChrome() {
  const [stuck, setStuck] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0)
      setStuck(h.scrollTop > 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { stuck, progress }
}

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getPublicHomepage } from '../api'

const HomeContentContext = createContext({
  sections: {},
  loading: true,
})

export function HomeContentProvider({ children }) {
  const [sections, setSections] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPublicHomepage()
      .then((data) => setSections(data.sections || {}))
      .catch(() => setSections({}))
      .finally(() => setLoading(false))
  }, [])

  const value = useMemo(() => ({ sections, loading }), [sections, loading])
  return <HomeContentContext.Provider value={value}>{children}</HomeContentContext.Provider>
}

export function useHomeSection(key, fallback = {}) {
  const { sections, loading } = useContext(HomeContentContext)
  const data = sections[key]
  return {
    data: data && typeof data === 'object' ? { ...fallback, ...data } : fallback,
    loading,
  }
}

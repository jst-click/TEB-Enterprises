import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const EnquiryContext = createContext(null)

export function EnquiryProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [defaults, setDefaults] = useState({})

  const openEnquiry = useCallback((opts = {}) => {
    setDefaults(opts)
    setOpen(true)
  }, [])

  const closeEnquiry = useCallback(() => {
    setOpen(false)
  }, [])

  const value = useMemo(
    () => ({ open, defaults, openEnquiry, closeEnquiry }),
    [open, defaults, openEnquiry, closeEnquiry],
  )

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext)
  if (!ctx) throw new Error('useEnquiry must be used within EnquiryProvider')
  return ctx
}

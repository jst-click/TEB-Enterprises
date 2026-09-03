import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'

function formatDate(value) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return '—'
  }
}

function ChannelBadge({ channel }) {
  const isWa = channel === 'whatsapp'
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-[family-name:var(--mono)] uppercase tracking-[0.08em] ${
        isWa ? 'bg-[var(--green)]/10 text-[var(--green)]' : 'bg-[var(--blue)]/10 text-[var(--blue)]'
      }`}
    >
      {channel || '—'}
    </span>
  )
}

function StatusBadge({ isRead }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-[family-name:var(--mono)] uppercase tracking-[0.08em] ${
        isRead ? 'bg-black/5 text-[var(--muted)]' : 'bg-[var(--orange)]/15 text-[var(--orange)]'
      }`}
    >
      {isRead ? 'Read' : 'Unread'}
    </span>
  )
}

export default function ContactsPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const data = await api.contacts.list()
      setItems(data)
      setError('')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const stats = useMemo(() => {
    const unread = items.filter((i) => !i.is_read).length
    const whatsapp = items.filter((i) => i.channel === 'whatsapp').length
    const email = items.filter((i) => i.channel === 'email').length
    return { total: items.length, unread, whatsapp, email }
  }, [items])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return items.filter((i) => {
      if (filter === 'unread' && i.is_read) return false
      if (filter === 'whatsapp' && i.channel !== 'whatsapp') return false
      if (filter === 'email' && i.channel !== 'email') return false
      if (!q) return true
      const hay = [i.name, i.mobile, i.email, i.location, i.pest_problem, i.property_type, i.notes]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [items, filter, search])

  const openItem = async (item) => {
    setSelected(item)
    if (!item.is_read) {
      try {
        const updated = await api.contacts.markRead(item.id, true)
        setItems((prev) => prev.map((x) => (x.id === item.id ? updated : x)))
        setSelected(updated)
      } catch {
        /* ignore */
      }
    }
  }

  const removeItem = async (item) => {
    if (!confirm(`Delete enquiry from ${item.name}?`)) return
    await api.contacts.remove(item.id)
    setItems((prev) => prev.filter((x) => x.id !== item.id))
    if (selected?.id === item.id) setSelected(null)
  }

  return (
    <div className="max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="font-[family-name:var(--mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--orange)] mb-3">
            Contacts
          </p>
          <h1 className="text-4xl font-extrabold mb-2">Form enquiries</h1>
          <p className="text-[var(--muted)] m-0">
            All website contact form submissions in one list.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          className="rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-[var(--paper)]"
        >
          Refresh
        </button>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        {[
          ['Total', stats.total, 'ink'],
          ['Unread', stats.unread, 'orange'],
          ['WhatsApp', stats.whatsapp, 'green'],
          ['Email', stats.email, 'blue'],
        ].map(([label, value, accent]) => (
          <div
            key={label}
            className={`rounded-2xl bg-white border border-black/8 border-l-4 p-4 ${
              accent === 'orange'
                ? 'border-l-[var(--orange)]'
                : accent === 'green'
                  ? 'border-l-[var(--green)]'
                  : accent === 'blue'
                    ? 'border-l-[var(--blue)]'
                    : 'border-l-[var(--ink)]'
            }`}
          >
            <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--muted)] m-0 mb-2">
              {label}
            </p>
            <p className="font-[family-name:var(--display)] text-3xl font-extrabold m-0">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, mobile, email, location…"
          className="flex-1 min-w-[240px] rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-[var(--ink)]"
        />
        <div className="flex flex-wrap gap-2">
          {[
            ['all', 'All'],
            ['unread', 'Unread'],
            ['whatsapp', 'WhatsApp'],
            ['email', 'Email'],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold border ${
                filter === key
                  ? 'bg-[var(--ink)] text-white border-[var(--ink)]'
                  : 'bg-white text-[var(--ink)] border-black/10'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <section className="rounded-2xl bg-white border border-black/8 overflow-hidden shadow-[0_1px_0_rgba(10,22,38,.04)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-collapse text-sm">
            <thead>
              <tr className="bg-[var(--paper)] text-left">
                {[
                  '#',
                  'Name',
                  'Mobile',
                  'Email',
                  'Location',
                  'Pest',
                  'Property',
                  'Channel',
                  'Date',
                  'Status',
                  'Actions',
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-[family-name:var(--mono)] text-[10px] tracking-[0.12em] uppercase text-[var(--muted)] font-semibold border-b border-black/8 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={11} className="px-4 py-10 text-center text-[var(--muted)]">
                    Loading contacts…
                  </td>
                </tr>
              ) : !filtered.length ? (
                <tr>
                  <td colSpan={11} className="px-4 py-10 text-center text-[var(--muted)]">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                filtered.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b border-black/5 hover:bg-[var(--paper)]/70 transition ${
                      !item.is_read ? 'bg-[var(--orange)]/[0.03]' : ''
                    } ${selected?.id === item.id ? 'bg-[var(--paper)]' : ''}`}
                  >
                    <td className="px-4 py-3.5 text-[var(--muted)] font-[family-name:var(--mono)] text-xs">
                      {filtered.length - index}
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        type="button"
                        onClick={() => openItem(item)}
                        className={`text-left hover:text-[var(--orange)] ${
                          item.is_read ? 'font-semibold' : 'font-extrabold'
                        }`}
                      >
                        {item.name}
                      </button>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <a href={`tel:${item.mobile}`} className="text-[var(--ink)] no-underline hover:text-[var(--orange)]">
                        {item.mobile}
                      </a>
                    </td>
                    <td className="px-4 py-3.5 max-w-[180px]">
                      {item.email ? (
                        <a
                          href={`mailto:${item.email}`}
                          className="text-[var(--ink)] no-underline hover:text-[var(--orange)] truncate block"
                          title={item.email}
                        >
                          {item.email}
                        </a>
                      ) : (
                        <span className="text-[var(--muted)]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 max-w-[120px] truncate" title={item.location || ''}>
                      {item.location || '—'}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">{item.pest_problem || '—'}</td>
                    <td className="px-4 py-3.5 max-w-[130px] truncate" title={item.property_type || ''}>
                      {item.property_type || '—'}
                    </td>
                    <td className="px-4 py-3.5">
                      <ChannelBadge channel={item.channel} />
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-[var(--muted)] text-xs">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge isRead={item.is_read} />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => openItem(item)}
                          className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-semibold hover:bg-white"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item)}
                          className="rounded-full border border-red-200 text-red-700 px-3 py-1.5 text-xs font-semibold hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-black/6 text-xs text-[var(--muted)] font-[family-name:var(--mono)] tracking-[0.04em]">
            Showing {filtered.length} of {items.length} enquiries
          </div>
        )}
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30" onClick={() => setSelected(null)}>
          <aside
            className="w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-black/8 px-5 py-4 flex items-start justify-between gap-3">
              <div>
                <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--orange)] m-0 mb-1">
                  Enquiry detail
                </p>
                <h2 className="text-2xl font-extrabold m-0">{selected.name}</h2>
                <p className="text-xs text-[var(--muted)] m-0 mt-1">{formatDate(selected.created_at)}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-full border border-black/10 w-9 h-9 grid place-items-center text-lg"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="p-5 grid gap-3">
              <div className="flex flex-wrap gap-2 mb-1">
                <ChannelBadge channel={selected.channel} />
                <StatusBadge isRead={selected.is_read} />
              </div>

              {[
                ['Mobile', selected.mobile, selected.mobile ? `tel:${selected.mobile}` : null],
                ['Email', selected.email || '—', selected.email ? `mailto:${selected.email}` : null],
                ['Location', selected.location || '—'],
                ['Property type', selected.property_type || '—'],
                ['Approx. size', selected.approx_size || '—'],
                ['Pest problem', selected.pest_problem || '—'],
                ['Preferred date', selected.preferred_date || '—'],
                ['Channel', selected.channel],
              ].map(([label, value, href]) => (
                <div key={label} className="rounded-xl bg-[var(--paper)] px-4 py-3">
                  <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.12em] uppercase text-[var(--muted)] m-0 mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="font-semibold text-[var(--ink)] no-underline break-all">
                      {value}
                    </a>
                  ) : (
                    <p className="font-semibold m-0 break-words">{value}</p>
                  )}
                </div>
              ))}

              <div className="rounded-xl bg-[var(--paper)] px-4 py-3">
                <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.12em] uppercase text-[var(--muted)] m-0 mb-1">
                  Notes
                </p>
                <p className="m-0 whitespace-pre-wrap font-medium">{selected.notes || '—'}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <a
                  href={`tel:${selected.mobile}`}
                  className="flex-1 text-center rounded-full bg-[var(--ink)] text-white text-sm font-semibold px-4 py-2.5 no-underline"
                >
                  Call
                </a>
                <button
                  type="button"
                  onClick={() => removeItem(selected)}
                  className="flex-1 rounded-full border border-red-300 text-red-700 text-sm font-semibold px-4 py-2.5"
                >
                  Delete
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'
import RichTextEditor from '../components/RichTextEditor'

function FieldLabel({ children }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1.5">
      {children}
    </label>
  )
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--orange)]"
      value={value ?? ''}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

function LinesEditor({ value = [], onChange, placeholder = 'One item per line' }) {
  return (
    <textarea
      className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-[var(--orange)] min-h-[120px]"
      value={(value || []).join('\n')}
      placeholder={placeholder}
      onChange={(e) =>
        onChange(
          e.target.value
            .split('\n')
            .map((l) => l.trimEnd())
            .filter((l, i, arr) => l !== '' || i < arr.length - 1),
        )
      }
    />
  )
}

function setAt(arr, index, next) {
  const copy = [...(arr || [])]
  copy[index] = next
  return copy
}

function removeAt(arr, index) {
  return (arr || []).filter((_, i) => i !== index)
}

function SectionForm({ sectionKey, data, setData }) {
  const update = (patch) => setData({ ...data, ...patch })

  if (sectionKey === 'hero') {
    return (
      <div className="grid gap-4">
        <div>
          <FieldLabel>Eyebrow</FieldLabel>
          <TextInput value={data.eyebrow} onChange={(v) => update({ eyebrow: v })} />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <div>
            <FieldLabel>Title line 1</FieldLabel>
            <TextInput value={data.title_line1} onChange={(v) => update({ title_line1: v })} />
          </div>
          <div>
            <FieldLabel>Title line 2</FieldLabel>
            <TextInput value={data.title_line2} onChange={(v) => update({ title_line2: v })} />
          </div>
          <div>
            <FieldLabel>Title line 3</FieldLabel>
            <TextInput value={data.title_line3} onChange={(v) => update({ title_line3: v })} />
          </div>
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <RichTextEditor value={data.lede} onChange={(v) => update({ lede: v })} />
        </div>
        <div>
          <FieldLabel>Primary CTA</FieldLabel>
          <TextInput value={data.primary_cta} onChange={(v) => update({ primary_cta: v })} />
        </div>
        <div>
          <FieldLabel>Core label</FieldLabel>
          <TextInput value={data.core_label} onChange={(v) => update({ core_label: v })} />
        </div>
        <div>
          <FieldLabel>Pills (one per line)</FieldLabel>
          <LinesEditor value={data.pills} onChange={(v) => update({ pills: v.filter(Boolean) })} />
        </div>
        <div>
          <FieldLabel>Perimeter nodes (one per line)</FieldLabel>
          <LinesEditor value={data.nodes} onChange={(v) => update({ nodes: v.filter(Boolean) })} />
        </div>
      </div>
    )
  }

  if (sectionKey === 'ticker') {
    return (
      <div>
        <FieldLabel>Ticker items (one per line)</FieldLabel>
        <LinesEditor value={data.items} onChange={(v) => update({ items: v.filter(Boolean) })} />
      </div>
    )
  }

  if (sectionKey === 'stats') {
    return (
      <div className="grid gap-3">
        {(data.items || []).map((item, i) => (
          <div key={i} className="grid grid-cols-[100px_1fr_auto] gap-2 items-center">
            <input
              type="number"
              className="rounded-xl border border-black/15 bg-white px-3 py-2 text-sm"
              value={item.value ?? 0}
              onChange={(e) =>
                update({ items: setAt(data.items, i, { ...item, value: Number(e.target.value) || 0 }) })
              }
            />
            <TextInput
              value={item.label}
              onChange={(v) => update({ items: setAt(data.items, i, { ...item, label: v }) })}
            />
            <button type="button" className="text-red-600 text-sm" onClick={() => update({ items: removeAt(data.items, i) })}>
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="rounded-full border border-black/15 px-4 py-2 text-sm w-fit"
          onClick={() => update({ items: [...(data.items || []), { value: 0, label: 'New stat' }] })}
        >
          + Add stat
        </button>
      </div>
    )
  }

  if (sectionKey === 'pests') {
    return (
      <div className="grid gap-5">
        <div>
          <FieldLabel>Eyebrow</FieldLabel>
          <TextInput value={data.eyebrow} onChange={(v) => update({ eyebrow: v })} />
        </div>
        <div>
          <FieldLabel>Title</FieldLabel>
          <TextInput value={data.title} onChange={(v) => update({ title: v })} />
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <RichTextEditor value={data.lede} onChange={(v) => update({ lede: v })} />
        </div>
        <div>
          <FieldLabel>Filters (id|label per line)</FieldLabel>
          <LinesEditor
            value={(data.filters || []).map((f) => `${f.id}|${f.label}`)}
            onChange={(lines) =>
              update({
                filters: lines
                  .filter(Boolean)
                  .map((line) => {
                    const [id, ...rest] = line.split('|')
                    return { id: (id || '').trim(), label: rest.join('|').trim() || id }
                  }),
              })
            }
          />
        </div>
        {(data.items || []).map((pest, i) => (
          <div key={i} className="rounded-2xl border border-black/10 bg-white p-4 grid gap-3">
            <div className="flex justify-between gap-3 items-center">
              <strong className="text-sm">Pest #{i + 1}</strong>
              <button type="button" className="text-red-600 text-sm" onClick={() => update({ items: removeAt(data.items, i) })}>
                Remove
              </button>
            </div>
            <div className="grid sm:grid-cols-3 gap-2">
              <TextInput value={pest.c} onChange={(v) => update({ items: setAt(data.items, i, { ...pest, c: v }) })} placeholder="Code" />
              <TextInput value={pest.g} onChange={(v) => update({ items: setAt(data.items, i, { ...pest, g: v }) })} placeholder="Group" />
              <TextInput value={pest.n} onChange={(v) => update({ items: setAt(data.items, i, { ...pest, n: v }) })} placeholder="Name" />
            </div>
            <div>
              <FieldLabel>Description</FieldLabel>
              <RichTextEditor value={pest.t} onChange={(v) => update({ items: setAt(data.items, i, { ...pest, t: v }) })} />
            </div>
            <div>
              <FieldLabel>Signs (one per line)</FieldLabel>
              <LinesEditor value={pest.signs} onChange={(v) => update({ items: setAt(data.items, i, { ...pest, signs: v.filter(Boolean) }) })} />
            </div>
            <div>
              <FieldLabel>Treatment (one per line)</FieldLabel>
              <LinesEditor value={pest.treat} onChange={(v) => update({ items: setAt(data.items, i, { ...pest, treat: v.filter(Boolean) }) })} />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="rounded-full border border-black/15 px-4 py-2 text-sm w-fit"
          onClick={() =>
            update({
              items: [...(data.items || []), { c: 'XX', g: 'crawling', n: 'New pest', t: '<p></p>', signs: [], treat: [] }],
            })
          }
        >
          + Add pest
        </button>
      </div>
    )
  }

  if (['services', 'areas', 'contact', 'band', 'safety', 'amc'].includes(sectionKey) || ['sectors', 'ipm', 'process', 'faq'].includes(sectionKey)) {
    // shared head fields handled below in specific branches
  }

  if (sectionKey === 'services') {
    return (
      <div className="grid gap-4">
        <div>
          <FieldLabel>Eyebrow</FieldLabel>
          <TextInput value={data.eyebrow} onChange={(v) => update({ eyebrow: v })} />
        </div>
        <div>
          <FieldLabel>Title</FieldLabel>
          <TextInput value={data.title} onChange={(v) => update({ title: v })} />
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <RichTextEditor value={data.lede} onChange={(v) => update({ lede: v })} />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <FieldLabel>B2C tab label</FieldLabel>
            <TextInput value={data.tab_b2c} onChange={(v) => update({ tab_b2c: v })} />
          </div>
          <div>
            <FieldLabel>B2B tab label</FieldLabel>
            <TextInput value={data.tab_b2b} onChange={(v) => update({ tab_b2b: v })} />
          </div>
        </div>
        <div>
          <FieldLabel>View all button</FieldLabel>
          <TextInput value={data.view_all} onChange={(v) => update({ view_all: v })} />
        </div>
        <p className="text-sm text-[var(--muted)] m-0">
          Service cards themselves are managed under <strong>Services</strong> in the sidebar.
        </p>
      </div>
    )
  }

  if (sectionKey === 'sectors' || sectionKey === 'ipm' || sectionKey === 'process') {
    const codeKey = sectionKey === 'sectors' ? 'code' : sectionKey === 'ipm' ? 'label' : 'step'
    return (
      <div className="grid gap-4">
        <div>
          <FieldLabel>Eyebrow</FieldLabel>
          <TextInput value={data.eyebrow} onChange={(v) => update({ eyebrow: v })} />
        </div>
        <div>
          <FieldLabel>Title</FieldLabel>
          <TextInput value={data.title} onChange={(v) => update({ title: v })} />
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <RichTextEditor value={data.lede || ''} onChange={(v) => update({ lede: v })} />
        </div>
        {sectionKey === 'sectors' && (
          <>
            <div>
              <FieldLabel>CTA kicker</FieldLabel>
              <TextInput value={data.cta_kicker} onChange={(v) => update({ cta_kicker: v })} />
            </div>
            <div>
              <FieldLabel>CTA title</FieldLabel>
              <TextInput value={data.cta_title} onChange={(v) => update({ cta_title: v })} />
            </div>
            <div>
              <FieldLabel>CTA button</FieldLabel>
              <TextInput value={data.cta_label} onChange={(v) => update({ cta_label: v })} />
            </div>
          </>
        )}
        {sectionKey === 'ipm' && (
          <div>
            <FieldLabel>CTA button</FieldLabel>
            <TextInput value={data.cta_label} onChange={(v) => update({ cta_label: v })} />
          </div>
        )}
        {(data.items || []).map((item, i) => (
          <div key={i} className="rounded-2xl border border-black/10 bg-white p-4 grid gap-3">
            <div className="flex justify-between">
              <strong className="text-sm">Item #{i + 1}</strong>
              <button type="button" className="text-red-600 text-sm" onClick={() => update({ items: removeAt(data.items, i) })}>
                Remove
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              <TextInput
                value={item[codeKey]}
                onChange={(v) => update({ items: setAt(data.items, i, { ...item, [codeKey]: v }) })}
                placeholder={codeKey}
              />
              <TextInput
                value={item.title}
                onChange={(v) => update({ items: setAt(data.items, i, { ...item, title: v }) })}
                placeholder="Title"
              />
            </div>
            <div>
              <FieldLabel>Description</FieldLabel>
              <RichTextEditor
                value={item.text}
                onChange={(v) => update({ items: setAt(data.items, i, { ...item, text: v }) })}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="rounded-full border border-black/15 px-4 py-2 text-sm w-fit"
          onClick={() =>
            update({
              items: [...(data.items || []), { [codeKey]: '', title: 'New item', text: '<p></p>' }],
            })
          }
        >
          + Add item
        </button>
      </div>
    )
  }

  if (sectionKey === 'amc') {
    return (
      <div className="grid gap-4">
        <div>
          <FieldLabel>Eyebrow</FieldLabel>
          <TextInput value={data.eyebrow} onChange={(v) => update({ eyebrow: v })} />
        </div>
        <div>
          <FieldLabel>Title</FieldLabel>
          <TextInput value={data.title} onChange={(v) => update({ title: v })} />
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <RichTextEditor value={data.lede} onChange={(v) => update({ lede: v })} />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <FieldLabel>Box title</FieldLabel>
            <TextInput value={data.box_title} onChange={(v) => update({ box_title: v })} />
          </div>
          <div>
            <FieldLabel>Why title</FieldLabel>
            <TextInput value={data.why_title} onChange={(v) => update({ why_title: v })} />
          </div>
        </div>
        <div>
          <FieldLabel>Tags (one per line)</FieldLabel>
          <LinesEditor value={data.tags} onChange={(v) => update({ tags: v.filter(Boolean) })} />
        </div>
        <div>
          <FieldLabel>Why points (one per line)</FieldLabel>
          <LinesEditor value={data.why} onChange={(v) => update({ why: v.filter(Boolean) })} />
        </div>
      </div>
    )
  }

  if (sectionKey === 'safety') {
    const unpack = (text) =>
      text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => line.split('·').map((s) => s.trim()).filter(Boolean))

    return (
      <div className="grid gap-4">
        <div>
          <FieldLabel>Eyebrow</FieldLabel>
          <TextInput value={data.eyebrow} onChange={(v) => update({ eyebrow: v })} />
        </div>
        <div>
          <FieldLabel>Title</FieldLabel>
          <TextInput value={data.title} onChange={(v) => update({ title: v })} />
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <RichTextEditor value={data.lede} onChange={(v) => update({ lede: v })} />
        </div>
        <div>
          <FieldLabel>Tabs (one per line)</FieldLabel>
          <LinesEditor value={data.tabs} onChange={(v) => update({ tabs: v.filter(Boolean) })} />
        </div>
        {['pre', 'post', 'tell'].map((key) => (
          <div key={key}>
            <FieldLabel>{key} groups (one group per line, items separated by ·)</FieldLabel>
            <LinesEditor
              value={(data[key] || []).map((group) => (group || []).join(' · '))}
              onChange={(lines) => update({ [key]: unpack(lines.join('\n')) })}
            />
          </div>
        ))}
      </div>
    )
  }

  if (sectionKey === 'areas') {
    return (
      <div className="grid gap-4">
        <div>
          <FieldLabel>Eyebrow</FieldLabel>
          <TextInput value={data.eyebrow} onChange={(v) => update({ eyebrow: v })} />
        </div>
        <div>
          <FieldLabel>Title</FieldLabel>
          <TextInput value={data.title} onChange={(v) => update({ title: v })} />
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <RichTextEditor value={data.lede} onChange={(v) => update({ lede: v })} />
        </div>
        <div>
          <FieldLabel>Other label</FieldLabel>
          <TextInput value={data.other_label} onChange={(v) => update({ other_label: v })} />
        </div>
        <div>
          <FieldLabel>Areas (one per line)</FieldLabel>
          <LinesEditor value={data.items} onChange={(v) => update({ items: v.filter(Boolean) })} />
        </div>
      </div>
    )
  }

  if (sectionKey === 'faq') {
    return (
      <div className="grid gap-4">
        <div>
          <FieldLabel>Eyebrow</FieldLabel>
          <TextInput value={data.eyebrow} onChange={(v) => update({ eyebrow: v })} />
        </div>
        <div>
          <FieldLabel>Title</FieldLabel>
          <TextInput value={data.title} onChange={(v) => update({ title: v })} />
        </div>
        {(data.items || []).map((item, i) => (
          <div key={i} className="rounded-2xl border border-black/10 bg-white p-4 grid gap-3">
            <div className="flex justify-between">
              <strong className="text-sm">FAQ #{i + 1}</strong>
              <button type="button" className="text-red-600 text-sm" onClick={() => update({ items: removeAt(data.items, i) })}>
                Remove
              </button>
            </div>
            <TextInput value={item.q} onChange={(v) => update({ items: setAt(data.items, i, { ...item, q: v }) })} placeholder="Question" />
            <div>
              <FieldLabel>Answer</FieldLabel>
              <RichTextEditor value={item.a} onChange={(v) => update({ items: setAt(data.items, i, { ...item, a: v }) })} />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="rounded-full border border-black/15 px-4 py-2 text-sm w-fit"
          onClick={() => update({ items: [...(data.items || []), { q: 'New question?', a: '<p></p>' }] })}
        >
          + Add FAQ
        </button>
      </div>
    )
  }

  if (sectionKey === 'contact') {
    return (
      <div className="grid gap-4">
        <div>
          <FieldLabel>Eyebrow</FieldLabel>
          <TextInput value={data.eyebrow} onChange={(v) => update({ eyebrow: v })} />
        </div>
        <div>
          <FieldLabel>Title</FieldLabel>
          <TextInput value={data.title} onChange={(v) => update({ title: v })} />
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <RichTextEditor value={data.lede} onChange={(v) => update({ lede: v })} />
        </div>
        <div>
          <FieldLabel>Aside title</FieldLabel>
          <TextInput value={data.aside_title} onChange={(v) => update({ aside_title: v })} />
        </div>
        <div>
          <FieldLabel>Aside description</FieldLabel>
          <RichTextEditor value={data.aside_text} onChange={(v) => update({ aside_text: v })} />
        </div>
        <div>
          <FieldLabel>Property types (one per line)</FieldLabel>
          <LinesEditor value={data.property_types} onChange={(v) => update({ property_types: v.filter(Boolean) })} />
        </div>
        <div>
          <FieldLabel>Pest options (one per line)</FieldLabel>
          <LinesEditor value={data.pest_options} onChange={(v) => update({ pest_options: v.filter(Boolean) })} />
        </div>
      </div>
    )
  }

  if (sectionKey === 'band') {
    return (
      <div className="grid gap-4">
        <div>
          <FieldLabel>Title</FieldLabel>
          <TextInput value={data.title} onChange={(v) => update({ title: v })} />
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <RichTextEditor value={data.lede} onChange={(v) => update({ lede: v })} />
        </div>
        <div>
          <FieldLabel>Secondary CTA</FieldLabel>
          <TextInput value={data.secondary_cta} onChange={(v) => update({ secondary_cta: v })} />
        </div>
      </div>
    )
  }

  return <p className="text-sm text-[var(--muted)]">Unknown section type.</p>
}

export default function HomePageAdmin() {
  const [sections, setSections] = useState([])
  const [activeKey, setActiveKey] = useState('')
  const [draft, setDraft] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [savedAt, setSavedAt] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const list = await api.homepage.list()
      setSections(list)
      const key = activeKey && list.some((s) => s.key === activeKey) ? activeKey : list[0]?.key || ''
      setActiveKey(key)
      const current = list.find((s) => s.key === key)
      setDraft(current ? structuredClone(current.data) : {})
      setError('')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const active = useMemo(() => sections.find((s) => s.key === activeKey), [sections, activeKey])

  const selectSection = (key) => {
    const row = sections.find((s) => s.key === key)
    setActiveKey(key)
    setDraft(row ? structuredClone(row.data) : {})
    setError('')
    setSavedAt('')
  }

  const save = async () => {
    if (!activeKey) return
    setSaving(true)
    setError('')
    try {
      const updated = await api.homepage.update(activeKey, {
        label: active?.label,
        data: draft,
      })
      setSections((prev) => prev.map((s) => (s.key === activeKey ? updated : s)))
      setDraft(structuredClone(updated.data))
      setSavedAt(new Date().toLocaleTimeString())
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="shrink-0 mb-4">
        <p className="font-[family-name:var(--mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--orange)] mb-2">
          Home page
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold m-0">Homepage content</h1>
        <p className="text-[var(--muted)] text-sm mt-1 m-0">
          Choose a section on the left, edit on the right.
        </p>
      </div>

      {error && (
        <div className="shrink-0 mb-3 rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-[var(--muted)] text-sm">Loading sections…</p>
      ) : (
        <div className="flex-1 min-h-0 flex border border-black/10 rounded-2xl overflow-hidden bg-white">
          {/* Left: fixed panel + own scroll */}
          <aside className="w-[220px] sm:w-[260px] shrink-0 h-full border-r border-black/10 bg-[var(--paper)] flex flex-col min-h-0">
            <div className="shrink-0 px-4 py-3 border-b border-black/8">
              <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--muted)] m-0">
                Sections
              </p>
              <p className="text-xs text-[var(--muted)] m-0 mt-1">{sections.length} sections</p>
            </div>
            <nav className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-2 grid gap-0.5 content-start">
              {sections.map((s, index) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => selectSection(s.key)}
                  className={`text-left rounded-xl px-3 py-2.5 text-sm font-medium transition flex items-start gap-2 ${
                    s.key === activeKey
                      ? 'bg-[var(--ink)] text-white shadow-sm'
                      : 'hover:bg-white text-[var(--ink)]'
                  }`}
                >
                  <span
                    className={`font-[family-name:var(--mono)] text-[10px] mt-0.5 ${
                      s.key === activeKey ? 'text-[#FFA45C]' : 'text-[var(--muted)]'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-snug">{s.label.replace(/^\d+\.\s*/, '')}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Right: only this content area scrolls */}
          <section className="flex-1 min-w-0 h-full flex flex-col min-h-0 bg-white">
            <div className="shrink-0 flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-black/8 bg-white">
              <div className="min-w-0">
                <p className="font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--orange)] m-0 mb-1">
                  Edit section
                </p>
                <h2 className="text-xl font-extrabold m-0 truncate">{active?.label || 'Section'}</h2>
              </div>
              <div className="flex items-center gap-3">
                {savedAt && <span className="text-xs text-[var(--green)]">Saved {savedAt}</span>}
                <button
                  type="button"
                  onClick={save}
                  disabled={saving || !activeKey}
                  className="rounded-full bg-[var(--orange)] text-white px-5 py-2.5 font-semibold hover:bg-[#e85f00] disabled:opacity-60"
                >
                  {saving ? 'Saving…' : 'Save section'}
                </button>
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 bg-[var(--paper)]/40">
              {activeKey ? (
                <SectionForm sectionKey={activeKey} data={draft} setData={setDraft} />
              ) : (
                <p className="text-sm text-[var(--muted)]">Select a section from the left to edit.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { api, mediaUrl } from '../api'
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

function ImageField({ label, value, onChange, setError }) {
  const [uploading, setUploading] = useState(false)
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex flex-wrap gap-3 items-center">
        <label className="rounded-full bg-[var(--ink)] text-white px-4 py-2 text-sm cursor-pointer shrink-0">
          {uploading ? 'Uploading…' : 'Upload image'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (!file) return
              setUploading(true)
              try {
                const data = await api.upload(file)
                onChange(data.url)
              } catch (err) {
                setError(err.message)
              } finally {
                setUploading(false)
                e.target.value = ''
              }
            }}
          />
        </label>
        <input
          className="flex-1 min-w-[200px] rounded-xl border border-black/15 bg-white px-4 py-3 text-sm"
          placeholder="Image URL"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button type="button" className="text-xs text-red-600 font-semibold" onClick={() => onChange('')}>
            Remove
          </button>
        )}
      </div>
      {value && (
        <img src={mediaUrl(value)} alt="" className="mt-3 w-56 h-32 object-cover rounded-xl border border-black/8" />
      )}
    </div>
  )
}

function SectionForm({ sectionKey, data, setData, setError }) {
  const update = (patch) => setData({ ...data, ...patch })

  if (sectionKey === 'hero') {
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
          <FieldLabel>Primary CTA</FieldLabel>
          <TextInput value={data.primary_cta} onChange={(v) => update({ primary_cta: v })} />
        </div>
        <ImageField label="Hero image" value={data.image} onChange={(v) => update({ image: v })} setError={setError} />
      </div>
    )
  }

  if (sectionKey === 'include') {
    return (
      <div className="grid gap-4">
        <div>
          <FieldLabel>Eyebrow</FieldLabel>
          <TextInput value={data.eyebrow} onChange={(v) => update({ eyebrow: v })} />
        </div>
        <div>
          <FieldLabel>Section title</FieldLabel>
          <TextInput value={data.title} onChange={(v) => update({ title: v })} />
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <RichTextEditor value={data.lede} onChange={(v) => update({ lede: v })} />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <FieldLabel>Left box title</FieldLabel>
            <TextInput value={data.box_title} onChange={(v) => update({ box_title: v })} />
          </div>
          <div>
            <FieldLabel>Right box title</FieldLabel>
            <TextInput value={data.why_title} onChange={(v) => update({ why_title: v })} />
          </div>
        </div>
        <div>
          <FieldLabel>Left box intro</FieldLabel>
          <TextInput value={data.box_intro} onChange={(v) => update({ box_intro: v })} />
        </div>
        <div>
          <FieldLabel>Frequency label</FieldLabel>
          <TextInput value={data.frequency_label} onChange={(v) => update({ frequency_label: v })} />
        </div>
        <div>
          <FieldLabel>Frequencies (one per line)</FieldLabel>
          <LinesEditor value={data.frequencies} onChange={(v) => update({ frequencies: v.filter(Boolean) })} />
        </div>
        <div>
          <FieldLabel>Scope label</FieldLabel>
          <TextInput value={data.scope_label} onChange={(v) => update({ scope_label: v })} />
        </div>
        <div>
          <FieldLabel>Scopes / tags (one per line)</FieldLabel>
          <LinesEditor value={data.scopes} onChange={(v) => update({ scopes: v.filter(Boolean) })} />
        </div>
        <div>
          <FieldLabel>Why points (one per line)</FieldLabel>
          <LinesEditor value={data.why} onChange={(v) => update({ why: v.filter(Boolean) })} />
        </div>
      </div>
    )
  }

  if (sectionKey === 'who') {
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
        <FieldLabel>Audience cards</FieldLabel>
        {(data.items || []).map((item, i) => (
          <div key={i} className="rounded-xl border border-black/10 bg-white p-4 grid gap-3">
            <div className="flex justify-between items-center">
              <span className="font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--orange)]">
                Card {String(i + 1).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="text-xs font-semibold text-red-600"
                onClick={() => update({ items: removeAt(data.items, i) })}
              >
                Remove
              </button>
            </div>
            <TextInput
              value={item.title}
              placeholder="Title"
              onChange={(v) => update({ items: setAt(data.items, i, { ...item, title: v }) })}
            />
            <textarea
              className="w-full rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3 text-sm min-h-[80px]"
              value={item.text || ''}
              placeholder="Description"
              onChange={(e) => update({ items: setAt(data.items, i, { ...item, text: e.target.value }) })}
            />
          </div>
        ))}
        <button
          type="button"
          className="rounded-full border border-black/15 px-4 py-2 text-sm w-fit"
          onClick={() => update({ items: [...(data.items || []), { title: '', text: '' }] })}
        >
          + Add card
        </button>
      </div>
    )
  }

  if (sectionKey === 'process') {
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
        <FieldLabel>Steps</FieldLabel>
        {(data.steps || []).map((item, i) => (
          <div key={i} className="rounded-xl border border-black/10 bg-white p-4 grid gap-3">
            <div className="flex justify-between items-center">
              <span className="font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--orange)]">
                Step {String(i + 1).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="text-xs font-semibold text-red-600"
                onClick={() => update({ steps: removeAt(data.steps, i) })}
              >
                Remove
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <TextInput
                value={item.step}
                placeholder="STEP 01"
                onChange={(v) => update({ steps: setAt(data.steps, i, { ...item, step: v }) })}
              />
              <TextInput
                value={item.title}
                placeholder="Title"
                onChange={(v) => update({ steps: setAt(data.steps, i, { ...item, title: v }) })}
              />
            </div>
            <textarea
              className="w-full rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3 text-sm min-h-[80px]"
              value={item.text || ''}
              placeholder="Description"
              onChange={(e) => update({ steps: setAt(data.steps, i, { ...item, text: e.target.value }) })}
            />
          </div>
        ))}
        <button
          type="button"
          className="rounded-full border border-black/15 px-4 py-2 text-sm w-fit"
          onClick={() =>
            update({
              steps: [
                ...(data.steps || []),
                { step: `STEP ${String((data.steps || []).length + 1).padStart(2, '0')}`, title: '', text: '' },
              ],
            })
          }
        >
          + Add step
        </button>
      </div>
    )
  }

  if (sectionKey === 'about') {
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
          <FieldLabel>Body content</FieldLabel>
          <RichTextEditor value={data.content} onChange={(v) => update({ content: v })} />
        </div>
        <div>
          <FieldLabel>Primary CTA</FieldLabel>
          <TextInput value={data.primary_cta} onChange={(v) => update({ primary_cta: v })} />
        </div>
        <ImageField label="About image" value={data.image} onChange={(v) => update({ image: v })} setError={setError} />
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <FieldLabel>Badge label</FieldLabel>
            <TextInput value={data.badge_label} onChange={(v) => update({ badge_label: v })} />
          </div>
          <div>
            <FieldLabel>Badge text</FieldLabel>
            <TextInput value={data.badge_text} onChange={(v) => update({ badge_text: v })} />
          </div>
        </div>
      </div>
    )
  }

  if (sectionKey === 'coverage') {
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
          <FieldLabel>Areas (one per line)</FieldLabel>
          <LinesEditor value={data.areas} onChange={(v) => update({ areas: v.filter(Boolean) })} />
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
        <FieldLabel>Questions & answers</FieldLabel>
        {(data.items || []).map((item, i) => (
          <div key={i} className="rounded-xl border border-black/10 bg-white p-4 grid gap-3">
            <div className="flex justify-between items-center">
              <span className="font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] uppercase text-[var(--orange)]">
                FAQ {String(i + 1).padStart(2, '0')}
              </span>
              <button
                type="button"
                className="text-xs font-semibold text-red-600"
                onClick={() => update({ items: removeAt(data.items, i) })}
              >
                Remove
              </button>
            </div>
            <div>
              <FieldLabel>Question</FieldLabel>
              <TextInput
                value={item.question}
                onChange={(v) => update({ items: setAt(data.items, i, { ...item, question: v }) })}
              />
            </div>
            <div>
              <FieldLabel>Answer</FieldLabel>
              <textarea
                className="w-full rounded-xl border border-black/15 bg-[var(--paper)] px-4 py-3 text-sm min-h-[90px]"
                value={item.answer || ''}
                onChange={(e) => update({ items: setAt(data.items, i, { ...item, answer: e.target.value }) })}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="rounded-full border border-black/15 px-4 py-2 text-sm w-fit"
          onClick={() => update({ items: [...(data.items || []), { question: '', answer: '' }] })}
        >
          + Add question
        </button>
      </div>
    )
  }

  if (sectionKey === 'cta') {
    return (
      <div className="grid gap-4">
        <div>
          <FieldLabel>CTA title</FieldLabel>
          <TextInput value={data.title} onChange={(v) => update({ title: v })} />
        </div>
        <div>
          <FieldLabel>Description</FieldLabel>
          <RichTextEditor value={data.lede} onChange={(v) => update({ lede: v })} />
        </div>
        <div>
          <FieldLabel>Primary CTA</FieldLabel>
          <TextInput value={data.primary_cta} onChange={(v) => update({ primary_cta: v })} />
        </div>
      </div>
    )
  }

  if (sectionKey === 'seo') {
    return (
      <div className="grid gap-4">
        <div>
          <FieldLabel>Meta title</FieldLabel>
          <TextInput value={data.meta_title} onChange={(v) => update({ meta_title: v })} />
        </div>
        <div>
          <FieldLabel>Meta description</FieldLabel>
          <textarea
            className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm min-h-[100px]"
            value={data.meta_description || ''}
            onChange={(e) => update({ meta_description: e.target.value })}
          />
        </div>
      </div>
    )
  }

  return <p className="text-sm text-[var(--muted)]">Unknown section type.</p>
}

export default function AmcPageAdmin() {
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
      const list = await api.amcPage.list()
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
      const updated = await api.amcPage.update(activeKey, {
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

  const websiteUrl = import.meta.env.VITE_WEBSITE_URL || 'http://localhost:5173'

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <div className="shrink-0 mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-[family-name:var(--mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--orange)] mb-2">
            AMC page
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold m-0">AMC page content</h1>
          <p className="text-[var(--muted)] text-sm mt-1 m-0">
            Edit each section of /pest-control-amc-bangalore — same layout as the live page.
          </p>
        </div>
        <a
          href={`${websiteUrl}/pest-control-amc-bangalore`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-black/15 px-4 py-2.5 text-sm font-semibold no-underline text-[var(--ink)]"
        >
          Preview page →
        </a>
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
                <SectionForm sectionKey={activeKey} data={draft} setData={setDraft} setError={setError} />
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

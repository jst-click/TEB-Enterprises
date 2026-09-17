import { useEffect, useRef } from 'react'

const ACTIONS = [
  { cmd: 'bold', label: 'B', title: 'Bold' },
  { cmd: 'italic', label: 'I', title: 'Italic' },
  { cmd: 'underline', label: 'U', title: 'Underline' },
  { cmd: 'insertUnorderedList', label: '• List', title: 'Bullet list' },
  { cmd: 'insertOrderedList', label: '1. List', title: 'Numbered list' },
]

export default function RichTextEditor({ value = '', onChange, placeholder = 'Write description…' }) {
  const ref = useRef(null)
  const lastHtml = useRef('')

  useEffect(() => {
    const html = value || ''
    if (ref.current && html !== lastHtml.current && html !== ref.current.innerHTML) {
      ref.current.innerHTML = html
      lastHtml.current = html
    }
  }, [value])

  const emit = () => {
    if (!ref.current) return
    const html = ref.current.innerHTML
    lastHtml.current = html
    onChange?.(html === '<br>' ? '' : html)
  }

  const run = (cmd) => {
    ref.current?.focus()
    document.execCommand(cmd, false)
    emit()
  }

  return (
    <div className="rounded-xl border border-black/15 bg-white overflow-hidden">
      <div className="flex flex-wrap gap-1 px-2 py-2 border-b border-black/8 bg-[var(--paper)]">
        {ACTIONS.map((a) => (
          <button
            key={a.cmd}
            type="button"
            title={a.title}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => run(a.cmd)}
            className="rounded-lg border border-black/10 bg-white px-2.5 py-1 text-xs font-semibold hover:bg-black/5"
          >
            {a.label}
          </button>
        ))}
        <button
          type="button"
          title="Clear formatting"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => run('removeFormat')}
          className="rounded-lg border border-black/10 bg-white px-2.5 py-1 text-xs font-semibold hover:bg-black/5 ml-auto"
        >
          Clear
        </button>
      </div>
      <div
        ref={ref}
        className="min-h-[120px] px-4 py-3 text-sm outline-none prose-editor"
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={emit}
        onBlur={emit}
      />
      <style>{`
        .prose-editor:empty:before {
          content: attr(data-placeholder);
          color: #5C6B7A;
          pointer-events: none;
        }
        .prose-editor p { margin: 0 0 .6em; }
        .prose-editor ul, .prose-editor ol { margin: 0 0 .6em; padding-left: 1.2em; }
      `}</style>
    </div>
  )
}

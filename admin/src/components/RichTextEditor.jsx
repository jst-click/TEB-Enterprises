import { useEffect, useRef, useState } from 'react'
import { api } from '../api'

function ToolbarBtn({ title, onClick, children, active }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1 text-xs font-semibold hover:bg-black/5 ${
        active ? 'border-[var(--orange)] bg-orange-50 text-[var(--orange)]' : 'border-black/10 bg-white'
      }`}
    >
      {children}
    </button>
  )
}

/**
 * Advanced rich text: H1–H3, lists, tables, images, internal/external links.
 */
export default function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Write content…',
  onUploadError,
  minHeight = 220,
}) {
  const ref = useRef(null)
  const lastHtml = useRef('')
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)

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

  const run = (cmd, arg) => {
    ref.current?.focus()
    document.execCommand(cmd, false, arg)
    emit()
  }

  const formatBlock = (tag) => {
    ref.current?.focus()
    document.execCommand('formatBlock', false, tag)
    emit()
  }

  const insertLink = () => {
    const url = window.prompt(
      'Link URL (internal e.g. /blogs/my-post or https://…)',
      'https://tebpestcontrol.com/',
    )
    if (!url) return
    run('createLink', url)
  }

  const insertTable = () => {
    ref.current?.focus()
    const html =
      '<table style="width:100%;border-collapse:collapse;margin:12px 0"><thead><tr>' +
      '<th style="border:1px solid #ccc;padding:8px;text-align:left">Heading</th>' +
      '<th style="border:1px solid #ccc;padding:8px;text-align:left">Heading</th>' +
      '</tr></thead><tbody><tr>' +
      '<td style="border:1px solid #ccc;padding:8px">Cell</td>' +
      '<td style="border:1px solid #ccc;padding:8px">Cell</td>' +
      '</tr><tr>' +
      '<td style="border:1px solid #ccc;padding:8px">Cell</td>' +
      '<td style="border:1px solid #ccc;padding:8px">Cell</td>' +
      '</tr></tbody></table><p><br></p>'
    document.execCommand('insertHTML', false, html)
    emit()
  }

  const onImageFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const data = await api.upload(file)
      const alt = window.prompt('Image ALT text (for SEO/accessibility)', file.name.replace(/\.[^.]+$/, '')) || ''
      ref.current?.focus()
      const src = data.url?.startsWith('http') ? data.url : data.url
      document.execCommand(
        'insertHTML',
        false,
        `<p><img src="${src}" alt="${alt.replace(/"/g, '&quot;')}" style="max-width:100%;height:auto;border-radius:8px" /></p><p><br></p>`,
      )
      emit()
    } catch (err) {
      onUploadError?.(err.message || 'Image upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <div className="rounded-xl border border-black/15 bg-white overflow-hidden">
      <div className="flex flex-wrap gap-1 px-2 py-2 border-b border-black/8 bg-[var(--paper)]">
        <ToolbarBtn title="Heading 1" onClick={() => formatBlock('h1')}>
          H1
        </ToolbarBtn>
        <ToolbarBtn title="Heading 2" onClick={() => formatBlock('h2')}>
          H2
        </ToolbarBtn>
        <ToolbarBtn title="Heading 3" onClick={() => formatBlock('h3')}>
          H3
        </ToolbarBtn>
        <ToolbarBtn title="Paragraph" onClick={() => formatBlock('p')}>
          P
        </ToolbarBtn>
        <span className="w-px self-stretch bg-black/10 mx-0.5" />
        <ToolbarBtn title="Bold" onClick={() => run('bold')}>
          <strong>B</strong>
        </ToolbarBtn>
        <ToolbarBtn title="Italic" onClick={() => run('italic')}>
          <em>I</em>
        </ToolbarBtn>
        <ToolbarBtn title="Underline" onClick={() => run('underline')}>
          <span className="underline">U</span>
        </ToolbarBtn>
        <span className="w-px self-stretch bg-black/10 mx-0.5" />
        <ToolbarBtn title="Bullet list" onClick={() => run('insertUnorderedList')}>
          • List
        </ToolbarBtn>
        <ToolbarBtn title="Numbered list" onClick={() => run('insertOrderedList')}>
          1. List
        </ToolbarBtn>
        <ToolbarBtn title="Insert table" onClick={insertTable}>
          Table
        </ToolbarBtn>
        <ToolbarBtn title="Internal / external link" onClick={insertLink}>
          Link
        </ToolbarBtn>
        <ToolbarBtn title="Insert image" onClick={() => fileRef.current?.click()}>
          {uploading ? '…' : 'Image'}
        </ToolbarBtn>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onImageFile} />
        <ToolbarBtn title="Clear formatting" onClick={() => run('removeFormat')}>
          Clear
        </ToolbarBtn>
      </div>
      <div
        ref={ref}
        className="px-4 py-3 text-sm outline-none prose-editor"
        style={{ minHeight }}
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
        .prose-editor h1 { font-size: 1.6rem; font-weight: 800; margin: .8em 0 .4em; }
        .prose-editor h2 { font-size: 1.3rem; font-weight: 750; margin: .7em 0 .35em; }
        .prose-editor h3 { font-size: 1.1rem; font-weight: 700; margin: .6em 0 .3em; }
        .prose-editor p { margin: 0 0 .6em; }
        .prose-editor ul, .prose-editor ol { margin: 0 0 .6em; padding-left: 1.2em; }
        .prose-editor a { color: #e8750a; text-decoration: underline; }
        .prose-editor table { width: 100%; border-collapse: collapse; margin: 12px 0; }
        .prose-editor th, .prose-editor td { border: 1px solid #ccc; padding: 8px; }
        .prose-editor img { max-width: 100%; height: auto; border-radius: 8px; }
      `}</style>
    </div>
  )
}

export default function Html({ html, className = '', as: Tag = 'div', style }) {
  if (!html) return null
  const looksHtml = /<\/?[a-z][\s\S]*>/i.test(html)
  if (!looksHtml) {
    return <Tag className={className} style={style}>{html}</Tag>
  }
  return (
    <Tag
      className={`rich-html ${className}`.trim()}
      style={style}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

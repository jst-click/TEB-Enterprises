function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** @param {{ q?: string, question?: string, a?: string, answer?: string }[]} items */
export function buildFaqSchema(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q || item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(item.a || item.answer || item.acceptedAnswer),
      },
    })),
  }
}

export function buildArticleSchema({
  url,
  headline,
  description,
  image,
  datePublished = '2026-06-03',
  dateModified = '2026-07-02',
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline,
    description,
    image,
    author: {
      '@type': 'Organization',
      name: 'tebpestcontrol',
      url: 'https://tebpestcontrol.com/',
    },
    publisher: {
      '@type': 'Organization',
      name: 'tebpestcontrol',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tebpestcontrol.com/logo.png',
      },
    },
    datePublished,
    dateModified,
  }
}

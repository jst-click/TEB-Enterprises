import { buildFaqSchema } from './faqSchema'
import { HOME_FAQS } from './homeFaqs'

export { HOME_FAQS, buildFaqSchema }

export const HOME_META = {
  title: 'Best Pest Control Services in Bangalore',
  description:
    'Best Pest control services in Bangalore for cockroaches, termites, bed bugs, rodents, mosquitoes. Residential & commercial treatments. Call now - 79966 88885',
  path: '/',
  image: 'https://tebpestcontrol.com/logo.png',
  keywords: [
    'Pest control Bangalore',
    'Pest Control Services in Bangalore',
    'Pest control services Bangalore',
    'Best pest control Bangalore',
    'Professional pest control Bangalore',
    'Affordable pest control Bangalore',
    'Pest control company Bangalore',
    'Local pest control Bangalore',
    'Pest control services near me',
    'Best pest control near me',
    'Certified pest control Bangalore',
    'Pest control Bangalore price list',
    'Pest control Bangalore price',
    'Pest control services price list near me',
    'Pest control Bangalore cost',
    'Pest control cost in Bangalore',
    'Pest control charges in Bangalore',
  ].join(', '),
}

/**
 * Home-only schemas. Organization + LocalBusiness/Review live in Layout (globalSchemas).
 */
export function buildHomeSchemas(faqItems = HOME_FAQS) {
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://tebpestcontrol.com/',
    },
    headline: 'Pest Control Services in Bangalore | TEB Enterprises',
    description:
      'TEB Enterprises provides professional pest-control services in Bengaluru for homes, apartments, offices, hotels, hospitals, restaurants, factories, warehouses, and commercial properties.',
    image: 'https://tebpestcontrol.com/logo.png',
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
    datePublished: '2026-06-02',
    dateModified: '2026-07-01',
  }

  return [article, buildFaqSchema(faqItems)]
}

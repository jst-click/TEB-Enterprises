import { GMB_URL } from '../components/GmbLink'
import { SITE } from '../data/content'
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

export function buildHomeSchemas(faqItems = HOME_FAQS) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Teb Pest Control',
    alternateName: 'TEB Enterprises',
    url: 'https://tebpestcontrol.com/',
    logo: 'https://tebpestcontrol.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-79966-88885',
      contactType: 'customer service',
      contactOption: 'TollFree',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
    sameAs: [SITE.social.facebook, SITE.social.instagram, GMB_URL].filter(Boolean),
  }

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

  // LocalBusiness + AggregateRating (valid review schema for Google)
  const review = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Teb Pest Control',
    alternateName: 'TEB Enterprises',
    url: 'https://tebpestcontrol.com/',
    image: 'https://tebpestcontrol.com/logo.png',
    telephone: '+91-79966-88885',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Varthur, Devasthanagalu, Bengaluru',
      postalCode: '560087',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9398,
      longitude: 77.7412,
    },
    areaServed: {
      '@type': 'City',
      name: 'Bangalore',
    },
    sameAs: [GMB_URL, SITE.social.facebook, SITE.social.instagram].filter(Boolean),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      bestRating: '5.0',
      worstRating: '1.0',
      reviewCount: '232',
    },
  }

  return [organization, article, review, buildFaqSchema(faqItems)]
}

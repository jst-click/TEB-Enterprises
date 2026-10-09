import { GMB_URL } from '../components/GmbLink'
import { SITE } from '../data/content'

/**
 * Site-wide JSON-LD for every page (injected in Layout → document <head>).
 * Organization + LocalBusiness (with AggregateRating as review schema).
 * Matches client SEO doc; LocalBusiness used instead of invalid Book+rating type.
 */
export function buildGlobalSchemas() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Teb Pest Control',
    alternateName: 'Teb Pest Control',
    url: 'https://tebpestcontrol.com/',
    logo: 'https://tebpestcontrol.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '79966 88885',
      contactType: 'customer service',
      contactOption: 'TollFree',
      areaServed: 'IN',
      availableLanguage: 'en',
    },
    sameAs: [
      SITE.social.facebook,
      SITE.social.instagram,
      GMB_URL,
    ].filter(Boolean),
  }

  // LocalBusiness + AggregateRating = Local Business + Review schema (Google-valid)
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Teb Pest Control',
    alternateName: 'TEB Enterprises',
    url: 'https://tebpestcontrol.com/',
    image: 'https://tebpestcontrol.com/logo.png',
    logo: 'https://tebpestcontrol.com/logo.png',
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
      reviewCount: '2749',
    },
  }

  return [organization, localBusiness]
}

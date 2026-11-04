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

  // LocalBusiness + AggregateRating = Local Business + Review schema (Google-valid).
  // A static copy lives in index.html (id="global-seo-ld-1") — keep both in sync.
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://tebpestcontrol.com/#localbusiness',
    name: 'TEB Enterprises – Team Experts Bangalore',
    alternateName: 'Teb Pest Control',
    url: 'https://tebpestcontrol.com/',
    image: 'https://tebpestcontrol.com/gmb-office.png',
    logo: 'https://tebpestcontrol.com/logo.png',
    telephone: '+917996688885',
    email: SITE.salesEmail,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Varthur, Devasthanagalu',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      postalCode: '560087',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.938948000316907,
      longitude: 77.74119803558223,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
    areaServed: {
      '@type': 'City',
      name: 'Bangalore',
    },
    sameAs: [SITE.social.facebook, SITE.social.instagram, GMB_URL].filter(Boolean),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      bestRating: 5.0,
      worstRating: 1.0,
      reviewCount: 2749,
    },
  }

  return [organization, localBusiness]
}

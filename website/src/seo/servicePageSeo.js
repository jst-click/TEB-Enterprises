import { buildArticleSchema, buildFaqSchema } from './faqSchema'
import { ANT_SEO } from './servicePages/ant-control-bangalore'
import { BED_BUG_SEO } from './servicePages/bed-bug-control-bangalore'
import { COCKROACH_SEO } from './servicePages/cockroach-control-bangalore'
import { COMMERCIAL_SEO } from './servicePages/commercial-pest-control-bangalore'
import { MOSQUITO_SEO } from './servicePages/mosquito-control-bangalore'
import { AMC_SEO } from './servicePages/pest-control-amc-bangalore'
import { BELLANDUR_SEO } from './servicePages/pest-control-bellandur'
import { BROOKEFIELD_SEO } from './servicePages/pest-control-brookefield'
import { ELECTRONIC_CITY_SEO } from './servicePages/pest-control-electronic-city'
import { HOODI_SEO } from './servicePages/pest-control-hoodi'
import { HSR_LAYOUT_SEO } from './servicePages/pest-control-hsr-layout'
import { KR_PURAM_SEO } from './servicePages/pest-control-kr-puram'
import { MARATHAHALLI_SEO } from './servicePages/pest-control-marathahalli'
import { SARJAPUR_SEO } from './servicePages/pest-control-sarjapur-road'
import { WHITEFIELD_SEO } from './servicePages/pest-control-whitefield'
import { RESIDENTIAL_SEO } from './servicePages/residential-pest-control-bangalore'
import { RODENT_SEO } from './servicePages/rodent-control-bangalore'
import { TERMITE_SEO } from './servicePages/termite-control-bangalore'

const BY_SLUG = {
  [COCKROACH_SEO.slug]: COCKROACH_SEO,
  [TERMITE_SEO.slug]: TERMITE_SEO,
  [BED_BUG_SEO.slug]: BED_BUG_SEO,
  [RODENT_SEO.slug]: RODENT_SEO,
  [MOSQUITO_SEO.slug]: MOSQUITO_SEO,
  [COMMERCIAL_SEO.slug]: COMMERCIAL_SEO,
  [RESIDENTIAL_SEO.slug]: RESIDENTIAL_SEO,
  [ANT_SEO.slug]: ANT_SEO,
  [AMC_SEO.slug]: AMC_SEO,
  [WHITEFIELD_SEO.slug]: WHITEFIELD_SEO,
  [MARATHAHALLI_SEO.slug]: MARATHAHALLI_SEO,
  [SARJAPUR_SEO.slug]: SARJAPUR_SEO,
  [BELLANDUR_SEO.slug]: BELLANDUR_SEO,
  [BROOKEFIELD_SEO.slug]: BROOKEFIELD_SEO,
  [HOODI_SEO.slug]: HOODI_SEO,
  [KR_PURAM_SEO.slug]: KR_PURAM_SEO,
  [ELECTRONIC_CITY_SEO.slug]: ELECTRONIC_CITY_SEO,
  [HSR_LAYOUT_SEO.slug]: HSR_LAYOUT_SEO,
}

export { AMC_SEO }

export function getServiceSeo(slug) {
  return BY_SLUG[slug] || null
}

export function faqsToPipeText(faqs) {
  return faqs.map((f) => `${f.q}|${f.a}`).join('\n')
}

/**
 * Build Article + FAQPage JSON-LD for a service page.
 * Prefers curated SEO pack; falls back to service API fields.
 */
export function buildServiceSchemas(slug, item, faqPairs = []) {
  const pack = getServiceSeo(slug)
  const url = `https://tebpestcontrol.com/${slug}`
  const image =
    pack?.image ||
    item?.cover_image ||
    item?.about_image ||
    'https://tebpestcontrol.com/logo.png'

  const headline =
    pack?.articleHeadline || pack?.title || item?.meta_title || item?.title || 'TEB Enterprises'
  const description =
    pack?.articleDescription ||
    pack?.description ||
    item?.meta_description ||
    item?.summary ||
    ''

  const faqItems =
    pack?.faqs?.length > 0
      ? pack.faqs
      : faqPairs.map(([q, a]) => ({ q, a })).filter((f) => f.q && f.a)

  const schemas = [
    buildArticleSchema({
      url,
      headline,
      description,
      image,
      datePublished: pack?.datePublished || '2026-06-03',
      dateModified: pack?.dateModified || '2026-07-02',
    }),
  ]

  if (faqItems.length) {
    schemas.push(buildFaqSchema(faqItems))
  }

  return schemas
}

export function resolveServiceMeta(slug, item) {
  const pack = getServiceSeo(slug)
  const path = `/${slug}`
  return {
    title: pack?.title || item?.meta_title || `${item?.title || 'Service'} | TEB Enterprises`,
    description:
      pack?.description ||
      item?.meta_description ||
      item?.summary ||
      'Professional pest control services in Bangalore by TEB Enterprises.',
    path,
    image: pack?.image || item?.cover_image || 'https://tebpestcontrol.com/logo.png',
    keywords: pack?.keywords || item?.keywords || '',
  }
}

export function resolveServiceFaqPairs(slug, pipeFaqPairs = []) {
  const pack = getServiceSeo(slug)
  if (pack?.faqs?.length) {
    return pack.faqs.map((f) => [f.q, f.a])
  }
  return pipeFaqPairs
}

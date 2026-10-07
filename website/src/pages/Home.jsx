import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero, Stats, Ticker } from '../components/Hero'
import TrustIntro from '../components/TrustIntro'
import PestFinder from '../components/PestFinder'
import Services from '../components/Services'
import PricingRange from '../components/PricingRange'
import WhyChoose from '../components/WhyChoose'
import { AMC, IPM, Process, Safety, Sectors } from '../components/Sections'
import { Areas, Band, Contact, FAQ } from '../components/Contact'
import GmbSection from '../components/GmbSection'
import { HomeContentProvider, useHomeSection } from '../context/HomeContent'
import { useCountUp, useReveal } from '../hooks'
import JsonLd from '../seo/JsonLd'
import SeoHead from '../seo/SeoHead'
import { HOME_FAQS, HOME_META, buildHomeSchemas } from '../seo/homePageSeo'

function HomeSections() {
  const { loading } = useHomeSection('hero')
  const { data: faqData } = useHomeSection('faq', {
    items: HOME_FAQS.map((item) => ({ q: item.q, a: `<p>${item.a}</p>` })),
  })
  useReveal(!loading)
  useCountUp(!loading)
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.hash])

  const schemas = useMemo(() => {
    const items =
      faqData?.items?.length > 0
        ? faqData.items.map((item) => ({ q: item.q, a: item.a }))
        : HOME_FAQS
    return buildHomeSchemas(items)
  }, [faqData])

  return (
    <>
      <SeoHead
        title={HOME_META.title}
        description={HOME_META.description}
        path={HOME_META.path}
        image={HOME_META.image}
        keywords={HOME_META.keywords}
      />
      <JsonLd id="home-seo-ld" data={schemas} />

      <Hero />
      <Ticker />
      <Stats />
      <TrustIntro />
      <PestFinder />
      <Services />
      <PricingRange />
      <Sectors />
      <WhyChoose />
      <IPM />
      <Process />
      <AMC />
      <Safety />
      <Areas />
      <FAQ />
      <GmbSection variant="home" />
      <Contact />
      <Band />
    </>
  )
}

export default function Home() {
  return (
    <HomeContentProvider>
      <HomeSections />
    </HomeContentProvider>
  )
}

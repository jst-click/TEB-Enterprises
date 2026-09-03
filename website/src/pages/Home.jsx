import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero, Stats, Ticker } from '../components/Hero'
import PestFinder from '../components/PestFinder'
import Services from '../components/Services'
import { AMC, IPM, Process, Safety, Sectors } from '../components/Sections'
import { Areas, Band, Contact, FAQ } from '../components/Contact'
import { useCountUp, useReveal } from '../hooks'

export default function Home() {
  useReveal()
  useCountUp()
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

  return (
    <>
      <Hero />
      <Ticker />
      <Stats />
      <PestFinder />
      <Services />
      <Sectors />
      <IPM />
      <Process />
      <AMC />
      <Safety />
      <Areas />
      <FAQ />
      <Contact />
      <Band />
    </>
  )
}

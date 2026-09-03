import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { getNavFlags } from '../api'
import { SITE } from '../data/content'
import { useScrollChrome } from '../hooks'

const ANCHORS = [
  { href: '/#pests', label: 'Pests' },
  { href: '/#services', label: 'Services' },
  { href: '/#sectors', label: 'Sectors' },
  { href: '/#ipm', label: 'IPM' },
  { href: '/#process', label: 'Process' },
  { href: '/#amc', label: 'AMC' },
  { href: '/#areas', label: 'Areas' },
  { href: '/#faq', label: 'FAQ' },
]

export default function Layout({ children }) {
  const { stuck, progress } = useScrollChrome()
  const [open, setOpen] = useState(false)
  const [navFlags, setNavFlags] = useState({ show_gallery: false, show_blogs: false })
  const location = useLocation()

  useEffect(() => {
    getNavFlags().then(setNavFlags).catch(() => {})
  }, [location.pathname])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  const dynamicLinks = [
    ...(navFlags.show_gallery ? [{ href: '/gallery', label: 'Gallery', route: true }] : []),
    ...(navFlags.show_blogs ? [{ href: '/blogs', label: 'Blogs', route: true }] : []),
  ]

  return (
    <>
      <div id="prog" style={{ width: `${progress}%` }} />

      <div className="topbar">
        <div className="wrap">
          <div>
            <span className="dot" />
            Serving Bengaluru · {SITE.hours}
          </div>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href={`mailto:${SITE.salesEmail}`}>{SITE.salesEmail}</a>
            <span style={{ opacity: 0.55 }}>GSTIN {SITE.gstin}</span>
          </div>
        </div>
      </div>

      <header className={`nav${stuck ? ' stuck' : ''}`} id="nav">
        <div className="wrap">
          <Link className="brand" to="/">
            <img src="/logo.png" alt="TEB Enterprises logo" />
            <div>
              <b>{SITE.name}</b>
              <span>{SITE.tagline}</span>
            </div>
          </Link>
          <nav className="navlinks">
            {ANCHORS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
            {dynamicLinks.map((l) => (
              <NavLink key={l.href} to={l.href}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <a className="btn btn--orange" href="/#contact">
            Book an inspection <span className="arw">→</span>
          </a>
          <button
            className={`burger${open ? ' open' : ''}`}
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className={`drawer${open ? ' show' : ''}`}>
          <div className="wrap">
            {ANCHORS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            {dynamicLinks.map((l) => (
              <Link key={l.href} to={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <a className="btn btn--orange" href="/#contact" onClick={() => setOpen(false)}>
              Book an inspection
            </a>
          </div>
        </div>
      </header>

      {children}

      <footer>
        <div className="wrap">
          <div className="fgrid">
            <div>
              <div className="fchip">
                <img src="/logo.png" alt="TEB Enterprises" />
              </div>
              <p style={{ fontSize: '.92rem', maxWidth: '36ch' }}>
                TEB Enterprises — Team Experts Bangalore Enterprises — provides complete pest-control
                solutions for homes, apartments, offices, industries, hospitals, hotels, restaurants,
                warehouses, retail establishments, educational institutions and commercial facilities
                across Bengaluru.
              </p>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li><a href="/#pests">Cockroach control</a></li>
                <li><a href="/#pests">Termite treatment</a></li>
                <li><a href="/#pests">Bedbug treatment</a></li>
                <li><a href="/#pests">Rodent control</a></li>
                <li><a href="/#pests">Mosquito management</a></li>
                <li><a href="/#pests">Ant &amp; fly control</a></li>
                <li><a href="/#amc">Annual contracts</a></li>
                {navFlags.show_gallery && (
                  <li><Link to="/gallery">Gallery</Link></li>
                )}
                {navFlags.show_blogs && (
                  <li><Link to="/blogs">Blogs</Link></li>
                )}
              </ul>
            </div>
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="/#services">Residential services</a></li>
                <li><a href="/#services">Commercial services</a></li>
                <li><a href="/#sectors">Sectors we serve</a></li>
                <li><a href="/#ipm">Integrated Pest Management</a></li>
                <li><a href="/#process">Our process</a></li>
                <li><a href="/#safety">Safety instructions</a></li>
                <li><a href="/#areas">Service areas</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>{SITE.contactPerson}</li>
                <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
                <li><a href={SITE.phone2Href}>{SITE.phone2}</a></li>
                <li><a href={`mailto:${SITE.salesEmail}`}>{SITE.salesEmail}</a></li>
                <li>
                  <a href={SITE.website} target="_blank" rel="noopener noreferrer">
                    www.teamcleaningexperts.in
                  </a>
                </li>
                <li style={{ opacity: 0.6 }}>GSTIN {SITE.gstin}</li>
              </ul>
            </div>
          </div>
          <div className="fbot">
            <span>© {new Date().getFullYear()} TEB Enterprises. All rights reserved.</span>
            <span>Safe spaces · Expert protection · Lasting results</span>
          </div>
        </div>
      </footer>

      <nav className="mobbar" aria-label="Quick contact">
        <a href={SITE.phoneHref}>Call</a>
        <a className="wa" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <a href="/#contact">Get a quote</a>
      </nav>
    </>
  )
}

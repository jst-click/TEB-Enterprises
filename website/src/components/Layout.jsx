import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { getNavFlags } from '../api'
import { EnquiryProvider, useEnquiry } from '../context/EnquiryContext'
import { SITE } from '../data/content'
import { useScrollChrome } from '../hooks'
import EnquiryModal from './EnquiryModal'

const SERVICE_LINKS = [
  { href: '/services', label: 'All services' },
  { href: '/services?category=pest', label: 'Pest services' },
  { href: '/services?category=residential', label: 'Residential' },
  { href: '/services?category=commercial', label: 'Commercial' },
  { href: '/services?category=amc', label: 'AMC' },
  { href: '/services?category=location', label: 'Locations' },
]

const ANCHORS = [
  { href: '/#pests', label: 'Pests' },
  { href: '/services', label: 'Services', dropdown: SERVICE_LINKS },
  { href: '/#sectors', label: 'Sectors' },
  { href: '/#ipm', label: 'IPM' },
  { href: '/#process', label: 'Process' },
  { href: '/#amc', label: 'AMC' },
  { href: '/#areas', label: 'Areas' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contact', label: 'Contact' },
]

function LayoutInner({ children }) {
  const { stuck, progress } = useScrollChrome()
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false)
  const [navFlags, setNavFlags] = useState({ show_gallery: false, show_blogs: false })
  const location = useLocation()
  const { openEnquiry } = useEnquiry()
  const dropRef = useRef(null)

  useEffect(() => {
    getNavFlags().then(setNavFlags).catch(() => {})
  }, [location.pathname])

  useEffect(() => {
    setOpen(false)
    setServicesOpen(false)
    setServicesMobileOpen(false)
  }, [location.pathname, location.hash, location.search])

  useEffect(() => {
    if (!servicesOpen) return undefined
    const onPointerDown = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setServicesOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setServicesOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [servicesOpen])

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
            {ANCHORS.map((l) =>
              l.dropdown ? (
                <div
                  key={l.href}
                  className={`navdrop${servicesOpen ? ' open' : ''}`}
                  ref={dropRef}
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    className="navdrop__btn"
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((v) => !v)}
                  >
                    {l.label}
                    <svg className="navdrop__chev" viewBox="0 0 12 8" aria-hidden="true">
                      <path d="M1 1.5L6 6.5L11 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="navdrop__menu" role="menu">
                    <div className="navdrop__menu-inner">
                      {l.dropdown.map((item) => (
                        <Link key={item.href + item.label} to={item.href} role="menuitem" onClick={() => setServicesOpen(false)}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : l.route ? (
                <NavLink key={l.href} to={l.href}>
                  {l.label}
                </NavLink>
              ) : (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ),
            )}
            {dynamicLinks.map((l) => (
              <NavLink key={l.href} to={l.href}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <button type="button" className="btn btn--orange" onClick={() => openEnquiry()}>
            Book an inspection <span className="arw">→</span>
          </button>
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
            {ANCHORS.map((l) =>
              l.dropdown ? (
                <div key={l.href} className={`drawer-drop${servicesMobileOpen ? ' open' : ''}`}>
                  <button
                    type="button"
                    className="drawer-drop__btn"
                    aria-expanded={servicesMobileOpen}
                    onClick={() => setServicesMobileOpen((v) => !v)}
                  >
                    {l.label}
                    <svg className="navdrop__chev" viewBox="0 0 12 8" aria-hidden="true">
                      <path d="M1 1.5L6 6.5L11 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {servicesMobileOpen && (
                    <div className="drawer-drop__menu">
                      {l.dropdown.map((item) => (
                        <Link key={item.href + item.label} to={item.href} onClick={() => setOpen(false)}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : l.route ? (
                <Link key={l.href} to={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              ),
            )}
            {dynamicLinks.map((l) => (
              <Link key={l.href} to={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              className="btn btn--orange"
              onClick={() => {
                setOpen(false)
                openEnquiry()
              }}
            >
              Book an inspection
            </button>
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
              <div className="fsocial" aria-label="Social media">
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M24 12.07C24 5.41 18.63.04 12 .04S0 5.41 0 12.07C0 18.08 4.39 23.05 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.56-4.7 1.32 0 2.7.24 2.7.24v2.97h-1.52c-1.5 0-1.96.93-1.96 1.89v2.26h3.34l-.53 3.49h-2.81V24C19.61 23.05 24 18.08 24 12.07z"
                    />
                  </svg>
                </a>
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.69 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="fbot">
            <span>© {new Date().getFullYear()} TEB Enterprises. All rights reserved.</span>
            <span>Safe spaces · Expert protection · Lasting results</span>
          </div>
        </div>
      </footer>

      <div className="float-contact" aria-label="Quick contact">
        <a
          className="float-contact__btn float-contact__btn--wa"
          href={`https://wa.me/${SITE.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          title="WhatsApp"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
          </svg>
        </a>
        <a
          className="float-contact__btn float-contact__btn--call"
          href={SITE.phoneHref}
          aria-label={`Call ${SITE.phone}`}
          title="Call us"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.4 21 3 13.6 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.02l-2.2 2.19z"
            />
          </svg>
        </a>
      </div>

      <nav className="mobbar" aria-label="Quick contact">
        <a href={SITE.phoneHref}>Call</a>
        <a className="wa" href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        <button type="button" onClick={() => openEnquiry()}>Get a quote</button>
      </nav>

      <EnquiryModal />
    </>
  )
}

export default function Layout({ children }) {
  return (
    <EnquiryProvider>
      <LayoutInner>{children}</LayoutInner>
    </EnquiryProvider>
  )
}

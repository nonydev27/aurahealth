import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { BrandLogo } from './BrandLogo'
import './DynamicIslandNav.css'

const HOME_SECTIONS = [
  { id: 'top', label: 'Home', href: '#top' },
  { id: 'how', label: 'How it works', href: '#how' },
  { id: 'languages', label: 'Languages', href: '#languages' },
  { id: 'care', label: 'Urgent care', href: '#care' },
  { id: 'legal', label: 'Disclaimer', href: '#legal' },
]

export function DynamicIslandNav({ activeSection = 'top', scrolled = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { isAuthenticated, logout, user } = useAuth()

  function scrollToHash(e, href) {
    if (!href.startsWith('#')) return
    e.preventDefault()
    const id = href.slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header
      className={`island-host${scrolled ? ' island-host--scrolled' : ''}${isHome ? ' island-host--home' : ''}`}
    >
      <div
        className={`dynamic-island${menuOpen ? ' dynamic-island--open' : ''}${scrolled ? ' dynamic-island--compact' : ''}`}
      >
        <NavLink
          to="/"
          className="island-brand"
          end
          onClick={() => setMenuOpen(false)}
        >
          <BrandLogo size="sm" />
          <span className="island-brand-text brand-font">Aura Health</span>
        </NavLink>

        <button
          type="button"
          className={`island-burger${menuOpen ? ' island-burger--open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="island-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
          <span className="sr-only">Menu</span>
        </button>

        <nav id="island-nav" className="island-nav" aria-label="Main">
          {isHome
            ? HOME_SECTIONS.map(({ id, label, href }) => (
                <a
                  key={id}
                  href={href}
                  className={`island-pill${activeSection === id ? ' island-pill--active' : ''}`}
                  onClick={(e) => scrollToHash(e, href)}
                >
                  {label}
                </a>
              ))
            : (
                <NavLink
                  to="/#top"
                  className="island-pill"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </NavLink>
              )}

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `island-pill island-pill--accent${isActive ? ' island-pill--active' : ''}`
            }
            onClick={() => setMenuOpen(false)}
          >
            Chat
          </NavLink>

          {isAuthenticated ? (
            <>
              <span className="island-user" title={user?.email}>
                {user?.name?.split(' ')[0] || user?.email}
              </span>
              <button type="button" className="island-pill island-pill--ghost" onClick={logout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/auth/sign-in"
                className={({ isActive }) =>
                  `island-pill island-pill--ghost${isActive ? ' island-pill--active' : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                Sign in
              </NavLink>
              <NavLink
                to="/auth/sign-up"
                className="island-pill island-pill--cta"
                onClick={() => setMenuOpen(false)}
              >
                Sign up
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

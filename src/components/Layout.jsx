import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { BrandLogo } from './BrandLogo'
import { useAuth } from '../context/AuthContext'
import './Layout.css'

const nav = [
  { to: '/', label: 'Home', end: true },
  { to: '/chat', label: 'Chat' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/emergency', label: 'Urgent care' },
  { to: '/disclaimer', label: 'Disclaimer' },
]

export function Layout() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, logout, user } = useAuth()

  return (
    <div className="shell">
      <header className="topbar">
        <NavLink to="/" className="brand" end onClick={() => setOpen(false)}>
          <BrandLogo size="sm" />
          <span className="brand-text brand-font">Aura Health</span>
        </NavLink>

        <button
          type="button"
          className={`menu-btn${open ? ' menu-btn--open' : ''}`}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="menu-btn__bar" />
          <span className="menu-btn__bar" />
          <span className="menu-btn__bar" />
          <span className="sr-only">Menu</span>
        </button>

        <nav id="site-nav" className={`nav${open ? ' nav--open' : ''}`} aria-label="Main">
          {nav.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={Boolean(end)}
              className={({ isActive }) =>
                `nav-link${isActive ? ' nav-link--active' : ''}`
              }
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <span className="nav-user" title={user?.email}>
                {user?.name || user?.email}
              </span>
              <button type="button" className="nav-link nav-link--btn" onClick={logout}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/auth/sign-in"
                className={({ isActive }) =>
                  `nav-link${isActive ? ' nav-link--active' : ''}`
                }
                onClick={() => setOpen(false)}
              >
                Sign in
              </NavLink>
              <NavLink
                to="/auth/sign-up"
                className="nav-cta"
                onClick={() => setOpen(false)}
              >
                Sign up
              </NavLink>
            </>
          )}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>
          Aura Health shares general wellness information only — not medical
          diagnosis or treatment. Always consult a licensed professional.
        </p>
      </footer>
    </div>
  )
}

import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/voice', label: 'Voice care' },
  { to: '/chat', label: 'Text care' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/emergency', label: 'When to seek care' },
  { to: '/disclaimer', label: 'Disclaimer' },
]

export function Layout() {
  return (
    <div className="shell">
      <header className="topbar glass">
        <NavLink to="/" className="brand brand-font" end>
          <span className="brand-mark" aria-hidden />
          AuraHealth
        </NavLink>
        <nav className="nav" aria-label="Main">
          {nav.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link${isActive ? ' nav-link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer glass">
        <p>
          AuraHealth provides general wellness information only — not medical
          advice, diagnosis, or treatment.
        </p>
      </footer>
    </div>
  )
}

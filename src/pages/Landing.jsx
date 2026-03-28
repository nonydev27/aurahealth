import { useEffect } from 'react'
import { Link, useOutletContext, useLocation } from 'react-router-dom'
import { GHANA_LANGUAGES_SHOWCASE } from '../data/ghanaLanguages'
import { useScrollSpySections } from '../hooks/useScrollSpySections'
import '../styles/ui.css'
import './Landing.css'

/** Unsplash — healthcare & community imagery (free to use per Unsplash licence). */
const HERO_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=85&auto=format&fit=crop',
    alt: 'Bright, modern hospital corridor suggesting accessible care',
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=85&auto=format&fit=crop',
    alt: 'Clinician and patient in conversation during a consultation',
  },
  {
    src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=900&q=85&auto=format&fit=crop',
    alt: 'Expectant mother smiling gently, representing maternal wellbeing support',
  },

]

const FLOW_STEPS = [
  {
    n: '01',
    title: 'Speak or Type',
    body: 'Use everyday words in Twi, Ga, Adangbe, Ewe, or other Ghanaian languages or English.',
  },
  {
    n: '02',
    title: 'Aura AI → English',
    body: 'Non-English messages are translated to English so aura health can reason safely and consistently.',
  },
  {
    n: '03',
    title: 'Aura Health Guidance',
    body: 'You receive careful, non-diagnostic guidance: self-care ideas, red flags, and when to seek in-person or emergency care.',
  },
  {
    n: '04',
    title: 'English → You',
    body: 'Answers are translated back through Khaya when needed, so the guidance lands in the language you used.',
  },
]

export function Landing() {
  const ctx = useOutletContext() || {}
  const onHomeSectionChange =
      typeof ctx.onHomeSectionChange === 'function'
        ? ctx.onHomeSectionChange
        : () => {}
  const location = useLocation()

  useScrollSpySections(onHomeSectionChange)

  useEffect(() => {
    if (location.pathname !== '/') return
    const hash = location.hash?.replace(/^#/, '')
    if (!hash) return
    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
    return () => window.clearTimeout(t)
  }, [location.hash, location.pathname])

  return (
    <div className="home-scroll">
      <section id="top" className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="landing-eyebrow">
              Aura Health · companion · Made for Ghana & beyond
            </p>
            <h1 className="brand-font hero-title">
              Aura Health: Care that meets you in your language.
            </h1>
            <p className="hero-lead">
              A medical aid experience powered by AI and African language tech: The system enables you to
              ask health questions in Twi, Ga, Adangbe, Ewe, and more ghanaian languages. 
            </p>
            <div className="landing-cta">
              <Link to="/auth/sign-up" className="btn btn--primary">
                Create account
              </Link>
              <Link to="/auth/sign-in" className="btn btn--ghost">
                Sign in
              </Link>
              <Link to="/chat" className="btn btn--ghost">
                Open chat
              </Link>
            </div>
          </div>
          <div className="hero-collage" aria-hidden="false">
            {HERO_IMAGES.map((img, i) => (
              <figure key={img.src} className={`hero-fig hero-fig--${i + 1}`}>
                <img src={img.src} alt={img.alt} loading={i === 0 ? 'eager' : 'lazy'} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="section-block section-how">
        <div className="section-inner">
          <h2 className="section-title brand-font capitalize">How It Works</h2>
          <p className="section-intro">
            One smooth pipeline: your language, clinical-safety-first reasoning in
            English, then back to you — with zero hype and clear limits.
          </p>
          <ol className="flow-grid">
            {FLOW_STEPS.map((step) => (
              <li key={step.n} className="flow-card card">
                <span className="flow-badge">{step.n}</span>
                <h3 className="brand-font flow-card-title">{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="languages" className="section-block section-lang">
        <div className="section-inner">
          <h2 className="section-title brand-font">Languages We Celebrate</h2>
          <p className="section-intro">
            Aura Health is designed around for Ghanaian voices such as Twi, Ga,
            Adangbe (Dangme), Ewe, and neighbours on the map below.
          </p>
          <div className="lang-grid">
            {GHANA_LANGUAGES_SHOWCASE.map((L) => (
              <article key={L.name} className="lang-card">
                <span className="lang-chip">{L.tag}</span>
                <h3 className="brand-font lang-name">{L.name}</h3>
                <p className="lang-detail">{L.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="care" className="section-block section-care">
        <div className="section-inner section-care-inner card">
          <h2 className="section-title brand-font">When to seek urgent care</h2>
          <p className="section-intro">
            Aura Health cannot see you, test you, or prescribe. Use emergency
            services for breathing trouble, severe chest pain, stroke signs,
            heavy bleeding, or anything that feels immediately life-threatening.
          </p>
          <ul className="care-list">
            <li>Trouble breathing, choking, or blue lips</li>
            <li>New confusion, fainting, or worst headache of your life</li>
            <li>Possible stroke: face droop, arm weakness, speech trouble</li>
            <li>Severe pain, trauma, or pregnancy bleeding with pain</li>
          </ul>
          <p className="care-foot">
            See our{' '}
            <Link to="/emergency" className="inline-link">
              full urgent-care page
            </Link>{' '}
            or jump to your{' '}
            <Link to="/chat" className="inline-link">
              consult room
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="legal" className="section-block section-legal">
        <div className="section-inner card legal-card">
          <h2 className="section-title brand-font">Disclaimer</h2>
          <p>
            Information here is educational, not a diagnosis or treatment plan.
            No doctor–patient relationship is formed. If you are unsure, choose
            the safer path and speak with a licensed clinician or emergency
            service in your area.
          </p>
          <p>
            <Link to="/disclaimer" className="inline-link">
              Read the full disclaimer →
            </Link>
          </p>
        </div>
      </section>

      <footer className="site-footer" id="footer">
        <div className="site-footer__glow" aria-hidden />
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <span className="site-footer__mark brand-font">Aura Health</span>
            <p>
              Multilingual health information assistant — Khaya for translation &
              ASR, Claude for careful guidance. Built for Ghana, open to the
              world.
            </p>
          </div>
          <div className="site-footer__cols">
            <div>
              <h4 className="site-footer__heading brand-font">Explore</h4>
              <a href="#top">Home</a>
              <a href="#how">How it works</a>
              <a href="#languages">Languages</a>
              <a href="#care">Urgent care</a>
              <Link to="/chat">Chat</Link>
            </div>
            <div>
              <h4 className="site-footer__heading brand-font">Account</h4>
              <Link to="/auth/sign-in">Sign in</Link>
              <Link to="/auth/sign-up">Sign up</Link>
            </div>
            <div>
              <h4 className="site-footer__heading brand-font">Trust</h4>
              <Link to="/disclaimer">Disclaimer</Link>
              <Link to="/emergency">Emergency guide</Link>
            </div>
          </div>
          <div className="site-footer__langs" aria-label="Highlighted languages">
            {['Twi', 'Ga', 'Adangbe', 'Ewe', 'Fante', 'Dagbani', 'Hausa', 'English'].map(
              (x) => (
                <span key={x} className="site-footer__pill">
                  {x}
                </span>
              ),
            )}
          </div>
          <p className="site-footer__copy">
            © {new Date().getFullYear()} Aura Health. Not a substitute for
            professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  )
}

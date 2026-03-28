import { Link } from 'react-router-dom'
import { Hero3D } from '../components/Hero3D'
import '../styles/ui.css'
import './Landing.css'

export function Landing() {
  return (
    <div className="landing">
      <section className="landing-hero">
        <div className="landing-3d">
          <Hero3D className="landing-canvas" />
          <div className="landing-hero__fade" />
        </div>
        <div className="landing-hero__copy">
          <p className="landing-eyebrow">AI-guided · Multilingual · Voice-first</p>
          <h1 className="brand-font landing-title">
            Care that listens in your language.
          </h1>
          <p className="landing-sub">
            Describe how you feel by voice or text. AuraHealth uses NLP to
            understand your concern, reasons with a clinical-safety mindset, and
            responds with practical guidance — always urging professional care
            when it matters.
          </p>
          <div className="landing-cta">
            <Link to="/voice" className="btn btn--primary">
              Start voice session
            </Link>
            <Link to="/chat" className="btn btn--ghost">
              Type instead
            </Link>
          </div>
          <ul className="landing-points">
            <li>
              <span className="dot" aria-hidden />
              Speech-to-text → AI reasoning → text-to-speech in your dialect
            </li>
            <li>
              <span className="dot" aria-hidden />
              Self-care ideas, red flags, and when to call a clinician or
              emergency line
            </li>
            <li>
              <span className="dot" aria-hidden />
              Privacy-first prototype: run the local API with your own model key
            </li>
          </ul>
        </div>
      </section>

      <section className="page landing-strip">
        <div className="strip-inner">
          <div>
            <h2 className="brand-font strip-title">Built for clarity</h2>
            <p className="strip-text">
              Layered glass UI, deep teal palette, and a responsive 3D hero
              set the tone: calm, precise, and serious about safety.
            </p>
          </div>
          <div className="strip-cards">
            <div className="mini-card">
              <h3 className="brand-font">Local language</h3>
              <p>Pick your speech locale; answers follow your language.</p>
            </div>
            <div className="mini-card">
              <h3 className="brand-font">Voice loop</h3>
              <p>Hands-free intake with optional read-aloud responses.</p>
            </div>
            <div className="mini-card">
              <h3 className="brand-font">Not a diagnosis</h3>
              <p>
                Educational guidance only —{' '}
                <Link to="/disclaimer">read the disclaimer</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

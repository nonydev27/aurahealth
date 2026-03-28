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
          <div className="landing-hero__wash" />
        </div>
        <div className="landing-hero__copy">
          <p className="landing-eyebrow">
            AI + Khaya translation · Claude reasoning · Voice or text
          </p>
          <h1 className="brand-font landing-title">
            Aura Health — care that speaks your language.
          </h1>
          <p className="landing-intro brand-font">
            A medical aid application that uses an Artificial Intelligence–powered
            Natural Language Model to understand users’ health-related questions
            and provide personalized health suggestions.
          </p>
          <p className="landing-sub">
            Describe symptoms or concerns in everyday language — including
            Ghanaian languages like Twi, Ga, Ewe, and more through Khaya AI.
            Your words are translated to English for Claude when needed; answers
            come back in your language. English goes straight to Claude. You get
            possible guidance, basic medical insights, and recommendations such as
            self-care steps or seeking professional attention — never a
            replacement for a clinician.
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
          <ul className="landing-points">
            <li>
              <span className="dot" aria-hidden />
              <strong>Landing</strong> — bilingual story, beating-heart 3D hero,
              responsive navigation.
            </li>
            <li>
              <span className="dot" aria-hidden />
              <strong>Auth</strong> — sign up &amp; sign in to access the consult
              room.
            </li>
            <li>
              <span className="dot" aria-hidden />
              <strong>Chat &amp; audio</strong> — type or upload audio for Khaya
              transcription, then the full Claude + Khaya loop.
            </li>
          </ul>
        </div>
      </section>

      <section className="page landing-strip">
        <div className="strip-inner">
          <div>
            <h2 className="brand-font strip-title">Why Aura Health</h2>
            <p className="strip-text">
              White-first UI with your green primary and deeper accent keeps the
              product feeling clinical, calm, and trustworthy — while the pulsing
              logo and heart animation stay human and relatable.
            </p>
          </div>
          <div className="strip-cards">
            <div className="mini-card">
              <h3 className="brand-font">Khaya → Claude → Khaya</h3>
              <p>
                Local languages hit Khaya for English; Claude replies in English;
                Khaya returns your answer in your dialect when needed.
              </p>
            </div>
            <div className="mini-card">
              <h3 className="brand-font">Keys you control</h3>
              <p>
                <code className="code-inline">ANTHROPIC_API_KEY</code> and{' '}
                <code className="code-inline">KHAYA_API_KEY</code> stay on the
                server — never exposed in the browser.
              </p>
            </div>
            <div className="mini-card">
              <h3 className="brand-font">Safety first</h3>
              <p>
                Educational guidance only —{' '}
                <Link to="/disclaimer">read the disclaimer</Link> and{' '}
                <Link to="/emergency">urgent care signs</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

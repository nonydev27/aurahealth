import { Link } from 'react-router-dom'
import '../styles/ui.css'
import './ChatMobile.css'

const STEPS = [
  {
    title: 'Download Aura Health',
    text: 'Install the app from the App Store or Google Play when available — the same account you use here carries over.',
  },
  {
    title: 'Choose your language',
    text: 'Set Twi, Ga, Adangbe, Ewe, or English before you start. Voice and text both respect your selection.',
  },
  {
    title: 'Ask in your own words',
    text: 'Describe symptoms or concerns naturally. The app routes through Khaya and our AI stack for careful, non-diagnostic guidance.',
  },
  {
    title: 'Privacy on device',
    text: 'Conversations stay oriented around education and safety — not replacing your clinician or emergency services.',
  },
]

export function ChatCare() {
  return (
    <div className="app-promo">
      <div className="app-promo__intro">
        <p className="app-promo__eyebrow">Mobile-first experience</p>
        <h1 className="app-promo__title brand-font">Use Aura Health on your phone</h1>
        <p className="app-promo__lead">
          Consultations, voice input, and language switching are designed for the
          mobile app. This page is a preview of what you&apos;ll get once you open
          Aura Health on iOS or Android.
        </p>
        <div className="app-promo__stores">
          <span className="app-promo__store app-promo__store--soon">App Store — coming soon</span>
          <span className="app-promo__store app-promo__store--soon">Google Play — coming soon</span>
        </div>
        <Link to="/" className="btn btn--ghost app-promo__back">
          ← Back to home
        </Link>
      </div>

      <div className="app-promo__device-wrap">
        <div className="app-promo__device" aria-hidden="false">
          <div className="device-frame">
            <div className="device-notch" />
            <header className="device-app-header">
              <span className="device-app-title brand-font">Aura Health</span>
              <span className="device-app-badge">Twi</span>
            </header>
            <div className="device-chat">
              <div className="device-bubble device-bubble--user">
                Me ma me tirimu anan anadwo yi; me feeling feverish.
              </div>
              <div className="device-bubble device-bubble--ai">
                <span className="device-bubble-label">Guidance</span>
                I’m not a doctor — this is general information. Rest, fluids, and
                monitor your temperature. Seek urgent care for confusion, trouble
                breathing, or a rash with fever.
              </div>
              <div className="device-bubble device-bubble--user">
                Meda wo ase. Sε me phone so na me nyinaa ayε.
              </div>
            </div>
            <div className="device-input-bar">
              <button type="button" className="device-mic" aria-label="Voice input">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
                </svg>
              </button>
              <div className="device-input-fake">Ask anything…</div>
              <span className="device-send">↑</span>
            </div>
          </div>
          <p className="device-caption">Illustrative mock — not a live session.</p>
        </div>

        <ul className="app-promo__steps">
          {STEPS.map((s) => (
            <li key={s.title} className="app-promo__step card">
              <h2 className="brand-font app-promo__step-title">{s.title}</h2>
              <p>{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

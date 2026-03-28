import { Link } from 'react-router-dom'
import '../styles/ui.css'
import './StaticPages.css'

export function HowItWorks() {
  return (
    <div className="page static">
      <h1 className="page-title brand-font">How AuraHealth flows</h1>
      <p className="page-lead">
        Three layers keep things grounded: your voice &amp; language, the
        browser speech APIs, and a safety-tuned model behind a small Node API.
      </p>
      <ol className="flow-list">
        <li className="card flow-step">
          <span className="flow-num">01</span>
          <div>
            <h2 className="brand-font static-h2">Capture &amp; language</h2>
            <p>
              Pick a locale so speech recognition and synthesis match your
              dialect. On the voice page we stream text from the mic; text mode
              skips this step.
            </p>
          </div>
        </li>
        <li className="card flow-step">
          <span className="flow-num">02</span>
          <div>
            <h2 className="brand-font static-h2">Structured prompting</h2>
            <p>
              We send your wording plus a locale hint to the API. The system
              prompt forces same-language replies, red-flag awareness, and
              explicit encouragement to seek clinicians when appropriate.
            </p>
          </div>
        </li>
        <li className="card flow-step">
          <span className="flow-num">03</span>
          <div>
            <h2 className="brand-font static-h2">Respond &amp; narrate</h2>
            <p>
              Guidance renders in the UI; optional text-to-speech reads it in
              your selected voice language. You stay in control — stop audio
              anytime.
            </p>
          </div>
        </li>
      </ol>
      <p className="static-foot">
        Dev tip: run <code className="inline-code">npm run dev:full</code> and
        export <code className="inline-code">ANTHROPIC_API_KEY</code> for live
        Claude answers. See <Link to="/disclaimer">disclaimer</Link>.
      </p>
    </div>
  )
}

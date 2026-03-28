import { Link } from 'react-router-dom'
import '../styles/ui.css'
import './StaticPages.css'

export function HowItWorks() {
  return (
    <div className="page static">
      <h1 className="page-title brand-font">How Aura Health flows</h1>
      <p className="page-lead">
        Your question moves through Khaya for African languages, Claude for
        medical-safety guidance in English, then Khaya again so you read or
        listen in your own language — unless you already wrote in English.
      </p>
      <ol className="flow-list">
        <li className="card flow-step">
          <span className="flow-num">01</span>
          <div>
            <h2 className="brand-font static-h2">Speak or type</h2>
            <p>
              Pick Twi, Ga, Ewe, and more — or English. Use the browser mic for
              English where it is reliable; for other languages upload audio so
              Khaya ASR can transcribe (see Khaya&apos;s supported formats).
            </p>
          </div>
        </li>
        <li className="card flow-step">
          <span className="flow-num">02</span>
          <div>
            <h2 className="brand-font static-h2">Khaya → English</h2>
            <p>
              If you are not in English, the API calls Khaya&apos;s translate
              endpoint (for example <code className="inline-code">tw-en</code>)
              so Claude always sees an English user message.
            </p>
          </div>
        </li>
        <li className="card flow-step">
          <span className="flow-num">03</span>
          <div>
            <h2 className="brand-font static-h2">Claude in English</h2>
            <p>
              Claude replies with possible guidance, basic education, self-care
              ideas when appropriate, red flags, and when to seek professional or
              urgent care — always in English at this stage.
            </p>
          </div>
        </li>
        <li className="card flow-step">
          <span className="flow-num">04</span>
          <div>
            <h2 className="brand-font static-h2">Khaya → you</h2>
            <p>
              For non-English users the answer is translated back (for example{' '}
              <code className="inline-code">en-tw</code>). English users receive
              the response as-is. Optional text-to-speech uses your language
              hint when the browser supports it.
            </p>
          </div>
        </li>
      </ol>
      <p className="static-foot">
        Run <code className="inline-code">npm run dev:full</code> with{' '}
        <code className="inline-code">ANTHROPIC_API_KEY</code> and{' '}
        <code className="inline-code">KHAYA_API_KEY</code> for end-to-end
        translation. Read the <Link to="/disclaimer">disclaimer</Link>.
      </p>
    </div>
  )
}

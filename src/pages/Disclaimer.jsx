import { Link } from 'react-router-dom'
import '../styles/ui.css'
import './StaticPages.css'

export function Disclaimer() {
  return (
    <div className="page static">
      <h1 className="page-title brand-font">Disclaimer &amp; safety</h1>
      <p className="page-lead">
        AuraHealth is an educational assistant. It does not replace licensed
        clinicians or emergency services.
      </p>
      <div className="card static-card">
        <ul className="static-list">
          <li>
            <strong>Not medical advice.</strong> Information is general and may
            be incomplete for your situation.
          </li>
          <li>
            <strong>No doctor–patient relationship.</strong> Using this app
            does not create a duty of care.
          </li>
          <li>
            <strong>Emergencies.</strong> If you believe you or someone else is
            in danger, call your local emergency number immediately — do not
            wait for an AI reply.
          </li>
          <li>
            <strong>Speech &amp; AI errors.</strong> Voice transcription and
            models can misunderstand; verify anything important with a
            professional.
          </li>
          <li>
            <strong>Data handling.</strong> This hackathon build sends your text
            to a local API; configure hosting responsibly and never reuse secrets
            in the browser.
          </li>
        </ul>
        <p>
          Continue to{' '}
          <Link to="/emergency">when to seek urgent care</Link> or{' '}
          <Link to="/voice">voice care</Link>.
        </p>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { FormattedReply } from '../components/FormattedReply'
import { fetchHealthAdvice } from '../lib/healthApi'
import { SPEECH_LANGUAGES } from '../lib/languages'
import { speakText, stopSpeaking } from '../lib/speech'
import '../styles/ui.css'
import './Consult.css'

export function ChatCare() {
  const [lang, setLang] = useState('en-US')
  const [message, setMessage] = useState('')
  const [reply, setReply] = useState('')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [apiNote, setApiNote] = useState(null)
  const [errMsg, setErrMsg] = useState(null)

  async function handleSend() {
    const trimmed = message.trim()
    if (!trimmed) return
    setLoading(true)
    setErrMsg(null)
    stopSpeaking()
    try {
      const data = await fetchHealthAdvice({
        message: trimmed,
        languageHint: lang,
        history,
      })
      setReply(data.reply || '')
      if (data.notice) setApiNote(data.notice)
      if (data.demo) setApiNote((n) => n || 'Demo / fallback mode active.')
      setHistory((h) => [
        ...h,
        { role: 'user', content: trimmed },
        { role: 'assistant', content: data.reply || '' },
      ])
      setMessage('')
    } catch (e) {
      setErrMsg(e.message || 'Could not reach the guidance service.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page consult">
      <p className="badge">Text · Multilingual context</p>
      <h1 className="page-title brand-font">Type your concern</h1>
      <p className="page-lead">
        Same AI pipeline as voice mode — without the microphone. Keep
        follow-ups in-thread; the model sees recent messages for continuity.
        Responses can still be read aloud in your selected language.
      </p>

      <div className="card consult-card">
        <div className="consult-toolbar">
          <div className="field-grow">
            <label className="field-label" htmlFor="chat-lang">
              Response language hint
            </label>
            <select
              id="chat-lang"
              className="select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              {SPEECH_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="field-label" htmlFor="chat-msg">
          Your question
        </label>
        <textarea
          id="chat-msg"
          className="textarea"
          placeholder="Example: I’ve had a tension headache for two days after poor sleep…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <p className="hint">Tip: Ctrl / Cmd + Enter to send</p>

        <div className="consult-actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleSend}
            disabled={loading || !message.trim()}
          >
            {loading ? 'Thinking…' : 'Send to AuraHealth'}
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setHistory([])
              setReply('')
              setApiNote(null)
            }}
          >
            Clear thread
          </button>
        </div>

        {errMsg ? <p className="error">{errMsg}</p> : null}
        {apiNote ? <p className="notice">{apiNote}</p> : null}

        <div className="consult-split">
          <div>
            <span className="field-label">Latest guidance</span>
            <div className="bubble bubble--ai">
              {reply ? (
                <FormattedReply text={reply} />
              ) : (
                <span className="muted">Send a message to begin.</span>
              )}
            </div>
            <div className="tts-row">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => reply && speakText(reply, lang)}
                disabled={!reply}
              >
                Read aloud
              </button>
              <button type="button" className="btn btn--ghost" onClick={stopSpeaking}>
                Stop audio
              </button>
            </div>
          </div>
          <div>
            <span className="field-label">Thread memory ({history.length} turns)</span>
            <div className="thread">
              {history.length === 0 ? (
                <p className="muted">No prior turns yet.</p>
              ) : (
                history.map((m, i) => (
                  <div
                    key={`${m.role}-${i}`}
                    className={`thread-row thread-row--${m.role}`}
                  >
                    <strong>{m.role === 'user' ? 'You' : 'AuraHealth'}</strong>
                    <p>{m.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

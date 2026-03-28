import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormattedReply } from '../components/FormattedReply'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { fetchHealthAdvice } from '../lib/healthApi'
import { SPEECH_LANGUAGES } from '../lib/languages'
import { speakText, stopSpeaking } from '../lib/speech'
import '../styles/ui.css'
import './Consult.css'

export function VoiceCare() {
  const [lang, setLang] = useState('en-US')
  const { supported, listening, transcript, error, start, stop } =
    useSpeechRecognition({ lang })
  const [composed, setComposed] = useState('')
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiNote, setApiNote] = useState(null)
  const [errMsg, setErrMsg] = useState(null)

  const userMessage = useMemo(
    () => [composed, transcript].filter(Boolean).join(' ').trim(),
    [composed, transcript],
  )

  async function handleSend() {
    if (!userMessage) return
    setLoading(true)
    setErrMsg(null)
    setApiNote(null)
    stopSpeaking()
    try {
      const data = await fetchHealthAdvice({
        message: userMessage,
        languageHint: lang,
        history: [],
      })
      setReply(data.reply || '')
      if (data.notice) setApiNote(data.notice)
      if (data.demo) setApiNote((n) => n || 'Demo / fallback mode active.')
    } catch (e) {
      setErrMsg(e.message || 'Could not reach the guidance service.')
    } finally {
      setLoading(false)
    }
  }

  function handleSpeakReply() {
    if (reply) speakText(reply, lang)
  }

  return (
    <div className="page consult">
      <p className="badge">Voice recognition · Text-to-speech</p>
      <h1 className="page-title brand-font">Speak naturally</h1>
      <p className="page-lead">
        Use your microphone to describe symptoms or worries in your chosen
        language. We transcribe with the browser, send text to the AI backend,
        then you can listen to the answer aloud. Chrome / Edge recommended for
        best speech support.
      </p>

      <div className="card consult-card">
        <div className="consult-toolbar">
          <div className="field-grow">
            <label className="field-label" htmlFor="voice-lang">
              Language & voice
            </label>
            <select
              id="voice-lang"
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
          {!supported ? (
            <p className="warn">
              Speech recognition is unavailable. Try Chrome desktop or use{' '}
              <Link to="/chat">text care</Link>.
            </p>
          ) : null}
        </div>

        <div className="consult-actions">
          <button
            type="button"
            className={`btn mic-btn ${listening ? 'mic-btn--live' : 'btn--primary'}`}
            onClick={() => (listening ? stop() : start())}
            disabled={!supported}
          >
            <span className="mic-icon" aria-hidden />
            {listening ? 'Stop listening' : 'Start microphone'}
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={handleSend}
            disabled={loading || !userMessage}
          >
            {loading ? 'Thinking…' : 'Get guidance'}
          </button>
        </div>

        {error ? <p className="error">{error}</p> : null}
        {errMsg ? <p className="error">{errMsg}</p> : null}
        {apiNote ? <p className="notice">{apiNote}</p> : null}

        <label className="field-label" htmlFor="voice-extra">
          Optional: type extra detail
        </label>
        <textarea
          id="voice-extra"
          className="textarea"
          placeholder="Add context or edit the transcript before sending…"
          value={composed}
          onChange={(e) => setComposed(e.target.value)}
        />

        <div className="transcript-box">
          <span className="field-label">Live transcript</span>
          <p className="transcript">{transcript || '…'}</p>
        </div>

        <div className="consult-split">
          <div>
            <span className="field-label">Your message (sent)</span>
            <p className="bubble bubble--user">{userMessage || '—'}</p>
          </div>
          <div>
            <span className="field-label">Guidance</span>
            <div className="bubble bubble--ai">
              {reply ? (
                <FormattedReply text={reply} />
              ) : (
                <span className="muted">Awaiting your question…</span>
              )}
            </div>
            <div className="tts-row">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={handleSpeakReply}
                disabled={!reply}
              >
                Read answer aloud
              </button>
              <button type="button" className="btn btn--ghost" onClick={stopSpeaking}>
                Stop audio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

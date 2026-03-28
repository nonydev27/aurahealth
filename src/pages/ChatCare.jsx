import { useCallback, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormattedReply } from '../components/FormattedReply'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { fetchHealthAdvice, transcribeAudio } from '../lib/healthApi'
import { getUserLang, USER_LANGUAGES } from '../lib/userLangs'
import { speakTextForUserLang, stopSpeaking } from '../lib/speech'
import '../styles/ui.css'
import './Consult.css'

export function ChatCare() {
  const [userLang, setUserLang] = useState('en')
  const speechHint = useMemo(
    () => getUserLang(userLang).id === 'en' ? 'en-GB' : 'en-US',
    [userLang],
  )

  const {
    supported,
    listening,
    transcript,
    error: sttError,
    start,
    stop,
    clearTranscript,
  } = useSpeechRecognition({ lang: speechHint })

  const [message, setMessage] = useState('')
  const [thread, setThread] = useState(
    /** @type {{ role: string; text: string }[]} */ ([]),
  )
  const [historyEn, setHistoryEn] = useState(
    /** @type {{ role: string; content: string }[]} */ ([]),
  )

  const [loading, setLoading] = useState(false)
  const [transcribing, setTranscribing] = useState(false)
  const [notices, setNotices] = useState(/** @type {string[]} */ ([]))
  const [errMsg, setErrMsg] = useState(null)
  const fileRef = useRef(null)

  const langMeta = getUserLang(userLang)
  const canKhayaAsr = Boolean(langMeta.khayaAsr)

  const composedMessage = useMemo(() => {
    const t = [message.trim(), transcript.trim()].filter(Boolean).join('\n')
    return t.trim()
  }, [message, transcript])

  const onSend = useCallback(async () => {
    if (!composedMessage) return
    setLoading(true)
    setErrMsg(null)
    setNotices([])
    stopSpeaking()

    const userTurn = composedMessage
    setThread((th) => [...th, { role: 'user', text: userTurn }])
    setMessage('')
    try {
      const data = await fetchHealthAdvice({
        message: userTurn,
        userLang,
        history: historyEn,
      })

      const assistantText = data.reply || ''
      const userEn = data.userMessageEn || userTurn
      const replyEn = data.replyEn || assistantText

      setHistoryEn((h) => [
        ...h,
        { role: 'user', content: String(userEn) },
        { role: 'assistant', content: String(replyEn) },
      ])

      setThread((th) => [...th, { role: 'assistant', text: assistantText }])
      clearTranscript()

      const n = []
      if (data.notice) n.push(data.notice)
      if (Array.isArray(data.notices)) n.push(...data.notices)
      if (data.demo) n.push('Demo or fallback mode may be active — check API keys.')
      setNotices(n)
    } catch (e) {
      setThread((th) => th.slice(0, -1))
      setErrMsg(e.message || 'Request failed.')
    } finally {
      setLoading(false)
    }
  }, [composedMessage, userLang, historyEn, clearTranscript])

  async function onPickAudio(e) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !langMeta.khayaAsr) return
    setTranscribing(true)
    setErrMsg(null)
    try {
      const { text } = await transcribeAudio(file, langMeta.khayaAsr)
      setMessage((m) => (m ? `${m}\n${text}` : text))
    } catch (err) {
      setErrMsg(err.message || 'Transcription failed.')
    } finally {
      setTranscribing(false)
    }
  }

  const lastAssistant = [...thread].reverse().find((m) => m.role === 'assistant')

  return (
    <div className="page consult">
      <p className="badge">Chat · Khaya ↔ Claude · optional audio</p>
      <h1 className="page-title brand-font">Consultation room</h1>
      <p className="page-lead">
        Choose your language. Non-English text is translated to English with
        Khaya before Claude; Claude&apos;s reply is translated back when needed.
        English skips the first hop. Upload audio for supported languages so
        Khaya ASR can transcribe (WAV/PCM works best — check Khaya docs).
      </p>

      <div className="card consult-card">
        <div className="consult-toolbar">
          <div className="field-grow">
            <label className="field-label" htmlFor="chat-user-lang">
              Your language
            </label>
            <select
              id="chat-user-lang"
              className="select"
              value={userLang}
              onChange={(e) => setUserLang(e.target.value)}
            >
              {USER_LANGUAGES.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="consult-split-toolbar">
          <div>
            <span className="field-label">Audio transcription (Khaya ASR)</span>
            <div className="upload-row">
              <input
                ref={fileRef}
                type="file"
                accept="audio/*,.wav"
                className="file-input"
                onChange={onPickAudio}
                disabled={!canKhayaAsr || transcribing}
              />
              {!canKhayaAsr ? (
                <p className="hint-inline">
                  Pick a language with Khaya ASR (e.g. Twi, Ga) to enable upload.
                </p>
              ) : transcribing ? (
                <p className="hint-inline">Transcribing…</p>
              ) : (
                <p className="hint-inline">
                  English: use the mic below or type. Other languages: prefer upload
                  where browser speech is weak.
                </p>
              )}
            </div>
          </div>
          <div>
            <span className="field-label">Browser speech (best for English)</span>
            <div className="consult-actions">
              <button
                type="button"
                className={`btn mic-btn ${listening ? 'mic-btn--live' : 'btn--primary'}`}
                onClick={() => (listening ? stop() : start())}
                disabled={!supported}
              >
                <span className="mic-icon" aria-hidden />
                {listening ? 'Stop' : 'Microphone'}
              </button>
            </div>
            {!supported ? (
              <p className="hint-inline">
                Speech recognition unavailable in this browser. Try Chrome, or{' '}
                <Link to="/auth/sign-in">sign in</Link> from a desktop browser.
              </p>
            ) : null}
            {sttError ? <p className="error">{sttError}</p> : null}
          </div>
        </div>

        <label className="field-label" htmlFor="chat-msg">
          Message
        </label>
        <textarea
          id="chat-msg"
          className="textarea"
          placeholder="Type your concern, paste transcript, or combine with audio / mic…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault()
              onSend()
            }
          }}
        />
        <p className="hint">Live transcript: {transcript || '—'} · Ctrl/Cmd + Enter to send</p>

        <div className="consult-actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={onSend}
            disabled={loading || !composedMessage}
          >
            {loading ? 'Working…' : 'Send'}
          </button>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setThread([])
              setHistoryEn([])
              setNotices([])
              setErrMsg(null)
            }}
          >
            Clear
          </button>
        </div>

        {errMsg ? <p className="error">{errMsg}</p> : null}
        {notices.length > 0 ? (
          <ul className="notice-list">
            {notices.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        ) : null}

        <div className="consult-thread-layout">
          <div>
            <span className="field-label">Conversation</span>
            <div className="thread-pane">
              {thread.length === 0 ? (
                <p className="muted">No messages yet.</p>
              ) : (
                thread.map((m, i) => (
                  <div key={`${m.role}-${i}`} className={`bubble-row bubble-row--${m.role}`}>
                    <strong>{m.role === 'user' ? 'You' : 'Aura Health'}</strong>
                    {m.role === 'assistant' ? (
                      <FormattedReply text={m.text} />
                    ) : (
                      <p className="reply-body">{m.text}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          <div>
            <span className="field-label">Latest answer · read aloud</span>
            <div className="bubble bubble--ai">
              {lastAssistant ? (
                <FormattedReply text={lastAssistant.text} />
              ) : (
                <span className="muted">Send a message to see guidance here.</span>
              )}
            </div>
            <div className="tts-row">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() =>
                  lastAssistant && speakTextForUserLang(lastAssistant.text, userLang)
                }
                disabled={!lastAssistant}
              >
                Read aloud
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

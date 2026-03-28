import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'

const PORT = Number(process.env.PORT) || 3001
const app = express()

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['POST', 'OPTIONS'],
  }),
)
app.use(express.json({ limit: '256kb' }))

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const SYSTEM_PROMPT = `You are AuraHealth Guide, a careful health-information assistant (not a doctor).

Rules:
- Never claim to diagnose, prescribe medication, or replace emergency or professional care.
- The user's message may be in any language. You MUST respond entirely in the same language they used. If unclear, use the locale hint provided.
- Give: Possible explanations in general terms only, basic education, self-care ideas that are widely considered safe when not contraindicated, red flags, and clear guidance on when to seek urgent or in-person care.
- Structure your answer with short headings and bullet lists where helpful.
- If symptoms could be serious or ambiguous, prioritize safety: urge contacting local emergency services or a clinician promptly.
- Do not ask the user to share photos of body parts or invasive identifiers; keep replies concise and practical (~250–450 words unless the user asks for detail).`

function demoReply(message, languageHint) {
  const lower = (message || '').toLowerCase()
  const isEs =
    languageHint.startsWith('es') ||
    /[áéíóúñ¿¡]/.test(message || '') ||
    /\b(hola|dolor|fiebre)\b/.test(lower)
  if (isEs) {
    return `**No soy un médico** — esto es orientación general.

**Lo que comentas** podría deberse a muchas causas; sin una evaluación presencial no se puede saber.

**Cuidados en casa (si no hay signos de alarma):** hidratación, descanso, analgésicos de venta libre *solo si no tienes contraindicaciones* y siguiendo el prospecto.

**Busca urgencias o atención inmediata** si hay dificultad para respirar, dolor torácico intenso, desmayo, confusión súbita, sangrado abundante, o síntomas que empeoran rápido.

**Siguiente paso:** contacta a tu médico o servicio de urgencias local si las molestias persisten o dudas.`
  }
  return `**I'm not a doctor** — this is general guidance only.

**What you shared** could have many causes; without an in-person exam, nothing is certain.

**Self-care (if no red flags):** rest, hydration, and over-the-counter options *only if safe for you* and per label directions.

**Seek emergency care** for trouble breathing, severe chest pain, fainting, sudden confusion, heavy bleeding, or rapidly worsening symptoms.

**Next step:** contact your clinician or local emergency services if symptoms persist or you're unsure.`
}

app.post('/api/health-advice', async (req, res) => {
  const { message, languageHint, history } = req.body || {}
  const text = typeof message === 'string' ? message.trim() : ''
  if (!text) {
    return res.status(400).json({ error: 'message is required' })
  }

  const locale =
    typeof languageHint === 'string' && languageHint.trim()
      ? languageHint.trim()
      : 'en-US'

  if (!client) {
    return res.json({
      reply: demoReply(text, locale),
      demo: true,
      notice:
        'ANTHROPIC_API_KEY is not set; returning a safety-first demo response. Add the key to enable full AI answers.',
    })
  }

  const past = Array.isArray(history) ? history.slice(-6) : []
  const apiMessages = [
    ...past.map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 8000),
    })),
    {
      role: 'user',
      content: `User locale / speech language hint: ${locale}\n\nUser message:\n${text.slice(0, 12000)}`,
    },
  ]

  try {
    const model =
      process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022'
    const resp = await client.messages.create({
      model,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: apiMessages,
    })

    const block = resp.content.find((b) => b.type === 'text')
    const reply = block && block.type === 'text' ? block.text : ''
    if (!reply) {
      return res.status(502).json({ error: 'Empty model response' })
    }
    return res.json({ reply, demo: false })
  } catch (e) {
    console.error(e)
    return res.status(502).json({
      error: 'Model request failed',
      reply: demoReply(text, locale),
      demo: true,
    })
  }
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, ai: Boolean(client) })
})

app.listen(PORT, () => {
  console.log(`AuraHealth API listening on http://localhost:${PORT}`)
})

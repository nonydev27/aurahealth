/**
 * @param {{ message: string; languageHint: string; history?: { role: string; content: string }[] }} body
 */
export async function fetchHealthAdvice(body) {
  const res = await fetch('/api/health-advice', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`)
  }
  return data
}

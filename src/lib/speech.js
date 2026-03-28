/** @param {string} lang BCP-47 */
export function speakText(text, lang) {
  if (!text || typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang
  u.rate = 0.98
  u.pitch = 1
  window.speechSynthesis.speak(u)
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}

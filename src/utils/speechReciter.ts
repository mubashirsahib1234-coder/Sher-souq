/**
 * Web Speech Recitation helper
 */

export function reciteVerse(
  text: string,
  onStart?: () => void,
  onEnd?: () => void
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  // Cancel any existing speech
  window.speechSynthesis.cancel();

  // Clean lines for recitation
  const cleanText = text.replace(/[\n\r]+/g, ' ... ');
  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Try to find Urdu or Hindi or Indian English voice
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice =
    voices.find((v) => v.lang.startsWith('ur')) ||
    voices.find((v) => v.lang.startsWith('hi')) ||
    voices.find((v) => v.lang.includes('IN')) ||
    voices.find((v) => v.name.includes('Natural')) ||
    null;

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.rate = 0.85; // Slow, contemplative poetic pace
  utterance.pitch = 0.95; // Slightly deeper, dignified resonance

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopRecitation() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

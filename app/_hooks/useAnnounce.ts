import { useCallback, useEffect, useState } from "react";


export default function useAnnounce() {
  const [canAnnounce, setCanAnnounce] = useState(false)

  const getVoices = useCallback(() => {
    let voices = speechSynthesis.getVoices();
    if (!voices.length) {
      let utterance = new SpeechSynthesisUtterance("");
      speechSynthesis.speak(utterance);
      voices = speechSynthesis.getVoices();
    }
    return voices;
  }, [])

  const announce = useCallback((announcement: string, options?: {
    volume: number,
    rate: number,
    pitch: number,
    lang: string,
    voice?: SpeechSynthesisVoice
  }) => {
    if ('speechSynthesis' in window) {
      let utterance = new SpeechSynthesisUtterance();
      utterance.text = announcement
      if (options) {
        if (!options.voice) {
          const voices = getVoices()
          const voice = voices.find(it => it.name.toLocaleLowerCase() === "aaron")
          if (voice) utterance.voice = voice
        }

        const { volume, rate, pitch, lang } = options
        utterance.volume = volume || 1,
          utterance.rate = rate || 1,
          utterance.pitch = pitch || 2
        utterance.lang = lang || Intl.DateTimeFormat().resolvedOptions().locale
      }
      speechSynthesis.speak(utterance);
    }
  }, [])

  useEffect(() => {
    if ("speechSynthesis" in window) {
      setCanAnnounce(true)
    } else {
      setCanAnnounce(false)
    }
  }, [])
  return {
    announce, getVoices, canAnnounce
  }
}
// Audio helper for Saheli App (Text to speech & Speech to text)

class AudioService {
  private currentAudio: HTMLAudioElement | null = null;
  private isSpeakingInternal = false;
  private listeners: ((speaking: boolean) => void)[] = [];

  public subscribe(listener: (speaking: boolean) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private setSpeaking(state: boolean) {
    this.isSpeakingInternal = state;
    this.listeners.forEach((l) => l(state));
  }

  public get isSpeaking(): boolean {
    return this.isSpeakingInternal;
  }

  public stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.setSpeaking(false);
  }

  public async speakRomanUrdu(text: string, forceBrowser = false): Promise<void> {
    this.stop();

    if (!text || text.trim().length === 0) return;

    this.setSpeaking(true);

    // If not forcing browser, try high-quality Gemini TTS first
    if (!forceBrowser) {
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data?.audioBase64) {
            const audioUrl = `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`;
            const audio = new Audio(audioUrl);
            this.currentAudio = audio;

            return new Promise((resolve) => {
              audio.onended = () => {
                this.setSpeaking(false);
                this.currentAudio = null;
                resolve();
              };
              audio.onerror = () => {
                this.speakViaWebSpeech(text).then(resolve);
              };
              audio.play().catch(() => {
                this.speakViaWebSpeech(text).then(resolve);
              });
            });
          }
        }
      } catch (err) {
        console.warn('Gemini TTS failed, falling back to Web Speech API', err);
      }
    }

    // Fallback: Browser Web Speech API
    return this.speakViaWebSpeech(text);
  }

  private speakViaWebSpeech(text: string): Promise<void> {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        this.setSpeaking(false);
        resolve();
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      // Try finding Urdu or Hindi or Indian English voice for best phonetic Roman Urdu pronunciation
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) =>
          v.lang.startsWith('ur') ||
          v.lang.startsWith('hi') ||
          v.lang.startsWith('pa') ||
          v.lang.includes('IN')
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.rate = 0.9; // Slightly slower, very clear for rural learners
      utterance.pitch = 1.05;

      utterance.onend = () => {
        this.setSpeaking(false);
        resolve();
      };

      utterance.onerror = () => {
        this.setSpeaking(false);
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }
}

export const audioService = new AudioService();

import React, { useState, useEffect } from 'react';
import { Mic, MicOff, X, Volume2, Sparkles, Send } from 'lucide-react';
import { VoiceResult } from '../types';
import { audioService } from '../utils/audio';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVoiceResponse: (result: VoiceResult) => void;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  onVoiceResponse,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Common quick questions for rural women in Sharqpur
  const quickQuestions = [
    'Meri roti phoolti nahi hai, narm kaise karun?',
    'Kadhai ka tanka kaisa lagana hai?',
    'Salan mein mirch ya namak tez ho jaye to kya karein?',
    'Sharqpur ke gulab jamun narm kaisay bantay hain?',
    'Kameez ke galay ki cutting seedhi kaise karein?',
  ];

  useEffect(() => {
    if (!isOpen) {
      setIsListening(false);
      setTranscript('');
      setErrorMsg(null);
      return;
    }

    startSpeechRecognition();
  }, [isOpen]);

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMsg('Aap ke browser mein direct aawaz support nahi hai. Neechay sawal chunein ya likhein.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'ur-PK'; // Urdu (Pakistan) / Roman phonetics

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMsg(null);
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const resultTranscript = event.results[current][0].transcript;
        setTranscript(resultTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition event:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setErrorMsg('Microphone ki permission allow karein.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.warn('Speech recognition failed to initialize:', e);
      setIsListening(false);
    }
  };

  const handleAskQuestion = async (queryText: string) => {
    if (!queryText.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/voice-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText }),
      });

      const data = await res.json();
      if (data?.success && data?.data) {
        onVoiceResponse(data.data);
        audioService.speakRomanUrdu(data.data.audioText || data.data.answer);
        onClose();
      } else {
        setErrorMsg(data?.error || 'Jawab lene mein masla aaya.');
      }
    } catch (err: any) {
      setErrorMsg('Internet ya network ka masla hai.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border-4 border-pink-400 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-rose-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mic className="w-6 h-6" />
            <h3 className="text-lg sm:text-xl font-black">Bolo Aur Poocho</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center text-center space-y-5 overflow-y-auto">
          {/* Animated Microphone Area */}
          <div className="relative my-2">
            <div
              className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-gradient-to-tr from-pink-600 to-rose-500 animate-pulse-ring'
                  : 'bg-pink-100 border-4 border-pink-300'
              }`}
            >
              <button
                onClick={startSpeechRecognition}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-pink-600 hover:bg-pink-700 text-white flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer"
              >
                {isListening ? (
                  <Mic className="w-10 h-10 animate-bounce" />
                ) : (
                  <MicOff className="w-10 h-10 text-pink-200" />
                )}
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black text-pink-950">
              {isListening ? 'Saheli sun rahi hai... Bolain!' : 'Button daba kar bolain'}
            </h4>
            <p className="text-xs sm:text-sm text-pink-800 font-medium mt-1">
              Roti, salan, kadhai ya silai ka koi bhi masla poochein
            </p>
          </div>

          {/* Transcript box */}
          <div className="w-full bg-pink-50/80 p-3.5 rounded-2xl border-2 border-pink-200 text-left">
            <span className="text-[11px] font-bold text-pink-700 uppercase block mb-1">
              Aap ki baat:
            </span>
            <input
              type="text"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Bolain ya yahan likhein..."
              className="w-full bg-white px-3 py-2 rounded-xl border border-pink-300 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {errorMsg && (
            <p className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
              {errorMsg}
            </p>
          )}

          {/* Submit button for custom speech or typed query */}
          {transcript.trim() && (
            <button
              onClick={() => handleAskQuestion(transcript)}
              disabled={isLoading}
              className="w-full py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-black rounded-2xl text-base shadow-lg shadow-pink-500/25 flex items-center justify-center space-x-2 transition-all active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Jawab tayyar ho raha hai...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Jawab Lein</span>
                </>
              )}
            </button>
          )}

          {/* Quick Questions Chips */}
          <div className="w-full text-left space-y-2 pt-2 border-t border-pink-100">
            <span className="text-xs font-black uppercase text-pink-900 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Aasan Sawal (Click Karein):</span>
            </span>

            <div className="flex flex-col gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTranscript(q);
                    handleAskQuestion(q);
                  }}
                  disabled={isLoading}
                  className="p-2.5 bg-white hover:bg-pink-50 text-pink-900 text-xs sm:text-sm font-bold rounded-xl border border-pink-200 text-left transition-all active:scale-98 flex items-center justify-between cursor-pointer"
                >
                  <span>"{q}"</span>
                  <Volume2 className="w-4 h-4 text-pink-500 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

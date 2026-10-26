import React, { useState } from 'react';
import { Volume2, CheckCircle2, RotateCcw, Heart, Sparkles, ThumbsUp, ThumbsDown, Info } from 'lucide-react';
import { AnalysisResult } from '../types';
import { audioService } from '../utils/audio';

interface AIJawabCardProps {
  result: AnalysisResult;
  onRetake: () => void;
  onAskFollowup: (topic: string) => void;
}

export const AIJawabCard: React.FC<AIJawabCardProps> = ({
  result,
  onRetake,
  onAskFollowup,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [userFeedback, setUserFeedback] = useState<'haan' | 'nahin' | null>(null);

  const handleListen = async () => {
    if (isPlayingAudio) {
      audioService.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    const textToSpeak = `${result.feedback}. ${result.tips.join('. ')}. ${result.encouragement}`;
    await audioService.speakRomanUrdu(textToSpeak);
    setIsPlayingAudio(false);
  };

  const handleFeedback = (choice: 'haan' | 'nahin') => {
    setUserFeedback(choice);
    if (choice === 'haan') {
      audioService.speakRomanUrdu('Shukriya baji! Allah aap ke hath mein aur barkat day.');
    } else {
      audioService.speakRomanUrdu('Koi baat nahi baji, aap doosri tasveer khainchein ya sawal poochein.');
    }
  };

  const getStatusBadge = () => {
    switch (result.status) {
      case 'behtareen':
        return (
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Behtareen Hunar</span>
          </span>
        );
      case 'thoda_sudhar':
        return (
          <span className="bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold flex items-center space-x-1">
            <Info className="w-4 h-4 text-amber-600" />
            <span>Thoda Sudhar Chahiye</span>
          </span>
        );
      default:
        return (
          <span className="bg-pink-100 text-pink-900 border border-pink-300 px-3 py-1 rounded-full text-xs sm:text-sm font-extrabold flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span>Seekhnay Ka Mauqa</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full my-6 bg-white rounded-3xl border-3 border-pink-300 shadow-2xl shadow-pink-500/15 overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Top Banner / Header */}
      <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-rose-500 p-4 sm:p-5 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center text-xl shadow-inner border border-white/30">
            🤖
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider font-black bg-white/25 px-2 py-0.5 rounded-full">
                AI Jawab
              </span>
              <span className="text-pink-100 text-xs hidden sm:inline">Sharqpur Rehnuma</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black tracking-tight">{result.title}</h3>
          </div>
        </div>

        {getStatusBadge()}
      </div>

      <div className="p-5 sm:p-7 space-y-6">
        {/* Image Preview & Detected Item */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-pink-50/70 p-3.5 sm:p-4 rounded-2xl border border-pink-200">
          {result.imagePreview && (
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-pink-300 shadow-sm shrink-0">
              <img
                src={result.imagePreview}
                alt="Uploaded item"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="text-xs font-bold text-pink-600 uppercase tracking-wide">
              Tasveer Ki Pehchan:
            </div>
            <div className="text-base sm:text-lg font-black text-pink-950">
              {result.itemDetected}
            </div>
            <div className="text-xs text-pink-800 font-medium mt-0.5">
              Sharqpur Punjab ke gharelu miyar ke mutabiq tajziya
            </div>
          </div>
        </div>

        {/* Main Feedback in Roman Urdu (e.g. Ye roti thodi kachi hai) */}
        <div className="bg-gradient-to-br from-pink-100/90 via-pink-50 to-rose-50 p-5 sm:p-6 rounded-2xl border-2 border-pink-300/80 shadow-sm relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase text-pink-700 tracking-wider">
              🌸 Saheli Ka Mashwara:
            </span>

            {/* Audio Listen Button */}
            <button
              onClick={handleListen}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold transition-all shadow-sm active:scale-95 cursor-pointer border ${
                isPlayingAudio
                  ? 'bg-amber-400 text-amber-950 border-amber-500 animate-pulse'
                  : 'bg-white text-pink-700 border-pink-300 hover:bg-pink-100'
              }`}
            >
              <Volume2 className="w-4 h-4 text-pink-600" />
              <span>{isPlayingAudio ? 'Band Karein' : 'Suno 🔊'}</span>
            </button>
          </div>

          <p className="text-lg sm:text-xl font-bold text-slate-800 leading-relaxed font-sans">
            "{result.feedback}"
          </p>
        </div>

        {/* Tips Section in Roman Urdu */}
        {result.tips && result.tips.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-1.5 text-pink-900 font-black text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-pink-600" />
              <span>Aasan Nuskhe (Aglay Kadam):</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {result.tips.map((tip, idx) => (
                <div
                  key={idx}
                  className="flex items-start space-x-3 p-3.5 bg-white rounded-2xl border-2 border-pink-100 shadow-xs hover:border-pink-300 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-slate-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Encouragement / Dua */}
        {result.encouragement && (
          <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-pink-800 bg-pink-100/60 p-3 rounded-2xl border border-pink-200">
            <Heart className="w-4 h-4 text-pink-500 shrink-0 fill-pink-500" />
            <span>{result.encouragement}</span>
          </div>
        )}

        {/* The Mandatory HAAN / NAHIN Buttons */}
        <div className="pt-4 border-t-2 border-pink-100">
          <div className="text-center mb-3">
            <p className="text-sm sm:text-base font-black text-pink-950">
              Kya yeh mashwara aap ke kaam aaya?
            </p>
            <p className="text-xs text-pink-700 font-medium">
              Apni raye dein taakay Saheli aur behtar mashwara day sakay
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {/* Button 1: Haan */}
            <button
              onClick={() => handleFeedback('haan')}
              className={`flex items-center justify-center space-x-2 py-3.5 sm:py-4 px-4 rounded-2xl font-black text-base sm:text-lg transition-all active:scale-95 shadow-md cursor-pointer border-3 ${
                userFeedback === 'haan'
                  ? 'bg-emerald-600 text-white border-emerald-700 ring-4 ring-emerald-200'
                  : 'bg-pink-600 text-white border-pink-700 hover:bg-pink-700 shadow-pink-500/25'
              }`}
            >
              <ThumbsUp className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Haan</span>
            </button>

            {/* Button 2: Nahin */}
            <button
              onClick={() => handleFeedback('nahin')}
              className={`flex items-center justify-center space-x-2 py-3.5 sm:py-4 px-4 rounded-2xl font-black text-base sm:text-lg transition-all active:scale-95 shadow-md cursor-pointer border-3 ${
                userFeedback === 'nahin'
                  ? 'bg-rose-100 text-rose-800 border-rose-300 ring-4 ring-rose-200'
                  : 'bg-white text-pink-700 border-pink-300 hover:bg-pink-50 shadow-pink-100'
              }`}
            >
              <ThumbsDown className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Nahin</span>
            </button>
          </div>

          {/* Feedback response toast */}
          {userFeedback === 'haan' && (
            <div className="mt-3 p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-center text-emerald-800 font-bold text-sm animate-in fade-in">
              🌸 Bohot shukriya baji! Aap ka hunar roze-ba-roz behtar ho raha hai!
            </div>
          )}

          {userFeedback === 'nahin' && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-300 rounded-2xl text-center text-amber-900 font-bold text-sm animate-in fade-in">
              Koi baat nahi baji! Aap doosray rukh se tasveer lein ya aawaz se sawal poochein.
            </div>
          )}
        </div>

        {/* Action footer: Retake / Ask more */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <button
            onClick={onRetake}
            className="flex-1 py-3 px-4 bg-pink-100 hover:bg-pink-200 text-pink-900 font-extrabold rounded-2xl text-sm sm:text-base flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer border border-pink-300"
          >
            <RotateCcw className="w-4 h-4 text-pink-700" />
            <span>Nayi Tasveer Lein</span>
          </button>

          <button
            onClick={() => onAskFollowup(result.itemDetected)}
            className="flex-1 py-3 px-4 bg-white hover:bg-pink-50 text-pink-700 font-extrabold rounded-2xl text-sm sm:text-base flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer border-2 border-pink-400"
          >
            <span>🎙️ Is Par Sawal Poocho</span>
          </button>
        </div>
      </div>
    </div>
  );
};

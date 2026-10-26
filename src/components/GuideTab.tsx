import React, { useState } from 'react';
import { BookOpen, Volume2, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { GUIDE_ARTICLES } from '../data/guides';
import { GuideArticle } from '../types';
import { audioService } from '../utils/audio';

export const GuideTab: React.FC = () => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>(GUIDE_ARTICLES[0].id);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const activeGuide =
    GUIDE_ARTICLES.find((g) => g.id === selectedGuideId) || GUIDE_ARTICLES[0];

  const handleListenGuide = async (guide: GuideArticle) => {
    if (playingId === guide.id) {
      audioService.stop();
      setPlayingId(null);
      return;
    }

    setPlayingId(guide.id);
    const textToSpeak = `${guide.title}. ${guide.summary}. Saheli ka khas mashwara: ${guide.saheliTip}`;
    await audioService.speakRomanUrdu(textToSpeak);
    setPlayingId(null);
  };

  return (
    <div className="w-full space-y-6 pb-20 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-rose-500 rounded-3xl p-5 sm:p-6 text-white shadow-lg shadow-pink-500/20">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl border border-white/30">
            📖
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black">Hunar Rehnuma</h2>
            <p className="text-pink-100 text-xs sm:text-sm font-medium">
              Sharqpur ki behnon ke liye step-by-step mashwaray
            </p>
          </div>
        </div>
      </div>

      {/* Guide selector horizontal pills */}
      <div className="flex space-x-2.5 overflow-x-auto pb-2 scrollbar-none">
        {GUIDE_ARTICLES.map((guide) => (
          <button
            key={guide.id}
            onClick={() => setSelectedGuideId(guide.id)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all border cursor-pointer ${
              selectedGuideId === guide.id
                ? 'bg-pink-600 text-white border-pink-700 shadow-md shadow-pink-500/25 scale-[1.02]'
                : 'bg-white text-pink-800 border-pink-200 hover:bg-pink-50'
            }`}
          >
            <span>{guide.icon}</span>
            <span>{guide.category}</span>
          </button>
        ))}
      </div>

      {/* Selected Guide Details */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-pink-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-pink-100 pb-4">
          <div>
            <span className="text-xs font-black uppercase text-pink-600 tracking-wider">
              {activeGuide.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-pink-950 mt-0.5">
              {activeGuide.title}
            </h3>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              {activeGuide.summary}
            </p>
          </div>

          <button
            onClick={() => handleListenGuide(activeGuide)}
            className={`self-start sm:self-auto flex items-center space-x-1.5 px-4 py-2 rounded-full font-black text-xs sm:text-sm transition-all shadow-sm active:scale-95 cursor-pointer border ${
              playingId === activeGuide.id
                ? 'bg-amber-400 text-amber-950 border-amber-500 animate-pulse'
                : 'bg-pink-100 text-pink-800 border-pink-300 hover:bg-pink-200'
            }`}
          >
            <Volume2 className="w-4 h-4 text-pink-700" />
            <span>{playingId === activeGuide.id ? 'Aawaz Rokein' : 'Aawaz Mein Sunain 🔊'}</span>
          </button>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          <h4 className="text-sm font-black uppercase text-pink-900 tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-pink-600" />
            <span>Step-by-Step Rehnumai:</span>
          </h4>

          <div className="grid grid-cols-1 gap-3.5">
            {activeGuide.steps.map((step) => (
              <div
                key={step.number}
                className="flex items-start space-x-3.5 p-4 rounded-2xl bg-pink-50/70 border-2 border-pink-200"
              >
                <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-500 text-white font-black flex items-center justify-center text-sm shadow-sm shrink-0">
                  {step.number}
                </div>
                <div>
                  <h5 className="text-base font-black text-pink-950">{step.heading}</h5>
                  <p className="text-sm font-semibold text-slate-700 mt-1 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saheli's Khas Tip */}
        <div className="bg-gradient-to-r from-amber-50 to-pink-50 p-4 sm:p-5 rounded-2xl border-2 border-amber-200">
          <div className="flex items-center space-x-2 text-amber-900 font-black text-sm uppercase tracking-wide mb-1">
            <span>✨ Saheli Ka Khas Nuskha:</span>
          </div>
          <p className="text-sm sm:text-base font-bold text-amber-950">
            "{activeGuide.saheliTip}"
          </p>
        </div>
      </div>
    </div>
  );
};

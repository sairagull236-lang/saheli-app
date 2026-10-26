import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, MapPin } from 'lucide-react';
import { audioService } from '../utils/audio';

interface HeaderProps {
  onSpeakGreeting: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSpeakGreeting }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return audioService.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-pink-600 via-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/20 px-4 py-3 sm:py-4 transition-all">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        {/* Logo and Name */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border-2 border-white/40 shadow-inner text-2xl sm:text-3xl">
              🌸
            </div>
            <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-white shadow-sm uppercase tracking-wide">
              Hunar
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-sm">
                Saheli
              </h1>
              <span className="bg-white/25 text-white text-xs font-semibold px-2 py-0.5 rounded-full border border-white/30 hidden sm:inline-block">
                Visual Skill Guide
              </span>
            </div>
            <p className="text-pink-100 text-xs sm:text-sm font-medium flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-pink-200" />
              <span>Sharqpur Punjab ki behnon ke liye</span>
            </p>
          </div>
        </div>

        {/* Right audio listener / voice action */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onSpeakGreeting}
            title="Saheli ki aawaz sunain"
            aria-label="Saheli ki aawaz sunain"
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-full font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 border ${
              isSpeaking
                ? 'bg-amber-300 text-amber-950 border-amber-400 animate-pulse'
                : 'bg-white text-pink-600 hover:bg-pink-50 border-white/50'
            }`}
          >
            {isSpeaking ? (
              <>
                <Volume2 className="w-4 h-4 animate-bounce" />
                <span>Bol rahi hai...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-pink-500" />
                <span>Baji Saheli</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

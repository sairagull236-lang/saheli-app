import React from 'react';
import { Settings, Volume2, Type, MapPin, Info, Heart, ShieldCheck } from 'lucide-react';
import { audioService } from '../utils/audio';

interface SettingsTabProps {
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  autoSpeak: boolean;
  setAutoSpeak: (val: boolean) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  fontSize,
  setFontSize,
  autoSpeak,
  setAutoSpeak,
}) => {
  const handleTestVoice = () => {
    audioService.speakRomanUrdu(
      'As-salamu alaykum baji! Saheli aap ki aawaz aur hunar ki har waqt madad karegi.'
    );
  };

  return (
    <div className="w-full space-y-6 pb-20 animate-in fade-in duration-200">
      {/* Banner */}
      <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-rose-500 rounded-3xl p-5 sm:p-6 text-white shadow-lg shadow-pink-500/20">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl border border-white/30">
            ⚙️
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black">Tarjeehat (Settings)</h2>
            <p className="text-pink-100 text-xs sm:text-sm font-medium">
              Aawaz aur parhnay ke liye aasan settings
            </p>
          </div>
        </div>
      </div>

      {/* Font Size Option */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-pink-200 shadow-md space-y-3">
        <div className="flex items-center space-x-2 text-pink-900 font-black text-base">
          <Type className="w-5 h-5 text-pink-600" />
          <span>Likhai Ka Size (Text Size):</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 font-semibold">
          Agar parhnay mein mushkil ho to size bada kar lein
        </p>

        <div className="grid grid-cols-3 gap-2 pt-2">
          <button
            onClick={() => setFontSize('normal')}
            className={`py-3 px-2 rounded-2xl font-black text-xs sm:text-sm border-2 cursor-pointer transition-all ${
              fontSize === 'normal'
                ? 'bg-pink-600 text-white border-pink-700 shadow-md'
                : 'bg-pink-50 text-pink-800 border-pink-200 hover:bg-pink-100'
            }`}
          >
            Aam (Normal)
          </button>
          <button
            onClick={() => setFontSize('large')}
            className={`py-3 px-2 rounded-2xl font-black text-sm sm:text-base border-2 cursor-pointer transition-all ${
              fontSize === 'large'
                ? 'bg-pink-600 text-white border-pink-700 shadow-md'
                : 'bg-pink-50 text-pink-800 border-pink-200 hover:bg-pink-100'
            }`}
          >
            Bada (Large)
          </button>
          <button
            onClick={() => setFontSize('xlarge')}
            className={`py-3 px-2 rounded-2xl font-black text-base sm:text-lg border-2 cursor-pointer transition-all ${
              fontSize === 'xlarge'
                ? 'bg-pink-600 text-white border-pink-700 shadow-md'
                : 'bg-pink-50 text-pink-800 border-pink-200 hover:bg-pink-100'
            }`}
          >
            Bohat Bada (XL)
          </button>
        </div>
      </div>

      {/* Audio Auto-Speak Toggle */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-pink-200 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2 text-pink-900 font-black text-base">
              <Volume2 className="w-5 h-5 text-pink-600" />
              <span>Khud-bakhud Aawaz (Auto Play):</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              Tasveer check hone ke baad aawaz khud chalay
            </p>
          </div>

          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
              autoSpeak ? 'bg-pink-600 justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <div className="bg-white w-6 h-6 rounded-full shadow-md transform" />
          </button>
        </div>

        <button
          onClick={handleTestVoice}
          className="w-full py-2.5 bg-pink-100 hover:bg-pink-200 text-pink-900 font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center space-x-1.5 cursor-pointer border border-pink-300 active:scale-98 transition-all"
        >
          <Volume2 className="w-4 h-4 text-pink-600" />
          <span>Aawaz Test Karein</span>
        </button>
      </div>

      {/* Sharqpur Punjab Local Context Card */}
      <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50 rounded-3xl p-5 sm:p-6 border-3 border-pink-200 shadow-md space-y-3">
        <div className="flex items-center space-x-2 text-pink-900 font-black text-base">
          <MapPin className="w-5 h-5 text-pink-600" />
          <span>Sharqpur Punjab Rehnumai Markaz</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
          Yeh app Sharqpur Sharif (District Sheikhupura, Punjab) ki behnon aur betiyon ke liye banayi gayi hai taakay ghar bethay roti, salan, kadhai, phulkari aur silai ke hunar ko aasan Roman Urdu mein behtar banaya ja sakay.
        </p>

        <div className="p-3 bg-pink-100/70 rounded-2xl border border-pink-200 flex items-center space-x-2 text-xs font-bold text-pink-900">
          <Heart className="w-4 h-4 text-pink-600 fill-pink-600 shrink-0" />
          <span>Sharqpur ki behnon ke liye bilkul muft aur asaan!</span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Camera, Mic, Sparkles } from 'lucide-react';

interface HeroActionsProps {
  onOpenPhotoAction: () => void;
  onOpenVoiceModal: () => void;
  isAnalyzing: boolean;
}

export const HeroActions: React.FC<HeroActionsProps> = ({
  onOpenPhotoAction,
  onOpenVoiceModal,
  isAnalyzing,
}) => {
  return (
    <section className="w-full my-4 sm:my-6">
      <div className="bg-gradient-to-b from-pink-100/90 to-pink-50 p-4 sm:p-6 rounded-3xl border-2 border-pink-200/80 shadow-md">
        <div className="text-center mb-4 sm:mb-5">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-pink-200/80 text-pink-800 rounded-full text-xs font-bold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Asaan Gharelu Rehnuma</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-pink-950 tracking-tight">
            Apna Hunar Check Karein
          </h2>
          <p className="text-sm sm:text-base text-pink-800 font-medium">
            Tasveer khinchein ya aawaz se mashwara lein
          </p>
        </div>

        {/* The Two Prominent Big Buttons: Tasveer Khincho & Bolo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Button 1: Tasveer Khincho */}
          <button
            onClick={onOpenPhotoAction}
            disabled={isAnalyzing}
            className="group relative flex flex-col items-center justify-center p-6 sm:p-7 rounded-3xl bg-gradient-to-tr from-pink-600 via-pink-500 to-rose-500 text-white shadow-xl shadow-pink-500/30 hover:shadow-2xl hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all border-4 border-white disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
          >
            {/* Pulsing decoration */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full flex items-center justify-center mb-3 shadow-inner group-hover:scale-110 transition-transform">
              <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-white stroke-[2.5]" />
            </div>

            <div className="text-center">
              <span className="block text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow">
                Tasveer Khincho
              </span>
              <span className="block text-xs sm:text-sm text-pink-100 font-semibold mt-1">
                Roti, Salan, Kadhai ki photo lein
              </span>
            </div>

            <div className="mt-4 bg-white text-pink-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold shadow-md flex items-center space-x-1.5 group-hover:bg-pink-50">
              <span>📸 Camera Kholein</span>
            </div>
          </button>

          {/* Button 2: Bolo */}
          <button
            onClick={onOpenVoiceModal}
            disabled={isAnalyzing}
            className="group relative flex flex-col items-center justify-center p-6 sm:p-7 rounded-3xl bg-white text-pink-700 shadow-xl shadow-pink-200 hover:shadow-2xl hover:shadow-pink-300 hover:scale-[1.02] active:scale-[0.98] transition-all border-4 border-pink-300 hover:border-pink-400 disabled:opacity-75 disabled:pointer-events-none cursor-pointer"
          >
            {/* Animated mic ring */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-pink-100 rounded-full flex items-center justify-center mb-3 shadow-inner group-hover:bg-pink-200 transition-colors">
              <Mic className="w-10 h-10 sm:w-12 sm:h-12 text-pink-600 stroke-[2.5] group-hover:scale-110 transition-transform" />
            </div>

            <div className="text-center">
              <span className="block text-2xl sm:text-3xl font-black tracking-tight text-pink-900">
                Bolo
              </span>
              <span className="block text-xs sm:text-sm text-pink-700 font-semibold mt-1">
                Aawaz se koi bhi sawal poochein
              </span>
            </div>

            <div className="mt-4 bg-pink-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold shadow-md flex items-center space-x-1.5 group-hover:bg-pink-700">
              <span>🎙️ Sawal Poocho</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

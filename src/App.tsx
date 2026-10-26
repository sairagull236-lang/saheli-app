import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroActions } from './components/HeroActions';
import { AIJawabCard } from './components/AIJawabCard';
import { CameraModal } from './components/CameraModal';
import { VoiceModal } from './components/VoiceModal';
import { GuideTab } from './components/GuideTab';
import { SettingsTab } from './components/SettingsTab';
import { BottomNav, TabType } from './components/BottomNav';
import { SAMPLE_SKILLS } from './data/samples';
import { AnalysisResult, VoiceResult } from './types';
import { audioService } from './utils/audio';
import { Sparkles, Loader2, Image as ImageIcon, Volume2, CheckCircle2, History } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);

  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('roti');

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingMessage, setAnalyzingMessage] = useState('Tasveer ki jaanch ho rahi hai...');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [voiceResult, setVoiceResult] = useState<VoiceResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // History of recent analyses
  const [history, setHistory] = useState<AnalysisResult[]>([]);

  // Greeting audio
  const handleSpeakGreeting = () => {
    audioService.speakRomanUrdu(
      'As-salamu alaykum baji! Main Saheli hoon. Sharqpur Punjab ki behnon ke liye aap ka gharelu hunar guide. Tasveer khinchein ya Bolo daba kar poochein!'
    );
  };

  // Perform image analysis via server /api/analyze-skill
  const handleAnalyzePhoto = async (imageDataUrl: string, category: string, customPrompt?: string) => {
    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalyzingMessage('Saheli tasveer ghaur se dekh rahi hai...');

    try {
      const response = await fetch('/api/analyze-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: imageDataUrl,
          category,
          userPrompt: customPrompt || 'Is kaam ki jaanch karein aur Roman Urdu mein mashwara dein',
        }),
      });

      const resData = await response.json();

      if (resData.success && resData.data) {
        const fullResult: AnalysisResult = {
          ...resData.data,
          imagePreview: imageDataUrl,
          timestamp: Date.now(),
        };

        setAnalysisResult(fullResult);
        setHistory((prev) => [fullResult, ...prev.slice(0, 5)]);

        // If auto-speak is enabled, read the feedback aloud!
        if (autoSpeak) {
          const speakText = `${fullResult.feedback}. ${fullResult.tips.join('. ')}`;
          audioService.speakRomanUrdu(speakText);
        }
      } else {
        // Fallback friendly sample response if network glitch
        setErrorMessage(resData.error || 'Tajziya nahi ho saka. Baraye mehrbani dobara koshish karein.');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      // Helpful fallback
      setErrorMessage('Internet ka masla hai. Dobara koshish karein.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Quick test sample click (e.g. Kachi Roti)
  const handleSelectSample = (sample: typeof SAMPLE_SKILLS[0]) => {
    setSelectedCategory(sample.category);
    handleAnalyzePhoto(
      sample.imageData,
      sample.category,
      `Yeh ${sample.label} ki tasveer hai. Jaanch karein.`
    );
  };

  const handleVoiceResponse = (res: VoiceResult) => {
    setVoiceResult(res);
  };

  const handleAskFollowup = (topic: string) => {
    setIsVoiceModalOpen(true);
  };

  // Typography scaling class
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg';
      case 'xlarge':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };

  return (
    <div className={`min-h-screen bg-pink-50/60 flex flex-col ${getFontSizeClass()} font-sans selection:bg-pink-300 selection:text-pink-950 pb-20`}>
      {/* Top Header */}
      <Header onSpeakGreeting={handleSpeakGreeting} />

      {/* Main Container */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-4 sm:py-6">
        {/* Render Tab Content */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* The Two Giant Hero Buttons: Tasveer Khincho and Bolo */}
            <HeroActions
              onOpenPhotoAction={() => setIsCameraModalOpen(true)}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
              isAnalyzing={isAnalyzing}
            />

            {/* Loading Indicator when analyzing */}
            {isAnalyzing && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-pink-400 shadow-xl flex flex-col items-center justify-center text-center space-y-3 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                  <Loader2 className="w-9 h-9 animate-spin" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-pink-950">
                    {analyzingMessage}
                  </h3>
                  <p className="text-xs sm:text-sm text-pink-700 font-semibold mt-1">
                    Sharqpur ke hunar miyar ke mutabiq jaanch jari hai...
                  </p>
                </div>
              </div>
            )}

            {/* Error Message if any */}
            {errorMessage && (
              <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-2xl text-rose-800 text-sm font-bold text-center">
                {errorMessage}
              </div>
            )}

            {/* AI JAWAB CARD (The core feature requested by user!) */}
            {analysisResult && !isAnalyzing && (
              <AIJawabCard
                result={analysisResult}
                onRetake={() => setIsCameraModalOpen(true)}
                onAskFollowup={handleAskFollowup}
              />
            )}

            {/* Voice Question Result (if user used "Bolo") */}
            {voiceResult && !isAnalyzing && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border-3 border-pink-300 shadow-xl space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-pink-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🎙️</span>
                    <h3 className="text-lg sm:text-xl font-black text-pink-950">
                      {voiceResult.title}
                    </h3>
                  </div>
                  <button
                    onClick={() =>
                      audioService.speakRomanUrdu(
                        voiceResult.audioText || voiceResult.answer
                      )
                    }
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-pink-100 hover:bg-pink-200 text-pink-900 rounded-full text-xs font-black cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-pink-600" />
                    <span>Suno 🔊</span>
                  </button>
                </div>

                <div className="p-4 bg-pink-50/80 rounded-2xl border border-pink-200">
                  <p className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed">
                    "{voiceResult.answer}"
                  </p>
                </div>

                {voiceResult.quickTip && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs sm:text-sm font-bold text-amber-900">
                    💡 Khas Nuskha: {voiceResult.quickTip}
                  </div>
                )}
              </div>
            )}

            {/* Quick Testing Samples for Rural Skills */}
            <section className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-pink-200/90 shadow-md space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-pink-600" />
                  <h3 className="text-base sm:text-lg font-black text-pink-950">
                    Ek Click Mein Test Karein
                  </h3>
                </div>
                <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full border border-pink-200">
                  Sample Photos
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Agar abhi taza photo nahi hai, to in par click kar ke check karein:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {SAMPLE_SKILLS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSample(sample)}
                    disabled={isAnalyzing}
                    className="group flex flex-col items-center p-3 rounded-2xl bg-pink-50/70 hover:bg-pink-100/90 border-2 border-pink-200 hover:border-pink-400 transition-all text-center cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white shadow-sm mb-2 group-hover:scale-105 transition-transform bg-white">
                      <img
                        src={sample.imageData}
                        alt={sample.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-black text-pink-950">
                      {sample.label}
                    </span>
                    <span className="text-[10px] text-pink-700 font-semibold line-clamp-1">
                      {sample.description}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Sharqpur Punjab Cultural Touch & Categories */}
            <section className="bg-gradient-to-br from-pink-100/80 to-rose-100/60 p-4 sm:p-5 rounded-3xl border border-pink-300 text-pink-950 flex items-center space-x-3.5">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-pink-200 shrink-0">
                🪡
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black">
                  Sharqpur Dastkari & Pakwan
                </h4>
                <p className="text-xs text-pink-800 font-semibold">
                  Roti, salan ki bhunai, phulkari kadhai aur silai ke nuskhe har waqt aap ke sath!
                </p>
              </div>
            </section>

            {/* History Section if items exist */}
            {history.length > 1 && (
              <section className="space-y-2 pt-2">
                <div className="flex items-center space-x-2 text-pink-900 font-black text-sm">
                  <History className="w-4 h-4 text-pink-600" />
                  <span>Pichlay Checks (Recent):</span>
                </div>
                <div className="space-y-2">
                  {history.slice(1).map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setAnalysisResult(item)}
                      className="p-3 bg-white rounded-2xl border border-pink-200 flex items-center justify-between cursor-pointer hover:bg-pink-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {item.imagePreview && (
                          <img
                            src={item.imagePreview}
                            alt={item.itemDetected}
                            className="w-10 h-10 rounded-xl object-cover border border-pink-200"
                          />
                        )}
                        <div>
                          <div className="text-xs font-black text-pink-950">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-600 font-semibold line-clamp-1">
                            {item.feedback}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-pink-600 hover:underline">
                        Dekhein →
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Guide Tab */}
        {activeTab === 'guide' && <GuideTab />}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <SettingsTab
            fontSize={fontSize}
            setFontSize={setFontSize}
            autoSpeak={autoSpeak}
            setAutoSpeak={setAutoSpeak}
          />
        )}
      </main>

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={(imgData, cat) => {
          setIsCameraModalOpen(false);
          handleAnalyzePhoto(imgData, cat);
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Voice Assistant Modal ("Bolo") */}
      <VoiceModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onVoiceResponse={handleVoiceResponse}
      />

      {/* Bottom Navigation (Home, Guide, Settings) */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

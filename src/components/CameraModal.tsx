import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, X, Upload, Sparkles, AlertCircle } from 'lucide-react';

interface CameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string, category: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  selectedCategory,
  onSelectCategory,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');

  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Camera access error:', err);
      setCameraError(
        'Camera open nahi ho saka. Aap gallery se tasveer upload kar sakti hain.'
      );
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const handleCaptureSnapshot = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

    stopCamera();
    onCapture(dataUrl, selectedCategory);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        stopCamera();
        onCapture(dataUrl, selectedCategory);
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  const categories = [
    { id: 'roti', label: '🫓 Roti' },
    { id: 'salan', label: '🍲 Salan' },
    { id: 'kadhai', label: '🧵 Kadhai' },
    { id: 'silai', label: '✂️ Silai' },
    { id: 'sharqpur-sweet', label: '🍯 Sharqpur Mithai' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border-4 border-pink-400 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-rose-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Camera className="w-6 h-6" />
            <h3 className="text-lg sm:text-xl font-black">Tasveer Khincho</h3>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category selector pills */}
        <div className="p-3 bg-pink-50 border-b border-pink-200">
          <span className="block text-xs font-bold text-pink-900 mb-1.5 uppercase">
            Kis cheez ki tasveer hai?
          </span>
          <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-pink-600 text-white border-pink-700 shadow-sm'
                    : 'bg-white text-pink-700 border-pink-200 hover:bg-pink-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Video stream or upload fallback */}
        <div className="relative flex-1 bg-black min-h-[300px] flex items-center justify-center overflow-hidden">
          {cameraActive ? (
            <>
              <video
                ref={videoRef}
                playsInline
                muted
                className="w-full h-full object-cover max-h-[50vh]"
              />
              {/* Overlay framing lines */}
              <div className="absolute inset-8 border-2 border-dashed border-white/60 rounded-3xl pointer-events-none flex flex-col justify-between p-4">
                <span className="text-white/80 text-xs font-bold bg-black/40 px-2 py-1 rounded-md self-center">
                  Cheez ko frame ke darmiyan rakhein
                </span>
              </div>
            </>
          ) : (
            <div className="p-6 text-center text-white space-y-3">
              {cameraError ? (
                <>
                  <AlertCircle className="w-12 h-12 text-pink-400 mx-auto" />
                  <p className="text-sm font-medium text-pink-100">{cameraError}</p>
                </>
              ) : (
                <>
                  <Camera className="w-12 h-12 text-pink-400 mx-auto animate-pulse" />
                  <p className="text-sm font-medium text-pink-100">Camera load ho raha hai...</p>
                </>
              )}
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-full shadow-md"
              >
                Dobara Koshish Karein
              </button>
            </div>
          )}

          {/* Switch Camera Button (Front / Back) */}
          {cameraActive && (
            <button
              onClick={toggleCameraFacing}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-sm cursor-pointer transition-transform active:rotate-180"
              title="Camera badlein"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Footer controls: Capture button & Gallery upload button */}
        <div className="p-4 sm:p-5 bg-white border-t border-pink-100 flex items-center justify-around">
          {/* Gallery Upload Input */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center p-2 text-pink-800 hover:text-pink-950 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600 mb-1 border border-pink-300">
              <Upload className="w-6 h-6" />
            </div>
            <span className="text-xs font-black">Gallery</span>
          </button>

          {/* Big Pink Circular Shutter Button */}
          <button
            onClick={handleCaptureSnapshot}
            disabled={!cameraActive}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-600 to-rose-500 p-1.5 shadow-xl shadow-pink-500/40 hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 cursor-pointer border-4 border-white"
          >
            <div className="w-full h-full rounded-full border-2 border-white flex items-center justify-center bg-pink-500 hover:bg-pink-600">
              <div className="w-8 h-8 rounded-full bg-white shadow-inner" />
            </div>
          </button>

          {/* Quick Info text */}
          <div className="flex flex-col items-center text-center max-w-[80px]">
            <Sparkles className="w-5 h-5 text-pink-500 mb-1" />
            <span className="text-[11px] font-bold text-pink-900 leading-tight">
              Safai Se Jaanch
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

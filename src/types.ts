export interface AnalysisResult {
  title: string;
  itemDetected: string;
  status: 'behtareen' | 'thoda_sudhar' | 'seekhnay_ki_zaroorat';
  feedback: string;
  tips: string[];
  encouragement: string;
  audioText: string;
  imagePreview?: string;
  timestamp?: number;
}

export interface VoiceResult {
  title: string;
  answer: string;
  quickTip: string;
  encouragement: string;
  audioText: string;
}

export interface SampleSkill {
  id: string;
  title: string;
  category: 'roti' | 'salan' | 'kadhai' | 'silai' | 'meetha';
  label: string;
  description: string;
  expectedFeedback: string;
  imageData: string; // SVG or inline image data
}

export interface GuideArticle {
  id: string;
  title: string;
  category: string;
  icon: string;
  summary: string;
  steps: {
    number: number;
    heading: string;
    detail: string;
  }[];
  saheliTip: string;
  audioSummary: string;
}

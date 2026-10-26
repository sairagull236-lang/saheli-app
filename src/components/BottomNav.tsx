import React from 'react';
import { Home, BookOpen, Settings } from 'lucide-react';

export type TabType = 'home' | 'guide' | 'settings';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: 'Home',
      urduSub: 'Ghar',
      icon: Home,
    },
    {
      id: 'guide' as TabType,
      label: 'Guide',
      urduSub: 'Rehnuma',
      icon: BookOpen,
    },
    {
      id: 'settings' as TabType,
      label: 'Settings',
      urduSub: 'Tarjeehat',
      icon: Settings,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-3 border-pink-200 shadow-2xl px-3 py-2 max-w-2xl mx-auto rounded-t-3xl">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-lg shadow-pink-500/30 scale-105'
                  : 'text-pink-900 hover:bg-pink-50'
              }`}
            >
              <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-xs sm:text-sm font-black tracking-tight mt-0.5">
                {tab.label}
              </span>
              <span className={`text-[10px] font-semibold ${isActive ? 'text-pink-100' : 'text-pink-600'}`}>
                {tab.urduSub}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

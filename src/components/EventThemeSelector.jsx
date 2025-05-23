import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';

const themes = [
  {
    id: 'midnight-azure',
    name: 'Midnight Azure',
    className: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700',
    description: 'Deep professional elegance',
    animation: 'animate-slow-drift',
  },
  {
    id: 'pearl-mist',
    name: 'Pearl Mist',
    className: 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200',
    description: 'Clean minimalist aesthetic',
    animation: 'animate-slow-breathe',
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    className: 'bg-gradient-to-br from-sky-900 via-sky-700 to-sky-600',
    description: 'Calming ocean vibes',
    animation: 'animate-slow-wave',
  },
];

const EventThemeSelector = ({ selectedTheme, onThemeChange }) => {
  const [showModal, setShowModal] = useState(false);
  const current = themes.find(t => t.id === selectedTheme) || themes[0];

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-3 p-4 w-full rounded-xl bg-white/10 border border-white/20"
      >
        <Palette size={20} />
        <div className="flex-1 text-left">
          <div className="text-sm font-medium text-white">Theme</div>
          <div className="text-xs text-white/70">{current.name}</div>
        </div>
        <div className={`w-8 h-8 rounded-lg ${current.className}`} />
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121212] w-full max-w-4xl rounded-xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-white text-xl font-semibold">Select a Theme</h2>
              <button onClick={() => setShowModal(false)} className="text-white">✕</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
              {themes.map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme.id);
                    setShowModal(false);
                  }}
                  className={`relative rounded-xl p-4 cursor-pointer transition-all duration-300 border ${
                    selectedTheme === theme.id
                      ? 'border-white scale-105 shadow-lg'
                      : 'border-white/10 hover:border-white/30'
                  } ${theme.className} ${theme.animation}`}
                >
                  <div className="text-white font-semibold">{theme.name}</div>
                  <div className="text-white/70 text-sm">{theme.description}</div>
                  {selectedTheme === theme.id && (
                    <Check className="absolute top-3 right-3 text-white" size={18} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style >{`
        @keyframes slow-drift {
          0%, 100% { transform: translateX(-5%); }
          50% { transform: translateX(5%); }
        }
        @keyframes slow-breathe {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        @keyframes slow-wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-slow-drift { animation: slow-drift 6s ease-in-out infinite; }
        .animate-slow-breathe { animation: slow-breathe 4s ease-in-out infinite; }
        .animate-slow-wave { animation: slow-wave 5s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default EventThemeSelector;

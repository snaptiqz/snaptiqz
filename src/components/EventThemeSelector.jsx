import React, { useState, useEffect } from 'react';
import { Palette, Check, Sparkles, Waves, Circle, Square, Triangle, Star, Zap, Sunset, Moon, Sun } from 'lucide-react';

const EventThemeSelector = ({ selectedTheme, onThemeChange, eventName = "Event Name" }) => {
  const [showThemeModal, setShowThemeModal] = useState(false);

  const themes = [
    {
      id: 'midnight-azure',
      name: 'Midnight Azure',
      category: 'Minimal',
      preview: '#0f172a',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      className: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700',
      animation: 'drift',
      description: 'Deep professional elegance'
    },
    {
      id: 'pearl-mist',
      name: 'Pearl Mist',
      category: 'Minimal',
      preview: '#f8fafc',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      className: 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200',
      animation: 'breathe',
      description: 'Clean minimalist aesthetic'
    },
    {
      id: 'ocean-depths',
      name: 'Ocean Depths', 
      category: 'Aesthetic',
      preview: '#0369a1',
      background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)',
      className: 'bg-gradient-to-br from-sky-900 via-sky-700 to-sky-600',
      animation: 'wave',
      description: 'Calming ocean vibes'
    },
    {
      id: 'sage-whisper',
      name: 'Sage Whisper',
      category: 'Aesthetic',
      preview: '#15803d',
      background: 'linear-gradient(135deg, #14532d 0%, #15803d 50%, #16a34a 100%)',
      className: 'bg-gradient-to-br from-green-900 via-green-700 to-green-600',
      animation: 'sway',
      description: 'Natural sophisticated tone'
    },
    {
      id: 'blush-gradient',
      name: 'Blush',
      category: 'Aesthetic',
      preview: '#ec4899',
      background: 'linear-gradient(135deg, #be185d 0%, #ec4899 50%, #f472b6 100%)',
      className: 'bg-gradient-to-br from-pink-700 via-pink-500 to-pink-400',
      animation: 'pulse',
      description: 'Warm elegant pink'
    },
    {
      id: 'lavender-dream',
      name: 'Lavender Dream',
      category: 'Aesthetic',
      preview: '#8b5cf6',
      background: 'linear-gradient(135deg, #6d28d9 0%, #8b5cf6 50%, #a78bfa 100%)',
      className: 'bg-gradient-to-br from-violet-700 via-violet-500 to-violet-400',
      animation: 'float',
      description: 'Soft purple sophistication'
    },
    {
      id: 'sunset-amber',
      name: 'Sunset Amber',
      category: 'Warm',
      preview: '#f59e0b',
      background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)',
      className: 'bg-gradient-to-br from-amber-600 via-amber-500 to-amber-400',
      animation: 'shimmer',
      description: 'Golden hour warmth'
    },
    {
      id: 'coral-embrace',
      name: 'Coral Embrace',
      category: 'Warm',
      preview: '#f97316',
      background: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)',
      className: 'bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400',
      animation: 'glow',
      description: 'Vibrant coral energy'
    },
    {
      id: 'teal-serenity',
      name: 'Teal Serenity',
      category: 'Cool',
      preview: '#0d9488',
      background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 50%, #14b8a6 100%)',
      className: 'bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500',
      animation: 'ripple',
      description: 'Balanced tranquility'
    },
    {
      id: 'indigo-twilight',
      name: 'Indigo Twilight',
      category: 'Cool',
      preview: '#4f46e5',
      background: 'linear-gradient(135deg, #3730a3 0%, #4f46e5 50%, #6366f1 100%)',
      className: 'bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500',
      animation: 'drift',
      description: 'Deep twilight mystery'
    },
    {
      id: 'rose-gold',
      name: 'Rose Gold',
      category: 'Warm',
      preview: '#e11d48',
      background: 'linear-gradient(135deg, #be123c 0%, #e11d48 50%, #f43f5e 100%)',
      className: 'bg-gradient-to-br from-rose-700 via-rose-600 to-rose-500',
      animation: 'breathe',
      description: 'Elegant rose metallics'
    },
    {
      id: 'cosmic-purple',
      name: 'Cosmic Purple',
      category: 'Cool',
      preview: '#7c3aed',
      background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #8b5cf6 100%)',
      className: 'bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500',
      animation: 'cosmic',
      description: 'Mystical cosmic energy'
    }
  ];

  const categories = ['All', 'Minimal', 'Aesthetic', 'Warm', 'Cool'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredThemes = activeCategory === 'All' 
    ? themes 
    : themes.filter(theme => theme.category === activeCategory);

  const currentTheme = themes.find(t => t.id === selectedTheme) || themes[0];

  const ThemePreview = ({ theme, isSelected, onClick }) => {
    const isLightTheme = ['pearl-mist'].includes(theme.id);
    
    return (
      <div 
        className={`
          relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border transition-all duration-500 group
          ${isSelected ? 'border-white ring-2 ring-white/30 scale-[1.02] shadow-2xl' : 'border-white/10 hover:border-white/30 hover:scale-[1.01]'}
        `}
        onClick={onClick}
      >
        {/* Animated Theme Background */}
        <div className={`w-full h-full ${theme.className} relative transition-all duration-700 group-hover:scale-105`}>
          {/* Animation Overlays */}
          {theme.animation === 'drift' && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-slow-drift"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/10 animate-slow-drift-reverse"></div>
            </div>
          )}
          
          {theme.animation === 'breathe' && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-white/5 animate-slow-breathe"></div>
            </div>
          )}
          
          {theme.animation === 'wave' && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent animate-slow-wave"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/5 to-transparent animate-gentle-bob"></div>
            </div>
          )}
          
          {theme.animation === 'sway' && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-white/5 animate-gentle-sway"></div>
            </div>
          )}
          
          {theme.animation === 'pulse' && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 animate-slow-pulse"></div>
            </div>
          )}
          
          {theme.animation === 'float' && (
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/10 rounded-full blur-md animate-gentle-float"></div>
              <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-white/8 rounded-full blur-md animate-gentle-float-delayed"></div>
            </div>
          )}
          
          {theme.animation === 'shimmer' && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 animate-slow-shimmer"></div>
            </div>
          )}
          
          {theme.animation === 'glow' && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-radial from-white/12 via-transparent to-white/5 animate-slow-glow"></div>
            </div>
          )}
          
          {theme.animation === 'ripple' && (
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 bg-white/8 rounded-full animate-slow-ripple"></div>
            </div>
          )}
          
          {theme.animation === 'cosmic' && (
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/80 rounded-full animate-twinkle"></div>
              <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-twinkle-delayed"></div>
              <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white/70 rounded-full animate-twinkle-slow"></div>
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/5 to-transparent animate-slow-pulse"></div>
            </div>
          )}
          
          {/* Content preview */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className={`w-8 h-8 rounded-full mb-3 ${isLightTheme ? 'bg-gray-400/30' : 'bg-white/20'} flex items-center justify-center backdrop-blur-sm`}>
              <div className={`w-3 h-3 rounded-full ${isLightTheme ? 'bg-gray-600' : 'bg-white'}`}></div>
            </div>
            <div className={`text-center ${isLightTheme ? 'text-gray-800' : 'text-white'}`}>
              <div className={`h-2 w-16 mb-2 rounded-full ${isLightTheme ? 'bg-gray-400/40' : 'bg-white/30'} backdrop-blur-sm`}></div>
              <div className={`h-1 w-12 rounded-full ${isLightTheme ? 'bg-gray-400/30' : 'bg-white/20'} backdrop-blur-sm`}></div>
            </div>
          </div>
        </div>
        
        {/* Check Mark for Selected */}
        {isSelected && (
          <div className="absolute top-3 right-3 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20">
            <Check size={16} className="text-gray-900" />
          </div>
        )}
        
        {/* Theme Name */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className={`${isLightTheme ? 'bg-white/80' : 'bg-black/50'} backdrop-blur-md rounded-xl px-4 py-3 border ${isLightTheme ? 'border-white/30' : 'border-white/10'}`}>
            <p className={`${isLightTheme ? 'text-gray-800' : 'text-white'} text-sm font-semibold`}>{theme.name}</p>
            <p className={`${isLightTheme ? 'text-gray-600' : 'text-white/70'} text-xs mt-1`}>{theme.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Theme Selector Button */}
      <button
        onClick={() => setShowThemeModal(true)}
        className="flex items-center gap-3 mb-2 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer hover:bg-white/15 transition-all duration-300 w-full"
      >
        <Palette className="text-white/80" size={20} />
        <div className="text-left flex-1">
          <div className="text-sm font-medium text-white">Theme</div>
          <div className="text-xs text-white/70">{currentTheme.name}</div>
        </div>
        <div 
          className={`w-8 h-8 rounded-lg ${currentTheme.className} border border-white/30 shadow-sm`}
        ></div>
      </button>

      {/* Theme Selection Modal */}
      {showThemeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-8 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-2">Choose Theme</h2>
                  <p className="text-sm text-white/70">Select an aesthetic theme for your event</p>
                </div>
                <button
                  onClick={() => setShowThemeModal(false)}
                  className="text-white/60 hover:text-white transition-all duration-300 p-3 hover:bg-white/10 rounded-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Category Filters */}
              <div className="flex gap-3 mt-6 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? 'bg-white text-gray-900 shadow-lg'
                        : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Grid */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-350px)]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredThemes.map((theme) => (
                  <ThemePreview
                    key={theme.id}
                    theme={theme}
                    isSelected={selectedTheme === theme.id}
                    onClick={() => {
                      onThemeChange(theme.id);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Preview Section */}
            <div className="p-8 border-t border-white/10 bg-black/20">
              <div className="flex items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-white mb-3">Live Preview</h3>
                  <div className={`h-28 rounded-2xl ${currentTheme.className} relative overflow-hidden shadow-xl border border-white/20`}>
                    {/* Mini event preview with current theme animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Add the current theme's animation */}
                      {currentTheme.animation === 'drift' && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-slow-drift"></div>
                      )}
                      {currentTheme.animation === 'breathe' && (
                        <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-white/5 animate-slow-breathe"></div>
                      )}
                      
                      <div className="text-center relative z-10">
                        <div className={`w-10 h-10 rounded-full mx-auto mb-3 ${
                          ['pearl-mist'].includes(currentTheme.id) 
                            ? 'bg-gray-400/30' 
                            : 'bg-white/20'
                        } flex items-center justify-center backdrop-blur-sm`}>
                          <div className={`w-4 h-4 rounded-full ${
                            ['pearl-mist'].includes(currentTheme.id) 
                              ? 'bg-gray-600' 
                              : 'bg-white'
                          }`}></div>
                        </div>
                        <h4 className={`font-semibold text-base ${
                          ['pearl-mist'].includes(currentTheme.id) 
                            ? 'text-gray-800' 
                            : 'text-white'
                        }`}>{eventName}</h4>
                        <p className={`text-sm mt-2 ${
                          ['pearl-mist'].includes(currentTheme.id) 
                            ? 'text-gray-600' 
                            : 'text-white/80'
                        }`}>Event Preview</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowThemeModal(false)}
                    className="px-6 py-3 text-white/80 bg-white/10 border border-white/20 rounded-xl font-medium hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowThemeModal(false)}
                    className="px-8 py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-white/90 transition-all duration-300 shadow-lg"
                  >
                    Apply Theme
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for smooth animations */}
      <style jsx>{`
        @keyframes slow-drift {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes slow-drift-reverse {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
        
        @keyframes slow-breathe {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes slow-wave {
          0%, 100% { transform: translateX(-50%) skewX(-5deg); }
          50% { transform: translateX(50%) skewX(5deg); }
        }
        
        @keyframes gentle-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gentle-sway {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        
        @keyframes slow-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes gentle-float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(8px) rotate(-1deg); }
          66% { transform: translateY(-6px) rotate(1deg); }
        }
        
        @keyframes slow-shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes slow-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        @keyframes slow-ripple {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes twinkle-delayed {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        @keyframes twinkle-slow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.3); }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
        
        .animate-slow-drift {
          animation: slow-drift 8s ease-in-out infinite;
        }
        
        .animate-slow-drift-reverse {
          animation: slow-drift-reverse 12s ease-in-out infinite;
        }
        
        .animate-slow-breathe {
          animation: slow-breathe 6s ease-in-out infinite;
        }
        
        .animate-slow-wave {
          animation: slow-wave 10s ease-in-out infinite;
        }
        
        .animate-gentle-bob {
          animation: gentle-bob 4s ease-in-out infinite;
        }
        
        .animate-gentle-sway {
          animation: gentle-sway 8s ease-in-out infinite;
        }
        
        .animate-slow-pulse {
          animation: slow-pulse 5s ease-in-out infinite;
        }
        
        .animate-gentle-float {
          animation: gentle-float 6s ease-in-out infinite;
        }
        
        .animate-gentle-float-delayed {
          animation: gentle-float-delayed 7s ease-in-out infinite 1s;
        }
        
        .animate-slow-shimmer {
          animation: slow-shimmer 4s ease-in-out infinite;
        }
        
        .animate-slow-glow {
          animation: slow-glow 4s ease-in-out infinite;
        }
        
        .animate-slow-ripple {
          animation: slow-ripple 3s ease-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        
        .animate-twinkle-delayed {
          animation: twinkle-delayed 4s ease-in-out infinite 0.5s;
        }
        
        .animate-twinkle-slow {
          animation: twinkle-slow 5s ease-in-out infinite 1s;
        }
      `}</style>
    </>
  );
};

// Hook to get theme styles
export const useThemeStyles = (themeId) => {
  const themes = [
    {
      id: 'midnight-azure',
      backgroundClass: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700',
      containerClass: 'bg-slate-900/90 backdrop-blur-sm',
      overlayClass: 'bg-slate-900/40',
      textClass: 'text-white',
      cardClass: 'bg-white/10 backdrop-blur-sm border-white/20',
      inputClass: 'bg-slate-800/50 border-slate-700/50 text-white placeholder-white/50'
    },
    {
      id: 'pearl-mist',
      backgroundClass: 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200',
      containerClass: 'bg-white/90 backdrop-blur-sm',
      overlayClass: 'bg-white/60',
      textClass: 'text-gray-900',
      cardClass: 'bg-white/60 backdrop-blur-sm border-gray-200/50',
      inputClass: 'bg-white/70 border-gray-200/50 text-gray-900 placeholder-gray-500'
    },
    {
      id: 'ocean-depths',
      backgroundClass: 'bg-gradient-to-br from-sky-900 via-sky-700 to-sky-600',
      containerClass: 'bg-sky-900/90 backdrop-blur-sm',
      overlayClass: 'bg-sky-900/40',
      textClass: 'text-white',
      cardClass: 'bg-white/10 backdrop-blur-sm border-white/20',
      inputClass: 'bg-sky-800/50 border-sky-700/50 text-white placeholder-white/50'
    },
    {
      id: 'sage-whisper',
      backgroundClass: 'bg-gradient-to-br from-green-900 via-green-700 to-green-600',
      containerClass: 'bg-green-900/90 backdrop-blur-sm',
      overlayClass: 'bg-green-900/40',
      textClass: 'text-white',
      cardClass: 'bg-white/10 backdrop-blur-sm border-white/20',
      inputClass: 'bg-green-800/50 border-green-700/50 text-white placeholder-white/50'
    },
    {
      id: 'blush-gradient',
      backgroundClass: 'bg-gradient-to-br from-pink-700 via-pink-500 to-pink-400',
      containerClass: 'bg-pink-700/90 backdrop-blur-sm',
      overlayClass: 'bg-pink-700/40',
      textClass: 'text-white',
      cardClass: 'bg-white/10 backdrop-blur-sm border-white/20',
      inputClass: 'bg-pink-800/50 border-pink-700/50 text-white placeholder-white/50'
    },
    {
      id: 'lavender-dream',
      backgroundClass: 'bg-gradient-to-br from-violet-700 via-violet-500 to-violet-400',
      containerClass: 'bg-violet-700/90 backdrop-blur-sm',
      overlayClass: 'bg-violet-700/40',
      textClass: 'text-white',
      cardClass: 'bg-white/10 backdrop-blur-sm border-white/20',
      inputClass: 'bg-violet-800/50 border-violet-700/50 text-white placeholder-white/50'
    },
    
  ];

  return themes.find(theme => theme.id === themeId) || themes[0];
};

export default EventThemeSelector;
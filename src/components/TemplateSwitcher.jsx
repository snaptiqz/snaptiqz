import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Palette, Type, Eye, Sparkles } from 'lucide-react';

const TemplateSwitcher = ({ onTemplateChange, onColorChange, onStyleChange }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [selectedColor, setSelectedColor] = useState('orange');
  const [selectedFont, setSelectedFont] = useState('ivy-presto');
  const [selectedDisplay, setSelectedDisplay] = useState('auto');
  const [showOverlay, setShowOverlay] = useState(false);
  const [activeTab, setActiveTab] = useState('templates');

  const overlayRef = useRef(null);

  const templates = [
    { 
      id: 'minimal', 
      name: 'Minimal', 
      description: 'Clean and simple design',
      preview: 'bg-gradient-to-br from-slate-100 to-slate-200',
      category: 'Professional'
    },
    { 
      id: 'quantum', 
      name: 'Quantum', 
      description: 'Futuristic with cosmic vibes',
      preview: 'bg-gradient-to-br from-blue-400 to-purple-600',
      category: 'Creative'
    },
    { 
      id: 'warp', 
      name: 'Warp', 
      description: 'Dark theme with geometric lines',
      preview: 'bg-gradient-to-br from-gray-900 to-black',
      category: 'Dark',
      hasPattern: 'lines'
    },
    { 
      id: 'emoji', 
      name: 'Emoji', 
      description: 'Playful and colorful',
      preview: 'bg-gradient-to-br from-yellow-200 to-orange-300',
      category: 'Fun'
    },
    { 
      id: 'confetti', 
      name: 'Confetti', 
      description: 'Celebration with particle effects',
      preview: 'bg-gradient-to-br from-purple-400 to-pink-500',
      category: 'Fun',
      hasPattern: 'dots'
    },
    { 
      id: 'pattern', 
      name: 'Pattern', 
      description: 'Elegant waves and flows',
      preview: 'bg-gradient-to-br from-indigo-500 to-blue-600',
      category: 'Creative',
      hasPattern: 'waves'
    },
    { 
      id: 'seasonal', 
      name: 'Seasonal', 
      description: 'Adaptive seasonal themes',
      preview: 'bg-gradient-to-br from-teal-400 to-cyan-500',
      category: 'Special',
      isNew: true
    }
  ];

  const colors = [
    { id: 'white', name: 'White', color: '#ffffff', textColor: 'text-gray-800' },
    { id: 'pink', name: 'Pink', color: '#ec4899', textColor: 'text-white' },
    { id: 'purple', name: 'Purple', color: '#a855f7', textColor: 'text-white' },
    { id: 'indigo', name: 'Indigo', color: '#6366f1', textColor: 'text-white' },
    { id: 'blue', name: 'Blue', color: '#3b82f6', textColor: 'text-white' },
    { id: 'green', name: 'Green', color: '#10b981', textColor: 'text-white' },
    { id: 'yellow', name: 'Yellow', color: '#f59e0b', textColor: 'text-black' },
    { id: 'orange', name: 'Orange', color: '#f97316', textColor: 'text-white' },
    { id: 'red', name: 'Red', color: '#ef4444', textColor: 'text-white' },
    { id: 'gradient', name: 'Gradient', color: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)', textColor: 'text-white' }
  ];

  const fonts = [
    { id: 'ivy-presto', name: 'Ivy Presto', style: 'serif', description: 'Classic serif typeface' },
    { id: 'helvetica', name: 'Helvetica', style: 'sans-serif', description: 'Modern sans-serif' },
    { id: 'georgia', name: 'Georgia', style: 'serif', description: 'Readable serif font' },
    { id: 'times', name: 'Times New Roman', style: 'serif', description: 'Traditional serif' },
    { id: 'arial', name: 'Arial', style: 'sans-serif', description: 'Universal sans-serif' }
  ];

  const displays = [
    { id: 'auto', name: 'Auto', description: 'Responsive to device', icon: '📱💻' },
    { id: 'desktop', name: 'Desktop', description: 'Optimized for desktop', icon: '💻' },
    { id: 'mobile', name: 'Mobile', description: 'Mobile-first design', icon: '📱' },
    { id: 'tablet', name: 'Tablet', description: 'Tablet-optimized layout', icon: '📱' }
  ];

  // Close overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        setShowOverlay(false);
      }
    };

    if (showOverlay) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [showOverlay]);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
    onTemplateChange?.(template);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color.id);
    onColorChange?.(color);
  };

  const getColorStyle = (color) => {
    if (color.id === 'gradient') {
      return { background: color.color };
    }
    return { backgroundColor: color.color };
  };

  const renderPattern = (hasPattern) => {
    switch (hasPattern) {
      case 'lines':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-px bg-white/30"></div>
          </div>
        );
      case 'dots':
        return (
          <div className="absolute inset-0 flex items-center justify-center gap-1">
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
          </div>
        );
      case 'waves':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="24" height="12" viewBox="0 0 24 12" className="text-white/40">
              <path d="M0 6 Q6 0 12 6 T24 6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const selectedColorObj = colors.find(c => c.id === selectedColor);
  const selectedTemplateObj = templates.find(t => t.id === selectedTemplate);
  const selectedFontObj = fonts.find(f => f.id === selectedFont);
  const selectedDisplayObj = displays.find(d => d.id === selectedDisplay);

  const tabs = [
    { id: 'templates', name: 'Templates', icon: Sparkles },
    { id: 'colors', name: 'Colors', icon: Palette },
    { id: 'fonts', name: 'Fonts', icon: Type },
    { id: 'display', name: 'Display', icon: Eye }
  ];

  return (
    <>
      {/* Trigger Button */}
      <div className="relative">
        <button
          onClick={() => setShowOverlay(true)}
          className="flex items-center mb-4 gap-3 px-4 py-2.5 bg-[#0a0a0f]/80 backdrop-blur-sm border border-white/10 rounded-xl text-white hover:bg-[#111118]/80 hover:border-white/20 transition-all duration-200"
        >
          <div className="flex items-center gap-2 ">
            <div 
              className="w-5 h-5 rounded-full border border-white/20"
              style={getColorStyle(selectedColorObj)}
            />
            <span className="text-sm font-medium">{selectedTemplateObj?.name}</span>
          </div>
          <ChevronDown size={16} className="text-white/60" />
        </button>
      </div>

      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Modal */}
          <div 
            ref={overlayRef}
            className="relative w-full max-w-4xl max-h-[80vh] bg-[#0a0a0f]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-xl font-semibold text-white">Customize Template</h2>
                <p className="text-sm text-white/60 mt-1">Choose your perfect design combination</p>
              </div>
              <button
                onClick={() => setShowOverlay(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-white bg-white/5 border-b-2 border-blue-500'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.name}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-96">
              {/* Templates Tab */}
              {activeTab === 'templates' && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className={`relative p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                        selectedTemplate === template.id 
                          ? 'border-blue-500 bg-blue-500/10' 
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className={`relative w-full h-20 rounded-lg ${template.preview} mb-3 overflow-hidden`}>
                        {template.hasPattern && renderPattern(template.hasPattern)}
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-white">{template.name}</span>
                          {template.isNew && (
                            <span className="bg-cyan-500 text-white text-xs px-2 py-0.5 rounded-full">
                              NEW
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/60">{template.description}</p>
                        <span className="inline-block text-xs text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full mt-2">
                          {template.category}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Colors Tab */}
              {activeTab === 'colors' && (
                <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                  {colors.map(color => (
                    <button
                      key={color.id}
                      onClick={() => handleColorSelect(color)}
                      className={`relative group`}
                      title={color.name}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl border-2 transition-all group-hover:scale-110 ${
                          selectedColor === color.id 
                            ? 'border-white scale-110' 
                            : 'border-white/20 group-hover:border-white/50'
                        }`}
                        style={getColorStyle(color)}
                      />
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {color.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Fonts Tab */}
              {activeTab === 'fonts' && (
                <div className="space-y-3">
                  {fonts.map(font => (
                    <button
                      key={font.id}
                      onClick={() => {
                        setSelectedFont(font.id);
                        onStyleChange?.({ font: font.id });
                      }}
                      className={`w-full p-4 text-left rounded-xl border transition-all ${
                        selectedFont === font.id 
                          ? 'border-blue-500 bg-blue-500/10' 
                          : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div 
                            className="text-lg font-medium text-white mb-1"
                            style={{ fontFamily: font.style }}
                          >
                            {font.name}
                          </div>
                          <p className="text-sm text-white/60">{font.description}</p>
                        </div>
                        <span className="text-xs text-white/40 bg-white/10 px-2 py-1 rounded">
                          {font.style}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Display Tab */}
              {activeTab === 'display' && (
                <div className="grid grid-cols-2 gap-4">
                  {displays.map(display => (
                    <button
                      key={display.id}
                      onClick={() => {
                        setSelectedDisplay(display.id);
                        onStyleChange?.({ display: display.id });
                      }}
                      className={`p-4 text-left rounded-xl border transition-all ${
                        selectedDisplay === display.id 
                          ? 'border-blue-500 bg-blue-500/10' 
                          : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      <div className="text-2xl mb-2">{display.icon}</div>
                      <div className="text-sm font-medium text-white mb-1">{display.name}</div>
                      <p className="text-xs text-white/60">{display.description}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Preview Footer */}
            <div className="p-6 border-t border-white/10 bg-[#050507]/50">
              <div className="text-xs text-white/50 mb-3">Live Preview</div>
              <div 
                className={`w-full h-24 rounded-xl border border-white/20 ${selectedTemplateObj?.preview} relative overflow-hidden`}
                style={selectedColor !== 'white' ? { 
                  backgroundColor: selectedColorObj?.color,
                  ...(selectedColorObj?.id === 'gradient' && { background: selectedColorObj.color })
                } : {}}
              >
                {selectedTemplateObj?.hasPattern && renderPattern(selectedTemplateObj.hasPattern)}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className={`text-lg font-medium ${selectedColorObj?.textColor || 'text-white'}`}
                    style={{ fontFamily: selectedFontObj?.style }}
                  >
                    {selectedTemplateObj?.name} • {selectedColorObj?.name}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <span>Template: {selectedTemplateObj?.name}</span>
                  <span>Font: {selectedFontObj?.name}</span>
                  <span>Display: {selectedDisplayObj?.name}</span>
                </div>
                <button
                  onClick={() => setShowOverlay(false)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateSwitcher;
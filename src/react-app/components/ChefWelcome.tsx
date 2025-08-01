import React, { useState } from 'react';
import { ChefHat, Volume2, Globe, Settings2 } from 'lucide-react';

interface ChefWelcomeProps {
  onPreferencesSet: (preferences: {
    inputLanguage: string;
    outputLanguage: string;
    preferredMode: 'text' | 'audio' | 'both';
  }) => void;
}

const ChefWelcome: React.FC<ChefWelcomeProps> = ({ onPreferencesSet }) => {
  const [inputLanguage, setInputLanguage] = useState('en');
  const [outputLanguage, setOutputLanguage] = useState('en');
  const [preferredMode, setPreferredMode] = useState<'text' | 'audio' | 'both'>('both');
  const [showWelcome, setShowWelcome] = useState(true);

  const languages = [
    { code: 'en', name: 'English', emoji: '🇺🇸' },
    { code: 'es', name: 'Spanish', emoji: '🇪🇸' },
    { code: 'fr', name: 'French', emoji: '🇫🇷' },
    { code: 'it', name: 'Italian', emoji: '🇮🇹' },
    { code: 'de', name: 'German', emoji: '🇩🇪' },
    { code: 'zh', name: 'Chinese', emoji: '🇨🇳' },
    { code: 'ja', name: 'Japanese', emoji: '🇯🇵' },
    { code: 'ko', name: 'Korean', emoji: '🇰🇷' },
    { code: 'pt', name: 'Portuguese', emoji: '🇵🇹' },
    { code: 'ru', name: 'Russian', emoji: '🇷🇺' },
    { code: 'ar', name: 'Arabic', emoji: '🇸🇦' },
    { code: 'hi', name: 'Hindi', emoji: '🇮🇳' },
    { code: 'th', name: 'Thai', emoji: '🇹🇭' },
    { code: 'bn', name: 'Bengali', emoji: '🇧🇩' },
  ];

  const handleSubmit = () => {
    onPreferencesSet({
      inputLanguage,
      outputLanguage,
      preferredMode,
    });
    setShowWelcome(false);
  };

  if (!showWelcome) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 sm:p-6 md:p-8 text-white rounded-t-2xl sm:rounded-t-3xl">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-4 text-center sm:text-left">
            <ChefHat className="w-10 h-10 sm:w-12 sm:h-12 mr-0 sm:mr-4 mb-2 sm:mb-0 text-white" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Bonjour! Hola! Namaste! 🌟</h1>
              <p className="text-orange-100 text-base sm:text-lg">I'm your passionate Culinary Companion!</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm sm:text-base md:text-lg text-orange-100 leading-relaxed">
              🍳 Expert chef-bot fluent in 13+ languages, absolutely THRILLED to guide you through incredible culinary adventures! 
              Let me help you create extraordinary dishes with warmth, creativity, and professional techniques! ✨
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
              Let's personalize your magical cooking journey! ✨
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Choose your preferred languages and interaction style so I can create the most amazing, personalized culinary experience just for you!
            </p>
          </div>

          {/* Input Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Globe className="w-4 h-4 inline mr-2" />
              What language will you speak/type in?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-32 sm:max-h-40 overflow-y-auto border border-gray-200 rounded-xl p-2 sm:p-3">
              {languages.map(lang => (
                <button
                  key={`input-${lang.code}`}
                  type="button"
                  onClick={() => setInputLanguage(lang.code)}
                  className={`p-2 sm:p-3 text-xs sm:text-sm rounded-lg border transition-all duration-200 flex items-center ${
                    inputLanguage === lang.code
                      ? 'bg-orange-100 border-orange-300 text-orange-700'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-orange-300'
                  }`}
                >
                  <span className="mr-2">{lang.emoji}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Output Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Volume2 className="w-4 h-4 inline mr-2" />
              What language should I respond in?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-xl p-3">
              {languages.map(lang => (
                <button
                  key={`output-${lang.code}`}
                  type="button"
                  onClick={() => setOutputLanguage(lang.code)}
                  className={`p-3 text-sm rounded-lg border transition-all duration-200 flex items-center ${
                    outputLanguage === lang.code
                      ? 'bg-orange-100 border-orange-300 text-orange-700'
                      : 'bg-white border-gray-300 text-gray-600 hover:border-orange-300'
                  }`}
                >
                  <span className="mr-2">{lang.emoji}</span>
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interaction Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Settings2 className="w-4 h-4 inline mr-2" />
              How would you like to interact?
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPreferredMode('text')}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  preferredMode === 'text'
                    ? 'bg-orange-100 border-orange-300 text-orange-700'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-orange-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">📝</div>
                  <div className="font-medium">Text Only</div>
                  <div className="text-xs opacity-70">Read & type</div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setPreferredMode('audio')}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  preferredMode === 'audio'
                    ? 'bg-orange-100 border-orange-300 text-orange-700'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-orange-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🎤</div>
                  <div className="font-medium">Audio Only</div>
                  <div className="text-xs opacity-70">Speak & listen</div>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setPreferredMode('both')}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  preferredMode === 'both'
                    ? 'bg-orange-100 border-orange-300 text-orange-700'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-orange-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-medium">Both</div>
                  <div className="text-xs opacity-70">Full experience</div>
                </div>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
          >
            <ChefHat className="w-5 h-5 mr-2" />
            Let's Start Cooking! 🍳
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChefWelcome;

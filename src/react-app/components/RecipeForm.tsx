import React, { useState } from 'react';
import { Search, Settings, Globe, Utensils, Shield } from 'lucide-react';
import AutocompleteInput from './AutocompleteInput';
import type { RecipeRequest } from '@/shared/types';

interface RecipeFormProps {
  onSubmit: (request: RecipeRequest) => void;
  loading: boolean;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, loading }) => {
  const [ingredients, setIngredients] = useState('');
  
  const [language, setLanguage] = useState('en');
  const [cuisineStyle, setCuisineStyle] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

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

  const cuisineStyles = [
    'Italian', 'Mexican', 'Chinese', 'Japanese', 'Indian', 'Thai', 'French', 
    'Mediterranean', 'American', 'Korean', 'Vietnamese', 'Greek', 'Middle Eastern'
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 
    'Paleo', 'Low-Carb', 'Low-Sodium', 'Nut-Free', 'Diabetic-Friendly'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    onSubmit({
      ingredients: ingredients.trim(),
      inputType: 'text',
      language,
      dietaryRestrictions: dietaryRestrictions.length > 0 ? dietaryRestrictions : undefined,
      cuisineStyle: cuisineStyle || undefined,
    });
  };

  const toggleDietaryRestriction = (restriction: string) => {
    setDietaryRestrictions(prev =>
      prev.includes(restriction)
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    );
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm bg-white/95 border border-gray-100 w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Main input */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What dish would you like to prepare? 👨‍🍳
          </label>
          <AutocompleteInput
            value={ingredients}
            onChange={setIngredients}
            onTranscript={(transcript) => setIngredients(prev => prev ? `${prev}, ${transcript}` : transcript)}
            placeholder="e.g. chicken parmesan, thai curry, chocolate cake..."
            className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg placeholder-gray-400 transition-all duration-200"
          />
        </div>

        {/* Quick settings */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 inline mr-1" />
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.emoji} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced settings toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center text-sm text-gray-600 hover:text-orange-600 transition-colors"
        >
          <Settings className="w-4 h-4 mr-1" />
          Advanced Settings
          <span className="ml-2">{showAdvanced ? '▼' : '▶'}</span>
        </button>

        {/* Advanced settings */}
        {showAdvanced && (
          <div className="space-y-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
            {/* Cuisine style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Utensils className="w-4 h-4 inline mr-1" />
                Cuisine Style (optional)
              </label>
              <select
                value={cuisineStyle}
                onChange={(e) => setCuisineStyle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="">Any cuisine</option>
                {cuisineStyles.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>

            {/* Dietary restrictions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Shield className="w-4 h-4 inline mr-1" />
                Dietary Restrictions
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {dietaryOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleDietaryRestriction(option)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 ${
                      dietaryRestrictions.includes(option)
                        ? 'bg-orange-100 border-orange-300 text-orange-700'
                        : 'bg-white border-gray-300 text-gray-600 hover:border-orange-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading || !ingredients.trim()}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
              Generating Recipes...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Get My Recipes!
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;

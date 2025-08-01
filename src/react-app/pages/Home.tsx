import { useState, useEffect } from 'react';
import { ChefHat, Sparkles, Heart } from 'lucide-react';
import RecipeForm from '@/react-app/components/RecipeForm';
import RecipeCard from '@/react-app/components/RecipeCard';
import ChefWelcome from '@/react-app/components/ChefWelcome';
import type { RecipeRequest, Recipe, RecipeResponse } from '@/shared/types';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    inputLanguage: 'en',
    outputLanguage: 'en',
    preferredMode: 'both' as 'text' | 'audio' | 'both'
  });

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Apply custom font styles
    document.documentElement.style.setProperty('--font-primary', '"Inter", system-ui, sans-serif');
    document.documentElement.style.setProperty('--font-display', '"Playfair Display", serif');
  }, []);

  const handlePreferencesSet = (preferences: typeof userPreferences) => {
    setUserPreferences(preferences);
    setShowWelcome(false);
    
    // Store preferences for current session only
    sessionStorage.setItem('culinary-preferences', JSON.stringify(preferences));
  };

  // Load saved preferences from session storage
  useEffect(() => {
    const savedPreferences = sessionStorage.getItem('culinary-preferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setUserPreferences(parsed);
        setShowWelcome(false);
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }
  }, []);

  const handleRecipeRequest = async (request: RecipeRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      // Intelligently clean and process the input
      const cleanedIngredients = request.ingredients
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s,]/g, '') // Remove special characters
        .split(/[,\s]+/)
        .map(word => word.trim())
        .filter(word => word.length > 2)
        .join(', ');

      // Check for dietary restriction conflicts and provide intelligent alternatives
      let processedRequest = cleanedIngredients;
      let adaptationNote = '';
      
      if (request.dietaryRestrictions && request.dietaryRestrictions.length > 0) {
        const restrictions = request.dietaryRestrictions;
        
        // Check for conflicts and suggest alternatives
        if (restrictions.includes('Vegetarian') || restrictions.includes('Vegan')) {
          if (/chicken|beef|pork|fish|meat|lamb|turkey/i.test(cleanedIngredients)) {
            processedRequest = cleanedIngredients.replace(/chicken|beef|pork|fish|meat|lamb|turkey/gi, 'plant-based protein');
            adaptationNote = `🌱 Adapted for ${restrictions.join(' & ')}: Replaced animal proteins with plant-based alternatives like tofu, tempeh, or legumes.`;
          }
        }
        
        if (restrictions.includes('Dairy-Free')) {
          if (/cheese|milk|butter|cream|yogurt/i.test(cleanedIngredients)) {
            processedRequest = processedRequest.replace(/cheese|milk|butter|cream|yogurt/gi, 'dairy-free alternative');
            adaptationNote += adaptationNote ? ' Also using dairy-free substitutes.' : '🥥 Using dairy-free alternatives like coconut milk, cashew cheese, and plant-based butter.';
          }
        }
        
        if (restrictions.includes('Gluten-Free')) {
          if (/bread|flour|pasta|wheat/i.test(cleanedIngredients)) {
            processedRequest = processedRequest.replace(/bread|flour|pasta|wheat/gi, 'gluten-free alternative');
            adaptationNote += adaptationNote ? ' Plus gluten-free options.' : '🌾 Using gluten-free flour and alternatives to ensure your dish is safe and delicious.';
          }
        }
      }

      // Enhanced request with user preferences and intelligent processing
      const enhancedRequest = {
        ...request,
        ingredients: processedRequest,
        language: userPreferences.outputLanguage,
        preferredMode: userPreferences.preferredMode,
        adaptationNote,
      };

      // Show adaptation note if any changes were made
      if (adaptationNote) {
        setError(null); // Clear any previous errors
        // We'll show this as an info message instead of error
        setTimeout(() => {
          const infoElement = document.createElement('div');
          infoElement.className = 'fixed top-4 right-4 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-xl shadow-lg z-50 max-w-md';
          infoElement.innerHTML = `<div class="flex items-start"><div class="flex-shrink-0 mr-2 mt-0.5">ℹ️</div><div><strong>Smart Adaptation:</strong><br>${adaptationNote}</div></div>`;
          document.body.appendChild(infoElement);
          setTimeout(() => document.body.removeChild(infoElement), 8000);
        }, 500);
      }

      const response = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enhancedRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate recipes');
      }

      const data: RecipeResponse = await response.json();
      setRecipes(data.recipes);
    } catch (err) {
      console.error('Recipe generation error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 overflow-x-hidden">
      {/* Chef Welcome Modal */}
      {showWelcome && (
        <ChefWelcome onPreferencesSet={handlePreferencesSet} />
      )}
      {/* Custom styles */}
      <style>{`
        body { font-family: var(--font-primary, "Inter", system-ui, sans-serif); }
        .font-display { font-family: var(--font-display, "Playfair Display", serif); }
        .line-clamp-2 { 
          display: -webkit-box; 
          -webkit-line-clamp: 2; 
          -webkit-box-orient: vertical; 
          overflow: hidden; 
        }
      `}</style>

      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        
        <div className="relative z-10 px-4 py-8 md:py-16 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
              <ChefHat className="w-12 h-12 sm:w-16 sm:h-16 mr-0 sm:mr-4 mb-2 sm:mb-0 text-white drop-shadow-lg" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display drop-shadow-lg text-center">
                Culinary Companion
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center mb-6">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-0 sm:mr-2 mb-1 sm:mb-0 text-yellow-300" />
              <p className="text-lg sm:text-xl md:text-2xl font-light opacity-95 text-center px-4">
                Transform your culinary dreams into delicious reality with your personal AI chef! 🍳✨
              </p>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 ml-0 sm:ml-2 mt-1 sm:mt-0 text-yellow-300" />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm sm:text-lg opacity-90">
              <span className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-300" />
                Personalized Recipes
              </span>
              <span className="flex items-center">
                <ChefHat className="w-5 h-5 mr-2 text-yellow-300" />
                Expert Guidance
              </span>
              <span className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-blue-300" />
                AI-Powered
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Recipe form */}
          <div className="mb-12">
            <RecipeForm onSubmit={handleRecipeRequest} loading={loading} />
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="text-center py-16 px-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6">
                <div className="animate-spin rounded-full h-8 w-8 border-3 border-orange-500 border-t-transparent"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">✨ Your Chef is Working Magic! ✨</h3>
              <p className="text-gray-600 max-w-md mx-auto">I'm carefully crafting personalized recipes with expert techniques, creative twists, and beautiful presentation ideas just for you! This will be absolutely delicious! 👨‍🍳🌟</p>
            </div>
          )}

          {/* Recipes grid */}
          {recipes.length > 0 && !loading && (
            <div className="space-y-8">
              <div className="text-center px-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display text-gray-800 mb-4">
                  🍳 Your Personal Chef's Masterpiece Collection! ✨
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                  I've lovingly crafted these three unique recipes especially for you! Each comes with secret chef techniques, creative flavor twists, and gorgeous plating ideas that'll make your friends go "WOW!" 🤩
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 px-4">
                {recipes.map((recipe, index) => (
                  <RecipeCard
                    key={index}
                    recipe={recipe}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Welcome message for first-time users */}
          {recipes.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="max-w-2xl mx-auto">
                <ChefHat className="w-24 h-24 mx-auto mb-6 text-orange-500 opacity-50" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-gray-800 mb-4 px-4">
                  Bonjour! Hola! Namaste! Welcome, my wonderful cooking friend! 👨‍🍳✨
                </h3>
                <p className="text-sm sm:text-base md:text-xl text-gray-600 mb-8 leading-relaxed px-4">
                  I'm your passionate culinary companion, fluent in 13+ languages and absolutely THRILLED to help you create extraordinary dishes! 🌟 
                  Just tell me what delicious creation you're dreaming of, and I'll share my secret chef techniques, amazing flavor combinations, 
                  stunning plating ideas, and heartwarming cooking stories that'll make every meal an adventure! Let's cook something magical together! 🎭🍽️
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 text-center px-4">
                  <div className="p-6 bg-white rounded-2xl shadow-lg">
                    <div className="w-12 h-12 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <ChefHat className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Expert Chef Guidance</h4>
                    <p className="text-gray-600 text-sm">Professional recipes with detailed techniques and creative variations</p>
                  </div>
                  
                  <div className="p-6 bg-white rounded-2xl shadow-lg">
                    <div className="w-12 h-12 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-red-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Multilingual & Adaptive</h4>
                    <p className="text-gray-600 text-sm">Warm guidance in 12+ languages, adapted to your cooking experience</p>
                  </div>
                  
                  <div className="p-6 bg-white rounded-2xl shadow-lg">
                    <div className="w-12 h-12 bg-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-pink-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Creative Plating & Tips</h4>
                    <p className="text-gray-600 text-sm">Professional plating techniques, flavor pairings, and creative tweaks</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="w-8 h-8 mr-2 text-orange-500" />
            <span className="text-xl font-semibold font-display">Culinary Companion</span>
          </div>
          <p className="text-gray-400">
            Transforming ingredients into culinary adventures with the power of AI
          </p>
        </div>
      </footer>
    </div>
  );
}

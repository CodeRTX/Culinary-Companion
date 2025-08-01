import React from 'react';
import { Clock, Users, ChefHat, Utensils } from 'lucide-react';
import SpeechOutput from './SpeechOutput';
import type { Recipe } from '@/shared/types';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, index }) => {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  const gradients = [
    'from-orange-400 to-red-500',
    'from-purple-400 to-pink-500',
    'from-blue-400 to-indigo-500',
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transform hover:scale-102 transition-all duration-300 border border-gray-100 w-full max-w-sm mx-auto md:max-w-none">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${gradients[index % 3]} p-4 md:p-6 text-white`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium self-start ${difficultyColors[recipe.difficultyLevel as keyof typeof difficultyColors]}`}>
            {recipe.difficultyLevel}
          </span>
          <span className="text-white/90 text-sm font-medium">{recipe.cuisineType}</span>
        </div>
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold flex-1 mr-2">{recipe.title}</h3>
          <SpeechOutput 
            text={`Recipe: ${recipe.title}. ${recipe.description}`}
            className="text-white/80 hover:text-white flex-shrink-0"
          />
        </div>
        <p className="text-white/90 text-sm leading-relaxed">{recipe.description}</p>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        {/* Time and serving info */}
        <div className="flex items-center justify-between mb-6 text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span className="text-sm">{recipe.servings} servings</span>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <ChefHat className="w-5 h-5 text-gray-700 mr-2" />
            <h4 className="font-semibold text-gray-800">Ingredients</h4>
          </div>
          <ul className="space-y-1">
            {recipe.ingredients.slice(0, 4).map((ingredient, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-center">
                <span className="w-2 h-2 bg-gray-300 rounded-full mr-3 flex-shrink-0"></span>
                {ingredient}
              </li>
            ))}
            {recipe.ingredients.length > 4 && (
              <li className="text-sm text-gray-500 italic ml-5">
                +{recipe.ingredients.length - 4} more ingredients
              </li>
            )}
          </ul>
        </div>

        {/* Instructions preview */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Utensils className="w-5 h-5 text-gray-700 mr-2" />
            <h4 className="font-semibold text-gray-800">Instructions</h4>
          </div>
          <ol className="space-y-2">
            {recipe.instructions.slice(0, 2).map((instruction, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex">
                <span className="bg-gray-100 text-gray-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-3 flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="line-clamp-2">{instruction}</span>
              </li>
            ))}
            {recipe.instructions.length > 2 && (
              <li className="text-sm text-gray-500 italic ml-9">
                +{recipe.instructions.length - 2} more steps
              </li>
            )}
          </ol>
        </div>

        {/* Tips */}
        {recipe.tips && recipe.tips.length > 0 && (
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
            <h5 className="font-medium text-yellow-800 mb-2">💡 Pro Tips</h5>
            <ul className="space-y-1">
              {recipe.tips.slice(0, 2).map((tip, idx) => (
                <li key={idx} className="text-sm text-yellow-700">
                  • {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;

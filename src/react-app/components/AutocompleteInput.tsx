import React, { useState, useEffect, useRef } from 'react';
import { Clock, ChefHat } from 'lucide-react';
import SpeechInput from './SpeechInput';

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  onTranscript: (transcript: string) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onChange,
  placeholder,
  className,
  onTranscript
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  // Load recent searches from sessionStorage (session-only caching)
  useEffect(() => {
    const savedSearches = sessionStorage.getItem('culinary-recent-searches');
    if (savedSearches) {
      try {
        const parsed = JSON.parse(savedSearches);
        setRecentSearches(parsed.slice(0, 10)); // Keep only last 10
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  // Save search to localStorage
  const saveSearch = (search: string) => {
    if (!search.trim()) return;
    
    const updatedSearches = [
      search.trim(),
      ...recentSearches.filter(s => s.toLowerCase() !== search.toLowerCase())
    ].slice(0, 10);
    
    setRecentSearches(updatedSearches);
    sessionStorage.setItem('culinary-recent-searches', JSON.stringify(updatedSearches));
  };

  // Filter suggestions based on input
  useEffect(() => {
    if (value.trim().length > 0) {
      const filtered = recentSearches.filter(search =>
        search.toLowerCase().includes(value.toLowerCase()) &&
        search.toLowerCase() !== value.toLowerCase()
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions(recentSearches.slice(0, 5));
      setShowSuggestions(false);
    }
    setActiveSuggestionIndex(-1);
  }, [value, recentSearches]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleInputFocus = () => {
    if (recentSearches.length > 0) {
      setSuggestions(recentSearches.slice(0, 5));
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicks
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        if (activeSuggestionIndex >= 0 && activeSuggestionIndex < suggestions.length) {
          e.preventDefault();
          handleSuggestionClick(suggestions[activeSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestionIndex(-1);
        break;
    }
  };

  // Handle form submission to save search
  const handleSubmit = () => {
    saveSearch(value);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={className}
          autoComplete="off"
        />
        <SpeechInput
          onTranscript={onTranscript}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
        />
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              Recent searches
            </div>
          </div>
          <ul className="py-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                ref={el => { suggestionRefs.current[index] = el; }}
                className={`px-4 py-3 cursor-pointer transition-colors border-l-4 ${
                  index === activeSuggestionIndex
                    ? 'bg-orange-50 border-orange-500 text-orange-700'
                    : 'border-transparent hover:bg-gray-50 text-gray-700'
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setActiveSuggestionIndex(index)}
              >
                <div className="flex items-center">
                  <ChefHat className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="truncate">{suggestion}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hidden element to trigger save on form submit */}
      <input
        type="hidden"
        onFocus={handleSubmit}
      />
    </div>
  );
};

export default AutocompleteInput;

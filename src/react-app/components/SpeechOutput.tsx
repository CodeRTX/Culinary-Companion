import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SpeechOutputProps {
  text: string;
  className?: string;
  autoSpeak?: boolean;
}

const SpeechOutput: React.FC<SpeechOutputProps> = ({ text, className, autoSpeak = false }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  React.useEffect(() => {
    if (autoSpeak && text && isSupported) {
      speak();
    }
  }, [text, autoSpeak, isSupported]);

  const speak = () => {
    if (!isSupported || !text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={isSpeaking ? stopSpeaking : speak}
      className={`p-2 transition-colors ${
        isSpeaking 
          ? 'text-orange-500 hover:text-orange-600 animate-pulse' 
          : 'text-gray-400 hover:text-orange-500'
      } ${className}`}
      title={isSpeaking ? 'Stop speaking' : 'Read aloud'}
    >
      {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
};

export default SpeechOutput;

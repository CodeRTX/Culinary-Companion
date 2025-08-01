// Speech Recognition API types
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  grammars: SpeechGrammarList;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  serviceURI: string;
  start(): void;
  stop(): void;
  abort(): void;
  addEventListener(type: 'audiostart', listener: (this: SpeechRecognition, ev: Event) => any): void;
  addEventListener(type: 'audioend', listener: (this: SpeechRecognition, ev: Event) => any): void;
  addEventListener(type: 'end', listener: (this: SpeechRecognition, ev: Event) => any): void;
  addEventListener(type: 'error', listener: (this: SpeechRecognition, ev: SpeechRecognitionError) => any): void;
  addEventListener(type: 'nomatch', listener: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => any): void;
  addEventListener(type: 'result', listener: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => any): void;
  addEventListener(type: 'soundstart', listener: (this: SpeechRecognition, ev: Event) => any): void;
  addEventListener(type: 'soundend', listener: (this: SpeechRecognition, ev: Event) => any): void;
  addEventListener(type: 'speechstart', listener: (this: SpeechRecognition, ev: Event) => any): void;
  addEventListener(type: 'speechend', listener: (this: SpeechRecognition, ev: Event) => any): void;
  addEventListener(type: 'start', listener: (this: SpeechRecognition, ev: Event) => any): void;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionError) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionError extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechGrammarList {
  readonly length: number;
  item(index: number): SpeechGrammar;
  [index: number]: SpeechGrammar;
  addFromURI(src: string, weight?: number): void;
  addFromString(string: string, weight?: number): void;
}

interface SpeechGrammar {
  src: string;
  weight: number;
}

declare var SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

export {};

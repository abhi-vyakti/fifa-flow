import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup DOM after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia for responsive/dark mode tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock window.speechSynthesis
Object.defineProperty(window, 'speechSynthesis', {
  writable: true,
  value: {
    speak: vi.fn(),
    cancel: vi.fn(),
    pause: vi.fn(),
    resume: vi.fn(),
    getVoices: vi.fn().mockReturnValue([]),
  },
});

// Mock SpeechSynthesisUtterance Class constructor
(globalThis as any).SpeechSynthesisUtterance = class {
  text: string;
  lang = '';
  pitch = 1;
  rate = 1;
  volume = 1;
  onend = null;
  onerror = null;
  constructor(text: string) {
    this.text = text;
  }
};

// Mock Audio element for atmosphere audio tests
(globalThis as any).Audio = vi.fn().mockImplementation(() => ({
  play: vi.fn().mockResolvedValue(undefined),
  pause: vi.fn(),
  loop: false,
  volume: 1,
  currentTime: 0,
}));

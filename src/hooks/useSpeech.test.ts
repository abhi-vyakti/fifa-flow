import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSpeech } from './useSpeech';

describe('useSpeech hook', () => {
  it('should initialize with supported status and speak functionality', () => {
    const { result } = renderHook(() => useSpeech());
    
    expect(result.current.isListening).toBe(false);
    expect(typeof result.current.speak).toBe('function');
    expect(typeof result.current.startListening).toBe('function');
    expect(typeof result.current.stopListening).toBe('function');
  });

  it('should safely execute speak function', () => {
    const { result } = renderHook(() => useSpeech());

    expect(() => {
      act(() => {
        result.current.speak('Testing speech synthesis');
      });
    }).not.toThrow();
  });
});

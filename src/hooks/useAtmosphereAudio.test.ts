import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useAtmosphereAudio } from './useAtmosphereAudio';

describe('useAtmosphereAudio hook', () => {
  it('should initialize with isPlaying false and provide toggleAudio', () => {
    const { result } = renderHook(() => useAtmosphereAudio());
    
    expect(result.current.isPlaying).toBe(false);
    expect(typeof result.current.toggleAudio).toBe('function');
  });

  it('should handle toggleAudio without crashing when AudioContext is unavailable', () => {
    const { result } = renderHook(() => useAtmosphereAudio());

    act(() => {
      result.current.toggleAudio();
    });

    expect(typeof result.current.isPlaying).toBe('boolean');
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BroadcastIntro } from './BroadcastIntro';

describe('BroadcastIntro Component', () => {
  it('renders intro overlay with audio toggle and skip button', () => {
    const onComplete = vi.fn();
    const onToggleAudio = vi.fn();

    render(
      <BroadcastIntro 
        onComplete={onComplete} 
        onToggleAudio={onToggleAudio} 
        audioActive={false} 
      />
    );

    expect(screen.getByText('FIFA FLOW')).toBeInTheDocument();
    expect(screen.getByLabelText('Skip Broadcast Intro')).toBeInTheDocument();
    expect(screen.getByLabelText('Enable match atmosphere audio')).toBeInTheDocument();
  });

  it('calls onToggleAudio when atmosphere audio button is clicked', () => {
    const onComplete = vi.fn();
    const onToggleAudio = vi.fn();

    render(
      <BroadcastIntro 
        onComplete={onComplete} 
        onToggleAudio={onToggleAudio} 
        audioActive={false} 
      />
    );

    fireEvent.click(screen.getByLabelText('Enable match atmosphere audio'));
    expect(onToggleAudio).toHaveBeenCalledTimes(1);
  });

  it('calls onComplete when Skip Intro is clicked', () => {
    const onComplete = vi.fn();
    const onToggleAudio = vi.fn();

    render(
      <BroadcastIntro 
        onComplete={onComplete} 
        onToggleAudio={onToggleAudio} 
        audioActive={false} 
      />
    );

    fireEvent.click(screen.getByLabelText('Skip Broadcast Intro'));
    expect(onComplete).toHaveBeenCalledTimes(1);
  });
});

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AICopilot } from './AICopilot';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';
import { AIProvider } from '../contexts/AIContext';

const renderAICopilot = () => {
  return render(
    <ThemeProvider>
      <LiveDataProvider>
        <AIProvider>
          <AICopilot />
        </AIProvider>
      </LiveDataProvider>
    </ThemeProvider>
  );
};

describe('AICopilot Component', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Backend offline mock'));
  });

  it('renders floating orb button with accessible aria-label', () => {
    renderAICopilot();
    const orbButton = screen.getByLabelText('Open AI Copilot Chat');
    expect(orbButton).toBeInTheDocument();
  });

  it('opens panel drawer when orb button is clicked', () => {
    renderAICopilot();
    const orbButton = screen.getByLabelText('Open AI Copilot Chat');
    fireEvent.click(orbButton);

    const dialog = screen.getByRole('dialog', { name: 'AI OS Consensus Console' });
    expect(dialog).toBeInTheDocument();
  });

  it('populates query input when quick suggestion is clicked', () => {
    renderAICopilot();
    fireEvent.click(screen.getByLabelText('Open AI Copilot Chat'));

    const suggestionBtn = screen.getByText('Explain Gate C anomaly');
    fireEvent.click(suggestionBtn);

    const input = screen.getByLabelText('Ask FLOW AI question') as HTMLInputElement;
    expect(input.value).toBe('Explain Gate C anomaly');
  });

  it('submits AI query and displays recommendation response', async () => {
    renderAICopilot();
    fireEvent.click(screen.getByLabelText('Open AI Copilot Chat'));

    const input = screen.getByLabelText('Ask FLOW AI question');
    fireEvent.change(input, { target: { value: 'What is gate congestion?' } });

    const submitBtn = screen.getByLabelText('Send query to AI Copilot');
    fireEvent.click(submitBtn);

    expect(await screen.findByText('FLOW Recommendation', {}, { timeout: 3000 })).toBeInTheDocument();
  });

  it('closes drawer when Escape key is pressed', () => {
    renderAICopilot();
    fireEvent.click(screen.getByLabelText('Open AI Copilot Chat'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.getByLabelText('Open AI Copilot Chat')).toBeInTheDocument();
  });
});

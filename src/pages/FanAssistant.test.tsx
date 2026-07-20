import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { FanAssistant } from './FanAssistant';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';
import { AIProvider } from '../contexts/AIContext';

const renderFanAssistant = () => {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <LiveDataProvider>
          <AIProvider>
            <FanAssistant />
          </AIProvider>
        </LiveDataProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('FanAssistant Component', () => {
  it('renders fan spectator companion title and seat finder features', () => {
    renderFanAssistant();

    expect(screen.getByText(/FIFA Spectator Assistant/i)).toBeInTheDocument();
  });
});

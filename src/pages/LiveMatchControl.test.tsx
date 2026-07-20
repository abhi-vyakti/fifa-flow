import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { LiveMatchControl } from './LiveMatchControl';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';
import { AIProvider } from '../contexts/AIContext';

const renderLiveMatchControl = () => {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <LiveDataProvider>
          <AIProvider>
            <LiveMatchControl />
          </AIProvider>
        </LiveDataProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('LiveMatchControl Component', () => {
  it('renders live match title and scoreboard banner', () => {
    renderLiveMatchControl();

    expect(screen.getAllByText(/USA/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ENG/i).length).toBeGreaterThan(0);
  });
});

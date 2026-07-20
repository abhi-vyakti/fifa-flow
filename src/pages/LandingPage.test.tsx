import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { LandingPage } from './LandingPage';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';

const renderLandingPage = () => {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <LiveDataProvider>
          <LandingPage />
        </LiveDataProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('LandingPage Component', () => {
  it('renders hero title and primary call-to-action button', () => {
    renderLandingPage();

    expect(screen.getByText(/STADIUM INTELLIGENCE COGNITIVE ENGINE/i)).toBeInTheDocument();
    expect(screen.getByText(/Enter Operations Platform/i)).toBeInTheDocument();
  });

  it('renders stadium status telemetry cards', () => {
    renderLandingPage();

    expect(screen.getByText(/MetLife Stadium/i)).toBeInTheDocument();
  });
});

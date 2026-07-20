import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { MatchOperations } from './MatchOperations';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';
import { AIProvider } from '../contexts/AIContext';

const renderMatchOperations = () => {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <LiveDataProvider>
          <AIProvider>
            <MatchOperations />
          </AIProvider>
        </LiveDataProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('MatchOperations Component', () => {
  it('renders tournament schedule grid and operational match status', () => {
    renderMatchOperations();

    expect(screen.getAllByText(/Match Operations/i).length).toBeGreaterThan(0);
  });
});

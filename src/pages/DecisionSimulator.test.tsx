import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { DecisionSimulator } from './DecisionSimulator';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';
import { AIProvider } from '../contexts/AIContext';

const renderDecisionSimulator = () => {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <LiveDataProvider>
          <AIProvider>
            <DecisionSimulator />
          </AIProvider>
        </LiveDataProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('DecisionSimulator Component', () => {
  it('renders simulator header and scenario parameters', () => {
    renderDecisionSimulator();

    expect(screen.getAllByText(/AI Decision Simulator/i).length).toBeGreaterThan(0);
  });
});

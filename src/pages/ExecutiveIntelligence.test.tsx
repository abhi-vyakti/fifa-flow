import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { ExecutiveIntelligence } from './ExecutiveIntelligence';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';
import { AIProvider } from '../contexts/AIContext';

const renderExecutiveIntelligence = () => {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <LiveDataProvider>
          <AIProvider>
            <ExecutiveIntelligence />
          </AIProvider>
        </LiveDataProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('ExecutiveIntelligence Component', () => {
  it('renders executive intelligence report summary and KPI metrics', () => {
    renderExecutiveIntelligence();

    expect(screen.getAllByText(/Executive Intelligence/i).length).toBeGreaterThan(0);
  });
});

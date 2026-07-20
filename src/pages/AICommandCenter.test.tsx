import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { AICommandCenter } from './AICommandCenter';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';
import { AIProvider } from '../contexts/AIContext';

const renderCommandCenter = () => {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <LiveDataProvider>
          <AIProvider>
            <AICommandCenter />
          </AIProvider>
        </LiveDataProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('AICommandCenter Component', () => {
  it('renders command center title and tab options', () => {
    renderCommandCenter();

    expect(screen.getAllByText(/AI Command Center/i).length).toBeGreaterThan(0);
  });

  it('switches tabs between Situation Room and What-If Simulator', () => {
    renderCommandCenter();

    const simulatorTabBtn = screen.getByText('What-If Simulator').closest('button');
    expect(simulatorTabBtn).toBeInTheDocument();
    if (simulatorTabBtn) {
      fireEvent.click(simulatorTabBtn);
    }

    expect(screen.getByText('Hypotheticals Simulation Desk')).toBeInTheDocument();
  });
});

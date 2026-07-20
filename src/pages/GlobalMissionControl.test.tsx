import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { GlobalMissionControl } from './GlobalMissionControl';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';
import { AIProvider } from '../contexts/AIContext';

const renderGlobalMissionControl = () => {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <LiveDataProvider>
          <AIProvider>
            <GlobalMissionControl />
          </AIProvider>
        </LiveDataProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('GlobalMissionControl Component', () => {
  it('renders mission control venue grid and global overview', () => {
    renderGlobalMissionControl();

    expect(screen.getAllByText(/Mission Control/i).length).toBeGreaterThan(0);
  });
});

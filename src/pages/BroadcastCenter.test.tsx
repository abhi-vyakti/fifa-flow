import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { BroadcastCenter } from './BroadcastCenter';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';
import { AIProvider } from '../contexts/AIContext';

const renderBroadcastCenter = () => {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <LiveDataProvider>
          <AIProvider>
            <BroadcastCenter />
          </AIProvider>
        </LiveDataProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('BroadcastCenter Component', () => {
  it('renders broadcast telemetry and streaming status', () => {
    renderBroadcastCenter();

    expect(screen.getAllByText(/Broadcast Center/i).length).toBeGreaterThan(0);
  });
});

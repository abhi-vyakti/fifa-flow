import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SecurityCenter } from './SecurityCenter';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';
import { AIProvider } from '../contexts/AIContext';

const renderSecurityCenter = () => {
  return render(
    <ThemeProvider>
      <LiveDataProvider>
        <AIProvider>
          <SecurityCenter />
        </AIProvider>
      </LiveDataProvider>
    </ThemeProvider>
  );
};

describe('SecurityCenter Component', () => {
  it('renders security telemetry and active incident threat response matrix', () => {
    renderSecurityCenter();

    expect(screen.getByText(/Security Control & Crowd Patrols/i)).toBeInTheDocument();
  });
});

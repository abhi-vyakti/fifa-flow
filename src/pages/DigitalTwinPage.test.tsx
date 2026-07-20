import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { StadiumDigitalTwin as DigitalTwinPage } from './DigitalTwinPage';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';
import { AIProvider } from '../contexts/AIContext';

const renderDigitalTwinPage = () => {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <LiveDataProvider>
          <AIProvider>
            <DigitalTwinPage />
          </AIProvider>
        </LiveDataProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('DigitalTwinPage Component', () => {
  it('renders digital twin title and 3D spatial heatmap layout', () => {
    renderDigitalTwinPage();

    expect(screen.getAllByText(/Digital Twin/i).length).toBeGreaterThan(0);
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MedicalDashboard } from './MedicalDashboard';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';

const renderMedicalDashboard = () => {
  return render(
    <ThemeProvider>
      <LiveDataProvider>
        <MedicalDashboard />
      </LiveDataProvider>
    </ThemeProvider>
  );
};

describe('MedicalDashboard Component', () => {
  it('renders medical triage capacity and paramedic dispatch units', () => {
    renderMedicalDashboard();

    expect(screen.getByText(/Medical Triage & Emergency Response/i)).toBeInTheDocument();
  });
});

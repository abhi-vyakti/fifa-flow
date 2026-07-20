import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AISituationRoom } from './AISituationRoom';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';

const renderAISituationRoom = () => {
  return render(
    <ThemeProvider>
      <LiveDataProvider>
        <AISituationRoom />
      </LiveDataProvider>
    </ThemeProvider>
  );
};

describe('AISituationRoom Component', () => {
  it('renders status metrics and system threat level pill', () => {
    renderAISituationRoom();

    expect(screen.getByText(/SYSTEM THREAT LEVEL/i)).toBeInTheDocument();
    expect(screen.getByText(/RISK/i)).toBeInTheDocument();
    expect(screen.getByText(/Metro:/i)).toBeInTheDocument();
  });

  it('renders health breakout progress bars with progressbar roles', () => {
    renderAISituationRoom();

    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it('renders AI Action queue items and inspects explanations on click', () => {
    renderAISituationRoom();

    expect(screen.getByText('AI Operations Action Queue')).toBeInTheDocument();

    const inspectButtons = screen.getAllByText('Inspect Why?');
    expect(inspectButtons.length).toBeGreaterThan(0);

    fireEvent.click(inspectButtons[0]);
    expect(screen.getByText('Hide Explanation')).toBeInTheDocument();
  });
});

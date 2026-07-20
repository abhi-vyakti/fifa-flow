import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { VolunteerDashboard } from './VolunteerDashboard';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';

const renderVolunteerDashboard = () => {
  return render(
    <ThemeProvider>
      <LiveDataProvider>
        <VolunteerDashboard />
      </LiveDataProvider>
    </ThemeProvider>
  );
};

describe('VolunteerDashboard Component', () => {
  it('renders volunteer workforce roster and sector dispatch assignments', () => {
    renderVolunteerDashboard();

    expect(screen.getByText(/Volunteer Operations Portal/i)).toBeInTheDocument();
  });
});

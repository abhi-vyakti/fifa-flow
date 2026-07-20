import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SettingsPage } from './SettingsPage';
import { ThemeProvider } from '../contexts/ThemeContext';

const renderSettingsPage = () => {
  return render(
    <ThemeProvider>
      <SettingsPage />
    </ThemeProvider>
  );
};

describe('SettingsPage Component', () => {
  it('renders settings options, role switcher, and accessibility options', () => {
    renderSettingsPage();

    expect(screen.getByText(/System Configuration/i)).toBeInTheDocument();
    expect(screen.getByText(/Active Persona/i)).toBeInTheDocument();
  });

  it('switches to Accessibility tab and displays options', () => {
    renderSettingsPage();

    const accessibilityTabBtn = screen.getByText('Accessibility').closest('button');
    expect(accessibilityTabBtn).toBeInTheDocument();

    if (accessibilityTabBtn) {
      fireEvent.click(accessibilityTabBtn);
    }

    expect(screen.getByText('High Contrast')).toBeInTheDocument();
    expect(screen.getByText('Wheelchair Routing')).toBeInTheDocument();
  });
});

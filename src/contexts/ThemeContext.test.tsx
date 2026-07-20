import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider, useThemeSettings } from './ThemeContext';

const TestComponent = () => {
  const { 
    role, setRole, 
    language, setLanguage, 
    highContrast, setHighContrast,
    colorBlindSafe, setColorBlindSafe,
    emergencyMode, setEmergencyMode,
    accessibility, updateAccessibility,
    t
  } = useThemeSettings();

  return (
    <div>
      <span data-testid="role">{role}</span>
      <span data-testid="language">{language}</span>
      <span data-testid="os-online">{t.osOnline}</span>
      <span data-testid="high-contrast">{highContrast ? 'true' : 'false'}</span>
      <span data-testid="color-blind">{colorBlindSafe ? 'true' : 'false'}</span>
      <span data-testid="emergency">{emergencyMode ? 'true' : 'false'}</span>
      <span data-testid="accessibility-wheelchair">{accessibility.wheelchair ? 'true' : 'false'}</span>
      
      <button onClick={() => setRole('security')}>Set Role Security</button>
      <button onClick={() => setLanguage('es')}>Set Language Spanish</button>
      <button onClick={() => setHighContrast(true)}>Toggle High Contrast</button>
      <button onClick={() => setColorBlindSafe(true)}>Toggle Color Blind</button>
      <button onClick={() => setEmergencyMode(true)}>Toggle Emergency</button>
      <button onClick={() => updateAccessibility('wheelchair', true)}>Toggle Wheelchair</button>
    </div>
  );
};

describe('ThemeContext Provider', () => {
  it('should render children and provide default values', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('role')).toHaveTextContent('organizer');
    expect(screen.getByTestId('language')).toHaveTextContent('en');
    expect(screen.getByTestId('os-online')).toHaveTextContent('OS ONLINE');
    expect(screen.getByTestId('high-contrast')).toHaveTextContent('false');
    expect(screen.getByTestId('emergency')).toHaveTextContent('false');
  });

  it('should allow setting user role', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      screen.getByText('Set Role Security').click();
    });

    expect(screen.getByTestId('role')).toHaveTextContent('security');
  });

  it('should allow setting language and update translations', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      screen.getByText('Set Language Spanish').click();
    });

    expect(screen.getByTestId('language')).toHaveTextContent('es');
    expect(screen.getByTestId('os-online')).toHaveTextContent('SO EN LÍNEA');
  });

  it('should toggle high contrast mode and add HTML class', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      screen.getByText('Toggle High Contrast').click();
    });

    expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
  });

  it('should toggle emergency mode and set emergency-hud-active class', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      screen.getByText('Toggle Emergency').click();
    });

    expect(screen.getByTestId('emergency')).toHaveTextContent('true');
    expect(document.documentElement.classList.contains('emergency-hud-active')).toBe(true);
  });

  it('should update accessibility preferences', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    act(() => {
      screen.getByText('Toggle Wheelchair').click();
    });

    expect(screen.getByTestId('accessibility-wheelchair')).toHaveTextContent('true');
  });

  it('should throw error when useThemeSettings is used outside Provider', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<TestComponent />)).toThrow('useThemeSettings must be used within ThemeProvider');
    consoleErrorSpy.mockRestore();
  });
});

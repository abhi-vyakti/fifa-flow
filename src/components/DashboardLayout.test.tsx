import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { DashboardLayout } from './DashboardLayout';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LiveDataProvider } from '../contexts/LiveDataContext';

const renderDashboardLayout = (initialRoute = '/mission-control') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <ThemeProvider>
        <LiveDataProvider>
          <DashboardLayout>
            <div data-testid="child-content">Dashboard Content</div>
          </DashboardLayout>
        </LiveDataProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('DashboardLayout Component', () => {
  it('renders skip link and main content container with accessibility attributes', () => {
    renderDashboardLayout();

    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveAttribute('id', 'main-content');
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('displays branding header and live match scoreboard', () => {
    renderDashboardLayout();

    expect(screen.getAllByText('FIFA FLOW').length).toBeGreaterThan(0);
    expect(screen.getAllByText('USA').length).toBeGreaterThan(0);
    expect(screen.getAllByText('ENG').length).toBeGreaterThan(0);
  });

  it('toggles emergency mode when emergency button is clicked', () => {
    renderDashboardLayout();

    const emergencyBtn = screen.getByLabelText('Toggle Emergency HUD');
    expect(emergencyBtn).toBeInTheDocument();

    fireEvent.click(emergencyBtn);
    expect(screen.getByText('Emergency HUD activated')).toBeInTheDocument();
  });

  it('changes language via selector dropdown', () => {
    renderDashboardLayout();

    const langSelect = screen.getByLabelText('Select Language');
    expect(langSelect).toBeInTheDocument();

    fireEvent.change(langSelect, { target: { value: 'es' } });
    expect(document.documentElement.lang).toBe('es');
  });

  it('opens command palette modal on Ctrl+K keyboard shortcut', () => {
    renderDashboardLayout();

    expect(screen.queryByPlaceholderText('Type a portal name or shortcut...')).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });

    const input = screen.getByPlaceholderText('Type a portal name or shortcut...');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Security' } });
    const securityItems = screen.getAllByText('Security Center');
    expect(securityItems.length).toBeGreaterThan(0);
  });
});

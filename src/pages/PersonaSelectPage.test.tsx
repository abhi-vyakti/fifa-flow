import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { PersonaSelectPage } from './PersonaSelectPage';
import { ThemeProvider } from '../contexts/ThemeContext';

const renderPersonaSelectPage = () => {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <PersonaSelectPage />
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('PersonaSelectPage Component', () => {
  it('renders title and 5 persona cards with accessibility attributes', () => {
    renderPersonaSelectPage();

    expect(screen.getByText(/Select Your/i)).toBeInTheDocument();
    expect(screen.getByText('Tournament Commander')).toBeInTheDocument();
    expect(screen.getByText('Security Director')).toBeInTheDocument();
    expect(screen.getByText('Medical Operations')).toBeInTheDocument();
    expect(screen.getByText('Volunteer Coordinator')).toBeInTheDocument();
    expect(screen.getByText('Fan Spectator Companion')).toBeInTheDocument();
  });

  it('selects persona card on click', () => {
    renderPersonaSelectPage();

    const commanderCard = screen.getByLabelText(/Select persona Tournament Commander/i);
    expect(commanderCard).toBeInTheDocument();

    fireEvent.click(commanderCard);
    expect(commanderCard).toHaveAttribute('aria-pressed', 'true');
  });
});

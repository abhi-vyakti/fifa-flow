import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FlagBadge, USABadge, ENGBadge, CANBadge, MEXBadge } from './FlagBadge';

describe('FlagBadge Components', () => {
  it('renders USABadge with accessibility role and aria-label', () => {
    render(<USABadge />);
    const svg = screen.getByRole('img', { name: 'USA flag' });
    expect(svg).toBeInTheDocument();
  });

  it('renders ENGBadge with accessibility role and aria-label', () => {
    render(<ENGBadge />);
    const svg = screen.getByRole('img', { name: 'England flag' });
    expect(svg).toBeInTheDocument();
  });

  it('renders CANBadge with accessibility role and aria-label', () => {
    render(<CANBadge />);
    const svg = screen.getByRole('img', { name: 'Canada flag' });
    expect(svg).toBeInTheDocument();
  });

  it('renders MEXBadge with accessibility role and aria-label', () => {
    render(<MEXBadge />);
    const svg = screen.getByRole('img', { name: 'Mexico flag' });
    expect(svg).toBeInTheDocument();
  });

  it('renders corresponding flag badge using FlagBadge selector', () => {
    const { rerender } = render(<FlagBadge country="United States" />);
    expect(screen.getByRole('img', { name: 'USA flag' })).toBeInTheDocument();

    rerender(<FlagBadge country="England" />);
    expect(screen.getByRole('img', { name: 'England flag' })).toBeInTheDocument();

    rerender(<FlagBadge country="Canada" />);
    expect(screen.getByRole('img', { name: 'Canada flag' })).toBeInTheDocument();

    rerender(<FlagBadge country="Mexico" />);
    expect(screen.getByRole('img', { name: 'Mexico flag' })).toBeInTheDocument();
  });
});

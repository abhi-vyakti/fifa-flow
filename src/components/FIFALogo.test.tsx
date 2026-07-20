import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FIFALogo } from './FIFALogo';

describe('FIFALogo Component', () => {
  it('renders logo image with correct alt text', () => {
    render(<FIFALogo />);
    const img = screen.getByAltText('FIFA FLOW Trophy Logo');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/favicon.svg');
  });

  it('applies custom size style when provided', () => {
    render(<FIFALogo size={42} />);
    const img = screen.getByAltText('FIFA FLOW Trophy Logo');
    expect(img).toHaveStyle({ width: '42px', height: '42px' });
  });
});

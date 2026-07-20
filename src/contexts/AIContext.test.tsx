import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AIProvider, useAI } from './AIContext';
import { LiveDataProvider } from './LiveDataContext';
import { ThemeProvider } from './ThemeContext';

const AIConsumer = () => {
  const { askCopilot, cancelActiveRequest, loading } = useAI();
  const [response, setResponse] = React.useState<string>('');

  const handleAsk = async () => {
    const res = await askCopilot('Explain Gate C congestion', 'organizer');
    if (res && res.recommendation) {
      setResponse(res.recommendation);
    }
  };

  return (
    <div>
      <span data-testid="ai-loading">{loading ? 'true' : 'false'}</span>
      <span data-testid="ai-response">{response}</span>
      
      <button onClick={handleAsk}>Ask AI</button>
      <button onClick={() => cancelActiveRequest()}>Cancel Request</button>
    </div>
  );
};

describe('AIContext Provider', () => {
  it('should render children and handle AI copilot query flow', async () => {
    render(
      <ThemeProvider>
        <LiveDataProvider>
          <AIProvider>
            <AIConsumer />
          </AIProvider>
        </LiveDataProvider>
      </ThemeProvider>
    );

    expect(screen.getByTestId('ai-loading')).toHaveTextContent('false');

    fireEvent.click(screen.getByText('Ask AI'));

    await waitFor(() => {
      expect(screen.getByTestId('ai-response').textContent).not.toBe('');
    }, { timeout: 3000 });
  });

  it('should allow cancelling active request', () => {
    render(
      <ThemeProvider>
        <LiveDataProvider>
          <AIProvider>
            <AIConsumer />
          </AIProvider>
        </LiveDataProvider>
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Cancel Request'));
    expect(screen.getByTestId('ai-loading')).toHaveTextContent('false');
  });

  it('should throw error when useAI is used outside Provider', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<AIConsumer />)).toThrow('useAI must be used within AIProvider');
    consoleErrorSpy.mockRestore();
  });
});

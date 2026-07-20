import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LiveDataProvider, useLiveData } from './LiveDataContext';

const LiveDataConsumer = () => {
  const { state, reportIncident, resolveIncident, triggerScenario } = useLiveData();

  return (
    <div>
      <span data-testid="stadium-name">{state.stadiumName || 'MetLife Stadium'}</span>
      <span data-testid="total-occupancy">{state.occupancy.current}</span>
      <span data-testid="incidents-count">{state.incidents.length}</span>
      <span data-testid="gate-c-congestion">{state.occupancy.gates.C.congestion}</span>
      
      <button 
        onClick={() => reportIncident({
          title: 'Test Incident',
          type: 'security',
          severity: 'medium',
          location: 'Gate A',
          status: 'reported',
          details: 'Test details',
          priority: 2,
          department: 'Security',
          resourcesRequired: ['Guard'],
          nearbyResponders: ['Guard 1'],
          escalationLevel: 'Level 1',
          suggestedActions: ['Inspect']
        })}
      >
        Report Incident
      </button>

      <button onClick={() => resolveIncident('INC-101')}>
        Resolve INC-101
      </button>

      <button onClick={() => triggerScenario('gate_c_surge')}>
        Trigger Gate C Surge
      </button>
    </div>
  );
};

describe('LiveDataContext Provider', () => {
  beforeEach(() => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Backend offline mock'));
  });

  it('should render children and provide live stadium data state', () => {
    render(
      <LiveDataProvider>
        <LiveDataConsumer />
      </LiveDataProvider>
    );

    expect(screen.getByTestId('stadium-name')).toHaveTextContent('MetLife Stadium');
    expect(screen.getByTestId('total-occupancy')).not.toBeEmptyDOMElement();
    expect(screen.getByTestId('incidents-count')).not.toBeEmptyDOMElement();
  });

  it('should allow reporting a new incident', async () => {
    render(
      <LiveDataProvider>
        <LiveDataConsumer />
      </LiveDataProvider>
    );

    const initialCount = Number(screen.getByTestId('incidents-count').textContent);

    fireEvent.click(screen.getByText('Report Incident'));

    await waitFor(() => {
      expect(Number(screen.getByTestId('incidents-count').textContent)).toBe(initialCount + 1);
    }, { timeout: 3000 });
  });

  it('should allow resolving an incident', async () => {
    render(
      <LiveDataProvider>
        <LiveDataConsumer />
      </LiveDataProvider>
    );

    fireEvent.click(screen.getByText('Resolve INC-101'));

    await waitFor(() => {
      expect(screen.getByTestId('incidents-count')).toBeDefined();
    });
  });

  it('should allow triggering a scenario', async () => {
    render(
      <LiveDataProvider>
        <LiveDataConsumer />
      </LiveDataProvider>
    );

    fireEvent.click(screen.getByText('Trigger Gate C Surge'));

    await waitFor(() => {
      expect(screen.getByTestId('gate-c-congestion')).toBeDefined();
    });
  });

  it('should throw error when useLiveData is used outside Provider', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<LiveDataConsumer />)).toThrow('useLiveData must be used within LiveDataProvider');
    consoleErrorSpy.mockRestore();
  });
});

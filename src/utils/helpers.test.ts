import { describe, it, expect } from 'vitest';
import { formatDuration, getActiveIncidents, getSeverityColor } from './helpers';
import { Incident } from '../types';

describe('FIFA FLOW Helpers', () => {
  describe('formatDuration', () => {
    it('should format seconds to seconds-only string for low durations', () => {
      expect(formatDuration(45)).toBe('45s');
    });

    it('should format durations above 60 seconds into minutes and seconds', () => {
      expect(formatDuration(80)).toBe('1m 20s');
      expect(formatDuration(125)).toBe('2m 5s');
    });

    it('should handle zero gracefully', () => {
      expect(formatDuration(0)).toBe('0s');
    });

    it('should handle negative numbers gracefully', () => {
      expect(formatDuration(-10)).toBe('0s');
    });
  });

  describe('getActiveIncidents', () => {
    it('should filter out resolved incidents', () => {
      const mockIncidents: Incident[] = [
        {
          id: 'INC-1',
          title: 'Scuffle',
          type: 'security',
          severity: 'medium',
          location: 'B2',
          status: 'resolved',
          reportedAt: '',
          details: '',
          priority: 3,
          department: 'Security',
          resourcesRequired: [],
          nearbyResponders: [],
          escalationLevel: 'Level 0',
          suggestedActions: []
        },
        {
          id: 'INC-2',
          title: 'Heart Collapse',
          type: 'medical',
          severity: 'critical',
          location: 'C2',
          status: 'dispatched',
          reportedAt: '',
          details: '',
          priority: 1,
          department: 'Medical',
          resourcesRequired: [],
          nearbyResponders: [],
          escalationLevel: 'Level 2',
          suggestedActions: []
        }
      ];

      const active = getActiveIncidents(mockIncidents);
      expect(active.length).toBe(1);
      expect(active[0].id).toBe('INC-2');
    });
  });

  describe('getSeverityColor', () => {
    it('should return correct styling for critical severity', () => {
      const style = getSeverityColor('critical');
      expect(style.text).toContain('text-red-400');
    });

    it('should return correct styling for low severity default fallback', () => {
      const style = getSeverityColor('low');
      expect(style.text).toContain('text-gray-400');
    });
  });
});

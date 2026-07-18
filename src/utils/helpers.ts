import type { Incident } from '../types';

/**
 * Formats seconds into a human-readable duration string (e.g., 80 seconds -> "1m 20s")
 */
export function formatDuration(seconds: number): string {
  if (seconds < 0) return '0s';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs}s`;
}

/**
 * Filters active (unresolved) incidents from a list
 */
export function getActiveIncidents(incidents: Incident[]): Incident[] {
  return incidents.filter(inc => inc.status !== 'resolved');
}

/**
 * Calculates a color code representation for a severity scale (low, medium, high, critical)
 */
export function getSeverityColor(severity: string): { bg: string; text: string; border: string } {
  switch (severity) {
    case 'critical':
      return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/40' };
    case 'high':
      return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' };
    case 'medium':
      return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' };
    default:
      return { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' };
  }
}

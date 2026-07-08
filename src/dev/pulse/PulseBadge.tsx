import { usePulse } from './usePulse';
import { PULSE_PROJECT_ID } from '../constants';

/**
 * Records a pulse-kanaksan visit for the demo site. Renders nothing —
 * stats are viewed on the pulse.kanaksan.com dashboard instead. To show
 * the counters again, render stats from usePulse() here.
 */
export function PulseBadge() {
  usePulse({ projectId: PULSE_PROJECT_ID });
  return null;
}

import { Typography } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { usePulse } from './usePulse';
import { PULSE_PROJECT_ID } from '../constants';

/** Discreet visitor-stats footer for the demo playground. */
export function PulseBadge() {
  const { stats, loading, error } = usePulse({ projectId: PULSE_PROJECT_ID });

  if (loading || error || !stats) return null;

  return (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.75,
        mt: 2,
      }}
    >
      <VisibilityOutlinedIcon sx={{ fontSize: 14 }} />
      {stats.total.toLocaleString()} visits · {stats.unique.toLocaleString()} unique
      · {stats.todayCount.toLocaleString()} today
    </Typography>
  );
}

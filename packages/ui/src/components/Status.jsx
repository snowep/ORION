import { Chip } from '@mui/material';
import { CheckCircle, HourglassTop, ErrorOutline, Warning, Info, Cancel, PauseCircle, PlayCircle } from '@mui/icons-material';

/**
 * Human-facing status words (ORION_UI.md §16) — no technical labels.
 */
const statusConfig = {
  working: { label: 'Working', color: 'primary', icon: <PlayCircle fontSize="small" />, variant: 'filled' },
  waiting_approval: { label: 'Waiting for approval', color: 'warning', icon: <HourglassTop fontSize="small" />, variant: 'outlined' },
  needs_attention: { label: 'Needs attention', color: 'error', icon: <Warning fontSize="small" />, variant: 'outlined' },
  completed: { label: 'Completed', color: 'success', icon: <CheckCircle fontSize="small" />, variant: 'filled' },
  could_not_finish: { label: 'Could not finish', color: 'error', icon: <ErrorOutline fontSize="small" />, variant: 'outlined' },
  conflict: { label: 'Found a conflict', color: 'warning', icon: <Warning fontSize="small" />, variant: 'filled' },
  ready_to_review: { label: 'Ready to review', color: 'info', icon: <Info fontSize="small" />, variant: 'outlined' },
  paused: { label: 'Paused', color: 'default', icon: <PauseCircle fontSize="small" />, variant: 'outlined' },
  cancelled: { label: 'Cancelled', color: 'default', icon: <Cancel fontSize="small" />, variant: 'outlined' },
  idle: { label: 'Idle', color: 'default', icon: <HourglassTop fontSize="small" />, variant: 'outlined' }
};

/**
 * Status chip using human words, not technical labels.
 */
export function Status({ status, size = 'medium', showIcon = true, label }) {
  const config = statusConfig[status];
  return (
    <Chip
      label={label || config.label}
      icon={showIcon ? config.icon : undefined}
      color={config.color}
      variant={config.variant}
      size={size}
      sx={{ fontWeight: 500 }}
    />
  );
}

/**
 * Status dot — color is never the only signal (aria-label carries meaning).
 */
export function StatusDot({ status, size = 8 }) {
  const config = statusConfig[status];
  const colorMap = {
    primary: '#1976d2',
    success: '#2e7d32',
    warning: '#ed6c02',
    error: '#d32f2f',
    info: '#0288d1',
    default: '#9aa0a6'
  };
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: colorMap[config.color],
        display: 'inline-block',
        marginRight: 6,
        verticalAlign: 'middle'
      }}
      aria-label={config.label}
    />
  );
}

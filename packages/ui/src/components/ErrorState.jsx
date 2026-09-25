import { Alert, AlertTitle, Box, Typography, Button } from '@mui/material';
import { ErrorOutline, Warning, Info, CheckCircle } from '@mui/icons-material';

const severityConfig = {
  error: { icon: <ErrorOutline />, color: 'error' },
  warning: { icon: <Warning />, color: 'warning' },
  info: { icon: <Info />, color: 'info' },
  success: { icon: <CheckCircle />, color: 'success' }
};

/**
 * Alert-style state banner with optional action and details.
 */
export function ErrorState({ title, message, severity = 'error', action, details, dismissible, onDismiss }) {
  const { icon, color } = severityConfig[severity];

  return (
    <Alert severity={color} sx={{ mb: 3 }} icon={icon} action={
      dismissible && (
        <Button size="small" onClick={onDismiss} variant="text" color="inherit">
          Dismiss
        </Button>
      )
    }>
      <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>
      {message && <Typography variant="body2" sx={{ mt: 0.5 }}>{message}</Typography>}
      {details && <Box sx={{ mt: 2 }}>{details}</Box>}
      {action && (
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" size="small" onClick={action.onClick}>{action.label}</Button>
        </Box>
      )}
    </Alert>
  );
}

/**
 * Compact inline error with optional retry.
 */
export function InlineError({ message, onRetry }) {
  return (
    <Alert severity="error" sx={{ mb: 2 }}>
      <Typography variant="body2">{message}</Typography>
      {onRetry && <Button size="small" variant="outlined" onClick={onRetry} sx={{ ml: 2 }}>Retry</Button>}
    </Alert>
  );
}

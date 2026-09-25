import { Box, Typography, Button } from '@mui/material';

/**
 * Empty state with optional icon/illustration and single action.
 */
export function EmptyState({ title, description, icon, action, illustration }) {
  return (
    <Box sx={{ textAlign: 'center', py: 6, px: 3 }}>
      {illustration ? (
        <Box sx={{ mb: 3 }}>{illustration}</Box>
      ) : icon ? (
        <Box sx={{ mb: 3, display: 'inline-flex', p: 2, borderRadius: '50%', backgroundColor: 'action.hover' }}>{icon}</Box>
      ) : null}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>{title}</Typography>
      {description && <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>{description}</Typography>}
      {action && <Button variant={action.variant || 'contained'} onClick={action.onClick} size="large">{action.label}</Button>}
    </Box>
  );
}

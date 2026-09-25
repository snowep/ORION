import { Box, Typography, Divider } from '@mui/material';

/**
 * Section container with optional title, description, and action.
 */
export function Section({ title, description, children, action, divider = true }) {
  return (
    <Box sx={{ mb: 4 }}>
      {(title || action) && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Box>
            {title && <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{title}</Typography>}
            {description && <Typography variant="body2" color="text.secondary">{description}</Typography>}
          </Box>
          {action && <Box>{action}</Box>}
        </Box>
      )}
      {children}
      {divider && <Divider sx={{ mt: 2 }} />}
    </Box>
  );
}

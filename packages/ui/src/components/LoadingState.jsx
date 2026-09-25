import { Box, CircularProgress, Typography, Stack } from '@mui/material';

/**
 * Loading state — spinner + optional message, full-screen or inline.
 */
export function LoadingState({ message = 'Loading...', size = 'medium', fullScreen = false, overlay = false }) {
  const sizeMap = { small: 24, medium: 40, large: 56 };
  const diameter = sizeMap[size];

  const content = (
    <Stack spacing={2} alignItems="center">
      <CircularProgress size={diameter} thickness={4} sx={{ color: 'primary.main' }} />
      {message && <Typography variant="body2" color="text.secondary">{message}</Typography>}
    </Stack>
  );

  if (fullScreen) {
    return (
      <Box
        sx={{
          position: overlay ? 'absolute' : 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: overlay ? 'rgba(255,255,255,0.9)' : 'background.default',
          zIndex: overlay ? 100 : 1300
        }}
      >
        {content}
      </Box>
    );
  }

  return <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>{content}</Box>;
}

/**
 * Small inline spinner.
 */
export function InlineLoading({ size = 'small' }) {
  const sizeMap = { small: 16, medium: 24 };
  return <CircularProgress size={sizeMap[size]} thickness={3} sx={{ color: 'primary.main' }} />;
}

'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, Stack, Paper } from '@mui/material';
import { Providers } from '@orion/ui';
import { AppShell } from '@orion/ui';

/**
 * P0.2 verification page: Web and API run separately and communicate.
 * The web fetches the API health endpoint; both statuses are shown.
 */
function HealthCheck() {
  const [apiHealth, setApiHealth] = useState(null);
  const [webHealth, setWebHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/api/health`);
      if (!response.ok) {
        throw new Error(`API health check failed: ${response.status}`);
      }
      const data = await response.json();
      setApiHealth(data);
      setWebHealth({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'orion-web',
        version: '0.1.0'
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
    const interval = setInterval(fetchHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
          ORION
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
          Personal Operating System — P0.1 + P0.2 + P0.3 Verification
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <strong>API Connection Failed:</strong> {error}
          </Alert>
        )}

        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Service Health
        </Typography>

        <Stack direction="row" spacing={4} sx={{ flexWrap: 'wrap', gap: '32px !important' }}>
          <Paper elevation={1} sx={{ flex: 1, minWidth: 280, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>Web (Next.js)</Typography>
            {webHealth ? (
              <>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Status: <strong>{webHealth.status}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Service: {webHealth.service}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Version: {webHealth.version}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(webHealth.timestamp).toLocaleString()}
                </Typography>
              </>
            ) : (
              <CircularProgress size={24} sx={{ mt: 2 }} />
            )}
          </Paper>

          <Paper elevation={1} sx={{ flex: 1, minWidth: 280, p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>API (Express)</Typography>
            {loading ? (
              <CircularProgress size={24} sx={{ mt: 2 }} />
            ) : apiHealth ? (
              <>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Status: <strong>{apiHealth.status}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Service: {apiHealth.service}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Version: {apiHealth.version ?? '—'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(apiHealth.timestamp).toLocaleString()}
                </Typography>
              </>
            ) : (
              <Typography color="error" sx={{ mt: 1 }}>No response</Typography>
            )}
          </Paper>
        </Stack>

        <Button 
          variant="contained" 
          onClick={fetchHealth} 
          disabled={loading} 
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          sx={{ mt: 2 }}
        >
          Refresh API Health
        </Button>

        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 600, mt: 2 }}>
          Web calls API at <code>{process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/health</code>. Both services must run independently.
        </Typography>
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <Providers>
      <AppShell>
        <HealthCheck />
      </AppShell>
    </Providers>
  );
}
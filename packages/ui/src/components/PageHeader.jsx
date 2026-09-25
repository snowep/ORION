import { Box, Typography, Stack, Divider } from '@mui/material';

/**
 * Page header with optional breadcrumbs and actions.
 */
export function PageHeader({ title, description, actions, breadcrumbs }) {
  return (
    <Box sx={{ mb: 4 }}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center" useFlexGap>
            {breadcrumbs.map((crumb, index) => (
              <Box key={crumb.label} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {index > 0 && <Typography variant="caption" color="text.secondary">/</Typography>}
                {crumb.href ? (
                  <a href={crumb.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="caption" color={index === breadcrumbs.length - 1 ? 'text.primary' : 'text.secondary'} component="span">
                      {crumb.label}
                    </Typography>
                  </a>
                ) : (
                  <Typography variant="caption" color="text.primary" fontWeight={500}>
                    {crumb.label}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      )}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={3} sx={{ flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
            {title}
          </Typography>
          {description && <Typography variant="body1" color="text.secondary">{description}</Typography>}
        </Box>
        {actions && <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>{actions}</Box>}
      </Stack>
      <Divider sx={{ mt: 3 }} />
    </Box>
  );
}

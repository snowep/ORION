import { Card as MuiCard, CardContent, CardHeader, CardActions, Box, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';

/**
 * Expandable application-level Card.
 */
export function Card({ title, subtitle, children, actions, expandable, defaultExpanded = true, variant = 'elevation', onClick }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (expandable && !expanded) {
    return (
      <MuiCard variant={variant} sx={{ cursor: onClick ? 'pointer' : 'default', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 3 } }} onClick={onClick}>
        <CardHeader
          title={title}
          subheader={subtitle}
          action={
            <IconButton onClick={(e) => { e.stopPropagation(); setExpanded(true); }} size="small" aria-label="Expand">
              <ExpandMore />
            </IconButton>
          }
        />
      </MuiCard>
    );
  }

  return (
    <MuiCard variant={variant} sx={{ cursor: onClick ? 'pointer' : 'default', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 3 } }} onClick={onClick}>
      {(title || actions) && (
        <CardHeader
          title={title}
          subheader={subtitle}
          action={
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {actions}
              {expandable && (
                <IconButton onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }} size="small" aria-label={expanded ? 'Collapse' : 'Expand'}>
                  {expanded ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              )}
            </Box>
          }
        />
      )}
      <CardContent sx={{ pb: actions ? 0 : undefined }}>{expanded ? children : null}</CardContent>
      {actions && <CardActions sx={{ px: 2, pb: 2 }}>{actions}</CardActions>}
    </MuiCard>
  );
}

/**
 * Minimal card wrapper.
 */
export function SimpleCard({ children, sx, ...props }) {
  const cardSx = sx;
  return <MuiCard {...props} sx={cardSx}>{children}</MuiCard>;
}
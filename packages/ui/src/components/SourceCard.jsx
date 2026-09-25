import { Card, CardContent, Typography, Box, Button, IconButton, Chip, Tooltip, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess, OpenInNew, ContentCopy } from '@mui/icons-material';
import { useState } from 'react';

const sourceTypeConfig = {
  file: { label: 'File', color: 'primary' },
  memory: { label: 'Memory', color: 'secondary' },
  conversation: { label: 'Conversation', color: 'info' },
  web: { label: 'Web', color: 'success' },
  decision: { label: 'Decision', color: 'warning' },
  project: { label: 'Project', color: 'default' },
  persona: { label: 'Persona', color: 'secondary' },
  council: { label: 'Council', color: 'info' }
};

/**
 * Source card — normal citation: title, excerpt, open source.
 * Expand for deeper provenance (ORION_UI.md §24).
 */
export function SourceCard({ id, title, excerpt, sourceType, url, metadata, relevance, onOpen, onCopy }) {
  const [expanded, setExpanded] = useState(false);
  const config = sourceTypeConfig[sourceType];

  return (
    <Card variant="outlined" sx={{ mb: 1.5 }}>
      <CardContent sx={{ pb: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
          <Tooltip title={config.label}>
            <Chip label={config.label} size="small" variant="outlined" color={config.color} />
          </Tooltip>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {title}
            </Typography>
            {relevance !== undefined && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.2 }}>
                Relevance: {(relevance * 100).toFixed(0)}%
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {url && (
              <Tooltip title="Open source">
                <IconButton size="small" onClick={() => window.open(url, '_blank')} aria-label="Open source">
                  <OpenInNew fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Copy excerpt">
              <IconButton size="small" onClick={() => onCopy?.(excerpt)} aria-label="Copy excerpt">
                <ContentCopy fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={expanded ? 'Collapse' : 'Expand'}>
              <IconButton size="small" onClick={() => setExpanded(!expanded)} aria-label={expanded ? 'Collapse' : 'Expand'}>
                {expanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 1, p: 2, backgroundColor: 'action.hover', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{excerpt}</Typography>
            {metadata && Object.keys(metadata).length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 0.5 }}>Metadata</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {Object.entries(metadata).map(([key, value]) => (
                    <Chip key={key} label={`${key}: ${String(value)}`} size="small" variant="outlined" color="default" />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Collapse>
      </CardContent>
      {onOpen && (
        <CardContent sx={{ pt: 0 }}>
          <Button size="small" variant="text" onClick={() => onOpen(id)} sx={{ width: '100%', justifyContent: 'center' }}>
            View full source
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

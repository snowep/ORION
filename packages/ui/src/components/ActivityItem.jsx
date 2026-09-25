import { Box, Typography, Chip, Tooltip } from '@mui/material';
import { Folder } from '@mui/icons-material';

const typeConfig = {
  message: { color: 'primary', label: 'Message' },
  task: { color: 'success', label: 'Task' },
  decision: { color: 'warning', label: 'Decision' },
  proposal: { color: 'info', label: 'Proposal' },
  approval: { color: 'secondary', label: 'Approval' },
  file: { color: 'default', label: 'File' },
  memory: { color: 'secondary', label: 'Memory' },
  council: { color: 'info', label: 'Council' }
};

/**
 * Activity item — a human-readable event line with time-ago,
 * actor, and project chips.
 */
export function ActivityItem({ id: _id, type, title, description, timestamp, actor, projectId: _projectId, projectName, metadata, onClick }) {
  const config = typeConfig[type];
  const timeAgo = formatTimeAgo(timestamp);

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background-color 0.15s, box-shadow 0.15s',
        '&:hover': { backgroundColor: 'action.hover', boxShadow: 1 }
      }}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40 }}>
        <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', mb: 0.5 }}>
          {timeAgo}
        </Typography>
        <Tooltip title={config.label}>
          <Chip label={config.label} size="small" variant="outlined" color={config.color} />
        </Tooltip>
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ fontWeight: 600, flex: 1, minWidth: 0 }}>{title}</Typography>
          {actor && (
            <Tooltip title={`${actor.type}: ${actor.name}`}>
              <Chip
                label={actor.name}
                size="small"
                variant="outlined"
                color={actor.type === 'persona' ? 'secondary' : actor.type === 'system' ? 'default' : 'primary'}
              />
            </Tooltip>
          )}
          {projectName && (
            <Tooltip title={projectName}>
              <Chip icon={<Folder fontSize="small" />} label={projectName} size="small" variant="outlined" color="default" />
            </Tooltip>
          )}
        </Box>
        {description && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{description}</Typography>}
        {metadata && Object.keys(metadata).length > 0 && (
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {Object.entries(metadata).slice(0, 3).map(([key, value]) => (
              <Chip key={key} label={`${key}: ${String(value)}`} size="small" variant="outlined" color="default" />
            ))}
            {Object.keys(metadata).length > 3 && <Chip label={`+${Object.keys(metadata).length - 3} more`} size="small" variant="outlined" color="default" />}
          </Box>
        )}
      </Box>
    </Box>
  );
}

/**
 * Human-friendly relative time.
 */
function formatTimeAgo(date) {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

/**
 * Activity feed with optional load-more.
 */
export function ActivityFeed({ items, onLoadMore, loading, hasMore }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {items.map((item) => (
        <ActivityItem key={item.id} {...item} />
      ))}
      {loading && <div style={{ textAlign: 'center', padding: 16 }}>Loading more...</div>}
      {hasMore && !loading && <button onClick={onLoadMore} style={{ padding: 8, textAlign: 'center', color: '#1976d2', background: 'none', border: 'none', cursor: 'pointer' }}>Load more</button>}
    </Box>
  );
}

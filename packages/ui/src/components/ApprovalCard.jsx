import { Card, CardContent, Typography, Box, Button, Chip, Divider } from '@mui/material';
import { Check, Close, Edit } from '@mui/icons-material';
import { useState } from 'react';

const riskConfig = {
  low: { color: 'success', label: 'Low' },
  medium: { color: 'warning', label: 'Medium' },
  high: { color: 'error', label: 'High' },
  critical: { color: 'error', label: 'Critical' }
};

const riskBorder = {
  low: '#2e7d32',
  medium: '#ed6c02',
  high: '#d32f2f',
  critical: '#d32f2f'
};

/**
 * Approval card — answers What/Why/Changes/Risk/Reversible with
 * Approve / Edit / Reject actions (ORION_UI.md §15).
 */
export function ApprovalCard({ id, title, description, what, why, changes, risk, reversible, evidence, onApprove, onReject, onEdit, expanded = false }) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const handleReject = () => {
    if (rejectReason.trim()) {
      onReject(id, rejectReason);
      setShowRejectDialog(false);
      setRejectReason('');
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 3, borderLeft: `4px solid ${riskBorder[risk]}` }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{title}</Typography>
            <Typography variant="body2" color="text.secondary">{description}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label={riskConfig[risk].label} color={riskConfig[risk].color} size="small" variant="outlined" />
            <Chip label={reversible ? 'Reversible' : 'Irreversible'} color={reversible ? 'success' : 'error'} size="small" variant="outlined" />
          </Box>
        </Box>

        {isExpanded && (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>What will happen?</Typography>
              <Typography variant="body2" color="text.secondary">{what}</Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>Why?</Typography>
              <Typography variant="body2" color="text.secondary">{why}</Typography>
            </Box>

            {changes.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>What changes?</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {changes.map((change, index) => (
                    <Chip key={index} label={change} size="small" variant="outlined" color="default" />
                  ))}
                </Box>
              </Box>
            )}

            {evidence.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>Evidence</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {evidence.map((e, index) => (
                    <Typography key={index} variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                      • {e}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />
          </>
        )}

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button variant="outlined" onClick={() => onEdit(id)} startIcon={<Edit fontSize="small" />}>Edit</Button>
          <Button variant="outlined" color="error" onClick={() => setShowRejectDialog(true)} startIcon={<Close fontSize="small" />}>Reject</Button>
          <Button variant="contained" color="success" onClick={() => onApprove(id)} startIcon={<Check fontSize="small" />}>Approve</Button>
          <Button size="small" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Hide details' : 'Show details'}
          </Button>
        </Box>

        {showRejectDialog && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: 'error.light', borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Reason for rejection</Typography>
            <Box
              component="textarea"
              sx={{ width: '100%', minHeight: 80, p: 1, borderRadius: 1, border: '1px solid', borderColor: 'divider', fontFamily: 'inherit' }}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Explain why this should be rejected..."
            />
            <Box sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' }}>
              <Button onClick={() => setShowRejectDialog(false)}>Cancel</Button>
              <Button variant="contained" color="error" onClick={handleReject}>Confirm Rejection</Button>
             </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

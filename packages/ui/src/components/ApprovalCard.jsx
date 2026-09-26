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

  const cardSx = { mb: 3, borderLeft: `4px solid ${riskBorder[risk]}` };
  const headerBoxSx = { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexWrap: 'wrap', gap: 2 };
  const titleBoxSx = { flex: 1, minWidth: 200 };
  const titleTypographySx = { fontWeight: 600, mb: 0.5 };
  const chipsBoxSx = { display: 'flex', gap: 1, flexWrap: 'wrap' };
  const whatBoxSx = { mb: 2 };
  const whatTypographySx = { fontWeight: 600, mb: 1, color: 'text.primary' };
  const whyBoxSx = { mb: 2 };
  const whyTypographySx = { fontWeight: 600, mb: 1, color: 'text.primary' };
  const changesBoxSx = { mb: 2 };
  const changesTypographySx = { fontWeight: 600, mb: 1, color: 'text.primary' };
  const changesChipsSx = { display: 'flex', flexWrap: 'wrap', gap: 1 };
  const evidenceBoxSx = { mb: 2 };
  const evidenceTypographySx = { fontWeight: 600, mb: 1, color: 'text.primary' };
  const evidenceItemSx = { fontFamily: 'monospace', fontSize: '0.8rem' };
  const dividerSx = { my: 2 };
  const actionsBoxSx = { display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' };
  const rejectDialogBoxSx = { mt: 2, p: 2, backgroundColor: 'error.light', borderRadius: 2 };
  const rejectReasonTypographySx = { mb: 1 };
  const rejectReasonTextareaSx = { width: '100%', minHeight: 80, p: 1, borderRadius: 1, border: '1px solid', borderColor: 'divider', fontFamily: 'inherit' };
  const rejectButtonsSx = { display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' };

  return (
    <Card variant="outlined" sx={cardSx}>
      <CardContent>
        <Box sx={headerBoxSx}>
          <Box sx={titleBoxSx}>
            <Typography variant="h6" sx={titleTypographySx}>{title}</Typography>
            <Typography variant="body2" color="text.secondary">{description}</Typography>
          </Box>
          <Box sx={chipsBoxSx}>
            <Chip label={riskConfig[risk].label} color={riskConfig[risk].color} size="small" variant="outlined" />
            <Chip label={reversible ? 'Reversible' : 'Irreversible'} color={reversible ? 'success' : 'error'} size="small" variant="outlined" />
          </Box>
        </Box>

        {isExpanded && (
          <>
            <Box sx={whatBoxSx}>
              <Typography variant="subtitle2" sx={whatTypographySx}>What will happen?</Typography>
              <Typography variant="body2" color="text.secondary">{what}</Typography>
            </Box>

            <Box sx={whyBoxSx}>
              <Typography variant="subtitle2" sx={whyTypographySx}>Why?</Typography>
              <Typography variant="body2" color="text.secondary">{why}</Typography>
            </Box>

            {changes.length > 0 && (
              <Box sx={changesBoxSx}>
                <Typography variant="subtitle2" sx={changesTypographySx}>What changes?</Typography>
                <Box sx={changesChipsSx}>
                  {changes.map((change, index) => (
                    <Chip key={index} label={change} size="small" variant="outlined" color="default" />
                  ))}
                </Box>
              </Box>
            )}

            {evidence.length > 0 && (
              <Box sx={evidenceBoxSx}>
                <Typography variant="subtitle2" sx={evidenceTypographySx}>Evidence</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {evidence.map((e, index) => (
                    <Typography key={index} variant="body2" color="text.secondary" sx={evidenceItemSx}>
                      • {e}
                    </Typography>
                  ))}
                </Box>
              </Box>
            )}

            <Divider sx={dividerSx} />
          </>
        )}

        <Box sx={actionsBoxSx}>
          <Button variant="outlined" onClick={() => onEdit(id)} startIcon={<Edit fontSize="small" />}>Edit</Button>
          <Button variant="outlined" color="error" onClick={() => setShowRejectDialog(true)} startIcon={<Close fontSize="small" />}>Reject</Button>
          <Button variant="contained" color="success" onClick={() => onApprove(id)} startIcon={<Check fontSize="small" />}>Approve</Button>
          <Button size="small" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? 'Hide details' : 'Show details'}
          </Button>
        </Box>

        {showRejectDialog && (
          <Box sx={rejectDialogBoxSx}>
            <Typography variant="subtitle2" sx={rejectReasonTypographySx}>Reason for rejection</Typography>
            <Box
              component="textarea"
              sx={rejectReasonTextareaSx}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Explain why this should be rejected..."
            />
            <Box sx={rejectButtonsSx}>
              <Button onClick={() => setShowRejectDialog(false)}>Cancel</Button>
              <Button variant="contained" color="error" onClick={handleReject}>Confirm Rejection</Button>
             </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
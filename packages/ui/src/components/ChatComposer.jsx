import { Box, TextField, IconButton, Button, Chip, Avatar, Tooltip, Popover, Typography, useTheme } from '@mui/material';
import { Send, AttachFile, Mic, Face, KeyboardArrowUp } from '@mui/icons-material';
import { useState, useRef, useEffect } from 'react';

/**
 * Chat composer with persona selection and attachments.
 */
export function ChatComposer({
  onSend,
  disabled = false,
  placeholder = 'Ask ORION...',
  personas = [],
  selectedPersonaId,
  onPersonaChange,
  maxHeight = 200
}) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const anchorRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const height = Math.min(textareaRef.current.scrollHeight, maxHeight);
      textareaRef.current.style.height = `${height}px`;
    }
  }, [message, maxHeight]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const trimmed = message.trim();
    if (trimmed || attachments.length > 0) {
      onSend(trimmed, attachments);
      setMessage('');
      setAttachments([]);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
          textareaRef.current.style.height = '48px';
        }
      }, 0);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files)]);
    }
    e.target.value = '';
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const rootBoxSx = { borderTop: 1, borderColor: 'divider', backgroundColor: 'background.paper', p: 2 };
  const attachmentsBoxSx = { display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1.5 };
  const mainBoxSx = { display: 'flex', alignItems: 'flex-end', gap: 1 };
  const flexBoxSx = { flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 };
  const textFieldSx = {
    '& .MuiInputBase-root': {
      borderRadius: 2,
      backgroundColor: 'background.default',
      border: '1px solid',
      borderColor: 'divider',
      '&:hover': { borderColor: 'primary.main' },
      '&.Mui-focused': { borderColor: 'primary.main', boxShadow: `0 0 0 2px ${theme.palette.primary.light}40` }
    }
  };
  const sendButtonSx = { minWidth: 48, height: 48, borderRadius: '50%', padding: 0 };
  const popoverSx = { minWidth: 240 };
  const personaHeaderSx = { px: 1, py: 0.5, fontWeight: 600, display: 'block' };
  const personaItemSx = (isSelected) => ({
    display: 'flex', alignItems: 'center', gap: 1.5, px: 1.5, py: 1, borderRadius: 1, cursor: 'pointer',
    backgroundColor: isSelected ? 'primary.light' : 'transparent',
    color: isSelected ? 'primary.contrastText' : 'inherit',
    '&:hover': { backgroundColor: isSelected ? 'primary.main' : 'action.hover' },
    width: '100%', border: 'none', fontFamily: 'inherit', fontSize: '0.875rem'
  });

  return (
    <Box sx={rootBoxSx}>
      {attachments.length > 0 && (
        <Box sx={attachmentsBoxSx}>
          {attachments.map((file, index) => (
            <Chip
              key={index}
              label={file.name}
              size="small"
              variant="outlined"
              color="primary"
              onDelete={() => removeAttachment(index)}
              deleteIcon={<KeyboardArrowUp fontSize="small" />}
            />
          ))}
        </Box>
      )}

      <Box sx={mainBoxSx}>
        <input type="file" multiple onChange={handleFileChange} style={{ display: 'none' }} ref={fileInputRef} />
        <Tooltip title="Attach file">
          <IconButton size="small" disabled={disabled} aria-label="Attach file" onClick={() => fileInputRef.current?.click()}>
            <AttachFile fontSize="medium" />
          </IconButton>
        </Tooltip>

        {personas.length > 0 && (
          <Tooltip title="Select persona">
            <IconButton
              size="small"
              ref={anchorRef}
              onClick={() => setShowPersonaMenu(!showPersonaMenu)}
              aria-label="Select persona"
              aria-expanded={showPersonaMenu}
            >
              <Face fontSize="medium" color={selectedPersonaId ? 'primary' : 'inherit'} />
            </IconButton>
          </Tooltip>
        )}

        <Box sx={flexBoxSx}>
          <TextField
            multiline
            rows={1}
            maxRows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            fullWidth
            size="small"
            InputProps={{
              multiline: true,
              inputRef: textareaRef,
              style: { padding: '8px 12px' }
            }}
            sx={textFieldSx}
          />
        </Box>

        <Tooltip title="Send (Enter) / New line (Shift+Enter)">
          <span>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={handleSend}
              disabled={disabled || (!message.trim() && attachments.length === 0)}
              aria-label="Send message"
              sx={sendButtonSx}
            >
              <Send fontSize="medium" />
            </Button>
          </span>
        </Tooltip>

        <Tooltip title="Voice input (coming later)">
          <IconButton size="small" disabled aria-label="Voice input">
            <Mic fontSize="medium" />
          </IconButton>
        </Tooltip>
      </Box>

      {showPersonaMenu && (
        <Popover
          open={showPersonaMenu}
          anchorEl={anchorRef.current}
          onClose={() => setShowPersonaMenu(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={popoverSx}
        >
          <Box sx={{ p: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={personaHeaderSx}>Select Persona</Typography>
            <Box
              component="button"
              onClick={() => { onPersonaChange?.(''); setShowPersonaMenu(false); }}
              sx={personaItemSx(!selectedPersonaId)}
            >
              None (Default)
            </Box>
            {personas.map((p) => (
              <Box
                key={p.id}
                component="button"
                onClick={() => { onPersonaChange?.(p.id); setShowPersonaMenu(false); }}
                sx={personaItemSx(selectedPersonaId === p.id)}
              >
                {p.avatar ? <Avatar src={p.avatar} sx={{ width: 24, height: 24 }} /> : <Face fontSize="small" />}
                {p.name}
              </Box>
            ))}
          </Box>
        </Popover>
      )}
    </Box>
  );
}
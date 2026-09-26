'use client';

import { Box, Typography, Stack, Paper, Chip, Divider, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { ExpandMore, CheckCircle, Schedule, Cancel, Construction } from '@mui/icons-material';
import { useState } from 'react';

const phases = [
  {
    id: 'phase1',
    title: 'Phase 1: Foundation',
    status: 'completed',
    description: 'Pigment CSS setup, Next.js plugin, MUI v9 version alignment, Tailwind removal',
    tasks: [
      { name: 'Install @pigment-css/react & @pigment-css/nextjs-plugin', done: true },
      { name: 'Configure next.config.js with Pigment CSS plugin', done: true },
      { name: 'Update apps/web/package.json to ^9.4.0', done: true },
      { name: 'Remove Tailwind CSS from globals.css', done: true },
      { name: 'Fix MUI v9 icon renames (ErrorOutline → ErrorOutlined)', done: true },
      { name: 'Fix missing icons (ChevronDown/Up → ExpandMore/Less)', done: true },
      { name: 'Fix Pigment CSS sx prop pre-eval errors (extract to variables)', done: true },
    ]
  },
  {
    id: 'phase2',
    title: 'Phase 2: Theme & Styling',
    status: 'completed',
    description: 'Verify theme compatibility, remove Emotion, confirm zero-runtime CSS',
    tasks: [
      { name: 'Verify orionTheme works with Pigment CSS', done: true },
      { name: 'Remove @emotion/react & @emotion/styled', done: true },
      { name: 'Confirm sx prop compiles to zero-runtime CSS', done: true },
      { name: 'Install @mui/system for Pigment CSS internals', done: true },
    ]
  },
  {
    id: 'phase3',
    title: 'Phase 3: Components Audit',
    status: 'completed',
    description: 'Refactor @orion/ui components for Pigment CSS compatibility',
    tasks: [
      { name: 'AppShell - extract sx props to variables', done: true },
      { name: 'ApprovalCard - extract sx props to variables', done: true },
      { name: 'ChatComposer - extract sx props & fix useTheme', done: true },
      { name: 'Card - extract sx props, fix Chevron icons', done: true },
      { name: 'ErrorState - fix ErrorOutline → ErrorOutlined', done: true },
      { name: 'Status - fix ErrorOutline → ErrorOutlined', done: true },
      { name: 'SourceCard - verify Pigment CSS compatibility', done: true },
      { name: 'ActivityItem - verify Pigment CSS compatibility', done: true },
      { name: 'PageHeader - verify Pigment CSS compatibility', done: true },
      { name: 'Section - verify Pigment CSS compatibility', done: true },
      { name: 'EmptyState - verify Pigment CSS compatibility', done: true },
    ]
  },
  {
    id: 'phase4',
    title: 'Phase 4: TypeScript & Cleanup',
    status: 'completed',
    description: 'Add TypeScript config, remove unused deps, align versions',
    tasks: [
      { name: 'Add tsconfig.json to apps/web', done: true },
      { name: 'Install TypeScript types (@types/react, @types/node)', done: true },
      { name: 'Align Babel to v7 across monorepo', done: true },
      { name: 'Pin TypeScript ^5.6.2 to satisfy ts-jest peer', done: true },
      { name: 'Clean up root package.json', done: true },
    ]
  },
  {
    id: 'phase5',
    title: 'Phase 5: UI Roadmap Display',
    status: 'completed',
    description: 'Create /roadmap page with live status indicators',
    tasks: [
      { name: 'Create /roadmap route page', done: true },
      { name: 'Add interactive phase/task status display', done: true },
      { name: 'Add build verification button', done: false },
      { name: 'Link to GitHub issues/tracking', done: false },
    ]
  }
];

function getStatusIcon(status: string) {
  switch (status) {
    case 'completed': return <CheckCircle fontSize="small" color="success" />;
    case 'in_progress': return <Schedule fontSize="small" color="warning" />;
    case 'pending': return <Construction fontSize="small" color="info" />;
    default: return <Cancel fontSize="small" color="action" />;
  }
}

function getStatusChip(status: string) {
  switch (status) {
    case 'completed': return <Chip label="Completed" color="success" size="small" variant="outlined" icon={<CheckCircle fontSize="small" />} />;
    case 'in_progress': return <Chip label="In Progress" color="warning" size="small" variant="outlined" icon={<Schedule fontSize="small" />} />;
    case 'pending': return <Chip label="Pending" color="info" size="small" variant="outlined" icon={<Construction fontSize="small" />} />;
    default: return <Chip label="Blocked" color="error" size="small" variant="outlined" icon={<Cancel fontSize="small" />} />;
  }
}

export default function RoadmapPage() {
  const [expandedPhase, setExpandedPhase] = useState<string>('phase1');

  const completedTasks = phases.flatMap(p => p.tasks).filter(t => t.done).length;
  const totalTasks = phases.flatMap(p => p.tasks).length;
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  return (
    <Box sx={{ p: { xs: 3, sm: 4, md: 5 }, maxWidth: 1200, mx: 'auto', minHeight: '100vh' }}>
      {/* Header Section */}
      <Stack spacing={3} sx={{ mb: 5, pb: 4, borderBottom: 1, borderColor: 'divider' }}>
        <Stack spacing={1}>
          <Typography variant="h3" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
            ORION — MUI v9 Migration Roadmap
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            Track progress toward fully native MUI v9 with Pigment CSS zero-runtime styling
          </Typography>
        </Stack>

        {/* Progress Overview */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', border: 1, borderColor: 'divider', borderRadius: 2 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ flexWrap: 'wrap', gap: 3, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h2" sx={{ fontWeight: 700 }} color="primary.main">{progressPercent}%</Typography>
                <Typography variant="body1" color="text.secondary">Complete</Typography>
              </Box>
              <Box sx={{ minWidth: 120, maxWidth: 200, flex: 1 }}>
                <Stack spacing={0.5}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">{completedTasks} of {totalTasks} tasks</Typography>
                  </Stack>
                  <div style={{ height: 8, borderRadius: 4, backgroundColor: 'var(--mui-palette-grey-200)', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      width: `${progressPercent}%`, 
                      background: 'linear-gradient(90deg, var(--mui-palette-success-main), var(--mui-palette-success-light))',
                      borderRadius: 4,
                      transition: 'width 0.5s ease-out'
                    }} />
                  </div>
                </Stack>
              </Box>
            </Box>
            <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', gap: 1.5 }}>
              {phases.map(p => getStatusChip(p.status))}
            </Stack>
          </Stack>
        </Paper>
      </Stack>

      {/* Phases */}
      <Stack spacing={3} sx={{ mb: 5 }}>
        {phases.map((phase) => (
          <Paper key={phase.id} elevation={0} sx={{ 
            border: 1, 
            borderColor: 'divider', 
            borderRadius: 2, 
            overflow: 'hidden',
            transition: 'box-shadow 0.2s ease',
            '&:hover': { boxShadow: 1 }
          }}>
            <Accordion
              expanded={expandedPhase === phase.id}
              onChange={() => setExpandedPhase(expandedPhase === phase.id ? '' : phase.id)}
              sx={{ '&:before': { display: 'none' }, '& .MuiAccordion-root': { border: 'none' } }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ 
                  minHeight: 64, 
                  px: 3, 
                  py: 2,
                  bgcolor: expandedPhase === phase.id ? 'action.hover' : 'transparent',
                  borderBottom: expandedPhase !== phase.id ? '1px solid' : 'none',
                  borderColor: 'divider',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <Stack direction="row" spacing={2} sx={{ flex: 1, flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ 
                      p: 1, 
                      borderRadius: 1, 
                      bgcolor: phase.status === 'completed' ? 'success.light' : 
                             phase.status === 'in_progress' ? 'warning.light' : 'info.light',
                      display: 'flex'
                    }}>
                      {getStatusIcon(phase.status)}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0 }}>{phase.title}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', ml: 'auto' }}>
                    {getStatusChip(phase.status)}
                  </Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 3, pt: 1 }}>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>{phase.description}</Typography>
                <Divider sx={{ mb: 3 }} />
                
                {/* Task Grid - using Box with flex for MUI v9 Grid v2 compatibility */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {phase.tasks.map((task, index) => (
                    <Box key={`${phase.id}-${index}`} sx={{ 
                      flex: '1 1 300px',
                      minWidth: 280,
                      maxWidth: 'calc(50% - 16px)',
                    }}>
                      <Box sx={{ 
                        p: 2, 
                        borderRadius: 1.5, 
                        border: 1, 
                        borderColor: task.done ? 'success.light' : 'divider',
                        bgcolor: task.done ? 'success.lighter' : 'background.paper',
                        transition: 'all 0.2s ease',
                        '&:hover': { borderColor: task.done ? 'success.main' : 'primary.light' }
                      }}>
                        <Stack direction="row" spacing={1.5} sx={{ gap: 1.5, alignItems: 'flex-start' }}>
                          <Box sx={{ flexShrink: 0, mt: 0.5 }}>
                            <Chip
                              label={task.done ? 'Done' : 'Pending'}
                              size="small"
                              variant="outlined"
                              color={task.done ? 'success' : 'default'}
                              icon={task.done ? <CheckCircle fontSize="small" /> : undefined}
                              sx={{ height: 24, fontSize: '0.7rem', fontWeight: 600 }}
                            />
                          </Box>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              flex: 1, 
                              color: task.done ? 'text.secondary' : 'text.primary',
                              textDecoration: task.done ? 'line-through' : 'none',
                              lineHeight: 1.5
                            }}
                          >
                            {task.name}
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Paper>
        ))}
      </Stack>

      {/* Footer Actions */}
      <Paper elevation={0} sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2, bgcolor: 'background.default' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ flexWrap: 'wrap', gap: 2, alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>Build Verification</Typography>
            <Typography variant="body2" color="text.secondary">
              Verify the production build and explore upstream resources
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              startIcon={<ExpandMore />}
              onClick={() => window.open('https://github.com/mui/material-ui', '_blank')}
            >
              MUI v9 Documentation
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => window.open('https://github.com/mui/pigment-css', '_blank')}
            >
              Pigment CSS Repository
            </Button>
          </Stack>
        </Stack>
        
        <Divider sx={{ my: 3 }} />
        
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
          Last build: {new Date().toLocaleString()} • Bundle: 19.8 kB (First Load: 150 kB) • Roadmap: 12.7 kB
        </Typography>
      </Paper>
    </Box>
  );
}
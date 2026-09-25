import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText, Divider, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon, Dashboard, Chat, Work, Folder, Memory, People, Settings, ChevronLeft } from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Primary navigation per ORION_UI.md §2.
 * @param {Object} props
 * @param {import('react').ReactNode} props.children
 */
export function AppShell({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { label: 'Home', href: '/', icon: Dashboard },
    { label: 'Chat', href: '/chat', icon: Chat },
    { label: 'Work', href: '/work', icon: Work },
    { label: 'Vault', href: '/vault', icon: Folder },
    { label: 'Memory', href: '/memory', icon: Memory },
    { label: 'People', href: '/people', icon: People },
    { label: 'Automations', href: '/automations', icon: Settings }
  ];

  const DrawerWidth = collapsed ? 72 : 260;

  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          ORION
        </Typography>
      </Box>
      <List sx={{ flex: 1, px: 1, py: 1 }} component="nav" aria-label="Main navigation">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem
                button
                selected={isActive}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  px: 1.5,
                  py: 1,
                  ...(isActive && { backgroundColor: 'primary.main', color: 'primary.contrastText', '& .MuiListItemIcon-root': { color: 'primary.contrastText' } }),
                  '&:hover': { backgroundColor: isActive ? 'primary.dark' : 'action.hover' }
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                <ListItemIcon sx={{ minWidth: 40, justifyContent: 'center' }}>
                  <Icon fontSize="medium" />
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.label} />}
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Divider sx={{ mx: 1 }} />
      <List sx={{ px: 1, pb: 1 }}>
        <Link href="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button sx={{ borderRadius: 2, px: 1.5, py: 1 }}>
            <ListItemIcon sx={{ minWidth: 40, justifyContent: 'center' }}>
              <Settings fontSize="medium" />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Settings" />}
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  if (isMobile) {
    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ backgroundColor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Open navigation" edge="start" sx={{ mr: 2 }} onClick={() => setMobileOpen(!mobileOpen)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>ORION</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: 260, boxSizing: 'border-box' } }}
        >
          {drawer}
        </Drawer>
        <Box component="main" sx={{ pt: 8, px: 3, pb: 3, flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open
        sx={{ width: DrawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: DrawerWidth, boxSizing: 'border-box', borderRight: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper', overflowX: 'hidden' } }}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default', ml: DrawerWidth + 'px' }}>
        <AppBar position="fixed" sx={{ width: `calc(100% - ${DrawerWidth}px)`, ml: DrawerWidth + 'px', backgroundColor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
          <Toolbar>
            <IconButton onClick={() => setCollapsed(!collapsed)} edge="start" color="inherit" aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ pt: 8, px: 4, pb: 4 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

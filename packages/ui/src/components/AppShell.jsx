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

  const drawerBoxSx = { display: 'flex', flexDirection: 'column', height: '100%' };
  const logoBoxSx = { p: 2, display: 'flex', alignItems: 'center', gap: 1, borderBottom: 1, borderColor: 'divider' };
  const logoTypographySx = { fontWeight: 700, color: 'primary.main', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
  const listSx = { flex: 1, px: 1, py: 1 };
  const dividerSx = { mx: 1 };
  const settingsListSx = { px: 1, pb: 1 };
  const settingsItemSx = { borderRadius: 2, px: 1.5, py: 1 };
  const settingsIconSx = { minWidth: 40, justifyContent: 'center' };

  const drawer = (
    <Box sx={drawerBoxSx}>
      <Box sx={logoBoxSx}>
        <Typography variant="h6" sx={logoTypographySx}>
          ORION
        </Typography>
      </Box>
      <List sx={listSx} component="nav" aria-label="Main navigation">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const listItemSx = {
            borderRadius: 2,
            mb: 0.5,
            px: 1.5,
            py: 1,
            ...(isActive && { backgroundColor: 'primary.main', color: 'primary.contrastText', '& .MuiListItemIcon-root': { color: 'primary.contrastText' } }),
            '&:hover': { backgroundColor: isActive ? 'primary.dark' : 'action.hover' }
          };
          const linkStyle = { textDecoration: 'none', color: 'inherit' };
          return (
            <Link key={item.label} href={item.href} style={linkStyle}>
              <ListItem
                button
                selected={isActive}
                sx={listItemSx}
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
      <Divider sx={dividerSx} />
      <List sx={settingsListSx}>
        <Link href="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItem button sx={settingsItemSx}>
            <ListItemIcon sx={settingsIconSx}>
              <Settings fontSize="medium" />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Settings" />}
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  const mobileBoxSx = { display: 'flex', minHeight: '100vh' };
  const mobileAppBarSx = { backgroundColor: 'background.paper', borderBottom: 1, borderColor: 'divider' };
  const mobileTypographySx = { fontWeight: 700, color: 'primary.main' };
  const mobileIconButtonSx = { mr: 2 };
  const mobileDrawerSx = { display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: 260, boxSizing: 'border-box' } };
  const mobileMainSx = { pt: 8, px: 3, pb: 3, flexGrow: 1 };

  if (isMobile) {
    return (
      <Box sx={mobileBoxSx}>
        <CssBaseline />
        <AppBar position="fixed" sx={mobileAppBarSx}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Open navigation" edge="start" sx={mobileIconButtonSx} onClick={() => setMobileOpen(!mobileOpen)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={mobileTypographySx}>ORION</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={mobileDrawerSx}
        >
          {drawer}
        </Drawer>
        <Box component="main" sx={mobileMainSx}>
          {children}
        </Box>
      </Box>
    );
  }

  const desktopBoxSx = { display: 'flex', minHeight: '100vh' };
  const drawerSx = { width: DrawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: DrawerWidth, boxSizing: 'border-box', borderRight: '1px solid', borderColor: 'divider', backgroundColor: 'background.paper', overflowX: 'hidden' } };
  const mainSx = { flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default', ml: DrawerWidth + 'px' };
  const appBarSx = { width: `calc(100% - ${DrawerWidth}px)`, ml: DrawerWidth + 'px', backgroundColor: 'background.paper', borderBottom: 1, borderColor: 'divider' };
  const toolbarButtonSx = {};
  const contentBoxSx = { pt: 8, px: 4, pb: 4 };

  return (
    <Box sx={desktopBoxSx}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open
        sx={drawerSx}
      >
        {drawer}
      </Drawer>
      <Box component="main" sx={mainSx}>
        <AppBar position="fixed" sx={appBarSx}>
          <Toolbar>
            <IconButton onClick={() => setCollapsed(!collapsed)} edge="start" color="inherit" aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'} sx={toolbarButtonSx}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={contentBoxSx}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
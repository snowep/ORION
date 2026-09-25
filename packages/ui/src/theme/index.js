import { createTheme } from '@mui/material/styles';

/**
 * ORION theme options — calm, premium, precise, readable (ORION_UI.md §17).
 * 8px base rhythm (§19).
 */
export const orionThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0', contrastText: '#ffffff' },
    secondary: { main: '#7c4dff', light: '#b388ff', dark: '#3f1dcc', contrastText: '#ffffff' },
    background: { default: '#fafafa', paper: '#ffffff' },
    text: { primary: '#1a1a2e', secondary: '#5f6368', disabled: '#9aa0a6' },
    divider: '#e0e0e0',
    action: { hoverOpacity: 0.04, selectedOpacity: 0.08, disabledOpacity: 0.38 }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2, letterSpacing: '-0.02em' },
    h2: { fontWeight: 600, fontSize: '2rem', lineHeight: 1.3, letterSpacing: '-0.01em' },
    h3: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.4 },
    h4: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.4 },
    h5: { fontWeight: 600, fontSize: '1.125rem', lineHeight: 1.5 },
    h6: { fontWeight: 600, fontSize: '1rem', lineHeight: 1.5 },
    body1: { fontSize: '1rem', lineHeight: 1.6, letterSpacing: '0.01em' },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
    button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.02em' },
    caption: { fontSize: '0.75rem', lineHeight: 1.5, color: '#5f6368' }
  },
  shape: { borderRadius: 8 },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': { boxSizing: 'border-box' },
        html: { WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' },
        body: { scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' },
        '::selection': { backgroundColor: '#1976d2', color: '#ffffff' }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, padding: '8px 16px', fontSize: '0.875rem' },
        contained: { boxShadow: '0 1px 2px rgba(0,0,0,0.05)', '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.1)' } },
        outlined: { borderWidth: 1.5, '&:hover': { borderWidth: 1.5 } }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: { border: '1px solid #e8eaed', boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)' }
      }
    },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 500, borderRadius: 6 } } },
    MuiAvatar: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiDivider: { styleOverrides: { root: { borderColor: '#e8eaed' } } },
    MuiTooltip: { styleOverrides: { tooltip: { fontSize: '0.75rem', padding: '6px 10px', borderRadius: 6 } } }
  }
};

export const orionTheme = createTheme(orionThemeOptions);

export const darkThemeOptions = {
  ...orionThemeOptions,
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9', light: '#bbdefb', dark: '#42a5f5', contrastText: '#000000' },
    secondary: { main: '#b388ff', light: '#d1c4e9', dark: '#7c4dff', contrastText: '#000000' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#e8eaed', secondary: '#9aa0a6', disabled: '#6e6e6e' },
    divider: '#333333'
  }
};

export const darkTheme = createTheme(darkThemeOptions);

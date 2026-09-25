import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { orionTheme } from './theme';

/**
 * App-level providers. The UI package owns this — apps consume it.
 * (Fixes the old inverted dependency where the package imported from apps/web.)
 */
export function Providers({ children }) {
  return (
    <ThemeProvider theme={orionTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

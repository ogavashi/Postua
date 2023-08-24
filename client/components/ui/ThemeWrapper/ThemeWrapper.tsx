import { useMemo } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { lightTheme, darkTheme } from '@/common';

export const ThemeWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  // TODO: Add redux (persist) support

  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');

  const preferedTheme = useMemo(
    () => (prefersLightMode ? lightTheme : darkTheme),
    [prefersLightMode]
  );

  return <ThemeProvider theme={preferedTheme}>{children}</ThemeProvider>;
};

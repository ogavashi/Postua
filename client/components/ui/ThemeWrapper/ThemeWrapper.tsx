import { useMemo } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { lightTheme, darkTheme } from '@/common';
import { appSelectors } from '@/features/app/store';
import { useAppSelector } from '@/store';

export const ThemeWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useAppSelector(appSelectors.theme);

  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');

  const preferedTheme = useMemo(() => {
    if (theme === 'auto') {
      return prefersLightMode ? lightTheme : darkTheme;
    }

    if (theme === 'light') {
      return lightTheme;
    }

    return darkTheme;
  }, [theme]);

  return <ThemeProvider theme={preferedTheme}>{children}</ThemeProvider>;
};

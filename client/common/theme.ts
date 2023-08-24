import { Roboto } from 'next/font/google';

import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const colors = {
  black: '#1A1A1A',
};

const baseTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export const lightTheme = createTheme({
  ...baseTheme,
  status: {
    danger: orange[500],
  },
  palette: {
    mode: 'light',
    background: {
      default: colors.black,
    },
  },
});

export const darkTheme = createTheme({
  ...baseTheme,
  status: {
    danger: orange[500],
  },
  palette: {
    mode: 'dark',
    background: {
      default: colors.black,
    },
  },
});

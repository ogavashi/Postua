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
});

const colors = {
  grey: '#1A202C',
  lightGrey: '#2c313d',
  lightGreen: '#81E6D9',
  darkGreen: '#319795',
  white: '#FFFFFF',
  darkWhite: '#edf2f7',
  red: '#e52e3a',
};

const baseTheme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  shape: {
    borderRadius: 9,
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
      default: colors.white,
      paper: colors.darkWhite,
    },
    primary: {
      main: colors.darkGreen,
    },
    secondary: { main: colors.darkWhite },
    error: {
      main: colors.red,
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
      default: colors.grey,
      paper: colors.grey,
    },
    primary: {
      main: colors.lightGreen,
    },
    error: {
      main: colors.red,
    },
    secondary: { main: colors.lightGrey },
  },
});

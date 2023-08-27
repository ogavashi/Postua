import { alpha, styled } from '@mui/material';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.common.black
      : theme.palette.secondary.contrastText,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.5)
      : alpha(theme.palette.common.white, 0.9),
  transition: '0.2s ease-in-out',
  '&:hover, &:focus-within': {
    backgroundColor: theme.palette.common.white,
  },
  marginLeft: 0,
  width: '100%',
}));

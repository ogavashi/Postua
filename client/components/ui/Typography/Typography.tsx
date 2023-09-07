import { styled, Typography as MuiTypography } from '@mui/material';

export const Typography = styled(MuiTypography)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  transition: '0.3s',
  '&:hover': {
    color: theme.palette.primary.main,
  },
})) as typeof MuiTypography;

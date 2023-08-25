import { styled, Menu as MuiMenu } from '@mui/material';

export const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

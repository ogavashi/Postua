import { MenuItem as MuiMenuItem, styled } from '@mui/material';

export const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  margin: theme.spacing(),
  borderRadius: theme.shape.borderRadius,
  gap: 5,
}));

import { styled, ListItemButton as MuiListItemButton } from '@mui/material';

export const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  width: 200,
  height: 45,
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  paddingInline: theme.spacing(1.5),
}));

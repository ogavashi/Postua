import { styled, ListItemButton as MuiListItemButton } from '@mui/material';

export const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  height: 56,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})) as typeof MuiListItemButton;

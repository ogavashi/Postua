import { styled, Tab as MuiTab } from '@mui/material';

export const Tab = styled(MuiTab)(({ theme }) => ({
  borderTopRightRadius: theme.shape.borderRadius,
  borderTopLeftRadius: theme.shape.borderRadius,
})) as typeof MuiTab;

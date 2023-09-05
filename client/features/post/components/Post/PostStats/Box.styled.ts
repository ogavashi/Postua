import { styled, Box as MuiBox } from '@mui/material';

export const Box = styled(MuiBox)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  alignItems: 'center',
  transform: 'translate(-50%, -50%)',
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  borderRadius: theme.shape.borderRadius,
  width: 350,
}));

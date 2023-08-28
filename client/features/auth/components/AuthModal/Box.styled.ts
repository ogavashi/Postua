import { styled, Box as MuiBox } from '@mui/material';

export const Box = styled(MuiBox)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  justifyContent: 'center',
  gap: 10,
  alignItems: 'center',
  width: 640,
  minHeight: 600,
  [theme.breakpoints.down('sm')]: {
    width: 300,
    flexDirection: 'column-reverse',
    minHeight: 'auto',
  },
  [theme.breakpoints.down('xs')]: {
    width: 300,
    minHeight: 'auto',
  },
  transform: 'translate(-50%, -50%)',
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  borderRadius: theme.shape.borderRadius,
}));

import { InputBase, styled } from '@mui/material';

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: theme.spacing(2),
    transition: theme.transitions.create('width'),
  },
  minWidth: 255,
  width: '100%',
}));

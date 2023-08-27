import { Search } from './Search.styled';
import { StyledInputBase } from './InputBase.styled';

import { SxProps, Theme } from '@mui/material';

interface SearchBarProps {
  sx?: SxProps<Theme>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ sx = [] }) => {
  return (
    <Search sx={{ ...sx }}>
      <StyledInputBase placeholder='Search…' />
    </Search>
  );
};

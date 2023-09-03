import { useTranslation } from 'next-i18next';

import { Search } from './Search.styled';
import { StyledInputBase } from './InputBase.styled';

import { SxProps, Theme } from '@mui/material';

interface SearchBarProps {
  sx?: SxProps<Theme>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ sx = [] }) => {
  const { t } = useTranslation();

  return (
    <Search sx={{ ...sx }}>
      <StyledInputBase placeholder={t('layout.ui.search')} />
    </Search>
  );
};

import { useCallback } from 'react';

import { useTranslation } from 'next-i18next';

import { Search } from './Search.styled';
import { StyledInputBase } from './InputBase.styled';

import { IconButton, InputAdornment, SxProps, Theme } from '@mui/material';
import { useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import { useSearch } from '@/features/search';

interface SearchBarProps {
  sx?: SxProps<Theme>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ sx = [] }) => {
  const { t } = useTranslation();

  const { searchValue, handleChange, handleClearSearch } = useSearch();

  return (
    <Search sx={{ ...sx }}>
      <StyledInputBase
        placeholder={t('layout.ui.search')}
        value={searchValue}
        onChange={handleChange}
        endAdornment={
          searchValue && (
            <InputAdornment position='end' sx={{ pr: 0.5 }}>
              <IconButton color='secondary' size='small' onClick={handleClearSearch}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        }
      />
    </Search>
  );
};

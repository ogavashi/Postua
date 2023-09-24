import { useCallback } from 'react';

import { useTranslation } from 'next-i18next';

import { Search } from './Search.styled';
import { StyledInputBase } from './InputBase.styled';

import {
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Paper,
  SxProps,
  Theme,
} from '@mui/material';
import { useState } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import { SearchPreview, useSearch } from '@/features/search';

interface SearchBarProps {
  sx?: SxProps<Theme>;
  setMobileOpen?: (value: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ sx = [], setMobileOpen }) => {
  const { t } = useTranslation();

  const {
    searchValue,
    handleChange,
    handleClearSearch,
    data,
    showPreview,
    wrapperRef,
    setShowPreview,
    debouncedValue,
  } = useSearch({ sideFunc: setMobileOpen });

  return (
    <Box>
      <Search sx={{ ...sx }} onClick={() => setShowPreview(true)}>
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
      {showPreview && (
        <div ref={wrapperRef}>
          <SearchPreview data={data} searchValue={searchValue} showPreview={!!debouncedValue} />
        </div>
      )}
    </Box>
  );
};

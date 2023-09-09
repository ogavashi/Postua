import { useCallback, useState } from 'react';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { useAppDispatch, useAppSelector } from '@/store';
import { appActions, appSelectors } from '@/features/app/store';
import { Theme } from '@/types';
import { themeCookie } from '@/features/cookies';

export const ColorToggle = () => {
  const theme = useAppSelector(appSelectors.theme);

  const dispatch = useAppDispatch();

  const handleSelectMode = useCallback((event: React.MouseEvent<HTMLElement>, newMode: Theme) => {
    dispatch(appActions.setTheme(newMode));
    themeCookie.set(newMode);
  }, []);

  return (
    <ToggleButtonGroup
      value={theme}
      exclusive
      onChange={handleSelectMode}
      color='primary'
      fullWidth
    >
      <ToggleButton value='light'>
        <LightModeIcon />
      </ToggleButton>
      <ToggleButton value='auto'>
        <SettingsSuggestIcon />
      </ToggleButton>
      <ToggleButton value='dark'>
        <DarkModeIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

import { useCallback, useState } from 'react';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

type ColorMode = 'light' | 'dark' | 'system';

export const ColorToggle = () => {
  const [colorMode, setColorMode] = useState<ColorMode>('system');

  const handleSelectMode = useCallback(
    (event: React.MouseEvent<HTMLElement>, newMode: ColorMode) => {
      setColorMode(newMode);
    },
    []
  );

  return (
    <ToggleButtonGroup
      value={colorMode}
      exclusive
      onChange={handleSelectMode}
      color='primary'
      fullWidth
    >
      <ToggleButton value='light'>
        <LightModeIcon />
      </ToggleButton>
      <ToggleButton value='system'>
        <SettingsSuggestIcon />
      </ToggleButton>
      <ToggleButton value='dark'>
        <DarkModeIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

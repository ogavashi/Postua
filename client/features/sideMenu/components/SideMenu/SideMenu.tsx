import { Box, SxProps, Theme } from '@mui/material';

import { CategoriesList, MenuList } from '@/features/sideMenu';

interface SideMenuProps {
  sx?: SxProps<Theme>;
  handleDrawerToggle?: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ sx = [], handleDrawerToggle }) => {
  return (
    <Box
      flexDirection='column'
      gap={5}
      alignItems='center'
      position='sticky'
      height='100%'
      top={64}
      left={0}
      sx={{ ...sx }}
    >
      <MenuList handleDrawerToggle={handleDrawerToggle} />
      <CategoriesList handleDrawerToggle={handleDrawerToggle} />
    </Box>
  );
};

import { Box, SxProps, Theme } from '@mui/material';

import { CategoriesList, MenuList } from '@/features/sideMenu';

interface SideMenuProps {
  sx?: SxProps<Theme>;
}

export const SideMenu: React.FC<SideMenuProps> = ({ sx = [] }) => {
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
      <MenuList />
      <CategoriesList />
    </Box>
  );
};

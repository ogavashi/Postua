import { Box, Divider, Drawer as MuiDrawer, useTheme, IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { SearchBar } from '@/components';
import { SideMenu } from '@/features/sideMenu';

interface DrawerProps {
  isOpen: boolean;
  handleDrawerToggle: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, handleDrawerToggle }) => {
  const theme = useTheme();

  return (
    <nav>
      <MuiDrawer
        open={isOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '100%',
            backgroundColor: theme.palette.secondary.main,
          },
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Box display='flex' alignItems='center' gap={2} sx={{ padding: '8px 16px' }}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon color='primary' />
            </IconButton>
            <SearchBar sx={{ width: '100%' }} />
          </Box>
          <Divider />
          <SideMenu />
        </Box>
      </MuiDrawer>
    </nav>
  );
};

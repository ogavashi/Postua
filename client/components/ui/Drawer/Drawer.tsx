import {
  Box,
  Divider,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
  useTheme,
  IconButton,
} from '@mui/material';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

import { constants } from '@/common';

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
          <Box display='flex' alignItems='center' my={2} mx={3}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon color='primary' />
            </IconButton>
            <>SearchBar</>
          </Box>
          <Divider />
          <List>
            {constants.MOCK.CATEGORIES.map((item) => (
              <ListItem key={item}>
                <ListItemButton
                  sx={{
                    textAlign: 'center',
                    borderRadius: theme.shape.borderRadius,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant='h6'>{item}</Typography>
                  <ArrowForwardIosIcon color='primary' />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </MuiDrawer>
    </nav>
  );
};

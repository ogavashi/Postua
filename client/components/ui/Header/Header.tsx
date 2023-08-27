import { useState, useCallback } from 'react';

import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { Drawer, ElevationScroll, Logo, ProfileBar, SearchBar } from '@/components';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAuthorized = true;

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevState) => !prevState);
  }, []);

  return (
    <ElevationScroll>
      <AppBar enableColorOnDark color='primary' component='nav'>
        <Toolbar>
          <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
            <Logo sx={{ display: { xs: 'none', md: 'flex' } }} />
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton size='large' onClick={handleDrawerToggle} color='inherit'>
                <MenuIcon />
              </IconButton>
            </Box>
            <SearchBar sx={{ display: { xs: 'none', md: 'flex' }, maxWidth: '25rem' }} />
            <Logo sx={{ display: { xs: 'flex', md: 'none', alignItems: 'center' } }} />
            {isAuthorized ? (
              <Box display='flex' justifyContent='center' alignItems='center'>
                <Button
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                  variant='contained'
                  color='secondary'
                  startIcon={<EditNoteIcon />}
                >
                  Post
                </Button>
                <ProfileBar />
              </Box>
            ) : (
              <Button variant='contained' color='secondary'>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
        <Drawer isOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      </AppBar>
    </ElevationScroll>
  );
};

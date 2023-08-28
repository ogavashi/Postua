import { useState, useCallback } from 'react';

import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { Drawer, ElevationScroll, Logo, ProfileBar, SearchBar } from '@/components';
import { AuthModal } from '@/features/auth';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const handleOpenModal = useCallback(() => setShowModal(true), []);

  const handleCloseModal = useCallback(() => setShowModal(false), []);

  const isAuthorized = false;

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
                <MenuIcon color='secondary' />
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
              <Button variant='contained' color='secondary' onClick={handleOpenModal}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
        <Drawer isOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <AuthModal isOpen={showModal} handleClose={handleCloseModal} />
      </AppBar>
    </ElevationScroll>
  );
};

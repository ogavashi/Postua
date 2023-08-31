import { useState, useCallback } from 'react';

import { AppBar, Box, Button, Divider, IconButton, Toolbar, colors } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';

import { Drawer, ElevationScroll, Logo, ProfileBar, SearchBar, Settings } from '@/components';
import { AuthModal } from '@/features/auth';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleOpenModal = useCallback(() => setShowModal(true), []);

  const handleCloseModal = useCallback(() => setShowModal(false), []);

  const isAuthorized = true;

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevState) => !prevState);
  }, []);

  const handleSettingsToggle = useCallback(() => {
    setShowSettings((prevState) => !prevState);
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
              <Logo sx={{ display: { xs: 'flex', md: 'none', alignItems: 'center' } }} />
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' gap={4}>
              <SearchBar sx={{ display: { xs: 'none', md: 'flex' }, maxWidth: '25rem' }} />
              <Settings isOpen={showSettings} handleSettingsToggle={handleSettingsToggle} />
              <Box display='flex' justifyContent='center' alignItems='center' gap={2}>
                {isAuthorized ? (
                  <>
                    <Button
                      sx={{ display: { xs: 'none', md: 'flex' } }}
                      variant='contained'
                      color='secondary'
                      startIcon={<EditNoteIcon />}
                    >
                      Post
                    </Button>
                    <ProfileBar />
                  </>
                ) : (
                  <Button variant='contained' color='secondary' onClick={handleOpenModal}>
                    Login
                  </Button>
                )}
                <IconButton color='secondary' onClick={handleSettingsToggle}>
                  <SettingsIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Toolbar>
        <Drawer isOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <AuthModal isOpen={showModal} handleClose={handleCloseModal} />
      </AppBar>
    </ElevationScroll>
  );
};

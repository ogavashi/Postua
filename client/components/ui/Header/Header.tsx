import { useState, useCallback } from 'react';

import { useTranslation } from 'next-i18next';

import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';

import { Drawer, ElevationScroll, Logo, ProfileBar, SearchBar, Settings } from '@/components';
import { AuthModal } from '@/features/auth';
import { store, useAppSelector } from '@/store';
import { userSelectors } from '@/features/user';

export const Header = () => {
  const user = useAppSelector(userSelectors.data);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { t } = useTranslation();

  const handleOpenModal = useCallback(() => setShowModal(true), []);

  const handleCloseModal = useCallback(() => setShowModal(false), []);

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
              <IconButton
                size='large'
                onClick={handleDrawerToggle}
                color='inherit'
                sx={{ p: 0, pr: 1 }}
              >
                <MenuIcon color='secondary' />
              </IconButton>
              <Logo sx={{ display: { xs: 'flex', md: 'none', alignItems: 'center' } }} />
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' gap={4}>
              <SearchBar sx={{ display: { xs: 'none', md: 'flex' }, maxWidth: '25rem' }} />
              <Settings isOpen={showSettings} handleSettingsToggle={handleSettingsToggle} />
              <Box display='flex' justifyContent='center' alignItems='center' gap={2}>
                {user ? (
                  <>
                    <Button
                      sx={{ display: { xs: 'none', md: 'flex' } }}
                      variant='contained'
                      color='secondary'
                      startIcon={<EditNoteIcon />}
                    >
                      {t('layout.ui.post')}
                    </Button>
                    <ProfileBar user={user} />
                  </>
                ) : (
                  <Button variant='contained' color='secondary' onClick={handleOpenModal}>
                    {t('layout.ui.login')}
                  </Button>
                )}
                <IconButton color='secondary' onClick={handleSettingsToggle} sx={{ p: 0 }}>
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

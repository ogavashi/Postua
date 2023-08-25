import { useState, useCallback } from 'react';

import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';

import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { Drawer, ElevationScroll, Logo, ProfileBar } from '@/components';
import { constants } from '@/common';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevState) => !prevState);
  }, []);

  return (
    <ElevationScroll>
      <AppBar enableColorOnDark color='primary' component='nav'>
        <Toolbar>
          <Box display='flex' justifyContent='space-between' width='100%'>
            <Logo sx={{ display: { xs: 'none', md: 'flex' } }} />
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton size='large' onClick={handleDrawerToggle} color='inherit'>
                <MenuIcon />
              </IconButton>
            </Box>
            <Logo sx={{ display: { xs: 'flex', md: 'none', alignItems: 'center' } }} />
            <ProfileBar />
          </Box>
        </Toolbar>
        <Drawer isOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
      </AppBar>
    </ElevationScroll>
  );
};

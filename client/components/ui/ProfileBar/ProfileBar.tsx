import { useState, useCallback } from 'react';

import { Badge, Box, IconButton, MenuItem } from '@mui/material';

import { AccountCircle } from '@mui/icons-material';

import NotificationsIcon from '@mui/icons-material/Notifications';
import { Menu } from './Menu.styled';

interface ProfileBarProps {
  isMobile?: boolean;
}

export const ProfileBar: React.FC<ProfileBarProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMobileMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMoreAnchorEl(null);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
    handleMobileMenuClose();
  }, []);

  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
          <Badge badgeContent={17} color='error'>
            <NotificationsIcon color='secondary' />
          </Badge>
        </IconButton>
        <IconButton size='large' edge='end' onClick={handleProfileMenuOpen} color='inherit'>
          <AccountCircle color='secondary' />
        </IconButton>
      </Box>

      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton size='large' onClick={handleMobileMenuOpen} color='inherit'>
          <AccountCircle color='secondary' />
        </IconButton>
        <Menu
          anchorEl={mobileMoreAnchorEl}
          keepMounted
          open={!!mobileMoreAnchorEl}
          onClose={handleMobileMenuClose}
        >
          <MenuItem>
            <IconButton size='large' color='inherit'>
              <Badge badgeContent={17} color='error'>
                <NotificationsIcon color='primary' />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton size='large' color='inherit'>
              <AccountCircle color='primary' />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </Menu>
        <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
      </Box>
    </>
  );
};

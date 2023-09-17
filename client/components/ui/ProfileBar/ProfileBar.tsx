import React, { useState, useCallback } from 'react';

import { destroyCookie } from 'nookies';

import { Avatar, Badge, Box, IconButton } from '@mui/material';

import { AccountCircle } from '@mui/icons-material';

import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import Person2Icon from '@mui/icons-material/Person2';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Menu } from './Menu.styled';
import { MenuItem } from '@/components';
import { useNavigation } from '@/hooks';
import { UserData } from '@/types';
import { useAppDispatch } from '@/store';
import { userActions } from '@/features/user';
import { useRouter } from 'next/router';

interface ProfileBarProps {
  user: UserData;
}

export const ProfileBar: React.FC<ProfileBarProps> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();

  const router = useRouter();

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

  const { navigateCategory, handleNavigate } = useNavigation({ sideFunc: handleMenuClose });

  const handleLogout = useCallback(() => {
    dispatch(userActions.unSetUser());
    destroyCookie(null, 'postUaToken', { path: '/' });
    router.reload();
  }, []);

  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <IconButton
          size='large'
          aria-label='show 17 new notifications'
          color='inherit'
          onClick={() => handleNavigate('notifications')}
        >
          <Badge badgeContent={17} color='error'>
            <NotificationsIcon color='secondary' />
          </Badge>
        </IconButton>
        <IconButton size='large' edge='end' onClick={handleProfileMenuOpen} color='inherit'>
          <Avatar src={user.avatarUrl} />
        </IconButton>
      </Box>

      {/* Mobile */}
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton onClick={handleMobileMenuOpen} color='inherit' sx={{ padding: '12px' }}>
          <MoreVertIcon color='secondary' />
        </IconButton>
        <Menu
          anchorEl={mobileMoreAnchorEl}
          keepMounted
          open={!!mobileMoreAnchorEl}
          onClose={handleMobileMenuClose}
        >
          <MenuItem>
            <EditNoteIcon color='primary' />
            Post
          </MenuItem>
          <MenuItem onClick={() => handleNavigate('notifications')}>
            <Badge badgeContent={17} color='error'>
              <NotificationsIcon color='primary' />
            </Badge>
            Notifications
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <AccountCircle color='primary' />
            Profile
          </MenuItem>
        </Menu>
        <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleMenuClose}>
          <MenuItem onClick={() => navigateCategory('profile')}>
            <Person2Icon color='primary' />
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <HomeIcon color='primary' />
            My account
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ExitToAppIcon color='error' />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

import { useCallback, useState, useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import StarsIcon from '@mui/icons-material/Stars';

import { Avatar, Box, Button, IconButton, Tabs, Typography, useTheme } from '@mui/material';

import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import EditOffIcon from '@mui/icons-material/EditOff';

import { Tab } from './Tab.styled';

import { useNavigation } from '@/hooks';
import { constants } from '@/common';
import { UserData } from '@/types';
import { useAppSelector } from '@/store';
import { userSelectors } from '@/features/user';
import { ApiService } from '@/services';
import { useToast } from '@/features/toast';
import { useRouter } from 'next/router';

interface HeaderProps {
  user: UserData;
  subsCount: number;
}

export const Header: React.FC<HeaderProps> = ({ user, subsCount }) => {
  const { t } = useTranslation();

  const { defaultTab, navigateTabs } = useNavigation({
    basePath: `user/${user.id}`,
    tabs: constants.USER_TABS,
  });

  const [activeTab] = useState(defaultTab);

  const activeUser = useAppSelector(userSelectors.data);

  const { toastError } = useToast();

  const router = useRouter();

  const handleToggleRole = useCallback(async () => {
    try {
      await ApiService.user.toggleRole(+user.id);
      router.reload();
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message, 'error');
      }
    }
  }, [user]);

  const PromoteButton = () => {
    if (activeUser?.role.name === 'admin' && user.role.name !== 'admin') {
      return (
        <IconButton color='primary' size='small' sx={{ mx: 2 }} onClick={handleToggleRole}>
          {user.role.id > 1 ? <EditOffIcon /> : <ModeEditOutlineIcon />}
        </IconButton>
      );
    }
  };

  return (
    <Box pt={1} px={2} display='flex' flexDirection='column' gap={2}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box display='flex' alignItems='center' gap={2}>
          {user?.avatarUrl ? (
            <Avatar src={user?.avatarUrl} sx={{ width: 86, height: 86 }} />
          ) : (
            <Avatar sx={{ width: 86, height: 86 }}>{user.fullName[0]}</Avatar>
          )}
          <Box>
            <Box display='flex' alignItems='center'>
              <Typography sx={{ fontSize: { xs: 18, md: 34 } }} variant='h4'>
                {user.fullName}
              </Typography>
              <PromoteButton />
            </Box>
            <Typography sx={{ display: { xs: 'none', md: 'flex' }, opacity: 0.5 }}>
              {user.email}
            </Typography>
          </Box>
        </Box>
        {user.role.id > 1 && <StarsIcon color='warning' sx={{ fontSize: 48 }} />}
      </Box>
      <Box display='flex' flexDirection='column' gap={2}>
        <Typography sx={{ display: { xs: 'flex', md: 'none' }, opacity: 0.5 }}>
          {user.email}
        </Typography>
        <Typography>On platform since {user.memberFrom}</Typography>
        <Typography fontWeight={300} sx={{ opacity: 0.6 }}>
          {subsCount} subscriptions
        </Typography>
      </Box>
      <Tabs value={activeTab} onChange={navigateTabs}>
        <Tab label='Posts' key='posts' />\
        <Tab label='Subscriptions' key='subscriptions' />
      </Tabs>
    </Box>
  );
};

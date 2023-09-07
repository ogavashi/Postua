import { useCallback, useState, useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import { Avatar, Box, Button, Tabs, Typography, useTheme } from '@mui/material';

import { Tab } from './Tab.styled';

import { useNavigation } from '@/hooks';
import { UserDto } from '@/features/user';
import { constants } from '@/common';

interface HeaderProps {
  user: UserDto;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const { t } = useTranslation();

  const { defaultTab, navigateTabs } = useNavigation({
    basePath: `/user/${user.id}`,
    tabs: constants.USER_TABS,
  });

  const [activeTab] = useState(defaultTab);

  return (
    <Box pt={1} px={2} display='flex' flexDirection='column' gap={2}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box display='flex' alignItems='center' gap={2}>
          <Avatar
            src={
              user?.avatarUrl ||
              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
            }
            sx={{ width: 86, height: 86 }}
          />
          <Box>
            <Typography sx={{ fontSize: { xs: 18, md: 34 } }} variant='h4'>
              {user.fullName}
            </Typography>
            <Typography sx={{ display: { xs: 'none', md: 'flex' }, opacity: 0.5 }}>
              {user.email}
            </Typography>
          </Box>
        </Box>
        <Button endIcon={<LibraryAddIcon />} variant='contained'>
          Subscribe
        </Button>
      </Box>
      <Box display='flex' flexDirection='column' gap={2}>
        <Typography sx={{ display: { xs: 'flex', md: 'none' }, opacity: 0.5 }}>
          {user.email}
        </Typography>
        <Typography>On platform since 18.03.2023</Typography>
        <Typography fontWeight={300} sx={{ opacity: 0.6 }}>
          291 321 subscribers
        </Typography>
      </Box>
      <Tabs value={activeTab} onChange={navigateTabs}>
        <Tab label='Posts' key='posts' />
        <Tab label='Subscribers' key='subscribers' />
        <Tab label='Subscriptions' key='subscriptions' />
      </Tabs>
    </Box>
  );
};

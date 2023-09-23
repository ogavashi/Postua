import { useCallback, useState, useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import { Box, Button, Tabs, Typography, useTheme } from '@mui/material';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { constants } from '@/common';
import { Tab } from './Tab.styled';
import { CategoryDto } from '@/features/category';
import { useRouter } from 'next/router';
import { useNavigation } from '@/hooks';
import { ApiService } from '@/services';
import { useToast } from '@/features/toast';

interface HeaderProps {
  category: CategoryDto;
  subsCount: number;
  isSubbed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ category, subsCount, isSubbed }) => {
  const { t } = useTranslation();

  const { toastError } = useToast();

  const { defaultTab, navigateTabs } = useNavigation({
    basePath: category.key,
    tabs: constants.CATEGORY_TABS,
  });

  const router = useRouter();

  const [activeTab] = useState(defaultTab);
  const [subscribed, setSubscribed] = useState(isSubbed);

  const handleSubscribe = useCallback(async () => {
    setSubscribed((prev) => !prev);
    try {
      await ApiService.post.subscribe(category.key);
      router.reload();
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message, 'error');
      }
      setSubscribed(subscribed);
    }
  }, [subscribed]);

  return (
    <Box pt={1} px={2} display='flex' flexDirection='column' gap={2}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography sx={{ fontSize: { xs: 28, md: 34 } }} variant='h4'>
          {category.icon} {t(`layout.categories.${category.key}`)}
        </Typography>
        <Button
          onClick={handleSubscribe}
          endIcon={subscribed ? <RemoveCircleIcon /> : <AddCircleIcon />}
          variant={subscribed ? 'outlined' : 'contained'}
        >
          {subscribed ? 'Unsubscribe' : 'Subscribe'}
        </Button>
      </Box>
      <Box display='flex' flexDirection='column' gap={2}>
        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
        <Typography fontWeight={300} sx={{ opacity: 0.6 }}>
          {subsCount} subscribers
        </Typography>
      </Box>
      <Tabs value={activeTab} onChange={navigateTabs}>
        <Tab label='Posts' key='posts' />
        <Tab label='Subscribers' key='subscribers' />
        <Tab label='Rules' key='rules' />
      </Tabs>
    </Box>
  );
};

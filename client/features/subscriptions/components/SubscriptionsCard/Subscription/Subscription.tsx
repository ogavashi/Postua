import { useTranslation } from 'next-i18next';

import { Avatar, Box, IconButton } from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import { NextLinkComposed, Typography } from '@/components';
import { CategoryDto } from '@/features/category';
import { constants } from '@/common';
import { useCallback, useState } from 'react';
import { ApiService } from '@/services';
import { useRouter } from 'next/router';
import { useToast } from '@/features/toast';
import { useAppDispatch } from '@/store';
import { appActions } from '@/features/app';
import { useShowAuthModal } from '@/features/auth';

interface SubscriptionProps {
  category: string;
  isSubscribed?: boolean;
}

export const Subscription: React.FC<SubscriptionProps> = ({ category, isSubscribed }) => {
  const { t } = useTranslation();

  const constantCategory = constants.CATEGORIES.find(({ key }) => key === category)!;

  const [subscribed, setSubscribed] = useState(isSubscribed);

  const router = useRouter();

  const { toastError } = useToast();

  const showAuthModal = useShowAuthModal();

  const handleSubscribe = useCallback(async () => {
    setSubscribed((prev) => !prev);
    try {
      await ApiService.post.subscribe(constantCategory.key);
      router.reload();
    } catch (error) {
      showAuthModal();
      if (error instanceof Error) {
        toastError(error.message, 'error');
      }
      setSubscribed(subscribed);
    }
  }, [subscribed]);

  return (
    <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
      <Box
        component={NextLinkComposed}
        to={{ pathname: `/${constantCategory.key}` }}
        sx={{ textDecoration: 'none', color: 'inherit' }}
        width='100%'
      >
        <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
          <Typography variant='h6' minWidth={50} fontSize={32}>
            {constantCategory.icon}
          </Typography>
          <Typography variant='h6' fontWeight={800}>
            {t(`layout.categories.${constantCategory.key}`)}
          </Typography>
        </Box>
      </Box>
      <IconButton color={subscribed ? 'error' : 'primary'} onClick={handleSubscribe}>
        {subscribed ? <PersonRemoveIcon /> : <PersonAddIcon />}
      </IconButton>
    </Box>
  );
};

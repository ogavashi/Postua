import React, { useCallback, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { Box, IconButton, Paper } from '@mui/material';

import { NextLinkComposed, Typography } from '@/components';
import { CategoryDto } from '@/features/category';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import { constants } from '@/common';
import { useRouter } from 'next/router';
import { ApiService } from '@/services';
import { useToast } from '@/features/toast';
import { useShowAuthModal } from '@/features/auth';

interface SubscriptionProps {
  category: string;
  isSubbed?: boolean;
}

export const Subscription: React.FC<SubscriptionProps> = ({ category, isSubbed = true }) => {
  const { t } = useTranslation();

  const { toastError } = useToast();

  const showAuthModal = useShowAuthModal();

  const constantCategory = constants.CATEGORIES.find(({ key }) => key === category)!;

  const router = useRouter();

  const [subscribed, setSubscribed] = useState(isSubbed);

  const handleSubscribe = useCallback(async () => {
    setSubscribed((prev) => !prev);
    try {
      await ApiService.post.subscribe(constantCategory.key);

      router.reload();
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message, 'error');
        if (error.message !== 'server_problem') {
          showAuthModal();
        }
      }
      setSubscribed(subscribed);
    }
  }, [subscribed]);

  return (
    <Paper sx={{ p: 2 }}>
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
    </Paper>
  );
};

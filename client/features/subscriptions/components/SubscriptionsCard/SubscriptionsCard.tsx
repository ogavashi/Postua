import { useCallback } from 'react';

import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';

import { Box, Button, Paper, Typography } from '@mui/material';

import { Subscription } from './Subscription';
import { CategoryDto } from '@/features/category';
import { Subscribe } from '@/types';

interface SubscriptionCardProps {
  subs: Subscribe[];
  userId: string;
}

export const SubscriptionsCard: React.FC<SubscriptionCardProps> = ({ subs, userId }) => {
  const { t } = useTranslation();

  const router = useRouter();

  const handleNavigate = useCallback(() => {
    router.push(`${userId}/subscriptions`);
  }, [router]);

  return (
    <Paper
      sx={{
        p: 2,
      }}
    >
      <Box>
        <Typography variant='h6' gutterBottom>
          {t('layout.ui.subscriptions')}
        </Typography>
        <Box display='flex' flexDirection='column' gap={2} pb={2}>
          {subs.slice(0, 3).map((sub) => (
            <Subscription key={sub.id} category={sub.category} isSubscribed={sub?.isSubscribed} />
          ))}
        </Box>
        <Button onClick={handleNavigate}> {t('layout.ui.showAll')}</Button>
      </Box>
    </Paper>
  );
};

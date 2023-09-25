import { Box, CircularProgress, Divider, Paper, Typography } from '@mui/material';

import { Subscriber } from '@/features/subscribers';
import { Subscribe, User } from '@/types';
import { useInfiniteScroll } from '@/features/infiniteScroll';
import { useTranslation } from 'next-i18next';
import notFound from '@/animations/notFounSmall.json';
import Lottie from 'lottie-react';
import { Subscription } from '@/features/subscriptions';

interface UserSubscriptionsListProps {
  subscriptions: Subscribe[];
}

export const UserSubscriptionsList: React.FC<UserSubscriptionsListProps> = ({ subscriptions }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Box display='flex' alignItems='center' gap={3}>
        <Typography variant='h6'>{t('layout.ui.subscriptions')}</Typography>
        <Typography sx={{ opacity: 0.6 }}>{subscriptions.length}</Typography>
      </Box>
      {!!subscriptions?.length ? (
        subscriptions.map((item) => (
          <Box key={item.id} my={2}>
            <Subscription category={item.category} isSubbed={item.isSubscribed} />
          </Box>
        ))
      ) : (
        <Paper sx={{ py: 2, my: 2 }}>
          <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <Lottie animationData={notFound} loop={true} style={{ height: 200 }} />
            <Typography variant='h4'>{t('no_subscriptions')}</Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

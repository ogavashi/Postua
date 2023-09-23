import { Box, CircularProgress, Divider, Paper, Typography } from '@mui/material';

import { Subscriber } from '@/features/subscribers';
import { User } from '@/types';
import { useInfiniteScroll } from '@/features/infiniteScroll';
import { useTranslation } from 'next-i18next';
import notFound from '@/animations/notFounSmall.json';
import Lottie from 'lottie-react';

interface SubscribersListProps {
  subscribers: User[];
  usersCount: number;
  nextPage?: boolean;
  filter?: string;
  apiCall: CallableFunction;
}

export const SubscribersList: React.FC<SubscribersListProps> = ({
  subscribers,
  usersCount,
  nextPage,
  filter,
  apiCall,
}) => {
  const { items, isLoading, observerTarget } = useInfiniteScroll(
    subscribers,
    nextPage,
    filter,
    apiCall,
    'users'
  );

  const { t } = useTranslation();

  return (
    <Paper sx={{ p: 2 }}>
      <Box>
        <Box display='flex' alignItems='center' gap={3}>
          <Typography variant='h6'>Subscribers</Typography>
          <Typography sx={{ opacity: 0.6 }}>{usersCount}</Typography>
        </Box>
        {!!items?.length ? (
          items.map((user) => (
            <Box key={user.id}>
              <Subscriber user={user as User} />
              <Divider />
            </Box>
          ))
        ) : (
          <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <Lottie animationData={notFound} loop={true} style={{ height: 200 }} />
            <Typography variant='h4'>{t('no_memebrs')}</Typography>
          </Box>
        )}
        {isLoading && (
          <Box display='flex' justifyContent='center' alignItems='center'>
            <CircularProgress color='primary' />
          </Box>
        )}
        <div ref={observerTarget} />
      </Box>
    </Paper>
  );
};

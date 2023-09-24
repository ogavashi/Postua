import { useCallback } from 'react';

import notFound from '@/animations/notFounSmall.json';

import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';

import { Box, Button, Paper, Typography } from '@mui/material';

import { Subscriber } from './Subsciber';
import { User } from '@/types';
import Lottie from 'lottie-react';

interface SubscribersCardProps {
  categoryKey: string;
  subscribers: User[];
}

export const SubscribersCard: React.FC<SubscribersCardProps> = ({ categoryKey, subscribers }) => {
  const { t } = useTranslation();

  const router = useRouter();

  const handleNavigate = useCallback(() => {
    router.push(`${categoryKey}/subscribers`);
  }, [router]);

  return (
    <Paper
      sx={{
        p: 2,
      }}
    >
      <Box>
        <Typography variant='h6' gutterBottom>
          Subscribers
        </Typography>
        {!!subscribers?.length ? (
          <>
            <Box display='flex' flexWrap='wrap' gap={2} pb={2}>
              {subscribers.slice(0, 14).map((user) => (
                <Subscriber user={user} key={user.id} />
              ))}
            </Box>
            <Button onClick={handleNavigate}>Show all</Button>
          </>
        ) : (
          <Lottie animationData={notFound} loop={true} />
        )}
      </Box>
    </Paper>
  );
};

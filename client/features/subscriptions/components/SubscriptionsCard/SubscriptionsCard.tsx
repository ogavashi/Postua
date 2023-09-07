import { useCallback } from 'react';

import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';

import { Box, Button, Paper, Typography } from '@mui/material';

import { Subscription } from './Subscription';
import { CategoryDto } from '@/features/category';

interface SubscriptionCardProps {
  category: CategoryDto;
}

export const SubscriptionsCard: React.FC<SubscriptionCardProps> = ({ category }) => {
  const { t } = useTranslation();

  const router = useRouter();

  const handleNavigate = useCallback(() => {
    router.push(`${category.key}/subscriptions`);
  }, [router]);

  return (
    <Paper
      sx={{
        p: 2,
      }}
    >
      <Box>
        <Typography variant='h6' gutterBottom>
          Subscriptions
        </Typography>
        <Box display='flex' flexDirection='column' gap={2} pb={2}>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Subscription key={i} category={category} />
            ))}
        </Box>
        <Button onClick={handleNavigate}>Show all</Button>
      </Box>
    </Paper>
  );
};

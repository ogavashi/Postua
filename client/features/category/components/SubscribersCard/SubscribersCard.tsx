import { useCallback } from 'react';

import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';

import { Box, Button, Paper, Typography } from '@mui/material';

import { Subscriber } from './Subsciber';

interface SubscribersCardProps {
  categoryKey: string;
}

export const SubscribersCard: React.FC<SubscribersCardProps> = ({ categoryKey }) => {
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
        <Box display='flex' flexWrap='wrap' gap={2} pb={2}>
          {Array(14)
            .fill(0)
            .map((_, i) => (
              <Subscriber key={i} />
            ))}
        </Box>
        <Button onClick={handleNavigate}>Show all</Button>
      </Box>
    </Paper>
  );
};

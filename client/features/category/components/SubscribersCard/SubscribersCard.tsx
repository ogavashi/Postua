import { useTranslation } from 'next-i18next';

import { Box, Button, Paper, Typography } from '@mui/material';

import { Subscriber } from './Subsciber';

export const SubscribersCard = () => {
  const { t } = useTranslation();

  return (
    <Paper
      sx={{
        maxWidth: 410,
        height: 'fit-content',
        display: { xs: 'none', lg: 'flex' },
        p: 2,
        mt: 2.85,
        position: 'sticky',
        top: 80,
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
        <Button>Show all</Button>
      </Box>
    </Paper>
  );
};

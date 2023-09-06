import { Box, Divider, Paper, Typography } from '@mui/material';

import { Subscriber } from '@/features/subscribers';

export const SubscribersList = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Box>
        <Box display='flex' alignItems='center' gap={3}>
          <Typography variant='h6'>Subscribers</Typography>
          <Typography sx={{ opacity: 0.6 }}>399 999</Typography>
        </Box>
        {Array(10)
          .fill(0)
          .map((e, i) => (
            <Box key={i}>
              <Subscriber />
              <Divider />
            </Box>
          ))}
      </Box>
    </Paper>
  );
};

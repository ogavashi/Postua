import { Box, Divider, Paper } from '@mui/material';

import { constants } from '@/common';
import { Subscription } from '@/features/subscriptions';

export const SubscriptionsList = () => {
  return (
    <Box display='flex' flexDirection='column' gap={2}>
      {constants.CATEGORIES.map((category) => (
        <Subscription category={category} key={category.key} />
      ))}
    </Box>
  );
};

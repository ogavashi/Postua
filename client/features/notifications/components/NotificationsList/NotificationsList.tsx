import { Box } from '@mui/material';
import { NotificationsCard } from '../NotificationsCard';

export const NotificationsList = () => {
  return (
    <Box display='flex' flexDirection='column' gap={2} justifyContent='center'>
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <NotificationsCard key={i} />
        ))}
    </Box>
  );
};

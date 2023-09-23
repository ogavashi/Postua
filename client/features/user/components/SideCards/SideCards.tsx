import { Box } from '@mui/material';

import { SubscriptionsCard } from '@/features/subscriptions';
import { Subscribe } from '@/types';

interface SideCardsProps {
  subs: Subscribe[];
  userId: string;
}

export const SideCards: React.FC<SideCardsProps> = ({ subs, userId }) => {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 80,
        height: 'fit-content',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        gap: 2,
        maxWidth: 410,
        width: '100%',
      }}
    >
      <SubscriptionsCard subs={subs} userId={userId} />
    </Box>
  );
};

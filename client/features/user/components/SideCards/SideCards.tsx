import { Box } from '@mui/material';

import { CategoryDto } from '@/features/category';
import { SubscribersCard } from '@/features/subscribers';
import { RulesCard } from '@/features/rules';
import { SubscriptionsCard } from '@/features/subscriptions';
import { UserData } from '@/types';

interface SideCardsProps {
  subs: { id: number; category: string }[];
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

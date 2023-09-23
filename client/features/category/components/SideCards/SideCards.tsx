import { Box } from '@mui/material';

import { CategoryDto } from '@/features/category';
import { SubscribersCard } from '@/features/subscribers';
import { RulesCard } from '@/features/rules';
import { User } from '@/types';

interface SideCardsProps {
  category: CategoryDto;
  subscribers: User[];
}

export const SideCards: React.FC<SideCardsProps> = ({ category, subscribers }) => {
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
      }}
    >
      <SubscribersCard categoryKey={category.key} subscribers={subscribers} />
      <RulesCard categoryKey={category.key} />
    </Box>
  );
};

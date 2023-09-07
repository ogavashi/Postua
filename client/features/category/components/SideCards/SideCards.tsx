import { Box } from '@mui/material';

import { CategoryDto } from '@/features/category';
import { SubscribersCard } from '@/features/subscribers';
import { RulesCard } from '@/features/rules';

interface SideCardsProps {
  category: CategoryDto;
}

export const SideCards: React.FC<SideCardsProps> = ({ category }) => {
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
      <SubscribersCard categoryKey={category.key} />
      <RulesCard categoryKey={category.key} />
    </Box>
  );
};

import { Box, Paper } from '@mui/material';

import { Background } from './Background';
import { Header } from './Header';
import { CategoryDto } from '@/features/category';

interface CategoryProps {
  category: CategoryDto;
  subsCount: number;
  isSubbed: boolean;
}

export const Category: React.FC<CategoryProps> = ({ category, isSubbed, subsCount }) => {
  return (
    <Paper>
      <Box>
        <Background url={category.backgroundUrl} />
        <Header category={category} isSubbed={isSubbed} subsCount={subsCount} />
      </Box>
    </Paper>
  );
};

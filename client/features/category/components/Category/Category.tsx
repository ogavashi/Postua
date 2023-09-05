import { Box, Paper } from '@mui/material';

import { Background } from './Background';
import { Header } from './Header';
import { CategoryDto } from '@/features/category';

interface CategoryProps {
  category: CategoryDto;
}

export const Category: React.FC<CategoryProps> = ({ category }) => {
  return (
    <Paper>
      <Box>
        <Background url={category.backgroundUrl} />
        <Header category={category} />
      </Box>
    </Paper>
  );
};

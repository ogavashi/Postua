import { Box, Paper } from '@mui/material';

import { Item } from '@/features/news';

export const Card = () => {
  return (
    <Paper sx={{ width: { xs: '100%', md: 640 } }}>
      <Box p={2}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Box>
    </Paper>
  );
};

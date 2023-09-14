import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Tag } from '@/types';

interface SearchValueProps {
  value: string;
  amount?: number;
}

export const SearchValue: React.FC<SearchValueProps> = ({ value, amount }) => {
  return (
    <Paper sx={{ width: { xs: '100%', md: 640 }, p: 2 }}>
      <Box display='flex' flexDirection='column' gap={1}>
        <Typography variant='h4' fontWeight={800}>
          {value}
        </Typography>
        {amount && (
          <Typography variant='h6' sx={{ opacity: 0.8 }}>
            Found {amount} {amount > 1 ? 'posts' : 'post'}
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

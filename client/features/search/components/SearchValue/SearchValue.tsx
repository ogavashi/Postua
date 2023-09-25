import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

interface SearchValueProps {
  value: string;
  amount: number;
}

export const SearchValue: React.FC<SearchValueProps> = ({ value, amount }) => {
  const { t } = useTranslation();

  return (
    <Paper sx={{ width: { xs: '100%', md: 640 }, p: 2 }}>
      <Box display='flex' flexDirection='column' gap={1}>
        <Typography variant='h4' fontWeight={800}>
          {value}
        </Typography>
        <Typography variant='h6' sx={{ opacity: 0.8 }}>
          {t('layout.ui.found')} {amount + ' '}
          {amount > 1 || amount === 0 ? t('layout.ui.results') : t('layout.ui.result')}
        </Typography>
      </Box>
    </Paper>
  );
};

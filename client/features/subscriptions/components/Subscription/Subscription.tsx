import React from 'react';

import { useTranslation } from 'next-i18next';

import { Box, IconButton, Paper } from '@mui/material';

import { NextLinkComposed, Typography } from '@/components';
import { CategoryDto } from '@/features/category';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface SubscriptionProps {
  category: CategoryDto;
}

export const Subscription: React.FC<SubscriptionProps> = ({ category }) => {
  const { t } = useTranslation();

  return (
    <Paper sx={{ p: 2 }}>
      <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
        <Box
          component={NextLinkComposed}
          to={{ pathname: `/${category.key}` }}
          sx={{ textDecoration: 'none', color: 'inherit' }}
          width='100%'
        >
          <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
            <Typography variant='h6' minWidth={50} fontSize={32}>
              {category.icon}
            </Typography>
            <Typography variant='h6' fontWeight={800}>
              {t(`layout.categories.${category.key}`)}
            </Typography>
          </Box>
        </Box>
        <IconButton color='primary'>
          <PersonAddIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

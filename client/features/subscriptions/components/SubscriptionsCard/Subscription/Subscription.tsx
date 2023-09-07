import { useTranslation } from 'next-i18next';

import { Avatar, Box, IconButton } from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { NextLinkComposed, Typography } from '@/components';
import { CategoryDto } from '@/features/category';

interface SubscriptionProps {
  category: CategoryDto;
}

export const Subscription: React.FC<SubscriptionProps> = ({ category }) => {
  const { t } = useTranslation();

  return (
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
  );
};

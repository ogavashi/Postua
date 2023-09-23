import { useTranslation } from 'next-i18next';

import { Avatar, Box, IconButton } from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { NextLinkComposed, Typography } from '@/components';
import { CategoryDto } from '@/features/category';
import { constants } from '@/common';

interface SubscriptionProps {
  category: string;
}

export const Subscription: React.FC<SubscriptionProps> = ({ category }) => {
  const { t } = useTranslation();

  const constantCategory = constants.CATEGORIES.find(({ key }) => key === category)!;

  return (
    <Box display='flex' flexDirection='row' alignItems='center' justifyContent='space-between'>
      <Box
        component={NextLinkComposed}
        to={{ pathname: `/${constantCategory.key}` }}
        sx={{ textDecoration: 'none', color: 'inherit' }}
        width='100%'
      >
        <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
          <Typography variant='h6' minWidth={50} fontSize={32}>
            {constantCategory.icon}
          </Typography>
          <Typography variant='h6' fontWeight={800}>
            {t(`layout.categories.${constantCategory.key}`)}
          </Typography>
        </Box>
      </Box>
      <IconButton color='primary'>
        <PersonAddIcon />
      </IconButton>
    </Box>
  );
};

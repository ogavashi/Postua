import { useCallback, useState, useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import { Box, Button, Tabs, Typography, useTheme } from '@mui/material';
import { constants } from '@/common';
import { Tab } from './Tab.styled';
import { CategoryDto } from '@/features/category';
import { useRouter } from 'next/router';
import { useNavigation } from '@/hooks';

interface HeaderProps {
  category: CategoryDto;
}

export const Header: React.FC<HeaderProps> = ({ category }) => {
  const { t } = useTranslation();

  const { defaultTab, navigateTabs } = useNavigation({ pageCategory: category });

  const [activeTab] = useState(defaultTab);

  return (
    <Box pt={1} px={2} display='flex' flexDirection='column' gap={2}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography sx={{ fontSize: { xs: 28, md: 34 } }} variant='h4'>
          {category.icon} {t(`layout.categories.${category.key}`)}
        </Typography>
        <Button endIcon={<LibraryAddIcon />} variant='contained'>
          Subscribe
        </Button>
      </Box>
      <Box display='flex' flexDirection='column' gap={2}>
        <Typography>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
        <Typography fontWeight={300} sx={{ opacity: 0.6 }}>
          291 321 subscribers
        </Typography>
      </Box>
      <Tabs value={activeTab} onChange={navigateTabs}>
        <Tab label='Posts' key='posts' />
        <Tab label='Subscribers' key='subscribers' />
        <Tab label='Rules' key='rules' />
      </Tabs>
    </Box>
  );
};

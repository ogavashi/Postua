import { useCallback, useState } from 'react';

import { useTranslation } from 'next-i18next';

import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import { Box, Button, Tabs, Typography, useTheme } from '@mui/material';
import { constants } from '@/common';
import { Tab } from './Tab.styled';
import { CategoryDto } from '@/features/category';

interface HeaderProps {
  category: CategoryDto;
}

export const Header: React.FC<HeaderProps> = ({ category }) => {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState(0);

  const handleChageTab = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  }, []);

  return (
    <Box pt={1} px={2} display='flex' flexDirection='column' gap={2} sx={{ pb: { lg: 2 } }}>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4'>
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
      <Tabs
        value={activeTab}
        onChange={handleChageTab}
        sx={{ display: { md: 'flex', lg: 'none' } }}
      >
        <Tab label='Posts' key='posts' />
        <Tab label='Rules' key='rules' />
        <Tab label='Subscribers' key='subscribers' />
      </Tabs>
    </Box>
  );
};

import { useTranslation } from 'next-i18next';

import { Box, Button, Paper } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { Item } from '@/features/news';

export const Card = () => {
  const { t } = useTranslation();

  return (
    <Paper sx={{ width: { xs: '100%', md: 640 } }}>
      <Box p={2}>
        <Item />
        <Item />
        <Item isLast />
        <Button startIcon={<KeyboardArrowDownIcon />}>{t('layout.ui.showMore')}</Button>
      </Box>
    </Paper>
  );
};

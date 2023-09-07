import React, { useState, useCallback } from 'react';

import { useTranslation } from 'next-i18next';

import { Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { constants } from '@/common';
import { ListItemButton } from '@/features/sideMenu';
import { useNavigation } from '@/hooks';

interface CategoriesListProps {
  handleDrawerToggle?: () => void;
}

export const CategoriesList: React.FC<CategoriesListProps> = ({ handleDrawerToggle }) => {
  const { t } = useTranslation();

  const { category, navigateCategory } = useNavigation({ sideFunc: handleDrawerToggle });

  const [limit, setLimit] = useState(constants.DEFAULT_AMOUNT);

  const toggleLimit = useCallback(() => {
    setLimit((prev) =>
      prev === constants.DEFAULT_AMOUNT ? constants.CATEGORIES.length : constants.DEFAULT_AMOUNT
    );
  }, []);

  const MoreButton = () => {
    const commonProps = {
      sx: { my: 0.5, mx: 1.5 },
      onClick: toggleLimit,
    };

    return limit === constants.DEFAULT_AMOUNT ? (
      <Button {...commonProps} startIcon={<KeyboardArrowDownIcon />}>
        {t('layout.ui.showMore')} ({constants.CATEGORIES.length - limit})
      </Button>
    ) : (
      <Button {...commonProps} startIcon={<KeyboardArrowUpIcon />}>
        {t('layout.ui.showLess')}
      </Button>
    );
  };

  return (
    <List sx={{ display: 'flex', flexDirection: 'column' }}>
      {constants.CATEGORIES.slice(0, limit).map(({ key, icon }) => (
        <ListItem key={key} sx={{ py: 0.5, px: 1.5 }}>
          <ListItemButton selected={category === key} onClick={() => navigateCategory(key)}>
            <ListItemIcon sx={{ fontSize: 24, minWidth: 32, mr: 1.15 }}>{icon}</ListItemIcon>
            <ListItemText primary={t(`layout.categories.${key}`)} />
          </ListItemButton>
        </ListItem>
      ))}
      <MoreButton />
    </List>
  );
};

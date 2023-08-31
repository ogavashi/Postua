import { useState, useCallback } from 'react';

import { useTranslation } from 'next-i18next';

import { constants } from '@/common';

import { Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { ListItemButton } from '@/features/sideMenu';

export const CategoriesList = () => {
  const { t } = useTranslation();

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
        Show more ({constants.CATEGORIES.length - limit})
      </Button>
    ) : (
      <Button {...commonProps} startIcon={<KeyboardArrowUpIcon />}>
        Show less
      </Button>
    );
  };

  return (
    <List sx={{ display: 'flex', flexDirection: 'column' }}>
      {constants.CATEGORIES.slice(0, limit).map(({ key, icon }, index) => (
        <ListItem key={key} sx={{ py: 0.5, px: 1.5 }}>
          <ListItemButton selected={index === 0}>
            <ListItemIcon sx={{ fontSize: 24, minWidth: 32, mr: 1.15 }}>{icon}</ListItemIcon>
            <ListItemText primary={t(`layout.categories.${key}`)} />
          </ListItemButton>
        </ListItem>
      ))}
      <MoreButton />
    </List>
  );
};

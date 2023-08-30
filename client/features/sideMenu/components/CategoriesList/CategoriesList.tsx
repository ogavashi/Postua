import { useState, useCallback, useMemo } from 'react';

import { constants } from '@/common';

import { Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ListItemButton } from './ListItemButton.styled';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const CategoriesList = () => {
  const [limit, setLimit] = useState(5);

  const toggleLimit = useCallback(() => {
    setLimit((prev) => (prev === 5 ? 8 : 5));
  }, []);

  const MoreButton = () => {
    const commonProps = {
      sx: { my: 0.5, mx: 1.5 },
      onClick: toggleLimit,
    };

    return limit === 5 ? (
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
      {constants.CATEGORIES.slice(0, limit).map(({ name, icon }, index) => (
        <ListItem key={name} sx={{ py: 0.5, px: 1.5 }}>
          <ListItemButton selected={index === 0}>
            <ListItemIcon sx={{ fontSize: 24, minWidth: 32, mr: '8px' }}>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItemButton>
        </ListItem>
      ))}
      <MoreButton />
    </List>
  );
};

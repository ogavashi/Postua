import React from 'react';

import { useTranslation } from 'next-i18next';

import { List, ListItem, ListItemText } from '@mui/material';

import { constants } from '@/common';
import { ListItemButton } from '@/features/sideMenu';
import { useNavigation } from '@/hooks';
import { useAppSelector } from '@/store';
import { userSelectors } from '@/features/user';

interface MenuListProps {
  handleDrawerToggle?: () => void;
}

export const MenuList: React.FC<MenuListProps> = ({ handleDrawerToggle }) => {
  const { t } = useTranslation();

  const { category, navigateCategory } = useNavigation({ sideFunc: handleDrawerToggle });

  const user = useAppSelector(userSelectors.data);

  return (
    <List sx={{ display: 'flex', flexDirection: 'column' }}>
      {constants.MENU_ITEMS.map(
        ({ key, icon: Icon, protectedItem }) =>
          ((protectedItem && user) || !protectedItem) && (
            <ListItem key={key} sx={{ py: 0.5, px: 1.5 }}>
              <ListItemButton
                selected={category === key}
                onClick={() => navigateCategory(key)}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Icon color='primary' sx={{ fontSize: 32, mr: 1.15 }} />
                <ListItemText primary={t(`layout.menu.${key}`)} />
              </ListItemButton>
            </ListItem>
          )
      )}
    </List>
  );
};

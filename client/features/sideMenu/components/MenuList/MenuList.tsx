import { useTranslation } from 'next-i18next';

import { List, ListItem, ListItemText } from '@mui/material';

import { constants } from '@/common';
import { ListItemButton } from '@/features/sideMenu';

export const MenuList = () => {
  const { t } = useTranslation();

  return (
    <List sx={{ display: 'flex', flexDirection: 'column' }}>
      {constants.MENU_ITEMS.map(({ key, icon: Icon }, index) => (
        <ListItem key={key} sx={{ py: 0.5, px: 1.5 }}>
          <ListItemButton selected={index === 0}>
            <Icon color='primary' sx={{ fontSize: 32, mr: 1.15 }} />
            <ListItemText primary={t(`layout.menu.${key}`)} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

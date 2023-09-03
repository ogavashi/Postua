import { useCallback, useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import { useRouter } from 'next/router';

import { List, ListItem, ListItemText } from '@mui/material';

import { constants } from '@/common';
import { ListItemButton, getPathKey } from '@/features/sideMenu';

export const MenuList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleSelect = useCallback(
    (key: string) => {
      router.push(`/${key}`);
    },
    [router]
  );

  const categoryKey = getPathKey(router.pathname);

  return (
    <List sx={{ display: 'flex', flexDirection: 'column' }}>
      {constants.MENU_ITEMS.map(({ key, icon: Icon }) => (
        <ListItem key={key} sx={{ py: 0.5, px: 1.5 }}>
          <ListItemButton selected={categoryKey === key} onClick={() => handleSelect(key)}>
            <Icon color='primary' sx={{ fontSize: 32, mr: 1.15 }} />
            <ListItemText primary={t(`layout.menu.${key}`)} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

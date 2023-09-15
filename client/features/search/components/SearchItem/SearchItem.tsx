import { useCallback } from 'react';

import { NextLinkComposed, Typography } from '@/components';
import { Category, SearchResult, ShortPostItem, User } from '@/types';
import { Avatar, Box, ListItem } from '@mui/material';
import { ListItemButton } from '../ListItemButton';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface SearchItemProps {
  item: SearchResult;
}

export const SearchItem: React.FC<SearchItemProps> = ({ item }) => {
  const router = useRouter();

  const { t } = useTranslation();

  const handleNavigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const Preview = () => {
    switch (item.type) {
      case 'post':
        let post = item as ShortPostItem;
        return (
          <ListItemButton onClick={() => handleNavigate(`/${post.category.key}/${post.id}`)}>
            <Typography>{post.title}</Typography>
          </ListItemButton>
        );

      case 'user':
        let user = item as User;
        return (
          <ListItemButton onClick={() => handleNavigate(`/user/${user.id}`)}>
            <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
              <Avatar src={user.avatarUrl} />
              <Typography>{user.fullName}</Typography>
            </Box>
          </ListItemButton>
        );

      case 'category':
        let category = item as Category;
        return (
          <ListItemButton onClick={() => handleNavigate(`/${category.key}`)}>
            <Box display='flex' flexDirection='row' alignItems='center' gap={1} width='100%'>
              <Typography>{category.icon}</Typography>
              <Typography>{t(`layout.categories.${category.key}`)}</Typography>
            </Box>
          </ListItemButton>
        );
    }
  };

  return (
    <ListItem sx={{ width: '100%' }}>
      <Preview />
    </ListItem>
  );
};

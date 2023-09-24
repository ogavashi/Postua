import { useTranslation } from 'next-i18next';

import { Box, IconButton, Menu, Typography as MuiTypography, useTheme } from '@mui/material';

import StarsIcon from '@mui/icons-material/Stars';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { styles } from './style';
import { MenuItem, NextLinkComposed, Typography } from '@/components';
import { constants } from '@/common';
import { PostItem } from '@/types';
import { useCallback, useMemo, useState } from 'react';
import { getPostTime } from '@/features/post';
import { useAppSelector } from '@/store';
import { userSelectors } from '@/features/user';
import { useRouter } from 'next/router';
import { ApiService } from '@/services';
import { useToast } from '@/features/toast';

interface PostHeaderProps {
  post: PostItem;
}

export const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const category = constants.CATEGORIES.find(({ key }) => key === post.category)!;

  const activeUser = useAppSelector(userSelectors.data);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const timeAgo = useMemo(() => {
    const { unit, time } = getPostTime(post.createdAt);
    const localedUnit = t(`time.${unit}`);
    const ago = t(`time.ago`);

    if (time) {
      return `${time} ${localedUnit} ${ago}`;
    }

    return `${localedUnit} ${ago}`;
  }, [post]);

  const router = useRouter();

  const { toastError } = useToast();

  const handleEdit = useCallback(() => {
    router.push({ pathname: `/write/${post.id}` });
  }, [router]);

  const handleDelete = useCallback(async () => {
    try {
      await ApiService.post.delete(post.id);
      router.push({ pathname: '/' });
    } catch (error) {
      if (error instanceof Error) {
        toastError(error.message, 'error');
      }
    }
  }, []);

  return (
    <Box px={2} pt={2} display='flex' justifyContent='space-between'>
      <Box>
        <Box display='flex' alignItems='center' gap={{ xs: 2, md: 5 }}>
          <Box css={styles.root} component={NextLinkComposed} to={{ pathname: `/${category.key}` }}>
            <IconButton color='primary' sx={{ borderRadius: theme.shape.borderRadius }}>
              <MuiTypography>
                {category.icon} {t(`layout.categories.${category.key}`)}
              </MuiTypography>
            </IconButton>
          </Box>
          <Typography
            component={NextLinkComposed}
            to={{ pathname: `/user/${post.user.id}` }}
            sx={{ display: 'flex' }}
          >
            {post.user.fullName}
            {post.user.role.id > 1 && <StarsIcon color='warning' sx={{ ml: 1 }} />}
          </Typography>
          <MuiTypography fontWeight={200} sx={{ opacity: 0.5 }}>
            {timeAgo}
          </MuiTypography>
        </Box>
        <Box>
          <MuiTypography textAlign='justify' variant='h6' fontWeight={800}>
            {post.title}
          </MuiTypography>
        </Box>
      </Box>
      {activeUser?.id === post.user.id && (
        <Box>
          <IconButton size='small' color='primary' onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

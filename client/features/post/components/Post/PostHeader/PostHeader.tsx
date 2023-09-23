import { useTranslation } from 'next-i18next';

import { Box, IconButton, Typography as MuiTypography, useTheme } from '@mui/material';

import StarsIcon from '@mui/icons-material/Stars';

import { styles } from './style';
import { NextLinkComposed, Typography } from '@/components';
import { constants } from '@/common';
import { PostItem } from '@/types';
import { useMemo } from 'react';
import { getPostTime } from '@/features/post';

interface PostHeaderProps {
  post: PostItem;
}

export const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const category = constants.CATEGORIES.find(({ key }) => key === post.category)!;

  const timeAgo = useMemo(() => {
    const { unit, time } = getPostTime(post.createdAt);
    const localedUnit = t(`time.${unit}`);
    const ago = t(`time.ago`);

    if (time) {
      return `${time} ${localedUnit} ${ago}`;
    }

    return `${localedUnit} ${ago}`;
  }, [post]);

  return (
    <Box px={2} pt={2}>
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
  );
};

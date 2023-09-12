import { useTranslation } from 'next-i18next';

import { Box, IconButton, Typography as MuiTypography, useTheme } from '@mui/material';

import { styles } from './style';
import { NextLinkComposed, Typography } from '@/components';
import { constants } from '@/common';
import { PostResponse } from '@/types';

interface PostHeaderProps {
  post: PostResponse;
}

export const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box px={2} pt={2}>
      <Box display='flex' alignItems='center' gap={{ xs: 2, md: 5 }}>
        <Box
          css={styles.root}
          component={NextLinkComposed}
          to={{ pathname: `/${post.category.key}` }}
        >
          <IconButton color='primary' sx={{ borderRadius: theme.shape.borderRadius }}>
            <MuiTypography>
              {post.category.icon} {t(`layout.categories.${post.category.key}`)}
            </MuiTypography>
          </IconButton>
        </Box>
        <Typography component={NextLinkComposed} to={{ pathname: `/user/${post.user.id}` }}>
          {post.user.fullName}
        </Typography>
        <MuiTypography fontWeight={200} sx={{ opacity: 0.5 }}>
          6 hours
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

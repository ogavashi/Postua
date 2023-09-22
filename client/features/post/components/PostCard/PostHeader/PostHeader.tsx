import { useTranslation } from 'next-i18next';

import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import { Box, IconButton, Typography as MuiTypography, useTheme } from '@mui/material';

import { constants } from '@/common';
import { NextLinkComposed, Typography } from '@/components';

import { styles } from './style';
import { PostItem } from '@/types';

interface PostHeaderdProps {
  post: PostItem;
}

export const PostHeader: React.FC<PostHeaderdProps> = ({ post }) => {
  const { t } = useTranslation();

  const theme = useTheme();

  const category = constants.CATEGORIES.find(({ key }) => key === post.category)!;

  return (
    <Box display='flex' alignItems='center' justifyContent='space-between' px={2} pt={2}>
      <Box display='flex' alignItems='center' gap={5}>
        <Box css={styles.root} component={NextLinkComposed} to={{ pathname: `/${category.key}` }}>
          <IconButton color='primary' size='small' sx={{ borderRadius: theme.shape.borderRadius }}>
            <MuiTypography>
              {category.icon} {t(`layout.categories.${category.key}`)}
            </MuiTypography>
          </IconButton>
        </Box>
        <Typography
          component={NextLinkComposed}
          to={{ pathname: `/user/${post.user.id}` }}
          display={{ xs: 'none', md: 'flex' }}
        >
          {post.user.fullName}
        </Typography>
        <MuiTypography fontWeight={200} sx={{ opacity: 0.5 }}>
          6 hours
        </MuiTypography>
      </Box>
      <IconButton color='primary' size='small' sx={{ borderRadius: theme.shape.borderRadius }}>
        <LibraryAddIcon sx={{ mr: 1 }} />
        <MuiTypography>Subscribe</MuiTypography>
      </IconButton>
    </Box>
  );
};

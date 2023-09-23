import { useTranslation } from 'next-i18next';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { Box, IconButton, Typography as MuiTypography, useTheme } from '@mui/material';

import { constants } from '@/common';
import { NextLinkComposed, Typography } from '@/components';

import { styles } from './style';
import { PostItem } from '@/types';
import { useInteraction } from '@/features/post';

interface PostHeaderdProps {
  post: PostItem;
}

export const PostHeader: React.FC<PostHeaderdProps> = ({ post }) => {
  const { t } = useTranslation();

  const theme = useTheme();

  const category = constants.CATEGORIES.find(({ key }) => key === post.category)!;

  const { subscribed, handleSubscribe } = useInteraction(post);

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
      <IconButton
        color='primary'
        size='small'
        sx={{ borderRadius: theme.shape.borderRadius }}
        onClick={handleSubscribe}
      >
        {subscribed ? (
          <>
            <MuiTypography sx={{ mr: 1 }}>{'Unsubscribe'}</MuiTypography>
            <RemoveCircleIcon />
          </>
        ) : (
          <>
            <MuiTypography sx={{ mr: 1 }}>{'Subscribe'}</MuiTypography>
            <AddCircleIcon />
          </>
        )}
      </IconButton>
    </Box>
  );
};

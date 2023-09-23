import { useTranslation } from 'next-i18next';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarsIcon from '@mui/icons-material/Stars';

import { Box, IconButton, Typography as MuiTypography, useTheme } from '@mui/material';

import { constants } from '@/common';
import { NextLinkComposed, Typography } from '@/components';

import { styles } from './style';
import { PostItem } from '@/types';
import { getPostTime, useInteraction } from '@/features/post';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

interface PostHeaderdProps {
  post: PostItem;
}

export const PostHeader: React.FC<PostHeaderdProps> = ({ post }) => {
  const { t } = useTranslation();

  const theme = useTheme();

  const router = useRouter();

  const isCategoryPage = useMemo(() => {
    const path = router.pathname.split('/')[1];
    const isCategoryPage = constants.CATEGORIES.find(({ key }) => key === path);

    return !!isCategoryPage;
  }, [router]);

  const category = constants.CATEGORIES.find(({ key }) => key === post.category)!;

  const { subscribed, handleSubscribe } = useInteraction(post);

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
          {post.user.role.id > 1 && <StarsIcon color='warning' sx={{ ml: 1 }} />}
        </Typography>

        <MuiTypography fontWeight={200} sx={{ opacity: 0.5, display: { xs: 'none', lg: 'flex' } }}>
          {timeAgo}
        </MuiTypography>
      </Box>
      {!isCategoryPage && (
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
      )}
    </Box>
  );
};

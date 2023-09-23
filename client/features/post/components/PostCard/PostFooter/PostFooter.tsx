import { Box, IconButton, Typography, useTheme } from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CachedIcon from '@mui/icons-material/Cached';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IosShareIcon from '@mui/icons-material/IosShare';

import { PostItem, PostStats } from '@/types';
import { useCallback, useState } from 'react';
import { formatStats, useInteraction } from '@/features/post';
import { ApiService } from '@/services';

interface PostFooterProps {
  post: PostItem;
}

export const PostFooter: React.FC<PostFooterProps> = ({ post }) => {
  const theme = useTheme();

  const { stats } = post;

  const { like, handleLike, handleShare, dislike, handleDislike } = useInteraction(post);

  const LikeIcon = () => {
    const style = {
      sx: { fontSize: 16, position: 'relative', mr: 0.5 },
    };

    return like.isLiked ? <FavoriteIcon {...style} /> : <FavoriteBorderIcon {...style} />;
  };

  return (
    <Box width='100%' display='flex' flexDirection='column' gap={1} mt={2} px={2} pb={2}>
      <Box display='flex' gap={4}>
        <Typography fontWeight={300} sx={{ opacity: 0.8 }}>
          {formatStats(stats.views)} Views
        </Typography>
        <Typography fontWeight={300} sx={{ opacity: 0.8 }}>
          {formatStats(stats.visitings)} Visitings
        </Typography>
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Box gap={2}>
          <IconButton
            onClick={handleLike}
            size='small'
            color='error'
            sx={{
              position: 'relative',
              py: 0.1,
              borderRadius: theme.shape.borderRadius,
              ml: 0.5,
            }}
          >
            <LikeIcon />
            <Typography>{like.count}</Typography>
          </IconButton>
          {/*TODO: Add comments */}
          {/* <IconButton
            size='small'
            color='primary'
            sx={{
              position: 'relative',
              py: 0.1,
              borderRadius: theme.shape.borderRadius,
              ml: 0.5,
            }}
          >
            <InsertCommentIcon sx={{ fontSize: 16, position: 'relative', mr: 0.5 }} />
            <Typography>{stats.comments}</Typography>
          </IconButton> */}
          <IconButton
            onClick={handleShare}
            size='small'
            color='primary'
            sx={{
              position: 'relative',
              py: 0.1,
              borderRadius: theme.shape.borderRadius,
              ml: 0.5,
            }}
          >
            <IosShareIcon sx={{ fontSize: 18, position: 'relative' }} />
          </IconButton>
          <IconButton
            size='small'
            color='primary'
            sx={{
              position: 'relative',
              py: 0.1,
              borderRadius: theme.shape.borderRadius,
              ml: 0.5,
            }}
          >
            <BookmarkAddIcon sx={{ fontSize: 18, position: 'relative' }} />
          </IconButton>
        </Box>
        <IconButton
          onClick={handleDislike}
          size='small'
          color={dislike.isDisliked ? 'error' : 'warning'}
          sx={{
            position: 'relative',
            py: 0.1,
            borderRadius: theme.shape.borderRadius,
            ml: 0.5,
          }}
        >
          <KeyboardArrowDownIcon sx={{ fontSize: 18, position: 'relative' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

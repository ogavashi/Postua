import { NextLinkComposed, Typography } from '@/components';
import { Box, IconButton, useTheme, Typography as MuiTypography } from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IosShareIcon from '@mui/icons-material/IosShare';

import { PostItem } from '@/types';
import { useCallback, useState } from 'react';
import { PostViewStats } from '../PostViewStats';
import { useInteraction } from '@/features/post';

interface PostFooterProps {
  post: PostItem;
}

export const PostFooter: React.FC<PostFooterProps> = ({ post }) => {
  const theme = useTheme();

  const [showStats, setShowStats] = useState(false);

  const toggleShowStats = useCallback(() => {
    setShowStats((prev) => !prev);
  }, []);

  const { like, handleLike, handleSharePage, dislike, handleDislike, saved, handleSave } =
    useInteraction(post);

  const LikeIcon = () => {
    const style = {
      sx: { fontSize: 16, position: 'relative', mr: 0.5 },
    };

    return like.isLiked ? <FavoriteIcon {...style} /> : <FavoriteBorderIcon {...style} />;
  };

  return (
    <Box px={2} pb={2} display='flex' flexDirection='column' gap={1}>
      <Box display={{ xs: 'flex', lg: 'none' }}>
        <PostViewStats stats={post.stats} showStats={showStats} toggleShowStats={toggleShowStats} />
      </Box>
      <Box display='flex' alignItems='center' gap={2}>
        {post.tags?.map((tag) => (
          <Typography variant='h6' component={NextLinkComposed} to={`/tag/${tag}`} key={tag}>
            {tag}
          </Typography>
        ))}
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Box display='flex' gap={1}>
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
            <MuiTypography>{like.count}</MuiTypography>
          </IconButton>
          <IconButton
            onClick={handleSharePage}
            size='small'
            color='primary'
            sx={{
              position: 'relative',
              py: 0.1,
              borderRadius: theme.shape.borderRadius,
              ml: 0.5,
            }}
          >
            <IosShareIcon sx={{ fontSize: 21, position: 'relative' }} />
          </IconButton>
          <IconButton
            onClick={handleSave}
            size='small'
            color='primary'
            sx={{
              position: 'relative',
              py: 0.1,
              borderRadius: theme.shape.borderRadius,
              ml: 0.5,
            }}
          >
            {saved ? (
              <BookmarkAddedIcon sx={{ fontSize: 21, position: 'relative' }} />
            ) : (
              <BookmarkAddIcon sx={{ fontSize: 21, position: 'relative' }} />
            )}
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
          <KeyboardArrowDownIcon sx={{ fontSize: 21, position: 'relative' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

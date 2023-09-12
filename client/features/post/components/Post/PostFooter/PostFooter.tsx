import { NextLinkComposed, Typography } from '@/components';
import { Box, IconButton, useTheme, Typography as MuiTypography } from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CachedIcon from '@mui/icons-material/Cached';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PostResponse } from '@/types';
import { useCallback, useState } from 'react';
import { PostViewStats } from '../PostViewStats';

interface PostFooterProps {
  post: PostResponse;
}

export const PostFooter: React.FC<PostFooterProps> = ({ post }) => {
  const theme = useTheme();

  const [showStats, setShowStats] = useState(false);

  const toggleShowStats = useCallback(() => {
    setShowStats((prev) => !prev);
  }, []);

  const [isLiked, setIsLiked] = useState(false);

  const [likeAmount, setLikeAmount] = useState(post.stats.likes);

  //REDO later
  const handleLike = useCallback(() => {
    if (isLiked) {
      setIsLiked(false);
      setLikeAmount((prev) => prev - 1);

      return;
    }
    setIsLiked(true);
    setLikeAmount((prev) => prev + 1);
  }, [isLiked]);

  const LikeIcon = () => {
    const style = {
      sx: { fontSize: 16, position: 'relative', mr: 0.5 },
    };

    return isLiked ? <FavoriteIcon {...style} /> : <FavoriteBorderIcon {...style} />;
  };

  return (
    <Box px={2} pb={2} display='flex' flexDirection='column' gap={1}>
      <Box display={{ xs: 'flex', lg: 'none' }}>
        <PostViewStats stats={post.stats} showStats={showStats} toggleShowStats={toggleShowStats} />
      </Box>
      <Box display='flex' alignItems='center' gap={2}>
        {post.tags?.map((tag) => (
          <Typography
            variant='h6'
            component={NextLinkComposed}
            to={`/tag/${tag.key}`}
            key={tag.key}
          >
            #{tag.key}
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
            <MuiTypography>{likeAmount}</MuiTypography>
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
            <InsertCommentIcon sx={{ fontSize: 21, position: 'relative', mr: 0.5 }} />
            <MuiTypography>{post.stats.comments}</MuiTypography>
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
            <CachedIcon sx={{ fontSize: 21, position: 'relative' }} />
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
            <BookmarkAddIcon sx={{ fontSize: 21, position: 'relative' }} />
          </IconButton>
        </Box>
        <IconButton
          size='small'
          color='warning'
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

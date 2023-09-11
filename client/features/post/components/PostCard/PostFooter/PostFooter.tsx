import { Box, IconButton, Typography, useTheme } from '@mui/material';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CachedIcon from '@mui/icons-material/Cached';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { PostStats, ShortPostResponse } from '@/types';
import { useCallback, useMemo, useState } from 'react';

interface PostFooterProps {
  stats: PostStats;
}

export const PostFooter: React.FC<PostFooterProps> = ({ stats }) => {
  const theme = useTheme();

  const [isLiked, setIsLiked] = useState(false);

  const handleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
  }, []);

  const LikeIcon = () => {
    const style = {
      sx: { fontSize: 16, position: 'relative', mr: 0.5 },
    };

    return isLiked ? <FavoriteIcon {...style} /> : <FavoriteBorderIcon {...style} />;
  };

  return (
    <Box width='100%' display='flex' flexDirection='column' gap={1} mt={2} px={2} pb={2}>
      <Box display='flex' gap={4}>
        <Typography fontWeight={300} sx={{ opacity: 0.8 }}>
          {stats.views} Views
        </Typography>
        <Typography fontWeight={300} sx={{ opacity: 0.8 }}>
          {stats.visitings} Visitings
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
            <Typography>{stats.likes}</Typography>
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
            <InsertCommentIcon sx={{ fontSize: 16, position: 'relative', mr: 0.5 }} />
            <Typography>{stats.comments}</Typography>
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
            <CachedIcon sx={{ fontSize: 18, position: 'relative' }} />
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
          size='small'
          color='warning'
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

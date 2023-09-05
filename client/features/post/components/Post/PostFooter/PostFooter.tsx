import { NextLinkComposed } from '@/components';
import { Box, IconButton, useTheme } from '@mui/material';

import { Typography } from '@/features/post';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CachedIcon from '@mui/icons-material/Cached';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const PostFooter = () => {
  const theme = useTheme();

  return (
    <Box px={2} pb={2} display='flex' flexDirection='column' gap={1}>
      <Box display='flex' alignItems='center' gap={2}>
        <Typography variant='h6' component={NextLinkComposed} to={'/tag/starfield'}>
          #starfield
        </Typography>
        <Typography variant='h6' component={NextLinkComposed} to={'/tag/news'}>
          #news
        </Typography>
      </Box>
      <Box display='flex' justifyContent='space-between'>
        <Box display='flex' gap={1}>
          <IconButton
            size='small'
            color='error'
            sx={{
              position: 'relative',
              py: 0.1,
              borderRadius: theme.shape.borderRadius,
              ml: 0.5,
            }}
          >
            <FavoriteBorderIcon sx={{ fontSize: 21, position: 'relative', mr: 0.5 }} />
            <Typography>15</Typography>
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
            <Typography>152</Typography>
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

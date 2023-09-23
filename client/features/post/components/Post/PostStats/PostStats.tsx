import {
  Backdrop,
  Box as MuiBox,
  Button,
  Fade,
  Modal,
  useTheme,
  IconButton,
  Typography as MuiTypography,
  Divider,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

import { useCallback, useState } from 'react';
import { Box } from './Box.styled';
import { Typography } from '@/components';
import { PostItem, PostStats as Stats } from '@/types';
import { formatStats, useInteraction } from '@/features/post';
import { PostStatsModal } from '../PostStatsModal';
import { PostViewStats } from '../PostViewStats';

interface PostStatsProps {
  post: PostItem;
}

export const PostStats: React.FC<PostStatsProps> = ({ post }) => {
  const [showStats, setShowStats] = useState(false);

  const theme = useTheme();

  const { stats } = post;

  const toggleShowStats = useCallback(() => {
    setShowStats((prev) => !prev);
  }, []);

  const { saved, handleSave } = useInteraction(post);

  return (
    <MuiBox
      px={2}
      display={{ xs: 'none', lg: 'flex' }}
      alignItems='center'
      justifyContent='space-between'
    >
      <MuiBox>
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
      </MuiBox>
      <PostViewStats stats={stats} showStats={showStats} toggleShowStats={toggleShowStats} />
    </MuiBox>
  );
};

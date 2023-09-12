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

import { useCallback, useState } from 'react';
import { Box } from './Box.styled';
import { Typography } from '@/components';
import { PostStats as Stats } from '@/types';
import { formatStats } from '@/features/post';
import { PostStatsModal } from '../PostStatsModal';
import { PostViewStats } from '../PostViewStats';

interface PostStatsProps {
  stats: Stats;
}

export const PostStats: React.FC<PostStatsProps> = ({ stats }) => {
  const [showStats, setShowStats] = useState(false);

  const theme = useTheme();

  const toggleShowStats = useCallback(() => {
    setShowStats((prev) => !prev);
  }, []);

  return (
    <MuiBox
      px={2}
      display={{ xs: 'none', lg: 'flex' }}
      alignItems='center'
      justifyContent='space-between'
    >
      <MuiBox>
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
          <BookmarkAddIcon sx={{ fontSize: 21, position: 'relative' }} />
        </IconButton>
      </MuiBox>
      <PostViewStats stats={stats} showStats={showStats} toggleShowStats={toggleShowStats} />
    </MuiBox>
  );
};

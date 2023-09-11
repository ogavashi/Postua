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
    <MuiBox px={2} display='flex' alignItems='center' justifyContent='space-between'>
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
      <MuiBox display='flex' gap={4}>
        <Button sx={{ display: 'flex', gap: 3 }} onClick={toggleShowStats}>
          <Typography fontWeight={300}>{formatStats(stats.views)} Views</Typography>
          <Typography fontWeight={300}>{formatStats(stats.visitings)} Visitings</Typography>
        </Button>
      </MuiBox>
      <Modal
        open={showStats}
        onClose={toggleShowStats}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={showStats}>
          <Box>
            <MuiBox
              display='flex'
              justifyContent='space-between'
              alignContent='center'
              width='100%'
            >
              <MuiTypography variant='h4'>Stats</MuiTypography>
              <IconButton color='primary' onClick={toggleShowStats}>
                <CloseIcon />
              </IconButton>
            </MuiBox>
            <Divider sx={{ width: '100%' }} />
            <MuiBox width='100%' display='flex' alignItems='center' gap={3}>
              <MuiBox>
                <MuiTypography variant='h5' fontWeight={700}>
                  {stats.views}
                </MuiTypography>
                <MuiTypography>views in feed</MuiTypography>
              </MuiBox>
              <MuiBox>
                <MuiTypography variant='h5' fontWeight={700}>
                  {stats.visitings}
                </MuiTypography>
                <MuiTypography>visitings of page</MuiTypography>
              </MuiBox>
            </MuiBox>
          </Box>
        </Fade>
      </Modal>
    </MuiBox>
  );
};

import {
  Box as MuiBox,
  Fade,
  Modal,
  Backdrop,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import { Box } from '../PostStats/Box.styled';
import { PostStats } from '@/types';

import CloseIcon from '@mui/icons-material/Close';

interface PostStatsModalProps {
  showStats: boolean;
  toggleShowStats: () => void;
  stats: PostStats;
}

export const PostStatsModal: React.FC<PostStatsModalProps> = ({
  showStats,
  toggleShowStats,
  stats,
}) => {
  return (
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
          <MuiBox display='flex' justifyContent='space-between' alignContent='center' width='100%'>
            <Typography variant='h4'>Stats</Typography>
            <IconButton color='primary' onClick={toggleShowStats}>
              <CloseIcon />
            </IconButton>
          </MuiBox>
          <Divider sx={{ width: '100%' }} />
          <MuiBox width='100%' display='flex' alignItems='center' gap={3}>
            <MuiBox>
              <Typography variant='h5' fontWeight={700}>
                {stats.views}
              </Typography>
              <Typography>views in feed</Typography>
            </MuiBox>
            <MuiBox>
              <Typography variant='h5' fontWeight={700}>
                {stats.visitings}
              </Typography>
              <Typography>visitings of page</Typography>
            </MuiBox>
          </MuiBox>
        </Box>
      </Fade>
    </Modal>
  );
};

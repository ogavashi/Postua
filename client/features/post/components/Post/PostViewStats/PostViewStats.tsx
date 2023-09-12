import { Box, Button, Typography } from '@mui/material';

import { PostStatsModal } from '../PostStatsModal';
import { PostStats } from '@/types';
import { formatStats } from '@/features/post';

interface PostViewStatsProps {
  showStats: boolean;
  toggleShowStats: () => void;
  stats: PostStats;
}

export const PostViewStats: React.FC<PostViewStatsProps> = ({
  stats,
  toggleShowStats,
  showStats,
}) => {
  return (
    <Box display='flex' gap={4}>
      <Button sx={{ display: 'flex', gap: 3 }} onClick={toggleShowStats}>
        <Typography fontWeight={300}>{formatStats(stats.views)} Views</Typography>
        <Typography fontWeight={300}>{formatStats(stats.visitings)} Visitings</Typography>
      </Button>
      <PostStatsModal showStats={showStats} toggleShowStats={toggleShowStats} stats={stats} />
    </Box>
  );
};

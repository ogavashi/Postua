import { Box, Paper } from '@mui/material';
import { PostHeader } from './PostHeader';
import { PostImage } from './PostImage';
import { PostStats } from './PostStats';
import { PostText } from './PostText';
import { PostFooter } from './PostFooter';

export const Post = () => {
  return (
    <Paper>
      <Box>
        <PostHeader />
        <PostImage />
        <PostStats />
        <PostText />
        <PostFooter />
      </Box>
    </Paper>
  );
};

import { Box, Paper } from '@mui/material';

import { PostHeader } from './PostHeader';
import { PostTitle } from './PostTitle';
import { PostImage } from './PostImage';
import { PostFooter } from './PostFooter';

export const PostCard = () => {
  return (
    <Paper>
      <Box display='flex' flexDirection='column' gap={1}>
        <PostHeader />
        <PostTitle />
        <PostImage />
        <PostFooter />
      </Box>
    </Paper>
  );
};

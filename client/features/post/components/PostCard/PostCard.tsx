import { Box, Paper } from '@mui/material';
import { PostFooter, PostHeader, PostImage, PostTitle } from '@/features/post';

export const PostCard = () => {
  return (
    <Paper sx={{ width: { xs: '100%', md: 640 }, my: 3 }}>
      <Box display='flex' flexDirection='column' gap={1}>
        <PostHeader />
        <PostTitle />
        <PostImage />
        <PostFooter />
      </Box>
    </Paper>
  );
};

import { Box, Paper } from '@mui/material';

import { PostHeader } from './PostHeader';
import { PostTitle } from './PostTitle';
import { PostImage } from './PostImage';
import { PostFooter } from './PostFooter';
import { ShortPostResponse } from '@/types';

interface PostCardProps {
  post: ShortPostResponse;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Paper>
      <Box display='flex' flexDirection='column' gap={1}>
        <PostHeader post={post} />
        <PostTitle post={post} />
        {post.image && <PostImage imageUrl={post.image} />}
        <PostFooter stats={post.stats} />
      </Box>
    </Paper>
  );
};

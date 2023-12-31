import { useEffect } from 'react';

import { Box, Paper } from '@mui/material';

import { PostHeader } from './PostHeader';
import { PostTitle } from './PostTitle';
import { PostImage } from './PostImage';
import { PostFooter } from './PostFooter';
import { PostItem } from '@/types';
import { useInteraction } from '@/features/post';

interface PostCardProps {
  post: PostItem;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { handleView } = useInteraction(post);

  useEffect(() => {
    handleView();
  }, []);

  return (
    <Paper>
      <Box display='flex' flexDirection='column' gap={1}>
        <PostHeader post={post} />
        <PostTitle post={post} />
        {post.image && <PostImage imageUrl={post.image} />}
        <PostFooter post={post} />
      </Box>
    </Paper>
  );
};

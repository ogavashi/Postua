import React from 'react';

import { Box, Paper } from '@mui/material';

import { PostHeader } from './PostHeader';
import { PostImage } from './PostImage';
import { PostStats } from './PostStats';
import { PostText } from './PostText';
import { PostFooter } from './PostFooter';
import { PostResponse } from '@/types';

interface PostProps {
  post: PostResponse;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Paper>
      <Box>
        <PostHeader />
        {post?.image && <PostImage imageUrl={post.image} />}
        <PostStats />
        <PostText body={post.body} />
        <PostFooter />
      </Box>
    </Paper>
  );
};

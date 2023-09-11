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
        <PostHeader post={post} />
        {post?.image && <PostImage imageUrl={post.image} />}
        <PostStats stats={post.stats} />
        <PostText body={post.body} />
        <PostFooter post={post} />
      </Box>
    </Paper>
  );
};

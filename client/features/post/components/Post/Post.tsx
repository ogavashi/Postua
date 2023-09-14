import React from 'react';

import { Box, Paper } from '@mui/material';

import { PostHeader } from './PostHeader';
import { PostImage } from './PostImage';
import { PostStats } from './PostStats';
import { PostText } from './PostText';
import { PostFooter } from './PostFooter';
import { PostItem } from '@/types';

interface PostProps {
  post: PostItem;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Paper>
      <Box>
        <PostHeader post={post} />
        {post?.image && <PostImage imageUrl={post.image} />}
        <Box>
          <PostStats stats={post.stats} />
        </Box>
        <PostText body={post.body} />
        <PostFooter post={post} />
      </Box>
    </Paper>
  );
};

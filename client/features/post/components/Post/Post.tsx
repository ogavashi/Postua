import React, { useEffect } from 'react';

import { Box, Paper } from '@mui/material';

import { PostHeader } from './PostHeader';
import { PostImage } from './PostImage';
import { PostStats } from './PostStats';
import { PostText } from './PostText';
import { PostFooter } from './PostFooter';
import { PostItem } from '@/types';
import { useInteraction } from '@/features/post';
import { DataProp } from 'editorjs-blocks-react-renderer';

interface PostProps {
  post: PostItem;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const { handleVisit } = useInteraction(post);

  useEffect(() => {
    handleVisit();
  }, []);

  return (
    <Paper>
      <Box>
        <PostHeader post={post} />
        {post?.image && <PostImage imageUrl={post.image} />}
        <Box>
          <PostStats post={post} />
        </Box>
        <PostText body={post.body as DataProp} />
        <PostFooter post={post} />
      </Box>
    </Paper>
  );
};

import { Box, SxProps, Theme } from '@mui/material';

import { PostCard } from '@/features/post';
import { ShortPostItem } from '@/types';

interface PostListprops {
  sx?: SxProps<Theme>;
  posts?: ShortPostItem[] | null;
}

export const PostList: React.FC<PostListprops> = ({ sx = [], posts }) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={2}
      sx={{ width: { xs: '100%', md: 640 }, ...sx }}
    >
      {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
    </Box>
  );
};

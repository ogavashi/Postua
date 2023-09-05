import { Box, SxProps, Theme } from '@mui/material';

import { PostCard } from '@/features/post';

interface PostListprops {
  sx?: SxProps<Theme>;
}

export const PostList: React.FC<PostListprops> = ({ sx = [] }) => {
  return (
    <Box sx={{ width: { xs: '100%', md: 640 }, ...sx }}>
      <PostCard />
      <PostCard />
      <PostCard />
    </Box>
  );
};

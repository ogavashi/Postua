import { Box, CircularProgress, SxProps, Theme, Typography } from '@mui/material';

import { PostCard } from '@/features/post';
import { PageOptions, PostItem } from '@/types';
import { ApiService } from '@/services';
import { useInfiniteScroll } from '@/features/infiniteScroll';

import { NotFound } from '@/features/notFound';

interface PostListprops {
  sx?: SxProps<Theme>;
  posts: PostItem[];
  nextPage?: boolean;
  filter?: string;
  apiCall: CallableFunction;
}

export const PostList: React.FC<PostListprops> = ({
  sx = [],
  posts,
  nextPage,
  filter,
  apiCall,
}) => {
  const { items, isLoading, observerTarget } = useInfiniteScroll(posts, nextPage, filter, apiCall);

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={2}
      sx={{ width: { xs: '100%', md: 640 }, ...sx }}
    >
      {!!items?.length ? items.map((post) => <PostCard key={post.id} post={post} />) : <NotFound />}
      {isLoading && (
        <Box display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress color='primary' />
        </Box>
      )}
      <div ref={observerTarget}></div>
    </Box>
  );
};

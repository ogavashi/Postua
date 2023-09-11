import { NextLinkComposed, Typography } from '@/components';
import { ShortPostResponse } from '@/types';

interface PostTitleProps {
  post: ShortPostResponse;
}

export const PostTitle: React.FC<PostTitleProps> = ({ post }) => {
  return (
    <Typography
      sx={{ px: 2 }}
      textAlign='justify'
      variant='h6'
      component={NextLinkComposed}
      to={{ pathname: `/${post.category.key}/${post.id}` }}
    >
      {post.title}
    </Typography>
  );
};

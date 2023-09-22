import { NextLinkComposed, Typography } from '@/components';
import { PostItem } from '@/types';

interface PostTitleProps {
  post: PostItem;
}

export const PostTitle: React.FC<PostTitleProps> = ({ post }) => {
  return (
    <Typography
      sx={{ px: 2 }}
      textAlign='justify'
      variant='h6'
      component={NextLinkComposed}
      to={{ pathname: `/${post.category}/${post.id}` }}
    >
      {post.title}
    </Typography>
  );
};

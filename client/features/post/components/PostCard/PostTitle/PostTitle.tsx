import { NextLinkComposed, Typography } from '@/components';
import { ShortPostItem } from '@/types';

interface PostTitleProps {
  post: ShortPostItem;
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

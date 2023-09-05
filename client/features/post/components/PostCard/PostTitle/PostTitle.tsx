import { NextLinkComposed } from '@/components';
import { Typography } from '@/features/post';

export const PostTitle = () => {
  return (
    <Typography
      sx={{ px: 2 }}
      textAlign='justify'
      variant='h6'
      component={NextLinkComposed}
      to={{ pathname: `/games/123` }}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </Typography>
  );
};

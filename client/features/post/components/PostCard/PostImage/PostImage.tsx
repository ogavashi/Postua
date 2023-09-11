import { Box } from '@mui/material';

interface PostImageProps {
  imageUrl: string;
}

export const PostImage: React.FC<PostImageProps> = ({ imageUrl }) => {
  return <Box width='100%' component='img' alt='Post image' src={imageUrl} />;
};

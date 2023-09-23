import { Box } from '@mui/material';

interface Backgroundprops {
  url?: string;
}

export const Background: React.FC<Backgroundprops> = ({ url }) => {
  return (
    <Box
      width='100%'
      height={280}
      component='img'
      alt='Post image'
      src={url || 'https://i.pinimg.com/originals/4e/de/5a/4ede5a33c5490195b2b17466ad26d124.gif'}
      sx={{ objectFit: 'cover' }}
    />
  );
};

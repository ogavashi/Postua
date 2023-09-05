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
      src={url || 'https://wallpaperaccess.com/full/5927911.gif'}
      sx={{ objectFit: 'cover' }}
    />
  );
};

import { Box, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import notFound from '../../../../animations/notFound.json';

type NotFoundProps = {
  message?: string;
};

export const NotFound: React.FC<NotFoundProps> = ({ message = 'notFound' }) => {
  return (
    <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
      <Lottie animationData={notFound} loop={true} style={{ width: 300 }} />
      <Typography variant='h5' fontWeight={800}>
        {message}
      </Typography>
    </Box>
  );
};

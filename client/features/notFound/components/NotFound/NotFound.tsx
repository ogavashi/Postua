import { Box, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import { useTranslation } from 'next-i18next';
import notFound from '../../../../animations/notFound.json';

type NotFoundProps = {
  message?: string;
};

export const NotFound: React.FC<NotFoundProps> = ({ message = 'notFound' }) => {
  const { t } = useTranslation();

  return (
    <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
      <Lottie animationData={notFound} loop={true} style={{ width: 300 }} />
      <Typography variant='h5' fontWeight={800}>
        {t(`layout.ui.${message}`)}
      </Typography>
    </Box>
  );
};

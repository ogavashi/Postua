import { Box } from '@mui/material';
import { NextPageWithLayout } from './_app';
import { AppLayout } from '@/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTranslation } from 'next-i18next';

import notFound from '../animations/404.json';

import Lottie from 'lottie-react';

const NotFound: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection={{ xs: 'column', md: 'row' }}
      height='calc(100vh - 100px)'
      mt='auto'
    >
      <Lottie animationData={notFound} loop={true} />
    </Box>
  );
};

NotFound.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errors'])),
    },
  };
}

export default NotFound;

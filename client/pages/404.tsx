import styles from '@/styles/Home.module.css';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { NextPageWithLayout } from './_app';
import { AppLayout } from '@/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { useTranslation } from 'next-i18next';

import ErrorIcon from '@mui/icons-material/Error';

const NotFound: NextPageWithLayout = () => {
  const { t } = useTranslation();

  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection={{ xs: 'column', md: 'row' }}
      height='calc(100vh - 100px)'
      gap={{ xs: 1, md: 5 }}
      mt='auto'
    >
      <ErrorIcon sx={{ fontSize: { xs: 96, md: 128 } }} color='primary' />
      <Box
        display='flex'
        alignItems={{ xs: 'center', md: 'flex-start' }}
        flexDirection='column'
        gap={2}
      >
        <Typography variant='h1'>404</Typography>
        <Typography variant='h3' textAlign='center'>
          {t('layout.ui.pageNotFound')}
        </Typography>
      </Box>
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

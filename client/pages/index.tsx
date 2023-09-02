import styles from '@/styles/Home.module.css';
import { css } from '@emotion/react';
import { Box, Button, ButtonGroup, Paper, Slider } from '@mui/material';
import { NextPageWithLayout } from './_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { Card as NewsCard } from '@/features/news';

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <Box my='12px'>
        <NewsCard />
        <Button
          variant='contained'
          color='secondary'
          onClick={() => router.push('/test')}
          sx={{ marginTop: 1 }}
        >
          Test
        </Button>
      </Box>
    </>
  );
};

Home.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Home;

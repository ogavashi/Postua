import styles from '@/styles/Home.module.css';
import { css } from '@emotion/react';
import { Box, Button, ButtonGroup, Paper, Slider } from '@mui/material';
import { NextPageWithLayout } from './_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <main className={`${styles.main}`}>
        <Paper>
          <Box display='flex' flexDirection='column' m={6} gap={2}>
            <Button variant='contained'>Натисни</Button>
            <Button variant='contained' color='secondary' onClick={() => router.push('/test')}>
              Test
            </Button>
          </Box>
        </Paper>
        <Button variant='outlined'>Press</Button>
        <Button variant='outlined' color='secondary'>
          Press
        </Button>
        <ButtonGroup variant='text' aria-label='outlined primary button group'>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
        <Slider defaultValue={30} />
      </main>
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

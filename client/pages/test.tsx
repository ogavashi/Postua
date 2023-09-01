import styles from '@/styles/Home.module.css';
import { css } from '@emotion/react';
import { Button, ButtonGroup, Slider } from '@mui/material';
import { NextPageWithLayout } from './_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

const Test: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <main className={`${styles.main}`}>
        <Button variant='contained'>Натисни</Button>
        <Button variant='contained' color='secondary' onClick={() => router.push('/')}>
          Home
        </Button>
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

Test.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  const loadingDelay = 2000;

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  await delay(loadingDelay);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default Test;

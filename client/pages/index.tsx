import styles from '@/styles/Home.module.css';
import { css } from '@emotion/react';
import { Button, ButtonGroup, Slider } from '@mui/material';
import { NextPageWithLayout } from './_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <main className={`${styles.main}`}>
        <Button variant='contained'>Натисни</Button>
        <Button variant='contained' color='secondary'>
          Натисни
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

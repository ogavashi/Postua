import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Button, ButtonGroup, Slider } from '@mui/material';
import { css } from '@emotion/react';
import { NextPageWithLayout } from './_app';
import { AppLayout } from '@/components';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

const Home: NextPageWithLayout = () => {
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
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
        <Slider
          defaultValue={30}
          css={css`
            color: #20b2aa;

            :hover {
              color: #2e8b57;
            }
          `}
        />
      </main>
    </>
  );
};

Home.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export default Home;

import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Button, Slider } from '@mui/material';
import { css } from '@emotion/react';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export default function Home() {
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <Button variant='contained'>Натисни</Button>
        <Button variant='contained'>Press</Button>
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
}

import '../styles/globals.css';

import type { ReactElement, ReactNode } from 'react';

import Head from 'next/head';
import { AppProps } from 'next/app';

import CssBaseline from '@mui/material/CssBaseline';

import { CacheProvider, EmotionCache } from '@emotion/react';

import { createEmotionCache } from '@/lib';
import { ThemeWrapper } from '@/components';
import { NextPage } from 'next';

import { appWithTranslation } from 'next-i18next';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface AppPropsWithLayout extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function MyApp(props: AppPropsWithLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <title>Postua</title>
      </Head>
      <ThemeWrapper>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeWrapper>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp);

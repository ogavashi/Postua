import '../styles/globals.css';

import NextNProgress from 'nextjs-progressbar';

import type { ReactElement, ReactNode } from 'react';

import nookies from 'nookies';

import { Provider } from 'react-redux';

import Head from 'next/head';
import { AppProps } from 'next/app';

import CssBaseline from '@mui/material/CssBaseline';

import { CacheProvider, EmotionCache } from '@emotion/react';

import { createEmotionCache } from '@/lib';
import { ThemeWrapper } from '@/components';
import { NextPage } from 'next';

import { appWithTranslation } from 'next-i18next';
import { usePreserveScroll } from '@/hooks';
import { wrapper } from '@/store';
import { appActions } from '@/features/app/store';
import { Language } from '@/types';

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
  const { Component, emotionCache = clientSideEmotionCache, ...rest } = props;

  const { store, props: pageProps } = wrapper.useWrappedStore(rest);

  const getLayout = Component.getLayout ?? ((page) => page);

  usePreserveScroll();

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <title>Postua</title>
        </Head>
        <ThemeWrapper>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <NextNProgress />
          {getLayout(<Component {...pageProps} />)}
        </ThemeWrapper>
      </CacheProvider>
    </Provider>
  );
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async ({ ctx, Component }) => {
  const user = {
    email: 'user@email.com',
    fullName: 'Full Name',
    id: '1337',
    backgroundUrl: 'https://media.tenor.com/6LyXLgF8ksUAAAAd/anime-gif.gif',
    avatarUrl: 'https://giffiles.alphacoders.com/350/35097.gif',
  };

  const userData = user;

  const theme = 'light';

  const { NEXT_LOCALE: savedLocale } = nookies.get(ctx);

  if (savedLocale) {
    store.dispatch(appActions.setLanguae(savedLocale as Language));
  }

  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
  };
});

export default appWithTranslation(MyApp);

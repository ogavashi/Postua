import { Box, Button, ButtonGroup, Paper, Slider, Typography } from '@mui/material';
import { NextPageWithLayout } from './_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { Card as NewsCard } from '@/features/news';
import { SelectFilter } from '@/features/filters';
import { PostList } from '@/features/post';

import { constants } from '@/common';
import { NextApiService } from '@/services';
import { GetServerSideProps, NextPageContext } from 'next';
import { ShortPostItem } from '@/types';

interface PopularPageProps {
  pageProps: {
    posts: ShortPostItem[] | null;
  };
}

const Popular: NextPageWithLayout<PopularPageProps> = ({ pageProps }) => {
  const { posts } = pageProps;

  return (
    <Box my='12px' display='flex' flexDirection='column' gap={2}>
      <SelectFilter pageKey={'popular'} options={constants.FILTERS_TIME} />
      <NewsCard />
      <PostList posts={posts} />
    </Box>
  );
};

Popular.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const localeProps = await serverSideTranslations(ctx.locale as string, ['common', 'errors']);

  try {
    const query = {
      take: 10,
      page: 1,
      order: 'ASC',
    };

    const { posts } = await NextApiService(ctx).post.getPopular(query, 'today');

    console.log('posts', posts);

    return {
      props: {
        ...localeProps,
        posts,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      ...localeProps,
      posts: null,
    },
  };
}

export default Popular;

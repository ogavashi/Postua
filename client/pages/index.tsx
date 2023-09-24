import { Box } from '@mui/material';
import { NextPageWithLayout } from './_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SelectFilter } from '@/features/filters';
import { PostList } from '@/features/post';

import { constants } from '@/common';
import { ApiService, NextApiService } from '@/services';
import { NextPageContext } from 'next';
import { PageOptionsDto, PostItem } from '@/types';

interface PopularPageProps {
  pageProps: {
    posts: PostItem[];
    nextPage?: boolean;
    filter?: string;
  };
}

const Popular: NextPageWithLayout<PopularPageProps> = ({ pageProps }) => {
  const { posts, nextPage, filter } = pageProps;

  const apiCall = (pageOptionsDto: PageOptionsDto, period?: string) =>
    ApiService.post.getPopular(pageOptionsDto, period);

  return (
    <Box my='12px' display='flex' flexDirection='column' gap={2}>
      <SelectFilter
        pageKey={'popular'}
        options={constants.FILTERS_TIME}
        defaultValue={constants.FILTERS_TIME.at(-1)}
      />
      <PostList posts={posts} nextPage={nextPage} filter={filter} apiCall={apiCall} />
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
      take: 2,
      page: 1,
      order: 'ASC',
    };

    const { posts, meta } = await NextApiService(ctx).post.getPopular(query, 'allTime');

    return {
      props: {
        ...localeProps,
        posts,
        nextPage: meta.hasNextPage,
        filter: 'allTime',
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      ...localeProps,
      posts: [],
    },
  };
}

export default Popular;

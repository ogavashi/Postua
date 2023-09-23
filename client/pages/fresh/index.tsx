import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { SelectFilter } from '@/features/filters';
import { constants } from '@/common';
import { PostList } from '@/features/post';
import { NextPageContext } from 'next/types';
import { ApiService, NextApiService } from '@/services';
import { PageOptionsDto, PostItem } from '@/types';

interface FreshPageProps {
  pageProps: {
    posts: PostItem[];
    nextPage?: boolean;
    filter?: string;
  };
}

const Fresh: NextPageWithLayout<FreshPageProps> = ({ pageProps }) => {
  const { posts, nextPage, filter } = pageProps;

  const apiCall = (pageOptionsDto: PageOptionsDto, rating?: string) =>
    ApiService.post.getFresh(pageOptionsDto, rating);

  return (
    <Box my='12px' display='flex' flexDirection='column' gap={2}>
      <SelectFilter
        pageKey={'fresh'}
        options={constants.FILTERS_RATING}
        defaultValue={constants.FILTERS_RATING[1]}
      />
      <PostList posts={posts} nextPage={nextPage} filter={filter} apiCall={apiCall} />
    </Box>
  );
};

Fresh.getLayout = (page: React.ReactNode) => {
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

    const { posts, meta } = await NextApiService(ctx).post.getFresh(query, 'from5');

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

export default Fresh;

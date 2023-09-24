import { Box, Button, ButtonGroup, Paper, Slider, Typography } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { SelectFilter } from '@/features/filters';
import { constants } from '@/common';
import { PostList } from '@/features/post';
import { ApiService, NextApiService } from '@/services';
import { getCategory } from '@/lib';
import { NextPageContext } from 'next/types';
import { PageOptionsDto, PostItem } from '@/types';

interface FilteredSavedPageProps {
  pageProps: {
    posts: PostItem[];
    nextPage?: boolean;
    filter?: string;
  };
}

const FilteredSaved: NextPageWithLayout<FilteredSavedPageProps> = ({ pageProps }) => {
  const { posts, nextPage, filter } = pageProps;

  const apiCall = (pageOptionsDto: PageOptionsDto, category?: string) =>
    ApiService.post.getSaved(pageOptionsDto, category);

  return (
    <Box my='12px' display='flex' flexDirection='column' gap={2}>
      <SelectFilter options={constants.FILTERS_SAVED} />
      <PostList posts={posts} nextPage={nextPage} filter={filter} apiCall={apiCall} />
    </Box>
  );
};

FilteredSaved.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const localeProps = await serverSideTranslations(ctx.locale as string, ['common', 'errors']);

  const category = getCategory(ctx.query?.filter);

  if (!category) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  try {
    const query = {
      take: 2,
      page: 1,
      order: 'ASC',
    };

    const { posts, meta } = await NextApiService(ctx).post.getSaved(query, category);

    return {
      props: {
        ...localeProps,
        posts,
        nextPage: meta.hasNextPage,
        filter: category,
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

export default FilteredSaved;

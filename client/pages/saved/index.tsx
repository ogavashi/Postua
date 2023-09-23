import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SelectFilter } from '@/features/filters';
import { constants } from '@/common';
import { PostList } from '@/features/post';
import { ApiService, NextApiService } from '@/services';
import { NextPageContext } from 'next/types';
import { PageOptionsDto, PostItem } from '@/types';

interface SavedPageProps {
  pageProps: {
    posts: PostItem[];
    nextPage?: boolean;
    filter?: string;
  };
}

const Saved: NextPageWithLayout<SavedPageProps> = ({ pageProps }) => {
  const { posts, nextPage, filter } = pageProps;

  const apiCall = (pageOptionsDto: PageOptionsDto) => ApiService.post.getSaved(pageOptionsDto);

  return (
    <Box my='12px' display='flex' flexDirection='column' gap={2}>
      <SelectFilter options={constants.FILTERS_SAVED} />
      <PostList posts={posts} nextPage={nextPage} filter={filter} apiCall={apiCall} />
    </Box>
  );
};

Saved.getLayout = (page: React.ReactNode) => {
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

    const { posts, meta } = await NextApiService(ctx).post.getSaved(query);

    return {
      props: {
        ...localeProps,
        posts,
        nextPage: meta.hasNextPage,
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

export default Saved;

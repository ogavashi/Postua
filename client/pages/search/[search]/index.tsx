import { Box, CircularProgress, Paper } from '@mui/material';
import { NextPageWithLayout } from '../../_app';
import { GetServerSideProps } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AppLayout } from '@/components';
import { constants } from '@/common';
import { Category, SideCards } from '@/features/category';
import { PostCard, PostList } from '@/features/post';
import { SearchValue } from '@/features/search';
import { NextPageContext } from 'next/types';
import { NextApiService } from '@/services';
import { PostItem, SearchResults, Tag, User } from '@/types';
import { SelectFilter } from '@/features/filters';
import { NotFound } from '@/features/notFound';
import { Subscriber } from '@/features/subscribers';

interface SearchPageProps {
  pageProps: {
    data: SearchResults;
    searchValue: string;
  };
}

const SearchPage: NextPageWithLayout<SearchPageProps> = ({ pageProps }) => {
  const { searchValue, data } = pageProps;

  const users = data.filter(({ type }) => type === 'user') as User[];

  const posts = data.filter(({ type }) => type === 'post') as PostItem[];

  return (
    <Box my='12px' display='flex' flexDirection='column' gap={2}>
      <SearchValue value={searchValue} amount={posts?.length} />
      <SelectFilter pageKey='search' queryKey='search' options={constants.FILTERS_SEARCH} />
      <Box
        display='flex'
        flexDirection='column'
        gap={2}
        mb={0.5}
        sx={{ width: { xs: '100%', md: 640 } }}
      >
        {!!posts.length || !!users.length ? (
          <>
            {posts.map((post) => (
              <PostCard key={post.id} post={post as PostItem} />
            ))}
            {users.map((user) => (
              <Paper sx={{ px: 2 }} key={user.id}>
                <Subscriber user={user as User} />
              </Paper>
            ))}
          </>
        ) : (
          <NotFound />
        )}
      </Box>
    </Box>
  );
};

SearchPage.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const localeProps = await serverSideTranslations(ctx.locale as string, ['common', 'errors']);

  const { search } = ctx.query;

  try {
    const data = await NextApiService(ctx).search.search(search as string);

    return {
      props: {
        ...localeProps,
        data,
        searchValue: search,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      ...localeProps,
      data: [],
    },
  };
}

export default SearchPage;

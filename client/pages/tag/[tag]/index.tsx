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

interface TagPageProps {
  pageProps: {
    data: PostItem[];
    searchValue: string;
  };
}

const TagPage: NextPageWithLayout<TagPageProps> = ({ pageProps }) => {
  const { searchValue, data } = pageProps;

  return (
    <Box my='12px' display='flex' flexDirection='column' gap={2}>
      <SearchValue value={`#${searchValue}`} amount={data?.length} />
      <SelectFilter pageKey='tag' queryKey='tag' options={constants.FILTERS_TAG} />
      <Box
        display='flex'
        flexDirection='column'
        gap={2}
        mb={0.5}
        sx={{ width: { xs: '100%', md: 640 } }}
      >
        {!!data.length ? (
          data.map((post) => <PostCard key={post.id} post={post as PostItem} />)
        ) : (
          <NotFound />
        )}
      </Box>
    </Box>
  );
};

TagPage.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const localeProps = await serverSideTranslations(ctx.locale as string, ['common', 'errors']);

  const { tag } = ctx.query;

  try {
    const data = await NextApiService(ctx).search.searchByTag(tag as string, 'best');

    return {
      props: {
        ...localeProps,
        data,
        searchValue: tag,
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

export default TagPage;

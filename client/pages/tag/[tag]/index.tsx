import { Box } from '@mui/material';
import { NextPageWithLayout } from '../../_app';
import { GetServerSideProps } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AppLayout } from '@/components';
import { constants } from '@/common';
import { Category, SideCards } from '@/features/category';
import { PostList } from '@/features/post';
import { SearchValue } from '@/features/search';
import { NextPageContext } from 'next/types';
import { NextApiService } from '@/services';
import { ShortPostItem, Tag } from '@/types';
import { SelectFilter } from '@/features/filters';

interface TagPageProps {
  pageProps: {
    posts: ShortPostItem[] | null;
    tag: Tag;
  };
}

const TagPage: NextPageWithLayout<TagPageProps> = ({ pageProps }) => {
  const { tag, posts } = pageProps;

  return (
    <Box my='12px' display='flex' flexDirection='column' gap={2}>
      <SearchValue value={`#${tag.key}`} amount={posts?.length} />
      <SelectFilter pageKey={'tag'} queryKey='tag' options={constants.FILTERS_TAG} />
      <PostList posts={posts} />
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
    const data = await NextApiService(ctx).post.getAll();

    return {
      props: {
        ...localeProps,
        posts: data,
        tag: {
          key: tag,
        },
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

export default TagPage;

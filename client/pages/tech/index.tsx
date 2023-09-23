import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { GetServerSideProps } from 'next';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Category, SideCards } from '@/features/category';
import { PostList } from '@/features/post';

import { constants } from '@/common';
import { NextPageContext } from 'next/types';
import { ApiService, NextApiService } from '@/services';
import { PageOptionsDto, PostItem, User } from '@/types';

interface CategoryPageProps {
  pageProps: {
    posts: PostItem[];
    users: User[];
    nextPage?: boolean;
    nextUsersPage?: boolean;
    usersCount: number;
    filter?: string;
  };
}

const CategoryPage: NextPageWithLayout<CategoryPageProps> = ({ pageProps }) => {
  const { posts, nextPage, filter, usersCount, users } = pageProps;

  const category = constants.CATEGORIES.find(({ key }) => key === filter)!;

  const apiCall = (pageOptionsDto: PageOptionsDto, filter: string) =>
    ApiService.post.getByCategory(pageOptionsDto, filter);

  const isSubbed = !!posts[0]?.isSubscribed;

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Category category={category} isSubbed={isSubbed} subsCount={usersCount} />
      <Box display='flex' justifyContent='space-between' gap={2}>
        <PostList
          sx={{ width: { xs: '100%', md: '100%', lg: 720 } }}
          posts={posts}
          nextPage={nextPage}
          filter={filter}
          apiCall={apiCall}
        />
        <SideCards category={category} subscribers={users} />
      </Box>
    </Box>
  );
};

CategoryPage.getLayout = (page: React.ReactNode) => {
  return <AppLayout maxWidth='lg'>{page}</AppLayout>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const localeProps = await serverSideTranslations(ctx.locale as string, ['common', 'errors']);

  const category = 'tech';

  try {
    const query = {
      take: 2,
      page: 1,
      order: 'ASC',
    };

    const { posts, meta } = await NextApiService(ctx).post.getByCategory(query, category);

    const { users, meta: usersMeta } = await NextApiService(ctx).subscribers.getSubscribers(
      query,
      category
    );

    return {
      props: {
        ...localeProps,
        posts,
        nextPage: meta.hasNextPage,
        filter: category,
        users,
        usersCount: usersMeta.itemCount,
        nextUsersPage: usersMeta.hasNextPage,
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

export default CategoryPage;

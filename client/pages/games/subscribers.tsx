import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetServerSideProps } from 'next';
import { Category } from '@/features/category';
import { SubscribersList } from '@/features/subscribers';
import { constants } from '@/common';
import { NextPageContext } from 'next/types';
import { ApiService, NextApiService } from '@/services';
import { PageOptionsDto, PostItem, User } from '@/types';
import { error } from 'console';
import { useToast } from '@/features/toast';
import { useEffect } from 'react';

interface SubscribersPageProps {
  pageProps: {
    users: User[];
    posts: PostItem[];
    nextUsersPage?: boolean;
    usersCount: number;
    filter?: string;
    error?: string;
  };
}

const SubscribersPage: NextPageWithLayout<SubscribersPageProps> = ({ pageProps }) => {
  const { posts, filter, usersCount, users, nextUsersPage, error } = pageProps;

  const { toastError } = useToast();

  useEffect(() => {
    if (error) {
      toastError(error, 'error');
    }
  }, []);

  const category = constants.CATEGORIES.find(({ key }) => key === filter)!;

  const apiCall = (pageOptionsDto: PageOptionsDto, filter: string) =>
    ApiService.subscribers.getSubscribers(pageOptionsDto, filter);

  const isSubbed = !!posts[0]?.isSubscribed;

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Category category={category} isSubbed={isSubbed} subsCount={usersCount} />
      <Box mb={2}>
        <SubscribersList
          subscribers={users}
          usersCount={usersCount}
          nextPage={nextUsersPage}
          filter={filter}
          apiCall={apiCall}
        />
      </Box>
    </Box>
  );
};

SubscribersPage.getLayout = (page: React.ReactNode) => {
  return <AppLayout maxWidth='lg'>{page}</AppLayout>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const localeProps = await serverSideTranslations(ctx.locale as string, ['common', 'errors']);

  const category = 'games';

  try {
    const query = {
      take: 2,
      page: 1,
      order: 'ASC',
    };

    const { posts } = await NextApiService(ctx).post.getByCategory(
      { take: 1, page: 1, order: 'ASC' },
      category
    );

    const { users, meta: usersMeta } = await NextApiService(ctx).subscribers.getSubscribers(
      query,
      category
    );

    return {
      props: {
        ...localeProps,
        filter: category,
        users,
        usersCount: usersMeta.itemCount,
        nextUsersPage: usersMeta.hasNextPage,
        posts: posts,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        props: {
          ...localeProps,
          posts: [],
          filter: category,
          error: error.message,
        },
      };
    }
  }
  return {
    props: {
      ...localeProps,
      posts: [],
      filter: category,
    },
  };
}

export default SubscribersPage;

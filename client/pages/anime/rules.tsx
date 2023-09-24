import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Category } from '@/features/category';
import { Rules } from '@/features/rules';
import { constants } from '@/common';
import { NextApiService } from '@/services';
import { NextPageContext } from 'next/types';
import { PostItem } from '@/types';
import { useToast } from '@/features/toast';
import { useEffect } from 'react';

interface RulesPageProps {
  pageProps: {
    posts: PostItem[];
    usersCount: number;
    error?: string;
  };
}

const RulesPage: NextPageWithLayout<RulesPageProps> = ({ pageProps }) => {
  const { posts, usersCount, error } = pageProps;

  const { toastError } = useToast();

  useEffect(() => {
    if (error) {
      toastError(error, 'error');
    }
  }, []);

  const category = constants.CATEGORIES[3];

  const isSubbed = !!posts[0]?.isSubscribed;

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Category category={category} isSubbed={isSubbed} subsCount={usersCount} />
      <Box>
        <Rules />
      </Box>
    </Box>
  );
};

RulesPage.getLayout = (page: React.ReactNode) => {
  return <AppLayout maxWidth='lg'>{page}</AppLayout>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const localeProps = await serverSideTranslations(ctx.locale as string, ['common', 'errors']);

  const category = 'anime';

  const query = {
    take: 2,
    page: 1,
    order: 'ASC',
  };

  try {
    const { posts } = await NextApiService(ctx).post.getByCategory(
      { take: 1, page: 1, order: 'ASC' },
      category
    );

    const { meta: usersMeta } = await NextApiService(ctx).subscribers.getSubscribers(
      query,
      category
    );

    return {
      props: {
        ...localeProps,
        posts,
        usersCount: usersMeta.itemCount,
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
}

export default RulesPage;

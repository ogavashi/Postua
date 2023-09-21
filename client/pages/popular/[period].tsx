import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SelectFilter } from '@/features/filters';
import { constants } from '@/common';
import { PostList } from '@/features/post';
import { NextPageContext } from 'next/types';
import { NextApiService } from '@/services';
import { getPeriod } from '@/lib';
import { ShortPostItem } from '@/types';

interface PopularPageProps {
  pageProps: {
    posts: ShortPostItem[] | null;
  };
}

const Popular: NextPageWithLayout<PopularPageProps> = ({ pageProps }) => {
  const { posts } = pageProps;

  return (
    <Box my='12px' display='flex' flexDirection='column' gap={2}>
      <SelectFilter options={constants.FILTERS_TIME} />
      <PostList posts={posts} />
    </Box>
  );
};

Popular.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const localeProps = await serverSideTranslations(ctx.locale as string, ['common', 'errors']);

  const period = getPeriod(ctx.query?.period);

  if (!period) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  console.log(period);

  try {
    const page = {
      take: 10,
      page: 1,
      order: 'ASC',
    };

    const { posts } = await NextApiService(ctx).post.getPopular(page, period);

    return {
      props: {
        ...localeProps,
        posts,
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

export default Popular;

import { Box, Button, ButtonGroup, Paper, Slider, Typography } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { Post } from '@/features/post';
import { NextPageContext } from 'next/types';
import { NextApiService } from '@/services';
import { CategoryPostProps, PostItem } from '@/types';

const CategoryPost: NextPageWithLayout<CategoryPostProps> = ({ pageProps }) => {
  const { post } = pageProps;

  return (
    <Box my='12px'>
      <Post post={post} />
    </Box>
  );
};

CategoryPost.getLayout = (page: React.ReactNode) => {
  return <AppLayout maxWidth='lg'>{page}</AppLayout>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const localeProps = await serverSideTranslations(ctx.locale as string, ['common', 'errors']);

  const { id } = ctx.query;

  try {
    const post = await NextApiService(ctx).post.getOne(id as unknown as number);

    return {
      props: {
        ...localeProps,
        post,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    redirect: {
      destination: '/404',
      permanent: false,
    },
  };
}

export default CategoryPost;

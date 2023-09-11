import { Box, Button, ButtonGroup, Paper, Slider, Typography } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { Post } from '@/features/post';
import { NextPageContext } from 'next';
import { NextApiService } from '@/services';
import { CategoryPostProps } from '@/types';

const CategoryPost: NextPageWithLayout<CategoryPostProps> = ({ pageProps }) => {
  const router = useRouter();
  const { post } = pageProps;

  return (
    <>
      <Box my='12px'>
        <Post post={post} />
      </Box>
    </>
  );
};

CategoryPost.getLayout = (page: React.ReactNode) => {
  return <AppLayout maxWidth='lg'>{page}</AppLayout>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const localeProps = await serverSideTranslations(ctx.locale as string, ['common', 'errors']);

  try {
    const data = await NextApiService(ctx).post.getOne(123);

    return {
      props: {
        ...localeProps,
        post: data,
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

export default CategoryPost;

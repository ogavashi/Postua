import { Box, Button, ButtonGroup, Paper, Slider, Typography } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { Post } from '@/features/post';

const CategoryPost: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <>
      <Box my='12px'>
        <Post />
      </Box>
    </>
  );
};

CategoryPost.getLayout = (page: React.ReactNode) => {
  return <AppLayout maxWidth='lg'>{page}</AppLayout>;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errors'])),
    },
  };
}

export default CategoryPost;

import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { GetServerSideProps } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AppLayout } from '@/components';
import { constants } from '@/common';
import { Category, SideCards } from '@/features/category';
import { PostList } from '@/features/post';

const CategoryPage: NextPageWithLayout = () => {
  const category = constants.CATEGORIES[1];

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Category category={category} />
      <Box display='flex' justifyContent='space-between' gap={2}>
        <PostList sx={{ width: { xs: '100%', md: '100%', lg: 720 } }} />
        <SideCards category={category} />
      </Box>
    </Box>
  );
};

CategoryPage.getLayout = (page: React.ReactNode) => {
  return <AppLayout maxWidth='lg'>{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'errors'])),
    },
  };
};

export default CategoryPage;

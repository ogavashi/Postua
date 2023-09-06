import { Box, Button, ButtonGroup, Paper, Slider, Typography } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { GetServerSideProps } from 'next';
import { Category, Rules, SubscribersCard } from '@/features/category';
import { PostList } from '@/features/post';
import { constants } from '@/common';

const SubscribersPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { category: categoryKey } = router.query;

  const category = constants.CATEGORIES.find(({ key }) => categoryKey === key);

  if (!category) {
    return null;
  }
  return (
    <>
      <Box>
        <Category category={category} />
        <Box display='flex' justifyContent='space-between' gap={2}>
          Subscribers
        </Box>
      </Box>
    </>
  );
};

SubscribersPage.getLayout = (page: React.ReactNode) => {
  return <AppLayout maxWidth='lg'>{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'errors'])),
    },
  };
};

export default SubscribersPage;

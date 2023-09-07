import { Box, Button, ButtonGroup, Paper, Slider, Typography } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { Card as NewsCard } from '@/features/news';
import { SelectFilter } from '@/features/filters';
import { PostList } from '@/features/post';

import { constants } from '@/common';

const Popular: NextPageWithLayout = () => {
  return (
    <Box my='12px' display='flex' flexDirection='column' gap={2}>
      <SelectFilter pageKey={'popular'} options={constants.FILTERS_TIME} />
      <NewsCard />
      <PostList />
    </Box>
  );
};

Popular.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errors'])),
    },
  };
}

export default Popular;

import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { GetServerSideProps } from 'next';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { Category } from '@/features/category';
import { SubscribersCard } from '@/features/subscribers';
import { PostList } from '@/features/post';
import { RulesCard } from '@/features/rules';
import { constants } from '@/common';

const CategoryPage: NextPageWithLayout = () => {
  const category = constants.CATEGORIES[3];

  return (
    <>
      <Box>
        <Category category={category} />
        <Box display='flex' justifyContent='space-between' gap={2}>
          <PostList sx={{ width: { xs: '100%', md: '100%', lg: 720 } }} />
          <Box
            sx={{
              position: 'sticky',
              top: 80,
              height: 'fit-content',
              display: { xs: 'none', lg: 'flex' },
              flexDirection: 'column',
              gap: 2,
              mt: 2.85,
              maxWidth: 410,
            }}
          >
            <SubscribersCard categoryKey={category.key} />
            <RulesCard categoryKey={category.key} />
          </Box>
        </Box>
      </Box>
    </>
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

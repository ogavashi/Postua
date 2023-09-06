import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Category } from '@/features/category';
import { Rules } from '@/features/rules';
import { constants } from '@/common';

const RulesPage: NextPageWithLayout = () => {
  const category = constants.CATEGORIES[5];

  return (
    <>
      <Box>
        <Category category={category} />
        <Box mt={2.85}>
          <Rules />
        </Box>
      </Box>
    </>
  );
};

RulesPage.getLayout = (page: React.ReactNode) => {
  return <AppLayout maxWidth='lg'>{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'errors'])),
    },
  };
};

export default RulesPage;

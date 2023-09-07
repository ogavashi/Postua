import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SubscriptionsList } from '@/features/subscriptions';

const Subscriptions: NextPageWithLayout = () => {
  return (
    <Box display='flex' flexDirection='column' gap={2} my='12px'>
      <SubscriptionsList />
    </Box>
  );
};

Subscriptions.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errors'])),
    },
  };
}

export default Subscriptions;

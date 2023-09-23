import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SubscriptionsList } from '@/features/subscriptions';
import { NextPageContext } from 'next/types';
import { NextApiService } from '@/services';

interface SubscriptionsPageProps {
  pageProps: { categories: { id: number; category: string }[] };
}

const Subscriptions: NextPageWithLayout<SubscriptionsPageProps> = ({ pageProps }) => {
  const { categories } = pageProps;

  return (
    <Box display='flex' flexDirection='column' gap={2} my='12px'>
      <SubscriptionsList categories={categories} />
    </Box>
  );
};

Subscriptions.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const localeProps = await serverSideTranslations(ctx.locale as string, ['common', 'errors']);

  try {
    const categories = await NextApiService(ctx).user.getSubscriptions();

    return {
      props: {
        ...localeProps,
        categories,
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

export default Subscriptions;

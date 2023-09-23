import { Box } from '@mui/material';
import { NextPageWithLayout } from '../../_app';
import { AppLayout } from '@/components';

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { UserSubscriptionsList } from '@/features/subscriptions';
import { User } from '@/features/user';
import { NextPageContext } from 'next/types';
import { getUserId } from '@/lib';
import { NextApiService } from '@/services';
import { Subscribe, UserData } from '@/types';

interface SubscriptionsPageProps {
  pageProps: {
    subs: Subscribe[];
    user: UserData;
  };
}

const SubscriptionsPage: NextPageWithLayout<SubscriptionsPageProps> = ({ pageProps }) => {
  const { subs, user } = pageProps;

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <User user={user} subsCount={subs.length} />
      <Box>
        <UserSubscriptionsList subscriptions={subs} />
      </Box>
    </Box>
  );
};

SubscriptionsPage.getLayout = (page: React.ReactNode) => {
  return <AppLayout maxWidth='lg'>{page}</AppLayout>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const localeProps = await serverSideTranslations(ctx.locale as string, ['common', 'errors']);

  const userId = getUserId(ctx.query?.id);

  if (!userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
    const query = {
      take: 2,
      page: 1,
      order: 'ASC',
    };

    const user = await NextApiService(ctx).user.getById(userId);

    const subs = await NextApiService(ctx).subscribers.getSubscriptions(userId);

    return {
      props: {
        ...localeProps,
        subs,
        user,
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

export default SubscriptionsPage;

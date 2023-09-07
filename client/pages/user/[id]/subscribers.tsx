import { Box } from '@mui/material';
import { NextPageWithLayout } from '../../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { GetServerSideProps } from 'next';
import { Category, SideCards } from '@/features/category';
import { SubscribersList } from '@/features/subscribers';
import { constants } from '@/common';
import { User, UserDto } from '@/features/user';
import { PostList } from '@/features/post';

const SubscribersPage: NextPageWithLayout = () => {
  const user: UserDto = {
    email: 'user@email.com',
    fullName: 'Full Name',
    id: '1337',
    backgroundUrl: 'https://media.tenor.com/6LyXLgF8ksUAAAAd/anime-gif.gif',
    avatarUrl: 'https://giffiles.alphacoders.com/350/35097.gif',
  };

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <User user={user} />
      <Box>
        <SubscribersList />
      </Box>
    </Box>
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

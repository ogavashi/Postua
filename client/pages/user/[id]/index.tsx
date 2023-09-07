import { Box } from '@mui/material';
import { NextPageWithLayout } from '../../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SideCards, User, UserDto } from '@/features/user';
import { PostList } from '@/features/post';
import { constants } from '@/common';

const UserPage: NextPageWithLayout = () => {
  const user: UserDto = {
    email: 'user@email.com',
    fullName: 'Full Name',
    id: '1337',
    backgroundUrl: 'https://media.tenor.com/6LyXLgF8ksUAAAAd/anime-gif.gif',
    avatarUrl: 'https://giffiles.alphacoders.com/350/35097.gif',
  };

  const category = constants.CATEGORIES[3];

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <User user={user} />
      <Box display='flex' justifyContent='space-between' gap={2}>
        <PostList sx={{ width: { xs: '100%', md: '100%', lg: 720 } }} />
        <SideCards category={category} />
      </Box>
    </Box>
  );
};

UserPage.getLayout = (page: React.ReactNode) => {
  return <AppLayout maxWidth='lg'>{page}</AppLayout>;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errors'])),
    },
  };
}

export default UserPage;

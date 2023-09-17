import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { wrapper } from '@/store';

import { ProfileCard } from '@/features/profile';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UserData } from '@/types';

interface ProfileProps {
  pageProps: {
    user: UserData;
  };
}

const Profile: NextPageWithLayout<ProfileProps> = ({ pageProps }) => {
  return (
    <Box my='12px'>
      <ProfileCard user={pageProps.user} />
    </Box>
  );
};

Profile.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ locale }) => {
  const userData = store.getState().user.data;

  if (!userData) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale as string, ['common', 'errors'])),
      user: userData,
    },
  };
});

export default Profile;

import { Box, Button, ButtonGroup, Paper, Slider, Typography } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';

import { Card as NewsCard } from '@/features/news';
import { SelectFilter } from '@/features/filters';
import { PostList } from '@/features/post';

import { constants } from '@/common';
import { ProfileCard } from '@/features/profile';

const Profile: NextPageWithLayout = () => {
  return (
    <Box my='12px'>
      <ProfileCard />
    </Box>
  );
};

Profile.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errors'])),
    },
  };
}

export default Profile;

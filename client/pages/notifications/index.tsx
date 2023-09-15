import { Box, Button, ButtonGroup, Paper, Slider, Typography } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { Card as NewsCard } from '@/features/news';
import { SelectFilter } from '@/features/filters';
import { constants } from '@/common';
import { PostList } from '@/features/post';
import { NotificationsList } from '@/features/notifications';

const Notifications: NextPageWithLayout = () => {
  return (
    <Box my='12px' display='flex' flexDirection='column' alignItems='flex-end' gap={2}>
      <Button variant='contained'>Mark as seen</Button>
      <NotificationsList />
    </Box>
  );
};

Notifications.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errors'])),
    },
  };
}

export default Notifications;

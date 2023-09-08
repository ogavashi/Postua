import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { WriteForm } from '@/features/write';

const UserPage: NextPageWithLayout = () => {
  return (
    <Box display='flex' flexDirection='column' gap={2} my='12px'>
      <WriteForm />
    </Box>
  );
};

UserPage.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'errors'])),
    },
  };
}

export default UserPage;

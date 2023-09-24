import { Box } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { WriteForm } from '@/features/write';
import { NextApiService } from '@/services';
import { NextPageContext } from 'next/types';
import { PostItem } from '@/types';

interface EditPageProps {
  pageProps: {
    data: PostItem;
  };
}

const EditPage: NextPageWithLayout<EditPageProps> = ({ pageProps }) => {
  const { data } = pageProps;

  return (
    <Box display='flex' flexDirection='column' gap={2} my='12px'>
      <WriteForm data={data} />
    </Box>
  );
};

EditPage.getLayout = (page: React.ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const localeProps = await serverSideTranslations(ctx.locale as string, ['common', 'errors']);

  const { id } = ctx.query;

  try {
    const post = await NextApiService(ctx).post.getOne(id as unknown as number);

    if (!post) {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }

    return {
      props: {
        ...localeProps,
        data: post,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}

export default EditPage;

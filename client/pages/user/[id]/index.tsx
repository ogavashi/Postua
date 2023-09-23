import { Box } from '@mui/material';
import { NextPageWithLayout } from '../../_app';
import { AppLayout } from '@/components';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { SideCards, User, UserDto } from '@/features/user';
import { PostList } from '@/features/post';
import { constants } from '@/common';
import { NextPageContext } from 'next/types';
import { ApiService, NextApiService } from '@/services';
import { getUserId } from '@/lib';
import { PageOptionsDto, PostItem, Subscribe, UserData } from '@/types';

interface UserPageProps {
  pageProps: {
    posts: PostItem[];
    nextPage?: boolean;
    filter?: string;
    subs: Subscribe[];
    user: UserData;
  };
}

const UserPage: NextPageWithLayout<UserPageProps> = ({ pageProps }) => {
  const { posts, subs, nextPage, filter, user } = pageProps;

  const apiCall = (pageOptionsDto: PageOptionsDto, userId: string) =>
    ApiService.post.getByUser(pageOptionsDto, +userId);

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <User user={user} subsCount={subs.length} />
      <Box display='flex' justifyContent='space-between' gap={2}>
        <PostList
          sx={{ width: { xs: '100%', md: '100%', lg: 720 } }}
          posts={posts}
          nextPage={nextPage}
          filter={filter}
          apiCall={apiCall}
        />
        <SideCards subs={subs} userId={user.id} />
      </Box>
    </Box>
  );
};

UserPage.getLayout = (page: React.ReactNode) => {
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

    const { posts, meta } = await NextApiService(ctx).post.getByUser(query, userId);

    const subs = await NextApiService(ctx).subscribers.getSubscriptions(userId);

    return {
      props: {
        ...localeProps,
        posts,
        subs,
        user,
        nextPage: meta.hasNextPage,
        filter: userId,
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

export default UserPage;

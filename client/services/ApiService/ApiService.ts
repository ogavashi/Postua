import { NextPageContext, GetServerSidePropsContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { ApiClient } from './ApiClient';
import { Post, User } from './entities';
import { AppConfig } from '@/common';
import { store } from '@/store';

class ApiService {
  public user: User;
  public post: Post;

  constructor({ token, apiUrl }: { token?: string; apiUrl?: string }) {
    if (!apiUrl) {
      throw new Error('Invalid apiUrl');
    }

    const apiClient = new ApiClient({ token, baseUrl: apiUrl });

    this.user = new User({ apiClient });
    this.post = new Post({ apiClient });
  }
}

export default new ApiService({
  apiUrl: AppConfig.apiUrl,
  token: store.getState().user.data?.token,
});

export const NextApiService = (ctx?: NextPageContext | GetServerSidePropsContext) => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies();
  const token = cookies.postUaToken;

  if (!token) {
    throw new Error('Expected token');
  }

  return new ApiService({
    apiUrl: AppConfig.apiUrl,
    token,
  });
};

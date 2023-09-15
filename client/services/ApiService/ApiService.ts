import { NextPageContext, GetServerSidePropsContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { ApiClient } from './ApiClient';
import { Post, Search, User } from './entities';
import { AppConfig } from '@/common';

class ApiService {
  public user: User;
  public post: Post;
  public search: Search;

  constructor({
    ctx,
    apiUrl,
  }: {
    ctx?: NextPageContext | GetServerSidePropsContext;
    apiUrl?: string;
  }) {
    if (!apiUrl) {
      throw new Error('Invalid apiUrl');
    }

    const cookies = ctx ? Cookies.get(ctx) : parseCookies();
    const token = cookies.postUaToken;

    const apiClient = new ApiClient({ token, baseUrl: apiUrl });

    this.user = new User({ apiClient });
    this.post = new Post({ apiClient });
    this.search = new Search({ apiClient });
  }
}

export default new ApiService({
  apiUrl: AppConfig.apiUrl,
});

export const NextApiService = (ctx: NextPageContext | GetServerSidePropsContext) => {
  return new ApiService({
    apiUrl: AppConfig.apiUrl,
    ctx,
  });
};

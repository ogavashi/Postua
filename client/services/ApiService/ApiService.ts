import { NextPageContext, GetServerSidePropsContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { ApiClient } from './ApiClient';
import { Post, Search, User } from './entities';
import { AppConfig } from '@/common';

class ApiService {
  public user: User;
  public post: Post;
  public search: Search;
  private apiClient: ApiClient;

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

    this.apiClient = new ApiClient({ token, baseUrl: apiUrl });

    this.user = new User({ apiClient: this.apiClient });
    this.post = new Post({ apiClient: this.apiClient });
    this.search = new Search({ apiClient: this.apiClient });
  }

  setAuthToken(token: string) {
    this.apiClient.setToken(token);
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

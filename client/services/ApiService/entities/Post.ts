import { Base } from '.';
import { PostItem, ShortPostItem, Tag } from '@/types';

type PopularSearchDto = {
  period: string;
  take: number;
  page: number;
  order: string;
};

export class Post extends Base {
  async getPopular(query: PopularSearchDto) {
    const { data } = await this.apiClient.instance.get(`/posts/popular`, { params: { query } });

    const { data: posts, meta } = data;

    return { posts, meta };
  }

  async post(data) {
    await this.apiClient.instance.post(`/posts`, data);
  }

  async getAll() {
    const data = shortPosts;

    return data;
  }

  async getOne(id: number) {
    return post;
  }
}

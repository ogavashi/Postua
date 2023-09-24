import { PageOptionsDto, PostDto, PostItem, PostUpdateDto } from '@/types';
import { Base } from '.';

export class Post extends Base {
  async getPopular(pageOptionsDto: PageOptionsDto, period?: string) {
    const { data } = await this.apiClient.instance.get(`/posts/popular`, {
      params: { ...pageOptionsDto, period },
    });

    const { data: posts, meta } = data;

    return { posts, meta };
  }

  async getFresh(pageOptionsDto: PageOptionsDto, rating?: string) {
    const { data } = await this.apiClient.instance.get(`/posts/fresh`, {
      params: { ...pageOptionsDto, rating },
    });
    const { data: posts, meta } = data;

    return { posts, meta };
  }

  async getSaved(pageOptionsDto: PageOptionsDto, category: string = '') {
    const { data } = await this.apiClient.instance.get(`/posts/saved`, {
      params: { ...pageOptionsDto, category },
    });

    const { data: posts, meta } = data;

    return { posts, meta };
  }

  async like(id: number) {
    await this.apiClient.instance.post('/likes', { postId: id });
  }

  async dislike(id: number) {
    await this.apiClient.instance.post('/dislikes', { postId: id });
  }

  async subscribe(category: string) {
    await this.apiClient.instance.post('/subs', { category });
  }

  async save(id: number) {
    await this.apiClient.instance.post('/saved', { postId: id });
  }

  async getOne(id: number) {
    const { data: post } = await this.apiClient.instance.get(`/posts/${id}`);

    return post;
  }

  async getByCategory(pageOptionsDto: PageOptionsDto, category: string) {
    const { data } = await this.apiClient.instance.get(`/posts/category/${category}`, {
      params: { ...pageOptionsDto },
    });

    const { data: posts, meta } = data;

    return { posts, meta };
  }

  async getByUser(pageOptionsDto: PageOptionsDto, userId: number) {
    const { data } = await this.apiClient.instance.get(`/posts/user/${userId}`, {
      params: { ...pageOptionsDto },
    });

    const { data: posts, meta } = data;

    return { posts, meta };
  }

  async view(id: number) {
    await this.apiClient.instance.post('/views', { postId: id });
  }

  async visit(id: number) {
    await this.apiClient.instance.post('/visitings', { postId: id });
  }

  async post(post: PostDto) {
    const { data } = await this.apiClient.instance.post('/posts', post);
    return data;
  }

  async update(post: PostUpdateDto) {
    await this.apiClient.instance.patch(`/posts/${post.id}`, post);
    return post.id;
  }

  async delete(id: string) {
    await this.apiClient.instance.delete(`/posts/${id}`);
  }
}

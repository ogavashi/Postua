import { PageOptionsDto } from '@/types';
import { Base } from '.';

export class Subscribers extends Base {
  async getSubscribers(pageOptionsDto: PageOptionsDto, category: string) {
    const { data } = await this.apiClient.instance.get(`/subs/users/${category}`, {
      params: { ...pageOptionsDto },
    });

    const { data: users, meta } = data;

    return { users, meta };
  }
}

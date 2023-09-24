import { Base } from '.';

export class Search extends Base {
  async search(searchValue: string) {
    const { data } = await this.apiClient.instance.get(`/search?search=${searchValue}`);

    return data;
  }

  async searchByCategory(searchValue: string, category: string) {
    const { data } = await this.apiClient.instance.get('/search/category', {
      params: { search: searchValue, category },
    });
    return data;
  }
}

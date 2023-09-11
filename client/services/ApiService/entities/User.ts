import { Base } from '.';
import { LoginRequest, RegisterRequest, UserResponse } from '@/types';

const mockUser = {
  email: 'user@email.com',
  fullName: 'Full Name',
  id: '1337',
  backgroundUrl: 'https://media.tenor.com/6LyXLgF8ksUAAAAd/anime-gif.gif',
  avatarUrl: 'https://giffiles.alphacoders.com/350/35097.gif',
  token: 'testtokenPostua',
};

export class User extends Base {
  async login(dto: LoginRequest) {
    // const { data } = await this.apiClient.instance.post<LoginRequest, { data: UserResponse }>(
    //   '/auth/login',
    //   dto
    // );

    // return data;

    return mockUser;
  }

  async register(dto: RegisterRequest) {
    // const { data } = await this.apiClient.instance.post<RegisterRequest, { data: UserResponse }>(
    //   '/auth/register',
    //   dto
    // );

    // return data;

    return mockUser;
  }

  async getMe() {
    // const { data } = await this.apiClient.instance.get<UserResponse>(
    //   '/users/me');
    // return data;

    // Until backend if implemented

    if (this.apiClient.instance.defaults.headers.Authorization !== 'Bearer testtokenPostua') {
      throw new Error('Unauthenticated');
    }
    return mockUser;
  }
}

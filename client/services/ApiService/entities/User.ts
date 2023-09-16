import { Base } from '.';
import { LoginRequest, RegisterRequest, UserResponse } from '@/types';

export class User extends Base {
  async login(dto: LoginRequest) {
    const { data } = await this.apiClient.instance.post<LoginRequest, { data: UserResponse }>(
      '/auth/login',
      dto
    );

    return data;
  }

  async register(dto: RegisterRequest) {
    const { data } = await this.apiClient.instance.post<RegisterRequest, { data: UserResponse }>(
      '/auth/register',
      dto
    );

    return data;
  }

  async getMe() {
    const { data } = await this.apiClient.instance.get<UserResponse>('/users/me');
    return data;
  }
}

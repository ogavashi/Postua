import { Base } from '.';
import {
  LoginRequest,
  RegisterRequest,
  UpdateUserDtoRequest,
  UserData,
  UserResponse,
} from '@/types';

export class User extends Base {
  async login(dto: LoginRequest) {
    const { data } = await this.apiClient.instance.post<LoginRequest, { data: UserResponse }>(
      '/auth/login',
      dto
    );

    return data;
  }

  async register(dto: RegisterRequest) {
    const { confirmPassword, ...userFormData } = dto as RegisterRequest & {
      confirmPassword: string;
    };

    const { data } = await this.apiClient.instance.post<RegisterRequest, { data: UserResponse }>(
      '/auth/register',
      userFormData
    );

    return data;
  }

  async getMe() {
    const { data } = await this.apiClient.instance.get<UserData>('/users/me');
    return data;
  }

  async update(dto: UpdateUserDtoRequest) {
    await this.apiClient.instance.patch('users/me', dto);
  }
}

import axios, { AxiosInstance } from 'axios';
import { handleAxiosError } from './interceptors';

export class ApiClient {
  instance: AxiosInstance;

  constructor({ token, baseUrl }: { token?: string; baseUrl: string }) {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => handleAxiosError(error)
    );
  }

  setToken(token: string) {
    this.instance.defaults.headers.Authorization = 'Bearer ' + token;
  }
}

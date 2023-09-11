import axios, { AxiosInstance } from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';

export class ApiClient {
  instance: AxiosInstance;

  constructor({ token, baseUrl }: { token?: string; baseUrl: string }) {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
}

import { ApiClient } from '../ApiClient';

export class Base {
  apiClient: ApiClient;

  constructor({ apiClient }: { apiClient: ApiClient }) {
    if (!apiClient) throw new Error('[apiClient] required');

    this.apiClient = apiClient;
  }
}

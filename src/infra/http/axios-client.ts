import axios from 'axios';
import { HttpGetClient, HttpPostClient, IHttpGetClient, IHttpPostClient } from './client';

export class AxiosHttpClient implements IHttpGetClient, IHttpPostClient {
  async get({ params, url }: HttpGetClient.Input): Promise<any> {
    const result = await axios.get(url, { params });

    return result.data;
  }

  async post({ url, data, headers, params }: HttpPostClient.Input): Promise<any> {
    const result = await axios.post(url, data, { headers, params });

    return result.data;
  }
}

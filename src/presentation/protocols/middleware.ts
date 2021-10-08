import { HttpResponse } from './http';

export interface IMiddleware<T = any> {
  handle: (httpResponse: T) => Promise<HttpResponse>;
}

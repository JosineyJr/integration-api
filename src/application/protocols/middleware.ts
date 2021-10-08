import { HttpResponse } from './http';

export interface IMiddleware<T = any> {
  handle: (httpRequest: T) => Promise<HttpResponse>;
}

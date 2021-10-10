export namespace HttpGetClient {
  export type Input = {
    url: string;
    params?: Record<string, unknown>;
  };
}

export interface IHttpGetClient {
  get: <T = any>(input: HttpGetClient.Input) => Promise<T>;
}

export namespace HttpPostClient {
  export type Input = {
    url: string;
    data?: Record<string, unknown>;
    headers?: any;
    params?: Record<string, unknown>;
  };
}

export interface IHttpPostClient {
  post: <T = any>(input: HttpPostClient.Input) => Promise<T>;
}

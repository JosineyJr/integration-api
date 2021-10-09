export namespace LoadUserByToken {
  export type Params = {
    accessToken: string;
    role_id: number;
  };

  export type Result = {
    id: string;
  };
}

export interface ILoadUserByToken {
  load: (loadUserByTokenData: LoadUserByToken.Params) => Promise<LoadUserByToken.Result>;
}

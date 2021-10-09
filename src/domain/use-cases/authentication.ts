export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    accessToken: string;
    name: string;
  };
}

export interface IAuthentication {
  auth: (authenticationParams: Authentication.Params) => Promise<Authentication.Result>
}

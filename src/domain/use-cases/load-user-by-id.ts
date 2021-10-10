import { IUser } from '../models/user';

export namespace LoadUserById {
  export type Params = {
    id: string;
  };

  export type Result = {
    user: IUser | undefined;
  };
}

export interface ILoadUserById {
  load: (loadUserByIdData: LoadUserById.Params) => Promise<LoadUserById.Result>;
}

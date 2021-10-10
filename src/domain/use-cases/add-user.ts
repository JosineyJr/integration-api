import { IUser } from '../models/user';

export namespace AddUser {
  export type Params = {
    name: string;
    email: string;
    password: string;
    roleId: number;
  };
  export type Result = IUser;
}

export interface IAddUser {
  add: (user: AddUser.Params) => Promise<AddUser.Result>;
}

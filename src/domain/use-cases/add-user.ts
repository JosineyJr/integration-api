export namespace AddUser {
  export type Params = {
    name: string;
    password: string;
  };
  export type Result = boolean;
}

export interface IAddUser {
  add: (user: AddUser.Params) => Promise<AddUser.Result>
}

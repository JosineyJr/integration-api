type User = { id: string; name: string; email: string };

export namespace AddUser {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };
  export type Result = User;
}

export interface IAddUser {
  add: (user: AddUser.Params) => Promise<AddUser.Result>;
}

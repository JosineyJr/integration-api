import { AddUser } from '@/domain/use-cases';

export namespace AddUserPgRepository {
  export type Params = AddUser.Params;
  export type Result = AddUser.Result;
}

export interface IAddUserPgRepository {
  add: (data: AddUserPgRepository.Params) => Promise<AddUserPgRepository.Result>;
}

import { AddUser } from '@/domain/use-cases';

export namespace AddUserRepository {
  export type Params = AddUser.Params;
  export type Result = AddUser.Result;
}

export interface IAddUserRepository {
  add: (data: AddUserRepository.Params) => Promise<AddUserRepository.Result>;
}

import { IUser } from '@/domain/models/user';

export namespace LoadUserByEmailRepository {
  export type Result = IUser | undefined;
}

export interface ILoadUserByEmailRepository {
  loadByEmail: (email: string) => Promise<LoadUserByEmailRepository.Result>;
}

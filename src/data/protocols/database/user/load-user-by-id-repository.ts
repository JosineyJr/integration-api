import { LoadUserById } from '@/domain/use-cases';

export namespace LoadUserByIdRepository {
  export type Params = LoadUserById.Params;
  export type Result = LoadUserById.Result | undefined;
}

export interface ILoadUserByIdRepository {
  loadById: (data: LoadUserByIdRepository.Params) => Promise<LoadUserByIdRepository.Result>;
}

import { AddUser, IAddUser } from '@/domain/use-cases';
import { IHasher, IAddUserPgRepository } from '@/data/protocols';

export class DbAddUser implements IAddUser {
  constructor(
    private readonly hasher: IHasher,
    private addUserPgRepository: IAddUserPgRepository,
  ) {}

  async add(userData: AddUser.Params): Promise<AddUser.Result> {
    const hashedPassword = await this.hasher.hash(userData.password);

    const user = await this.addUserPgRepository.add({ ...userData, password: hashedPassword });

    return user;
  }
}

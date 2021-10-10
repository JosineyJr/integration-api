import { AddUser, IAddUser } from '@/domain/use-cases';
import { IAddUserRepository, IHasher } from '@/data/protocols';

export class DbAddUser implements IAddUser {
  constructor(private readonly hasher: IHasher, private addUser: IAddUserRepository) {}

  async add(userData: AddUser.Params): Promise<AddUser.Result> {
    const hashedPassword = await this.hasher.hash(userData.password);

    const user = await this.addUser.add({ ...userData, password: hashedPassword, roleId: userData.roleId });

    return user;
  }
}

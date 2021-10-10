import { AddUserRepository, IAddUserRepository } from '@/data/protocols';
import {
  ILoadUserByIdRepository,
  LoadUserByIdRepository,
  ILoadUserByEmailRepository,
  LoadUserByEmailRepository,
} from '@/data/protocols/database/user/';
import { IUser } from '@/domain/models/user';
import { PgUser } from './entities';
import { PgRepository } from './repository';

export class PgUserRepository
  extends PgRepository
  implements IAddUserRepository, ILoadUserByIdRepository, ILoadUserByEmailRepository
{
  async add(userData: AddUserRepository.Params): Promise<AddUserRepository.Result> {
    const pgUserRepo = this.getRepository(PgUser);
    let user = new PgUser();
    Object.assign(user, userData);
    user = await pgUserRepo.save(user);
    const userEager = await pgUserRepo.findOne(user.id) as IUser;

    return userEager;
  }

  async loadById({ id }: LoadUserByIdRepository.Params): Promise<LoadUserByIdRepository.Result> {
    const pgUserRepo = this.getRepository(PgUser);
    const user = await pgUserRepo.findOne(id);

    return { user };
  }

  async loadByEmail(email: string): Promise<LoadUserByEmailRepository.Result> {
    const pgUserRepo = this.getRepository(PgUser);
    const user = await pgUserRepo.findOne({ where: { email } });

    return user;
  }
}

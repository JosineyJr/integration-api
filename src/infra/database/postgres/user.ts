import { IAddUserPgRepository } from '@/data/protocols';
import { AddUser } from '@/domain/use-cases';
import { PgUser } from './entities';
import { PgRepository } from './repository';

export class PgUserRepository extends PgRepository implements IAddUserPgRepository {
  async add(userData: AddUser.Params): Promise<AddUser.Result> {
    const pgUserRepo = this.getRepository(PgUser);
    let user = new PgUser();
    Object.assign(user, userData);
    user = await pgUserRepo.save(user);

    return user;
  }
}

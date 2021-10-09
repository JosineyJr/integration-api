import { IAddUser } from '@/domain/use-cases';
import { BcryptAdapter } from '@/infra/cryptography';
import { PgUserRepository } from '@/infra/database/postgres';
import { DbAddUser } from '@/data/use-cases';

export const makeDbAddUser = (): IAddUser => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const pgUserRepository = new PgUserRepository();
  return new DbAddUser(bcryptAdapter, pgUserRepository);
};

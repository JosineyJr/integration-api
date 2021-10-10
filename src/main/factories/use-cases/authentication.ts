import { DbAuthentication } from '@/data/use-cases/db-authentication';
import { IAuthentication } from '@/domain/use-cases';
import { BcryptAdapter } from '@/infra/cryptography';
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter';
import { PgUserRepository } from '@/infra/database';

export const makeDbAuthentication = (): IAuthentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter();
  const pgUserRepository = new PgUserRepository();
  return new DbAuthentication(pgUserRepository, jwtAdapter, bcryptAdapter);
};

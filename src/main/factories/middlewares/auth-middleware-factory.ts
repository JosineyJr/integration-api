import { AuthMiddleware } from '@/application/middlewares';
import { IMiddleware } from '@/application/protocols';
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter';
import { PgUserRepository } from '@/infra/database';

export const makeAuthMiddleware = (role: string): IMiddleware => {
  const pgUserRepository = new PgUserRepository();
  const jwtAdapter = new JwtAdapter();
  return new AuthMiddleware(pgUserRepository, role, jwtAdapter);
};

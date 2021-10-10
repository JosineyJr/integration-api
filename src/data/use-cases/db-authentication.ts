import { Authentication, IAuthentication } from '@/domain/use-cases';
import { IEncrypter, IHashComparer } from '../protocols';
import { ILoadUserByEmailRepository } from '../protocols/database/user/load-user-by-email-repository';
import env from '@/main/config/env';

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly loadUserByEmailRepository: ILoadUserByEmailRepository,
    private readonly encrypter: IEncrypter,
    private readonly hashComparer: IHashComparer,
  ) {}

  async auth({ email, password }: Authentication.Params): Promise<Authentication.Result | undefined> {
    const user = await this.loadUserByEmailRepository.loadByEmail(email);
    if (user) {
      const isValid = await this.hashComparer.compare(password, user.password);
      if (isValid) {
        const secret = user.role.name === 'admin' ? env.adminJwtSecret : env.customerJwtSecret;
        const accessToken = await this.encrypter.encrypt(user.id, secret);
        return { accessToken, name: user.name };
      }
    }
  }
}

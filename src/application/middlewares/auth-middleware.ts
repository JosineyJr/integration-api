import { IDecrypter, ILoadUserByIdRepository } from '@/data/protocols';
import { AccessDeniedError } from '../errors';
import { forbidden, ok, serverError } from '../helpers';
import { HttpResponse, IMiddleware } from '../protocols';
import env from '@/main/config/env';

// eslint-disable-next-line import/export
export class AuthMiddleware implements IMiddleware {
  constructor(
    private readonly loadUserById: ILoadUserByIdRepository,
    private readonly role: string,
    private readonly decrypter: IDecrypter,
  ) {}

  async handle(httpRequest: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = httpRequest;
      if (accessToken) {
        const secret = this.role === 'admin' ? env.adminJwtSecret : env.customerJwtSecret;
        const { id } = await this.decrypter.decrypt(accessToken, secret);
        const user = await this.loadUserById.loadById({ id });
        if (user) return ok({ user });
      }
      return forbidden(new AccessDeniedError());
    } catch (error: any) {
      return serverError(error);
    }
  }
}

// eslint-disable-next-line import/export
export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string;
  };
}

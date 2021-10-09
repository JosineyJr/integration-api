import { ILoadUserByToken } from '@/domain/use-cases';
import { AccessDeniedError } from '../errors';
import { forbidden, ok, serverError } from '../helpers';
import { HttpResponse, IMiddleware } from '../protocols';

// eslint-disable-next-line import/export
export class AuthMiddleware implements IMiddleware {
  constructor(private readonly loadUserByToken: ILoadUserByToken, private readonly role: string) {}

  async handle(httpRequest: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = httpRequest;
      if (accessToken) {
        const user = await this.loadUserByToken.load({ accessToken, role: this.role });
        if (user) return ok({ userId: user.id });
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
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

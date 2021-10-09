import { Controller } from '@/application/controllers';
import { HttpResponse } from '@/application/protocols';
import { ILogErrorRepository } from '@/data/protocols';

export class LogControllerDecorator extends Controller {
  constructor(private readonly controller: Controller, private readonly logErrorRepository: ILogErrorRepository) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async perform(httpRequest: any): Promise<HttpResponse> {
    return {} as HttpResponse;
  }

  override async handle(httpRequest: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest);

    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack);
    }

    return httpResponse;
  }
}

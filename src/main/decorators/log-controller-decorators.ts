import { HttpResponse, IController } from '@/application/protocols';
import { ILogErrorRepository } from '@/data/protocols';

export class LogControllerDecorator implements IController {
  constructor(
    private readonly controller: IController,
    private readonly logErrorRepository: ILogErrorRepository,
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request);

    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack);
    }

    return httpResponse;
  }
}

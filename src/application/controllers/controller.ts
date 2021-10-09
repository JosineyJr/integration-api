import { badRequest } from '../helpers';
import { IValidator } from '../protocols';
import { HttpResponse } from '../protocols/http';
import { ValidationComposite } from '../validation';

export abstract class Controller {
  abstract perform(httpRequest: any): Promise<HttpResponse>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildValidators(httpRequest: any): Array<IValidator> {
    return [];
  }

  private validate(httpRequest: any): Error | undefined {
    const validators = this.buildValidators(httpRequest);
    return new ValidationComposite(validators).validate();
  }

  async handle(httpRequest: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest);

    if (error !== undefined) return badRequest(error);
    return this.perform(httpRequest);
  }
}

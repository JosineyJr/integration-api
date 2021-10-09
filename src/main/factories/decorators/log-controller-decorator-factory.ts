import { IController } from '@/application/protocols';
import { LogMongoRepository } from '@/infra/database/mongo-db/log-mongo-repository';
import { LogControllerDecorator } from '@/main/decorators';

export const makeLogControllerDecorator = (controller: IController): IController => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller, logMongoRepository);
};

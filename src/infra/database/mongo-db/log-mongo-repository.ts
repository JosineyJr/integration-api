import { ILogErrorRepository } from '@/data/protocols/database';
import { MongoHelper } from './mongo-helper';

export class LogMongoRepository implements ILogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errorCollection = MongoHelper.getCollection('errors');
    await errorCollection.insertOne({ stack, date: new Date() });
  }
}

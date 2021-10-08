import { ObjectType, Repository } from 'typeorm';
import { PgConnection } from './helpers';

export abstract class PgRepository {
  constructor(private readonly connection: PgConnection = PgConnection.getInstance()) {}

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity);
  }
}

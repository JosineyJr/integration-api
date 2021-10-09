import {
  Connection,
  createConnection,
  getConnection,
  getConnectionManager,
  getRepository,
  ObjectType,
  QueryRunner,
  Repository,
} from 'typeorm';
import { IDbTransaction } from '@/application/contracts';
import {
  ConnectionNotFoundError,
  TransactionNotFoundError,
} from '@/infra/database/postgres/helpers';
import env from '@/main/config/env';
import { ormconfig } from './ormconfig';

export class PgConnection implements IDbTransaction {
  private static instance?: PgConnection;

  private query?: QueryRunner;

  private connection?: Connection;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): PgConnection {
    if (PgConnection.instance === undefined) PgConnection.instance = new PgConnection();
    return PgConnection.instance;
  }

  async connect(): Promise<void> {
    this.connection = getConnectionManager().has(env.connectionName)
      ? getConnection(env.connectionName)
      : await createConnection(ormconfig);
  }

  async disconnect(): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError();
    await this.connection.close();
    this.query = undefined;
    this.connection = undefined;
  }

  async openTransaction(): Promise<void> {
    if (this.connection === undefined) throw new ConnectionNotFoundError();
    this.query = this.connection.createQueryRunner();
    await this.query?.startTransaction();
  }

  async closeTransaction(): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError();
    await this.query.release();
  }

  async commit(): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError();
    await this.query.commitTransaction();
  }

  async rollback(): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError();
    await this.query.rollbackTransaction();
  }

  getRepository<Entity>(entity: ObjectType<Entity>): Repository<Entity> {
    if (this.connection === undefined) throw new ConnectionNotFoundError();
    if (this.query !== undefined) return this.query.manager.getRepository(entity);

    return getRepository(entity, env.connectionName);
  }
}

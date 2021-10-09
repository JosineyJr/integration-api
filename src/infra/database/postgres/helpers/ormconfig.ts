import { ConnectionOptions } from 'typeorm';
import env from '@/main/config/env';

export const ormconfig: ConnectionOptions = {
  type: 'postgres',
  name: env.connectionName,
  host: process.env.TS_NODE_DEV === undefined ? 'postgres-container' : 'localhost',
  port: +env.pg_port,
  username: env.pg_user,
  password: env.pg_password,
  database: env.pg_db,
  synchronize: true,
  logging: true,
  entities: [
    `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/database/postgres/entities/index.{js,ts}`,
  ],
  migrations: [
    `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/database/postgres/seeds/index.{js,ts}`,
  ],
};
